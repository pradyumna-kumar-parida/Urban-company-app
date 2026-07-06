import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  Ionicons,
  Fontisto,
  MaterialIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import Animated, { FadeInRight } from "react-native-reanimated";
const PRIMARY = "#21005f";
const PRIMARY_LIGHT = "#EDE8FF";
const TEXT = "#111827";
const MUTED = "#6B7280";
const BORDER = "#F0F0F5";
const BG = "#F7F8FC";
const WHITE = "#fff";
const RED = "#ff0000";

const QUICK_ACTIONS = [
  {
    id: "1",
    icon: "address-book-o",
    type: "FontAwesome",
    label: "My Bookings",
  },
  {
    id: "2",
    icon: "phone-portrait-outline",
    type: "Ionicons",
    label: "My Devices",
  },
  {
    id: "3",
    icon: "support-agent",
    type: "MaterialIcons",
    label: "Help & Support",
  },
];
const MENU_ITEMS = [
  { id: "1", icon: "profile", type: "AntDesign", label: "My Plans" },
  {
    id: "2",
    icon: "wallet-outline",
    type: "Ionicons",
    label: "Wallet",
    // badge: "₹0",
  },
  {
    id: "3",
    icon: "workspace-premium",
    type: "MaterialIcons",
    label: "Plus Membership",
  },
  { id: "4", icon: "star-o", type: "FontAwesome", label: "My Rating" },
  {
    id: "5",
    icon: "location-outline",
    type: "Ionicons",
    label: "Manage Addresses",
  },
  {
    id: "6",
    icon: "card-outline",
    type: "Ionicons",
    label: "Manage Payment Methods",
  },
  { id: "7", icon: "settings-outline", type: "Ionicons", label: "Settings" },
];

