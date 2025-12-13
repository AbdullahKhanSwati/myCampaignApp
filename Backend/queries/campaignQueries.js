import Campaign from "../Models/CampaignModel.js";

export const createCampaignQuery = async (campaignData) => {
  try {
    const campaign = new Campaign(campaignData);
    const savedCampaign = await campaign.save();
    return {
      success: true,
      data: savedCampaign,
      message: "Campaign created successfully",
    };
  } catch (error) {
    console.error("Error in createCampaignQuery:", error);
    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
};

export const getCampaignsByUserIdQuery = async (userId) => {
  try {
    const campaigns = await Campaign.find({ userId }).sort({ createdAt: -1 });
    return {
      success: true,
      data: campaigns,
      message: "Campaigns fetched successfully",
    };
  } catch (error) {
    console.error("Error in getCampaignsByUserIdQuery:", error);
    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
};

