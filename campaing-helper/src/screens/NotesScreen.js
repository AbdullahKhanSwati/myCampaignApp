// "use client"

// import { useState } from "react"
// import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
// import { SafeAreaView } from "react-native-safe-area-context"

// export default function NotesScreen({ navigation, route }) {
//   const voter = route?.params?.voter || {
//     name: "John Smith",
//     address: "123 Main St",
//     phone: "(555) 123-4567",
//     status: "Yes",
//   }

//   const [notes, setNotes] = useState("Very supportive of education initiatives. Concerned about property taxes.")
//   const [phone, setPhone] = useState(voter.phone)
//   const [email, setEmail] = useState("john.smith@email.com")

//   const visitHistory = [
//     { date: "2024-01-15", result: "Yes", note: "Enthusiastic supporter" },
//     { date: "2024-01-08", result: "Undecided", note: "Wants to learn more about platform" },
//   ]

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Yes":
//         return { backgroundColor: "#DCFCE7", color: "#16A34A" }
//       case "No":
//         return { backgroundColor: "#FEE2E2", color: "#DC2626" }
//       case "Undecided":
//         return { backgroundColor: "#FEF3C7", color: "#D97706" }
//       default:
//         return { backgroundColor: "#F3F4F6", color: "#6B7280" }
//     }
//   }

//   const getVisitResultStyle = (result) => {
//     switch (result) {
//       case "Yes":
//         return styles.visitResultYes
//       case "No":
//         return styles.visitResultNo
//       default:
//         return styles.visitResultUndecided
//     }
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.headerContent}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Text style={styles.backButton}>← Back</Text>
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Voter Details</Text>
//         </View>
//       </View>

//       <ScrollView style={styles.scrollView}>
//         <View style={styles.voterInfoCard}>
//           <Text style={styles.voterName}>{voter.name}</Text>
//           <Text style={styles.voterAddress}>{voter.address}</Text>
//           <View style={styles.voterContactRow}>
//             <Text style={styles.voterPhone}>{voter.phone}</Text>
//             <View style={[styles.statusBadge, getStatusStyle(voter.status)]}>
//               <Text style={[styles.statusText, { color: getStatusStyle(voter.status).color }]}>{voter.status}</Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.contactInfoCard}>
//           <Text style={styles.sectionTitle}>Contact Information</Text>

//           <View style={styles.inputContainer}>
//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Phone Number</Text>
//               <TextInput style={styles.textInput} value={phone} onChangeText={setPhone} placeholder="Phone number" />
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Email Address</Text>
//               <TextInput
//                 style={styles.textInput}
//                 value={email}
//                 onChangeText={setEmail}
//                 placeholder="Email address"
//                 keyboardType="email-address"
//               />
//             </View>
//           </View>
//         </View>

//         <View style={styles.notesCard}>
//           <Text style={styles.sectionTitle}>Notes & Comments</Text>
//           <TextInput
//             style={styles.notesInput}
//             value={notes}
//             onChangeText={setNotes}
//             placeholder="Add notes about this voter..."
//             multiline
//             numberOfLines={4}
//             textAlignVertical="top"
//           />
//         </View>

//         <View style={styles.visitHistoryCard}>
//           <Text style={styles.sectionTitle}>Visit History</Text>

//           {visitHistory.map((visit, index) => (
//             <View key={index} style={styles.visitItem}>
//               <View style={styles.visitHeader}>
//                 <Text style={styles.visitDate}>{visit.date}</Text>
//                 <View style={[styles.visitResultBadge, getVisitResultStyle(visit.result)]}>
//                   <Text style={styles.visitResultText}>{visit.result}</Text>
//                 </View>
//               </View>
//               <Text style={styles.visitNote}>{visit.note}</Text>
//             </View>
//           ))}

