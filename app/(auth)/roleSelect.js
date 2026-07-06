import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustemStyles } from "../../components/Theme/custemAll";
import AppButton from "../../components/buttons/custemButton";
import { useRouter } from "expo-router";

const PRIMARY = "#21005f";
const PRIMARY_LIGHT = "#EDE8FF";
const TEXT = "#111827";
const MUTED = "#6B7280";
const BORDER = "#F0F0F5";
const BG = "#F7F8FC";
const WHITE = "#fff";

export default function RoleSelectionScreen({ navigation }) {
  const [selectedRole, setSelectedRole] = useState(null);
const router = useRouter()
  const handleContinue = () => {
    if (!selectedRole) return;
    if (selectedRole === "provider") {
      router.push("/providerDetails");
    } else {
      router.push("/home");
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor={WHITE} />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={CustemStyles.TITLE}>
            How would you like{"\n"}to use the app?
          </Text>
          <Text style={CustemStyles.SUBTITLE}>
            Choose your role to continue
          </Text>
        </View>

        {/* Role Cards */}
        <View style={styles.cardsRow}>
          {/* Customer */}
          <TouchableOpacity
            style={[
              styles.roleCard,
              selectedRole === "customer" && styles.roleCardActive,
            ]}
            onPress={() => setSelectedRole("customer")}
            activeOpacity={0.85}
          >
            {selectedRole === "customer" && <View style={styles.selectedDot} />}
            <View
              style={[
                styles.iconCircle,
                selectedRole === "customer" && styles.iconCircleActive,
              ]}
            >
              <Text style={styles.iconEmoji}>🏠</Text>
            </View>
            <Text
              style={[
                styles.roleTitle,
                selectedRole === "customer" && styles.roleTitleActive,
              ]}
            >
              Book Services
            </Text>
            <Text style={styles.roleDesc}>
              Find and book trusted professionals near you
            </Text>
          </TouchableOpacity>

          {/* Provider */}
          <TouchableOpacity
            style={[
              styles.roleCard,
              selectedRole === "provider" && styles.roleCardActive,
            ]}
            onPress={() => setSelectedRole("provider")}
            activeOpacity={0.85}
          >
            {selectedRole === "provider" && <View style={styles.selectedDot} />}
            <View
              style={[
                styles.iconCircle,
                selectedRole === "provider" && styles.iconCircleActive,
              ]}
            >
              <Text style={styles.iconEmoji}>🔧</Text>
            </View>
            <Text
              style={[
                styles.roleTitle,
                selectedRole === "provider" && styles.roleTitleActive,
              ]}
            >
              Provide Services
            </Text>
            <Text style={styles.roleDesc}>
              Offer your skills and earn money
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }} />

        {/* CTA */}
        <AppButton
          title={
            selectedRole === "provider"
              ? "Continue & Setup Profile"
              : "Continue"
          }
          disabled={!selectedRole}
          onPress={handleContinue}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: WHITE },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 20,
  },

  cardsRow: { gap: 14 },
  roleCard: {
    // flex: 1,
    backgroundColor: BG,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CustemStyles.INPUT_BORDER.bordersCol,
    padding: 16,
    alignItems: "center",
    position: "relative",
  },
  roleCardActive: { borderColor: PRIMARY, backgroundColor: PRIMARY_LIGHT },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: BORDER,
  },
  iconCircleActive: { borderColor: PRIMARY },
  iconEmoji: { fontSize: 26 },
  roleTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: TEXT,
    textAlign: "center",
    marginBottom: 6,
  },
  roleTitleActive: { color: PRIMARY },
  roleDesc: { fontSize: 12, color: MUTED, textAlign: "center", lineHeight: 17 },
  selectedDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 15,
    height: 15,
    borderRadius: 20,
    backgroundColor: PRIMARY,
  },

  ctaBtnDisabled: { backgroundColor: BORDER },
  ctaText: { color: WHITE, fontSize: 16, fontWeight: "700" },
});
