import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const PRIMARY = "#21005f";
const PRIMARY_LIGHT = "#EDE8FF";
const TEXT = "#111827";
const MUTED = "#6B7280";
const BORDER = "#F0F0F5";
const BG = "#F7F8FC";
const WHITE = "#fff";
const RED = "#ff0000";

const CATEGORIES = [
  {
    id: 1,
    name: "Plumber",
    image: {
      uri: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&q=80",
    },
  },
  {
    id: 2,
    name: "Geyser Service & Repair",
    image: {
      uri: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=100&q=80",
    },
  },
  {
    id: 3,
    name: "Refrigerator",
    image: {
      uri: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=100&q=80",
    },
  },
  {
    id: 4,
    name: "Festival Lights Installation",
    image: {
      uri: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=100&q=80",
    },
  },
];

const SERVICES = [
  {
    id: 1,
    name: "Plumber consultation",
    rating: "4.73",
    reviews: "147K",
    price: "₹49",
    image: {
      uri: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=200&q=80",
    },
  },
  {
    id: 2,
    name: "Connection hose installation",
    rating: "4.79",
    reviews: "58K",
    price: "₹89",
    image: {
      uri: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200&q=80",
    },
  },
  {
    id: 3,
    name: "Shut-off valve repair",
    rating: "4.65",
    reviews: "32K",
    price: "₹129",
    image: {
      uri: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&q=80",
    },
  },
  {
    id: 4,
    name: "Pipe leak fixing",
    rating: "4.81",
    reviews: "91K",
    price: "₹199",
    image: {
      uri: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&q=80",
    },
  },
  {
    id: 5,
    name: "Tap / faucet installation",
    rating: "4.72",
    reviews: "44K",
    price: "₹149",
    image: {
      uri: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80",
    },
  },
];

export default function ServiceSearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState("Plumber");
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [addedServices, setAddedServices] = useState([]);

  const toggleAdd = (id) => {
    setAddedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };
  const isfocus = useIsFocused();
  console.log("focused", isfocus);
  const scale = useSharedValue(0.6);
  useEffect(() => {
    if (isfocus) {
      scale.value = 0.6;

      scale.value = withTiming(1, {
        duration: 600,
      });
    }
  }, [isfocus]);

  const rightAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: scale.value,
    };
  });

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <Animated.View style={[{ flex: 1 }, rightAnimation]}>
        <StatusBar barStyle="dark-content" backgroundColor={WHITE} />

        {/* Search Bar */}
        <View style={styles.topbar}>
          <View style={styles.searchBox}>
            <TouchableOpacity onPress={() => navigation?.goBack()}>
              <Text style={styles.backBtn}>←</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search services..."
              placeholderTextColor={MUTED}
            />
            {searchText.length > 0 && (
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() => setSearchText("")}
              >
                <Text style={styles.clearBtnText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Search Label + AI Suggest */}
          <View style={styles.suggestBlock}>
            <View style={styles.searchLabelRow}>
              <Text style={styles.searchIcon}>🔍</Text>
              <Text style={styles.searchLabel}>Plumber</Text>
            </View>
            <View style={styles.aiRow}>
              <Text style={styles.sparkle}>✦</Text>
              <Text style={styles.aiText}>
                Have my plumbing issues resolved fast
              </Text>
            </View>
          </View>

          {/* Categories */}
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesRow}
          >
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.catCard, isActive && styles.catCardActive]}
                  onPress={() => setSelectedCategory(cat.id)}
                  activeOpacity={0.8}
                >
                  <Image source={cat.image} style={styles.catImage} />
                  <Text
                    style={[styles.catName, isActive && styles.catNameActive]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.divider} />

          {/* Services */}
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.servicesList}>
            {SERVICES.map((svc) => {
              const isAdded = addedServices.includes(svc.id);
              return (
                <TouchableOpacity
                  key={svc.id}
                  style={styles.serviceCard}
                  activeOpacity={0.85}
                >
                  <Image source={svc.image} style={styles.svcImage} />
                  <View style={styles.svcInfo}>
                    <Text style={styles.svcName}>{svc.name}</Text>
                    <View style={styles.ratingRow}>
                      <Text style={styles.star}>★</Text>
                      <Text style={styles.ratingText}>
                        {svc.rating} ({svc.reviews} reviews)
                      </Text>
                    </View>
                    <Text style={styles.svcPrice}>{svc.price}</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.addBtn, isAdded && styles.addBtnAdded]}
                    onPress={() => toggleAdd(svc.id)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.addBtnText,
                        isAdded && styles.addBtnTextAdded,
                      ]}
                    >
                      {isAdded ? "✓ Added" : "Add"}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },
  scroll: {
    flex: 1,
  },

  // Topbar
  topbar: {
    backgroundColor: WHITE,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BG,
    borderWidth: 1.5,
    borderColor: PRIMARY_LIGHT,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  backBtn: {
    fontSize: 20,
    color: PRIMARY,
    marginRight: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: TEXT,
    padding: 0,
  },
  clearBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: MUTED,
    alignItems: "center",
    justifyContent: "center",
  },
  clearBtnText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: "700",
  },

  // AI Suggest block
  suggestBlock: {
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingBottom: 12,
  },
  searchLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  searchIcon: {
    fontSize: 15,
  },
  searchLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: TEXT,
  },
  aiRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  sparkle: {
    fontSize: 18,
    color: "#d63ecc",
    marginTop: 1,
  },
  aiText: {
    flex: 1,
    fontSize: 14,
    color: TEXT,
    lineHeight: 21,
  },

  // Section title
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: TEXT,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 10,
  },

  // Categories
  categoriesRow: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  catCard: {
    width: 82,
    backgroundColor: WHITE,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: BORDER,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 8,
  },
  catCardActive: {
    borderColor: PRIMARY,
    backgroundColor: PRIMARY_LIGHT,
  },
  catImage: {
    width: 46,
    height: 46,
    borderRadius: 10,
  },
  catName: {
    fontSize: 11,
    fontWeight: "600",
    color: TEXT,
    textAlign: "center",
    lineHeight: 15,
  },
  catNameActive: {
    color: PRIMARY,
  },

  // Divider
  divider: {
    height: 8,
    backgroundColor: BORDER,
  },

  // Services
  servicesList: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    gap: 14,
  },
  serviceCard: {
    backgroundColor: WHITE,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 14,
  },
  svcImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
  },
  svcInfo: {
    flex: 1,
  },
  svcName: {
    fontSize: 15,
    fontWeight: "700",
    color: TEXT,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 6,
  },
  star: {
    color: "#f5a623",
    fontSize: 13,
  },
  ratingText: {
    fontSize: 12,
    color: MUTED,
  },
  svcPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: PRIMARY,
  },
  addBtn: {
    borderWidth: 2,
    borderColor: PRIMARY,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
  addBtnAdded: {
    backgroundColor: PRIMARY,
  },
  addBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: PRIMARY,
  },
  addBtnTextAdded: {
    color: WHITE,
  },
});
