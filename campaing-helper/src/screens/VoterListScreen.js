"use client"

import { useEffect, useState, useCallback } from "react"
import { ActivityIndicator, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import axios from "axios";
import Toast from "react-native-toast-message";
import { useRoute, useFocusEffect } from '@react-navigation/native';
import BaseUrl from "../../BaseUrl.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VoterListScreen({ navigation }) {
  const [searchText, setSearchText] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [voters, setVoters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalVoters, setTotalVoters] = useState(0)
  const [campaignId, setCampaignId] = useState(null)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [statusModalVisible, setStatusModalVisible] = useState(false)
  const [selectedVoter, setSelectedVoter] = useState(null)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [selectedVolunteerRoute, setSelectedVolunteerRoute] = useState(null)
  const [isVolunteer, setIsVolunteer] = useState(false)
  // const [userCampaigns, setUserCampaigns] = useState([]) // No longer needed
  // const [loadingCampaigns, setLoadingCampaigns] = useState(true) // No longer needed

  const route = useRoute();

  const STATUS_OPTIONS = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
    { label: "Moved", value: "moved" },
    { label: "Undecided", value: "undecided" }
  ]
  // const routeCampaignId = route.params?.campaignId; // No longer prioritizing route param

  const filters = ["All", "Yes", "No", "Undecided", "Moved"]
  const ITEMS_PER_PAGE = 20;
 

  // Removed fetchUserCampaigns function and related states

  // Effect to load campaignId and selected volunteer route from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedCampaignData = await AsyncStorage.getItem('currentCampaign');
        const volunteerStatus = await AsyncStorage.getItem("isVolunteer");
        
        // User is volunteer if: marked as volunteer AND has no campaign
        const userIsVolunteer = volunteerStatus === "true" && !storedCampaignData;
        setIsVolunteer(userIsVolunteer);
        
        if (storedCampaignData) {
          const campaign = JSON.parse(storedCampaignData);
          setCampaignId(campaign._id);
          console.log('VoterListScreen: Campaign ID loaded from AsyncStorage:', campaign._id);
        } else {
          // Check for selected volunteer route
          const selectedRoute = await AsyncStorage.getItem('selectedVolunteerRoute');
          if (selectedRoute) {
            const routeData = JSON.parse(selectedRoute);
            setSelectedVolunteerRoute(routeData);
            setCampaignId(routeData.campaignId); // Set campaignId from route
            console.log('VoterListScreen: Selected volunteer route:', routeData);
          } else {
            // Volunteer but no route selected
            if (userIsVolunteer) {
              setError("Please select a route from Account Sharing to view voters.");
              setLoading(false);
              setVoters([]);
              return;
            } else {
              setError("No active campaign found in storage.");
              setLoading(false);
              Toast.show({
                type: "info",
                text1: "No Active Campaign",
                text2: "Please create a campaign first.",
              });
              navigation.navigate("Onboarding");
            }
          }
        }
      } catch (storageError) {
        console.error("VoterListScreen: Error reading AsyncStorage:", storageError);
        setError("Failed to retrieve campaign data.");
        setLoading(false);
        Toast.show({
          type: "error",
          text1: "Storage Error",
          text2: "Failed to load campaign data.",
        });
        navigation.navigate("Onboarding");
      }
    };
    loadData();
  }, []); // Run once on component mount

  // Refresh selected route when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const checkRoute = async () => {
        try {
          const storedCampaign = await AsyncStorage.getItem('currentCampaign');
          const volunteerStatus = await AsyncStorage.getItem("isVolunteer");
          const userIsVolunteer = volunteerStatus === "true" && !storedCampaign;
          setIsVolunteer(userIsVolunteer);
          
          const selectedRoute = await AsyncStorage.getItem('selectedVolunteerRoute');
          if (selectedRoute) {
            const routeData = JSON.parse(selectedRoute);
            setSelectedVolunteerRoute(routeData);
            const routeCampaignId = routeData.campaignId;
            if (routeCampaignId && (!campaignId || campaignId !== routeCampaignId)) {
              setCampaignId(routeCampaignId);
            }
          } else {
            setSelectedVolunteerRoute(null);
            // If volunteer and no route selected, clear voters
            if (userIsVolunteer) {
              setVoters([]);
              setError("Please select a route from Account Sharing to view voters.");
              setLoading(false);
            }
          }
        } catch (error) {
          console.error("Error checking selected route:", error);
        }
      };
      checkRoute();
    }, [campaignId])
  );

  // Fetch voters from API (only if campaignId is available)
  const fetchVoters = async ({ pageParam = 1, append = false } = {}) => {
    // If volunteer and no route selected, don't fetch
    if (isVolunteer && !selectedVolunteerRoute) {
      setVoters([]);
      setLoading(false);
      setError("Please select a route from Account Sharing to view voters.");
      return;
    }
    
    if (!campaignId) {
      setLoading(false);
      return;
    }

    if (append) {
      setIsFetchingMore(true);
    } else {
      setLoading(true);
      if (pageParam === 1) {
        setVoters([]);
      }
    }

    setError(null);
    
    try {
      let fetchedVoters = [];
      
      // If a volunteer route is selected, fetch voters filtered by route
      if (selectedVolunteerRoute?.routeId) {
        try {
          // Use campaignId from selected route (from volunteer assignment)
          const routeCampaignId = selectedVolunteerRoute.campaignId || campaignId;
          
          if (!routeCampaignId) {
            setVoters([]);
            setLoading(false);
            setError("Campaign ID not found for selected route.");
            return;
          }
          
          // Fetch voters filtered by routeId (backend handles the filtering)
          const statusFilter = selectedFilter === "All" ? "" : selectedFilter.toLowerCase();
          const response = await axios.get(`${BaseUrl}/voter/getAllVoters`, {
            params: {
              campaignId: routeCampaignId, // Use campaignId from route assignment
              routeId: selectedVolunteerRoute.routeId, // Backend filters by route
              page: pageParam,
              limit: ITEMS_PER_PAGE,
              status: statusFilter,
              search: searchText,
              sortBy: "createdAt",
              sortOrder: "desc",
            },
          });

          if (response.data.success) {
            fetchedVoters = response.data.data.voters || [];
            const pagination = response.data.data.pagination || {};
            setTotalVoters(pagination.totalCount ?? fetchedVoters.length);
            setHasNextPage(pagination.hasNextPage ?? false);
          }
        } catch (routeError) {
          console.error("Error fetching voters for route:", routeError);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to load voters for selected route",
          });
        }
      } else {
        // Normal fetch for all voters
        const statusFilter = selectedFilter === "All" ? "" : selectedFilter.toLowerCase();
        const response = await axios.get(`${BaseUrl}/voter/getAllVoters`, {
          params: {
            campaignId,
            page: pageParam,
            limit: ITEMS_PER_PAGE,
            status: statusFilter,
            search: searchText,
            sortBy: "createdAt",
            sortOrder: "desc",
          },
        });

        if (response.data.success) {
          const pagination = response.data.data.pagination || {};
          fetchedVoters = response.data.data.voters || [];
          
          setTotalVoters(pagination.totalCount ?? response.data.data.totalCount ?? fetchedVoters.length);
          setHasNextPage(pagination.hasNextPage ?? fetchedVoters.length === ITEMS_PER_PAGE);
        }
      }

      setVoters((prevVoters) => {
        if (!append) {
          return fetchedVoters;
        }

        const seenIds = new Set(prevVoters.map((voter) => voter._id ?? voter.id));
        const merged = [...prevVoters];

        fetchedVoters.forEach((voter) => {
          const voterId = voter._id ?? voter.id;
          if (!voterId || !seenIds.has(voterId)) {
            merged.push(voter);
            if (voterId) {
              seenIds.add(voterId);
            }
          }
        });

        return merged;
      });

      if (selectedVolunteerRoute) {
        setTotalVoters(fetchedVoters.length);
        setHasNextPage(false); // No pagination for filtered route
      }

      setPage(pageParam);

      if (!append) {
        Toast.show({
          type: "success",
          text1: "Voters Loaded!",
          text2: selectedVolunteerRoute 
            ? `Fetched ${fetchedVoters.length} voters from ${selectedVolunteerRoute.routeName}`
            : `Fetched ${fetchedVoters.length} voters.`,
        });
      }
    } catch (err) {
      console.error("VoterListScreen: Error fetching voters:", err);
      setError(err.response?.data?.message || "Network error occurred.");
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: err.response?.data?.message || "Failed to connect to the server.",
      });
    } finally {
      if (append) {
        setIsFetchingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  // Effect to fetch voters whenever campaignId, selected route, or other filters change
  useEffect(() => {
    if (campaignId) {
      // Small delay to ensure state is updated
      const timer = setTimeout(() => {
        fetchVoters({ pageParam: 1, append: false });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [campaignId, selectedFilter, searchText, selectedVolunteerRoute]);

  useEffect(() => {
    if (!campaignId) {
      return;
    }

    setPage(1);
  }, [campaignId, selectedFilter, searchText]);

  const formatStatus = (status) => {
    if (!status) return "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleStatusUpdate = async (voterId, newStatus) => {
    try {
      const response = await axios.patch(`${BaseUrl}/voter/status/${voterId}`, {
        status: newStatus,
      });

      if (response.data.success) {
        setVoters((prevVoters) =>
          prevVoters.map((voter) =>
            voter._id === voterId ? { ...voter, status: newStatus } : voter
          )
        );

        Toast.show({
          type: "success",
          text1: "Status Updated",
          text2: `Marked as ${formatStatus(newStatus)}.`,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Update Failed",
          text2: response.data.message || "Could not update voter status.",
        });
      }
    } catch (error) {
      console.error("VoterListScreen: Error updating voter status:", error);
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: error.response?.data?.message || "Failed to connect to the server.",
      });
    }
  };

  const openStatusModal = (voter) => {
    setSelectedVoter(voter);
    setStatusModalVisible(true);
  };

  const closeStatusModal = () => {
    setSelectedVoter(null);
    setStatusModalVisible(false);
  };

  const handleModalStatusUpdate = async (newStatus) => {
    if (!selectedVoter || !newStatus) {
      return;
    }

    try {
      setIsUpdatingStatus(true);
      await handleStatusUpdate(selectedVoter._id, newStatus);
      closeStatusModal();
    } catch (error) {
      console.error("VoterListScreen: Error in modal status update:", error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };


  const getStatusStyle = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case "yes":
        return { backgroundColor: "#DCFCE7", color: "#16A34A" }
      case "no":
        return { backgroundColor: "#FEE2E2", color: "#DC2626" }
      case "undecided":
        return { backgroundColor: "#FEF3C7", color: "#CA8A04" }
      case "moved":
        return { backgroundColor: "#F3F4F6", color: "#6B7280" }
      default:
        return { backgroundColor: "#F3F4F6", color: "#6B7280" }
    }
  }

  const renderVoter = ({ item }) => {
    const statusStyle = getStatusStyle(item.status);

    return (
      <View style={styles.voterCard}>
        <View style={styles.voterHeader}>
          <View style={styles.voterInfo}>
            <TouchableOpacity onPress={() => openStatusModal(item)} activeOpacity={0.7}>
              <Text style={styles.voterName}>{item.firstName} {item.lastName}</Text>
            </TouchableOpacity>
            <Text style={styles.voterAddress}>{item.address}</Text>
            <Text style={styles.voterPhone}>{item.phone}</Text>
          </View>
          <View style={[styles.statusBadge, statusStyle]}>
            <Text style={[styles.statusText, { color: statusStyle.color }]}>{formatStatus(item.status)}</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.yesButton]}
            activeOpacity={0.8}
            onPress={() => handleStatusUpdate(item._id, "yes")}
          >
            <Text style={styles.actionButtonText}>✓ Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.noButton]}
            activeOpacity={0.8}
            onPress={() => handleStatusUpdate(item._id, "no")}
          >
            <Text style={styles.actionButtonText}>✗ No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.undecidedButton]}
            activeOpacity={0.8}
            onPress={() => handleStatusUpdate(item._id, "undecided")}
          >
            <Text style={styles.actionButtonText}>? Undecided</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.movedButton]}
            activeOpacity={0.8}
            onPress={() => handleStatusUpdate(item._id, "moved")}
          >
            <Text style={styles.actionButtonText}>→ Moved</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.notesButton]}
            onPress={() => navigation.navigate("Notes", { voter: { ...item } })}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>📝 Notes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleLoadMore = () => {
    if (!loading && !isFetchingMore && hasNextPage) {
      fetchVoters({ pageParam: page + 1, append: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Voter List</Text>
        </View>
        {selectedVolunteerRoute && (
          <View style={styles.routeIndicator}>
            <Text style={styles.routeIndicatorText}>
              📍 Viewing: {selectedVolunteerRoute.routeName}
            </Text>
          </View>
        )}

        {/* Search */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search voters..."
          placeholderTextColor="#6B7280" // Updated placeholder color
          value={searchText}
          onChangeText={setSearchText}
        />

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filtersContainer}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter ? styles.filterButtonActive : styles.filterButtonInactive,
                ]}
                onPress={() => setSelectedFilter(filter)}
                activeOpacity={0.8} // Added active opacity
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedFilter === filter ? styles.filterButtonTextActive : styles.filterButtonTextInactive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#DC2626" />
          <Text style={styles.loadingText}>
            Loading voters...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          {isVolunteer && !selectedVolunteerRoute && (
            <TouchableOpacity
              style={styles.selectRouteButton}
              onPress={() => navigation.navigate("AccountSharing")}
            >
              <Text style={styles.selectRouteButtonText}>Go to Account Sharing</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : voters.length === 0 && isVolunteer && !selectedVolunteerRoute ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Please select a route from Account Sharing to view voters.</Text>
          <TouchableOpacity
            style={styles.selectRouteButton}
            onPress={() => navigation.navigate("AccountSharing")}
          >
            <Text style={styles.selectRouteButtonText}>Go to Account Sharing</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={voters}
          renderItem={renderVoter}
          keyExtractor={(item, index) => {
            const key = item._id ?? item.id;
            return key ? key.toString() : `index-${index}`;
          }}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            isFetchingMore ? (
              <View style={styles.listFooter}>
                <ActivityIndicator size="small" color="#DC2626" />
              </View>
            ) : null
          }
        />
      )}

      <Modal
        visible={statusModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeStatusModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Status</Text>
            {selectedVoter && (
              <Text style={styles.modalSubtitle}>
                {selectedVoter.firstName} {selectedVoter.lastName}
              </Text>
            )}

            <View style={styles.statusOptionsContainer}>
              {STATUS_OPTIONS.map((option) => {
                const isActive = selectedVoter?.status?.toLowerCase() === option.value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[styles.statusOption, isActive && styles.statusOptionActive]}
                    onPress={() => handleModalStatusUpdate(option.value)}
                    disabled={isUpdatingStatus}
                  >
                    <Text style={[styles.statusOptionText, isActive && styles.statusOptionTextActive]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={closeStatusModal}
              disabled={isUpdatingStatus}
            >
              <Text style={styles.modalCloseButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827", // Darker background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#FFFFFF",
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    color: "#DC2626",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  selectRouteButton: {
    backgroundColor: "#931b1bff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  selectRouteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    backgroundColor: "#1F2937", // Dark header
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#374151", // Dark border
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    color: "#f5f3f3ff", // Red back button
    fontSize: 18,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF", // White text
    marginLeft: 16,
  },
  routeIndicator: {
    backgroundColor: "#931b1bff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  routeIndicatorText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#374151", // Dark border
    backgroundColor: "#374151", // Dark background
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#FFFFFF", // White text
    marginBottom: 16,
    fontSize: 16,
  },
  filtersContainer: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1, // Added border
  },
  filterButtonActive: {
    backgroundColor: "#DC2626", // Red active filter
    borderColor: "#DC2626",
  },
  filterButtonInactive: {
    backgroundColor: "transparent", // Transparent inactive
    borderColor: "#6B7280",
  },
  filterButtonText: {
    fontWeight: "500",
  },
  filterButtonTextActive: {
    color: "#FFFFFF",
  },
  filterButtonTextInactive: {
    color: "#9CA3AF", // Gray inactive text
  },
  listContainer: {
    padding: 16,
  },
  listFooter: {
    paddingVertical: 16,
    alignItems: "center",
  },
  voterCard: {
    backgroundColor: "#1F2937", // Dark card background
    borderRadius: 12, // More rounded corners
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#374151", // Dark border
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  voterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12, // More spacing
  },
  voterInfo: {
    flex: 1,
  },
  voterName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#DC2626", // Red text to indicate it's clickable
    marginBottom: 4,
    textDecorationLine: "underline",
  },
  voterAddress: {
    color: "#9CA3AF", // Gray text
    fontSize: 16,
    marginBottom: 2,
  },
  voterPhone: {
    color: "#9CA3AF", // Gray text
    fontSize: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6, // More padding
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600", // Bolder text
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    flexWrap: "wrap", // Allow wrapping
  },
  actionButton: {
    flex: 1,
    minWidth: 80, // Minimum width
    paddingHorizontal: 12,
    paddingVertical: 10, // More padding
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  yesButton: {
    backgroundColor: "#16A34A",
  },
  noButton: {
    backgroundColor: "#DC2626",
  },
  undecidedButton: {
    backgroundColor: "#CA8A04",
  },
  movedButton: {
    backgroundColor: "#6B7280",
  },
  notesButton: {
    backgroundColor: "#DC2626", // Red notes button
    flex: 0,
    paddingHorizontal: 16,
  },
  actionButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600", // Bolder text
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#374151",
  },
  modalTitle: {
    color: "#F9FAFB",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  modalSubtitle: {
    color: "#D1D5DB",
    marginBottom: 16,
    fontSize: 16,
  },
  statusOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statusOption: {
    flexGrow: 1,
    flexBasis: "45%",
    backgroundColor: "#111827",
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#374151",
    alignItems: "center",
  },
  statusOptionActive: {
    borderColor: "#DC2626",
    backgroundColor: "#7F1D1D",
  },
  statusOptionText: {
    color: "#E5E7EB",
    fontWeight: "500",
    fontSize: 15,
  },
  statusOptionTextActive: {
    color: "#FCD34D",
    fontWeight: "600",
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: "#374151",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  modalCloseButtonText: {
    color: "#E5E7EB",
    fontWeight: "600",
  },
})
