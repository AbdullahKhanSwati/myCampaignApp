// import csv from "csv-parser";
// import fs from "fs";
// import { createCampaignQuery } from "../queries/campaignQueries.js";

// export const createCampaign = async (req, res) => {
//   console.log("CampaignController: createCampaign started");
//   try {
//     const { type, electionDate, city, userId } = req.body;

//     // 🔍 Validate required fields
//     if (!type || !electionDate || !city || !userId) {
//       console.log("CampaignController: Missing required fields");
//       return res.status(400).json({
//         success: false,
//         message: "All campaign fields (type, electionDate, city, userId) are required",
//       });
//     }

//     // 📄 Check for CSV file
//     if (!req.file) {
//       console.log("CampaignController: No CSV file provided");
//       return res.status(400).json({
//         success: false,
//         message: "CSV file is required",
//       });
//     }

//     console.log("CampaignController: CSV file detected, path:", req.file.path);

//     // 💾 Create campaign document using query
//     const campaignData = {
//       type,
//       electionDate,
//       city,
//       csvFile: req.file.path, // Save uploaded file path
//       userId,
//     };
//     const campaignResponse = await createCampaignQuery(campaignData);

//     if (!campaignResponse.success) {
//       console.error("CampaignController: Failed to save campaign to DB:", campaignResponse.message);
//       return res.status(500).json({
//         success: false,
//         message: campaignResponse.message,
//       });
//     }
//     const campaign = campaignResponse.data;
//     console.log("CampaignController: Campaign saved to DB:", campaign._id);

//     // (Optional) Parse CSV to view or store voter data
//     console.log("CampaignController: Starting CSV parsing");
//     const results = [];
//     const stream = fs.createReadStream(req.file.path).pipe(csv());

//     stream.on("data", (data) => {
//       results.push(data);
//     });

//     await new Promise((resolve, reject) => {
//       stream.on("end", () => {
//         console.log("CampaignController: Finished CSV parsing. Parsed data:", results);
//         console.log("CampaignController: Finished CSV parsing. Parsed data count:", results.length);
//         // Optional: Save parsed data to another collection like Voters
//         resolve();
//       });
//       stream.on("error", (error) => {
//         console.error("CampaignController: CSV parsing error:", error);
//         reject(error);
//       });
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Campaign created successfully",
//       campaign,
//     });
//   } catch (error) {
//     console.error("CampaignController: Error in createCampaign:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };


import csv from "csv-parser";
import fs from "fs";
import path from "path";
import { PassThrough } from "stream";
import XLSX from "xlsx";
import { createCampaignQuery, getCampaignsByUserIdQuery } from "../queries/campaignQueries.js";
import Voter from "../Models/VoterModel.js"; // ✅ Make sure to adjust path if needed

const geocodeCache = new Map();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Track geocoding request times to respect rate limits
let lastGeocodeRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1200; // 1.2 seconds between requests (Nominatim allows 1 per second)

// Check if we're on Vercel (serverless environment)
const isVercel = process.env.VERCEL === "1";

const parseCSVFile = (filePathOrBuffer) => {
  return new Promise((resolve, reject) => {
    const parsedRows = [];
    
    // Handle both file path (local) and buffer (Vercel)
    if (Buffer.isBuffer(filePathOrBuffer)) {
      // Vercel: Parse from buffer using csv-parser
      const bufferStream = new PassThrough();
      bufferStream.end(filePathOrBuffer);
      
      bufferStream
        .pipe(csv())
        .on("data", (row) => {
          parsedRows.push(row);
        })
        .on("end", () => resolve(parsedRows))
        .on("error", (error) => reject(error));
    } else {
      // Local: Parse from file path
      fs.createReadStream(filePathOrBuffer)
        .pipe(csv())
        .on("data", (row) => {
          parsedRows.push(row);
        })
        .on("end", () => resolve(parsedRows))
        .on("error", (error) => reject(error));
    }
  });
};