const renderIcon = (type, name, size = 20, color = "#000") => {
  switch (type) {
    case "AntDesign":
      return <AntDesign name={name} size={size} color={color} />;
    case "Ionicons":
      return <Ionicons name={name} size={size} color={color} />;
    case "Fontisto":
      return <Fontisto name={name} size={size} color={color} />;
    case "MaterialIcons":
      return <MaterialIcons name={name} size={size} color={color} />;
    case "FontAwesome":
      return <FontAwesome name={name} size={size} color={color} />;
    case "Entypo":
      return <Entypo name={name} size={size} color={color} />;
    default:
      return null;
  }
};
export default function ProfileScreen() {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <Animated.View entering={FadeInRight.duration(300)}>
        <StatusBar barStyle="dark-content" backgroundColor={PRIMARY} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* ── HEADER CARD ───────────────────────── */}
          <View style={s.headerCard}>
            {/* Avatar + Info */}
            <View style={s.profileRow}>
              <View style={s.avatarWrap}>
                <View style={s.avatar}>
                  <Text style={s.avatarTxt}>VK</Text>
                </View>
                <View style={s.verifiedDot} />
              </View>
              <View style={s.profileInfo}>
                <Text style={s.profileName}>Verified Customer</Text>
                <Text style={s.profilePhone}>+91 82607 28321</Text>
              </View>
              {/*  <TouchableOpacity style={s.editBtn}>
              <Text style={s.editTxt}>Complete</Text>
            </TouchableOpacity> */}
            </View>

            {/* Quick Actions */}
            <View style={s.quickRow}>
              {QUICK_ACTIONS.map((q) => (
                <TouchableOpacity
                  key={q.id}
                  style={s.quickItem}
                  activeOpacity={0.8}
                >
                  <View style={s.quickIconBox}>
                    <Text style={s.quickIcon}>
                      {renderIcon(q.type, q.icon, 25, "#fff")}
                    </Text>
                  </View>
                  <Text style={s.quickLabel}>{q.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* ── MENU LIST ─────────────────────────── */}
          <View style={s.menuCard}>
            {MENU_ITEMS.map((item, idx) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  s.menuRow,
                  idx === MENU_ITEMS.length - 1 && { borderBottomWidth: 0 },
                ]}
                activeOpacity={0.7}
              >
                <View style={s.menuIconBox}>
                  <Text style={s.menuIcon}>
                    {renderIcon(item.type, item.icon, 18, PRIMARY)}
                  </Text>
                </View>
                <Text style={s.menuLabel}>{item.label}</Text>
                {item.badge ? (
                  <View style={s.badgeWrap}>
                    <Text style={s.badgeTxt}>{item.badge}</Text>
                  </View>
                ) : null}
                <Text style={s.menuArrow}>
                  <Entypo name="chevron-small-right" size={20} />
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ── REFER CARD ────────────────────────── */}
          <View style={s.referCard}>
            <View style={s.referLeft}>
              <Text style={s.referTitle}>Refer & earn ₹100</Text>
              <Text style={s.referSub}>
                Get ₹100 when your friend completes their first booking
              </Text>
              <TouchableOpacity style={s.referBtn} activeOpacity={0.85}>
                <Text style={s.referBtnTxt}>Refer now</Text>
              </TouchableOpacity>
            </View>
            <Text style={s.referEmoji}>
              <Image
                source={require("../../assets/images/rewards.webp")}
                style={s.rewards}
              />
            </Text>
          </View>

          {/* ── LOGOUT ────────────────────────────── */}
          <TouchableOpacity style={s.logoutBtn} activeOpacity={0.85}>
            <Text style={s.logoutTxt}>Logout</Text>
          </TouchableOpacity>

          {/* Version */}
          <Text style={s.version}>Version 1.0.0</Text>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },

  // ── HEADER
  headerCard: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 18,
    paddingTop: 30,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    elevation: 6,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    marginBottom: 14,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatarWrap: {
    position: "relative",
    marginRight: 14,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.35)",
  },
  avatarTxt: {
    fontSize: 20,
    fontWeight: "800",
    color: WHITE,
    letterSpacing: 1,
  },
  verifiedDot: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4ADE80",
    borderWidth: 2,
    borderColor: PRIMARY,
  },
  profileInfo: { flex: 1 },
  profileName: {
    fontSize: 18,
    fontWeight: "800",
    color: WHITE,
    letterSpacing: -0.2,
    marginBottom: 3,
  },
  profilePhone: {
    fontSize: 13,
    color: "rgba(255,255,255,0.65)",
    fontWeight: "500",
  },
  editBtn: {
    backgroundColor: WHITE,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  editTxt: {
    fontSize: 13,
    fontWeight: "700",
    color: PRIMARY,
  },

  // Quick Actions
  quickRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    paddingVertical: 22,
  },
  quickItem: { alignItems: "center", flex: 1 },
  quickIconBox: {
    // width: 48,
    // height: 48,
    borderRadius: 14,
    // backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    marginBottom: 7,
  },
  quickIcon: { fontSize: 28 },
  quickLabel: {
    fontSize: 11,
    fontWeight: "400",
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
  },

  // ── MENU
  menuCard: {
    backgroundColor: WHITE,
    marginHorizontal: 14,
    borderRadius: 18,
    paddingHorizontal: 4,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: PRIMARY_LIGHT,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  rewards: {
    height: 100,
    width: 100,
  },
  menuIcon: { fontSize: 17 },
  menuLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: "400",
    color: TEXT,
  },
  menuArrow: {
    fontSize: 22,
    color: "#C4C9D4",
    fontWeight: "300",
  },
  badgeWrap: {
    backgroundColor: PRIMARY_LIGHT,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 8,
  },
  badgeTxt: {
    fontSize: 11,
    fontWeight: "700",
    color: PRIMARY,
  },

  // ── REFER
  referCard: {
    backgroundColor: PRIMARY_LIGHT,
    marginHorizontal: 14,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D4C8FF",
  },
  referLeft: { flex: 1 },
  referTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: PRIMARY,
    marginBottom: 5,
  },
  referSub: {
    fontSize: 11,
    color: "#5B4899",
    lineHeight: 17,
    marginBottom: 14,
  },
  referBtn: {
    backgroundColor: PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: "flex-start",
  },
  referBtnTxt: {
    fontSize: 12,
    fontWeight: "700",
    color: WHITE,
  },
  referEmoji: { marginLeft: 8 },

  // ── LOGOUT
  logoutBtn: {
    marginHorizontal: 14,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ff0000",
    backgroundColor: "#fce1e1a6",
    marginBottom: 14,
  },
  logoutTxt: {
    fontSize: 14,
    fontWeight: "400",
    color: RED,
  },

  version: {
    textAlign: "center",
    fontSize: 12,
    color: "#C0C6D4",
    fontWeight: "500",
    paddingBottom: 15,
  },
});