//           <TouchableOpacity style={styles.addVisitButton}>
//             <Text style={styles.addVisitButtonText}>Add New Visit</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.saveButton}>
//           <Text style={styles.saveButtonText}>Save Changes</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F9FAFB",
//   },
//   header: {
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: 24,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//   },
//   headerContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   backButton: {
//     color: "#3B82F6",
//     fontSize: 18,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#1F2937",
//     marginLeft: 16,
//   },
//   scrollView: {
//     flex: 1,
//     paddingHorizontal: 24,
//     paddingVertical: 24,
//   },
//   voterInfoCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 24,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   voterName: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#1F2937",
//     marginBottom: 8,
//   },
//   voterAddress: {
//     color: "#6B7280",
//     marginBottom: 4,
//   },
//   voterContactRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   voterPhone: {
//     color: "#6B7280",
//     marginRight: 16,
//   },
//   statusBadge: {
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 20,
//   },
//   statusText: {
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   contactInfoCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 24,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1F2937",
//     marginBottom: 16,
//   },
//   inputContainer: {
//     gap: 16,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   inputLabel: {
//     color: "#374151",
//     fontWeight: "500",
//     marginBottom: 8,
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     color: "#1F2937",
//     fontSize: 16,
//   },
//   notesCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 24,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   notesInput: {
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     color: "#1F2937",
//     fontSize: 16,
//     minHeight: 100,
//   },
//   visitHistoryCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 24,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   visitItem: {
//     borderLeftWidth: 4,
//     borderLeftColor: "#3B82F6",
//     paddingLeft: 16,
//     marginBottom: 16,
//   },
//   visitHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 4,
//   },
//   visitDate: {
//     color: "#6B7280",
//   },
//   visitResultBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//   },
//   visitResultYes: {
//     backgroundColor: "#DCFCE7",
//   },
//   visitResultNo: {
//     backgroundColor: "#FEE2E2",
//   },
//   visitResultUndecided: {
//     backgroundColor: "#FEF3C7",
//   },
//   visitResultText: {
//     fontSize: 12,
//     fontWeight: "500",
//   },
//   visitNote: {
//     color: "#1F2937",
//   },
//   addVisitButton: {
//     backgroundColor: "#3B82F6",
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 16,
//   },
//   addVisitButtonText: {
//     color: "#FFFFFF",
//     textAlign: "center",
//     fontWeight: "500",
//   },
//   saveButton: {
//     backgroundColor: "#16A34A",
//     paddingVertical: 16,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   saveButtonText: {
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "600",
//     textAlign: "center",
//   },
// })









"use client"

import React, { useState, useEffect, useMemo } from "react"
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRoute, useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import Toast from "react-native-toast-message";
import BaseUrl from "../../BaseUrl";