const parseExcelFile = (filePathOrBuffer) => {
  let workbook;
  
  if (Buffer.isBuffer(filePathOrBuffer)) {
    // Vercel: Parse from buffer
    workbook = XLSX.read(filePathOrBuffer, { type: 'buffer' });
  } else {
    // Local: Parse from file path
    workbook = XLSX.readFile(filePathOrBuffer);
  }
  
  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    return [];
  }

  const worksheet = workbook.Sheets[firstSheetName];
  return XLSX.utils.sheet_to_json(worksheet, {
    defval: "",
    raw: false,
    blankrows: false
  });
};

const parseUploadedFile = async (file) => {
  const extension = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  // Get file data - use buffer for Vercel, path for local
  const fileData = isVercel ? file.buffer : file.path;

  if (extension === ".csv" || mimetype === "text/csv") {
    return parseCSVFile(fileData);
  }

  if (extension === ".xlsx" || extension === ".xls" ||
      mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      mimetype === "application/vnd.ms-excel") {
    return parseExcelFile(fileData);
  }

  throw new Error("Unsupported file format");
};

const sanitizeCell = (value) => {
  if (value === undefined || value === null) {
    return "";
  }

  if (typeof value === "string") {
    return value.trim();
  }

  return String(value).trim();
};

const buildAddressString = (row) => {
  const parts = [
    sanitizeCell(row["Street No."]),
    sanitizeCell(row["Street Name"]),
    sanitizeCell(row["Residence City"]),
    sanitizeCell(row["Residence State"]),
    sanitizeCell(row["Residence Zip"]),
  ].filter(Boolean);

  if (parts.length === 0) {
    return null;
  }

  return parts.join(", ");
};

const fetchGeocode = async (address, retryCount = 0) => {
  if (!address) {
    return null;
  }

  // Check cache first
  if (geocodeCache.has(address)) {
    const cached = geocodeCache.get(address);
    return cached; // Return cached result (even if null)
  }

  // Respect rate limits - ensure minimum time between requests
  const now = Date.now();
  const timeSinceLastRequest = now - lastGeocodeRequestTime;
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await sleep(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
  }

  try {
    const params = new URLSearchParams({
      q: address,
      format: "json",
      addressdetails: "1",
      limit: "1",
    });

    // Use a more descriptive User-Agent to avoid blocking
    const userAgent = `CampaignHelperApp/1.0 (https://campaign-helper.example.com; contact@campaign-helper.example.com)`;
    
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
      headers: {
        "User-Agent": userAgent,
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    lastGeocodeRequestTime = Date.now();

    // Handle rate limiting and errors gracefully
    if (response.status === 403 || response.status === 429) {
      // Rate limited - wait longer and retry once
      if (retryCount < 1) {
        console.warn(`Geocoding rate limited for address: ${address.substring(0, 50)}... Retrying after delay...`);
        await sleep(5000); // Wait 5 seconds before retry
        return fetchGeocode(address, retryCount + 1);
      } else {
        console.warn(`Geocoding failed after retry for address: ${address.substring(0, 50)}... (Status: ${response.status})`);
        geocodeCache.set(address, null);
        return null;
      }
    }

    if (!response.ok) {
      // For other errors, log but don't retry
      console.warn(`Geocoding request failed with status ${response.status} for address: ${address.substring(0, 50)}...`);
      geocodeCache.set(address, null);
      return null;
    }

    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      const result = data[0];
      const latitude = Number.parseFloat(result.lat);
      const longitude = Number.parseFloat(result.lon);
      if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
        const coordinates = { latitude, longitude };
        geocodeCache.set(address, coordinates);
        return coordinates;
      }
    }

    // No results found
    geocodeCache.set(address, null);
    return null;
  } catch (error) {
    // Log error but don't throw - allow campaign creation to continue
    console.warn(`Geocoding error for address "${address.substring(0, 50)}...": ${error.message || error}`);
    geocodeCache.set(address, null);
    return null;
  }
};