export default function NotesScreen({ navigation }) {
  const route = useRoute();
  const { voter: initialVoter } = route.params || {}; // Get voter object from navigation params

  const [voter, setVoter] = useState(initialVoter)
  const [notes, setNotes] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [currentVoterId, setCurrentVoterId] = useState(null)

  // Update voter when route params change (e.g., when navigating to different voter)
  useEffect(() => {
    if (route.params?.voter) {
      setVoter(route.params.voter);
    }
  }, [route.params?.voter?._id]); // Only update if voter ID changes (new voter selected)

  // Update notes when voter changes (when navigating to different voter)
  useEffect(() => {
    if (voter && voter._id) {
      // Create a fresh copy of voter data to avoid reference issues
      const voterId = voter._id.toString();
      setCurrentVoterId(voterId);
      // Load the current notes for this specific voter
      // Ensure we're using the voter's currentNotes, not a shared reference
      const voterNotes = voter.currentNotes || "";
      setNotes(voterNotes);
    }
  }, [voter?._id, voter?.currentNotes]); // Re-run when voter ID or currentNotes changes

  // Also use focus effect to refresh when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      if (voter && voter._id) {
        const voterId = voter._id.toString();
        setCurrentVoterId(voterId);
        
        // Refresh voter data when screen comes into focus (e.g., returning from EditVoterScreen)
        const refreshVoterData = async () => {
          try {
            const campaignId = voter.campaignId?._id || voter.campaignId;
            if (!campaignId) {
              // If no campaignId, just use current voter data
              const voterNotes = voter.currentNotes || "";
              setNotes(voterNotes);
              return;
            }

            // Fetch voters without search to get all, then find by ID
            // This ensures we get the voter even if name changed
            const response = await axios.get(`${BaseUrl}/voter/getAllVoters`, {
              params: {
                campaignId: campaignId,
                limit: 1000, // Get a large number to ensure we find the voter
                page: 1
              }
            });
            
            if (response.data.success && response.data.data.voters.length > 0) {
              // Find the voter by ID
              const updatedVoter = response.data.data.voters.find(
                v => {
                  const vid = (v._id || v.id)?.toString();
                  return vid === voterId;
                }
              );
              
              if (updatedVoter) {
                // Update the voter state with fresh data from server
                setVoter(updatedVoter);
                setNotes(updatedVoter.currentNotes || "");
              } else {
                // If not found, the voter might be on a different page
                // Try with search as fallback
                try {
                  const searchResponse = await axios.get(`${BaseUrl}/voter/getAllVoters`, {
                    params: {
                      campaignId: campaignId,
                      search: `${voter.firstName || ""} ${voter.lastName || ""}`.trim(),
                      limit: 200
                    }
                  });
                  
                  if (searchResponse.data.success && searchResponse.data.data.voters.length > 0) {
                    const foundVoter = searchResponse.data.data.voters.find(
                      v => {
                        const vid = (v._id || v.id)?.toString();
                        return vid === voterId;
                      }
                    );
                    
                    if (foundVoter) {
                      setVoter(foundVoter);
                      setNotes(foundVoter.currentNotes || "");
                    }
                  }
                } catch (searchError) {
                  console.error("NotesScreen: Error in search fallback:", searchError);
                }
              }
            } else {
              // If API call fails, use current voter data
              const voterNotes = voter.currentNotes || "";
              setNotes(voterNotes);
            }
          } catch (error) {
            console.error("NotesScreen: Error refreshing voter data:", error);
            // On error, use current voter data
            const voterNotes = voter.currentNotes || "";
            setNotes(voterNotes);
          }
        };
        
        // Always refresh when screen comes into focus
        refreshVoterData();
      }
    }, [voter?._id]) // Refresh when voter ID changes
  );

  const [visitHistory] = useState(voter?.visitHistory || [
    // Default if no visit history is provided
    { date: "N/A", result: "N/A", notes: "No previous visits." },
  ]);

  // Build address from voter fields - use useMemo to recompute when voter changes
  const voterInfo = useMemo(() => {
    if (!voter) {
      return {
        name: "N/A",
        address: "N/A",
        phone: "N/A",
        email: "N/A",
        party: "N/A",
        age: "N/A",
        votingHistory: "N/A",
        status: "N/A",
      };
    }

    const buildAddress = () => {
      const parts = [];
      if (voter.streetNo) parts.push(voter.streetNo);
      if (voter.streetName) parts.push(voter.streetName);
      if (voter.aptUnit) parts.push(`Apt ${voter.aptUnit}`);
      if (voter.residenceCity) parts.push(voter.residenceCity);
      if (voter.residenceState) parts.push(voter.residenceState);
      if (voter.residenceZip) parts.push(voter.residenceZip);
      return parts.length > 0 ? parts.join(", ") : (voter.address || "N/A");
    };

    return {
      name: `${voter.firstName || ''} ${voter.lastName || ''}`.trim(),
      address: buildAddress(),
      phone: voter.phone || "N/A",
      email: voter.email || "N/A",
      party: voter.party || "N/A",
      age: voter.ageGroup || "N/A",
      votingHistory: voter.votingHistory || "N/A",
      status: voter.status || "N/A",
    };
  }, [voter]); // Recompute when voter changes

  const getResultColor = (result) => {
    switch (result) {
      case "Supportive":
        return "#DC2626" // Red for supportive
      case "Undecided":
        return "#F59E0B" // Amber for undecided
      case "Not Home":
        return "#6B7280" // Gray for not home
      case "Opposed":
        return "#7F1D1D" // Dark red for opposed
      default:
        return "#6B7280"
    }
  }

  const handleSaveNotes = async () => {
    const voterId = currentVoterId || voter?._id;
    
    if (!voterId) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Voter ID is missing.",
      });
      return;
    }

    const notesToSave = notes || "";

    try {
      setIsSaving(true);
      const response = await axios.patch(`${BaseUrl}/voter/notes/${voterId}`, {
        currentNotes: notesToSave,
      });

      if (response.data.success) {
        // Update the local voter object with the saved notes
        if (voter) {
          voter.currentNotes = notesToSave;
        }
        
        Toast.show({
          type: "success",
          text1: "Notes Saved",
          text2: `Notes saved for ${voter?.firstName || ''} ${voter?.lastName || ''}`.trim() || "Current notes have been saved successfully.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Save Failed",
          text2: response.data.message || "Could not save notes.",
        });
      }
    } catch (error) {
      console.error("NotesScreen: Error saving notes:", error);
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: error.response?.data?.message || "Failed to connect to the server.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearNotes = () => {
    setNotes("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>📝 Voter Details</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.voterCard}>
          <View style={styles.voterHeader}>
            <View style={styles.profileIcon}>
              <Text style={styles.profileIconText}>👤</Text>
            </View>
            <View style={styles.voterBasicInfo}>
              <Text style={styles.voterName}>{voterInfo.name}</Text>
              <Text style={styles.voterAddress}>📍 {voterInfo.address}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getResultColor(voterInfo.status) }]}>
                <Text style={styles.statusText}>{voterInfo.status}</Text>
              </View>
            </View>
          </View>

          <View style={styles.voterDetails}>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>📞</Text>
                <Text style={styles.detailLabel}>Phone</Text>
                <Text style={styles.detailValue}>{voterInfo.phone}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>📧</Text>
                <Text style={styles.detailLabel}>Email</Text>
                <Text style={styles.detailValue}>{voterInfo.email}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>🏛️</Text>
                <Text style={styles.detailLabel}>Party</Text>
                <Text style={voterInfo.party === "N/A" ? styles.detailValueNA : styles.detailValue}>{voterInfo.party}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>🎂</Text>
                <Text style={styles.detailLabel}>Age Group</Text>
                <Text style={voterInfo.age === "N/A" ? styles.detailValueNA : styles.detailValue}>{voterInfo.age}</Text>
              </View>
            </View>

            <View style={styles.votingHistoryContainer}>
              <Text style={styles.detailIcon}>🗳️</Text>
              <Text style={styles.detailLabel}>Voting History</Text>
              <View style={styles.votingHistoryBadge}>
                <Text style={voterInfo.votingHistory === "N/A" ? styles.votingHistoryTextNA : styles.votingHistoryText}>{voterInfo.votingHistory}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.notesCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📋</Text>
            <Text style={styles.sectionTitle}>Current Notes</Text>
          </View>

          <TextInput
            style={styles.notesInput}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add your notes about this voter..."
            placeholderTextColor="#6B7280"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          <View style={styles.notesActions}>
            <TouchableOpacity 
              style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
              onPress={handleSaveNotes}
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.saveButtonText}>💾 Save Notes</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={handleClearNotes}
              disabled={isSaving}
            >
              <Text style={styles.clearButtonText}>🗑️ Clear</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.historyCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📅</Text>
            <Text style={styles.sectionTitle}>Visit History</Text>
          </View>

          {visitHistory.map((visit, index) => (
            <View key={index} style={styles.visitItem}>
              <View style={styles.visitHeader}>
                <Text style={styles.visitDate}>📆 {visit.date}</Text>
                <View style={[styles.resultBadge, { backgroundColor: getResultColor(visit.result) }]}>
                  <Text style={styles.resultText}>{visit.result}</Text>
                </View>
              </View>
              <Text style={styles.visitNotes}>💬 {visit.notes}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.addVisitButton}>
            <Text style={styles.addVisitButtonText}>➕ Add New Visit</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.editDetailsButton}
          onPress={() => navigation.navigate("EditVoter", { voter: { ...voter } })}
        >
          <Text style={styles.editDetailsButtonText}>✏️ Edit Details</Text>
        </TouchableOpacity>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.callButton}>
            <Text style={styles.callButtonText}>📞 Call Voter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.emailButton}>
            <Text style={styles.emailButtonText}>📧 Send Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scheduleButton}>
            <Text style={styles.scheduleButtonText}>📅 Schedule Visit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827", // Dark background
  },
  header: {
    backgroundColor: "#1F2937", // Dark header
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#374151", // Dark border
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    color: "#fcefefff", // Red accent
    fontSize: 18,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F9FAFB", // Light text
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  voterCard: {
    backgroundColor: "#1F2937", // Dark background
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#374151",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  voterHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileIconText: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  voterBasicInfo: {
    flex: 1,
  },
  voterName: {
    fontSize: 22, // Larger name
    fontWeight: "bold",
    color: "#F9FAFB", // Light text
    marginBottom: 4,
  },
  voterAddress: {
    fontSize: 14,
    color: "#D1D5DB", // Light gray text
  },
  voterDetails: {
    gap: 16,
  },
  detailRow: {
    flexDirection: "row",
    gap: 16,
  },
  detailItem: {
    flex: 1,
    backgroundColor: "#374151", // Dark background
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  detailIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: "#9CA3AF", // Gray text
    marginBottom: 4,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    color: "#F9FAFB", // Light text
    fontWeight: "600",
    textAlign: "center",
  },
  detailValueNA: {
    fontSize: 14,
    color: "#6B7280", // Gray text for NA
    fontWeight: "600",
    textAlign: "center",
  },
  votingHistoryContainer: {
    backgroundColor: "#374151",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  votingHistoryBadge: {
    backgroundColor: "#931b1bff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 8,
  },
  votingHistoryText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  votingHistoryTextNA: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "bold",
  },
  notesCard: {
    backgroundColor: "#1F2937", // Dark background
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#374151",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F9FAFB", // Light text
  },
  notesInput: {
    backgroundColor: "#374151", // Dark input background
    borderWidth: 1,
    borderColor: "#4B5563", // Dark border
    borderRadius: 12,
    padding: 16,
    color: "#F9FAFB", // Light text
    fontSize: 16,
    minHeight: 120,
    marginBottom: 16,
  },
  notesActions: {
    flexDirection: "row",
    gap: 12,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#931b1bff", // Red button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#931b1bff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  clearButton: {
    backgroundColor: "#374151", // Dark gray button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4B5563",
  },
  clearButtonText: {
    color: "#D1D5DB", // Light gray text
    fontWeight: "500",
  },
  historyCard: {
    backgroundColor: "#1F2937", // Dark background
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#374151",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  visitItem: {
    backgroundColor: "#374151", // Dark background
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#4B5563",
  },
  visitHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  visitDate: {
    color: "#D1D5DB", // Light gray text
    fontSize: 14,
    fontWeight: "500",
  },
  resultBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  resultText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  visitNotes: {
    color: "#F9FAFB", // Light text
    fontSize: 14,
    lineHeight: 20,
  },
  addVisitButton: {
    backgroundColor: "#931b1bff", // Red button
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#931b1bff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  addVisitButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  actionButtonsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  callButton: {
    backgroundColor: "#931b1bff", // Red button
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#931b1bff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  callButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  emailButton: {
    backgroundColor: "#374151", // Dark gray button
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#931b1bff", // Red border
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  emailButtonText: {
    color: "#d8cdcdff", // Red text
    fontSize: 16,
    fontWeight: "600",
  },
  scheduleButton: {
    backgroundColor: "#374151", // Dark gray button
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4B5563",
  },
  scheduleButtonText: {
    color: "#D1D5DB", // Light gray text
    fontSize: 16,
    fontWeight: "500",
  },
  editDetailsButton: {
    backgroundColor: "#DC2626", // Red button
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#DC2626",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  editDetailsButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})

const getStatusColor = (status) => {
  switch (status) {
    case "Yes":
      return "#16A34A"; // Green
    case "No":
      return "#DC2626"; // Red
    case "Undecided":
      return "#CA8A04"; // Yellow
    case "Moved":
      return "#6B7280"; // Gray
    default:
      return "#6B7280";
  }
};