const geocodeAddressForRow = async (row) => {
  const address = buildAddressString(row);
  if (!address) {
    return null;
  }

  // Only wait if not in cache (to avoid unnecessary delays for cached addresses)
  if (!geocodeCache.has(address)) {
    // Additional delay to respect rate limits
    await sleep(100);
  }

  return fetchGeocode(address);
};

const LATITUDE_KEYS = ["Latitude", "Lat", "latitude", "lat", "LAT"];
const LONGITUDE_KEYS = ["Longitude", "Long", "Lng", "longitude", "long", "lng", "LONG"];

const extractCoordinate = (row, keys) => {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== null && row[key] !== "") {
      const numericValue = Number(row[key]);
      if (!Number.isNaN(numericValue)) {
        return numericValue;
      }
      const parsed = Number.parseFloat(String(row[key]).replace(/[^\d.-]/g, ""));
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
  }
  return null;
};

export const createCampaign = async (req, res) => {
  console.log("🗳️ CampaignController: createCampaign started");

  try {
    const { type, electionDate, city, userId } = req.body;

    // 🔍 Validate input fields
    if (!type || !electionDate || !city || !userId) {
      return res.status(400).json({
        success: false,
        message: "All campaign fields (type, electionDate, city, userId) are required.",
      });
    }

    // 📄 Validate CSV or Excel file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "CSV or Excel file is required.",
      });
    }

    const fileInfo = isVercel ? `memory buffer (${req.file.size} bytes)` : req.file.path;
    console.log("📂 File detected:", fileInfo);

    // 💾 Create campaign entry first
    // For Vercel, we don't save file path (using memory storage)
    // For local, save the file path
    const csvFile = isVercel ? `memory-${Date.now()}-${req.file.originalname}` : req.file.path;
    
    const campaignData = {
      type,
      electionDate,
      city,
      csvFile: csvFile,
      userId,
    };

    const campaignResponse = await createCampaignQuery(campaignData);

    if (!campaignResponse.success) {
      console.error("❌ Failed to save campaign:", campaignResponse.message);
      return res.status(500).json({
        success: false,
        message: campaignResponse.message,
      });
    }

    const campaign = campaignResponse.data;
    console.log("✅ Campaign saved with ID:", campaign._id);

    // 🧩 Parse uploaded file
    console.log("📖 Parsing uploaded file...");
    let parsedRows = [];

    try {
      parsedRows = await parseUploadedFile(req.file);
    } catch (parseError) {
      console.error("❌ Failed to parse uploaded file:", parseError);
      return res.status(400).json({
        success: false,
        message: "Failed to parse uploaded file. Please ensure it is a valid CSV or Excel document.",
      });
    }

    console.log(`✅ File parsing completed. Found ${parsedRows.length} records.`);

    // 🧾 Map CSV rows to voter schema
    const votersToInsert = [];
    let geocodingStats = {
      withCoordinates: 0,
      geocoded: 0,
      failed: 0,
      skipped: 0
    };

    console.log("📍 Processing voters and geocoding addresses (this may take a while for large files)...");

    for (let i = 0; i < parsedRows.length; i++) {
      const row = parsedRows[i];
      const latitude = extractCoordinate(row, LATITUDE_KEYS);
      const longitude = extractCoordinate(row, LONGITUDE_KEYS);

      const voterDocument = {
        lastName: sanitizeCell(row["Last Name"]),
        firstName: sanitizeCell(row["First Name"]),
        streetNo: sanitizeCell(row["Street No."]),
        streetName: sanitizeCell(row["Street Name"]),
        aptUnit: sanitizeCell(row["APT/UNIT"]),
        residenceCity: sanitizeCell(row["Residence City"]),
        residenceState: sanitizeCell(row["Residence State"]),
        residenceZip: sanitizeCell(row["Residence Zip"]),
        municipality: sanitizeCell(row["Municipality"]),
        ward: sanitizeCell(row["Ward"]),
        district: sanitizeCell(row["District"]),
        party: sanitizeCell(row["Party"]),
        phone: sanitizeCell(row["Phone #"]),
        email: sanitizeCell(row["Emails"]),
        notes: sanitizeCell(row["Notes"]),
        campaignId: campaign._id,
      };

      let resolvedLatitude = latitude;
      let resolvedLongitude = longitude;

      // If coordinates already exist in CSV, use them
      if (resolvedLatitude !== null && resolvedLongitude !== null) {
        geocodingStats.withCoordinates++;
      } else {
        // Try to geocode the address
        try {
          const geocodeResult = await geocodeAddressForRow(row);
          if (geocodeResult) {
            resolvedLatitude = geocodeResult.latitude;
            resolvedLongitude = geocodeResult.longitude;
            geocodingStats.geocoded++;
          } else {
            geocodingStats.failed++;
          }
        } catch (geocodeError) {
          // Geocoding failed, but continue processing
          geocodingStats.failed++;
          console.warn(`⚠️ Geocoding skipped for row ${i + 1}: ${geocodeError.message || 'Unknown error'}`);
        }
      }

      // Add coordinates if available
      if (resolvedLatitude !== null && resolvedLongitude !== null) {
        voterDocument.location = {
          type: "Point",
          coordinates: [resolvedLongitude, resolvedLatitude],
        };
      } else {
        geocodingStats.skipped++;
      }

      votersToInsert.push(voterDocument);

      // Log progress for large files
      if ((i + 1) % 100 === 0) {
        console.log(`📊 Processed ${i + 1}/${parsedRows.length} voters...`);
      }
    }

    console.log(`📍 Geocoding complete. Stats: ${geocodingStats.withCoordinates} had coordinates, ${geocodingStats.geocoded} geocoded, ${geocodingStats.failed} failed, ${geocodingStats.skipped} without coordinates`);

    // 🧠 Insert into MongoDB in bulk
    if (votersToInsert.length > 0) {
      try {
        await Voter.insertMany(votersToInsert, { ordered: false });
        console.log(`✅ Successfully stored ${votersToInsert.length} voters in DB.`);
      } catch (insertError) {
        console.error("⚠️ Error inserting voters:", insertError);
      }
    } else {
      console.warn("⚠️ No valid voters found in uploaded file.");
    }

    // ✅ Final response
    const votersWithCoordinates = votersToInsert.filter(v => v.location && v.location.coordinates).length;
    return res.status(201).json({
      success: true,
      message: "Campaign and voter data added successfully.",
      campaign,
      votersAdded: votersToInsert.length,
      geocodingStats: {
        total: votersToInsert.length,
        withCoordinates: votersWithCoordinates,
        withoutCoordinates: votersToInsert.length - votersWithCoordinates,
        details: {
          hadCoordinates: geocodingStats.withCoordinates,
          geocoded: geocodingStats.geocoded,
          failed: geocodingStats.failed
        }
      }
    });

  } catch (error) {
    console.error("🔥 Error in createCampaign:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating campaign.",
      error: error.message,
    });
  }
};

export const getUserCampaignsController = async (req, res) => {
  console.log("CampaignController: getUserCampaignsController started");
  try {
    const { userId } = req.query; // Expect userId as a query parameter

    if (!userId) {
      console.log("CampaignController: Missing userId for fetching campaigns");
      return res.status(400).json({
        success: false,
        message: "User ID is required to fetch campaigns",
      });
    }

    const campaignsResponse = await getCampaignsByUserIdQuery(userId);

    if (!campaignsResponse.success) {
      console.error("CampaignController: Failed to fetch campaigns for user:", campaignsResponse.message);
      return res.status(500).json({
        success: false,
        message: campaignsResponse.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "User campaigns fetched successfully",
      data: campaignsResponse.data,
    });
  } catch (error) {
    console.error("CampaignController: Error in getUserCampaignsController:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
