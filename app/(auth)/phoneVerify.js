import { AntDesign, Feather, MaterialDesignIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustemStyles } from "../../components/Theme/custemAll";
import AppButton from "../../components/buttons/custemButton";
export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const isValid = phone.length === 10;

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Skip */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.skipBtn}
          onPress={() => router.push("/location")}
        >
          <Text style={styles.skipTxt}>Skip</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.body}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Icon */}
        <View style={styles.iconWrap}>
          <Image
            source={require("../../assets/images/mobile-logo.png")}
            style={styles.phonelogo}
          />
        </View>

        {/* Title */}
        <Text style={CustemStyles.TITLE}>Enter your phone number</Text>
        <Text style={CustemStyles.SUBTITLE}>
          We'll send you a text with a verification code.{"\n"}
          Standard tariff may apply.
        </Text>

        {/* Input Row */}
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.countryBox}>
            <Text style={styles.countryCode}>+91</Text>
            <Text style={styles.chevron}>
              <AntDesign name="caret-down" size={10} color="#9AA0AC" />
            </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.phoneInput}
            placeholder="Phone number"
            placeholderTextColor="#B0B8C5"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* Character hint */}
        {phone.length > 0 && phone.length < 10 && (
          <Text style={styles.hint}>
            {10 - phone.length} more digits needed
          </Text>
        )}
      </KeyboardAvoidingView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.termsText}>
          By continuing, you agree to our{" "}
          <Text style={styles.link}>Terms & Conditions</Text> and{" "}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
        <AppButton
          title="Continue"
          disabled={!isValid}
          onPress={() => router.push("/otp")}
          style={{ marginBottom: "10" }}
        />
        <TouchableOpacity
          style={styles.button}
          //   onPress={onPress}
          activeOpacity={0.85}
        >
          <View style={styles.content}>
            <Image
              source={require("../../assets/images/google.png")}
              style={styles.icon}
            />
            <Text style={styles.text}>Continue with Google</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const TEXT = "#1A1A2E";
const MUTED = "#8A94A6";
const BORDER = "#7c7c7c33";
const BG = "#F7F9FC";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Header
  header: {
    alignItems: "flex-end",
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 0.4,
    borderBottomColor: BORDER,
  },
  skipBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: CustemStyles.INPUT_BORDER.bordersCol,
    backgroundColor: "#fff",
  },
  skipTxt: {
    fontSize: 12,
    fontWeight: "600",
    color: TEXT,
  },

  // Body
  body: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },

  // Icon
  iconWrap: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  phonelogo: {
    height: 80,
    width: 70,
  },
  subtitle: {
    fontSize: 12,
    color: MUTED,
    lineHeight: 21,
    marginBottom: 32,
  },

  // Input
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: CustemStyles.INPUT_BORDER.bordersCol,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: CustemStyles.INPUT.background,
  },
  countryBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRightWidth: 1,
    borderRightColor: BORDER,
    gap: 5,
  },

  countryCode: {
    fontSize: 12,
    fontWeight: "700",
    color: TEXT,
  },
  chevron: { fontSize: 13, color: MUTED },
  phoneInput: {
    flex: 1,
    fontSize: 14,
    color: TEXT,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontWeight: "500",
  },
  hint: {
    fontSize: 11,
    color: CustemStyles.PRIMARY.background,
    marginTop: 7,
    marginLeft: 4,
    fontWeight: "600",
  },

  // Footer
  footer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    paddingTop: 12,
  },
  termsText: {
    fontSize: 11,
    color: MUTED,
    lineHeight: 18,
    marginBottom: 14,
  },
  link: {
    color: TEXT,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  button: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#f5f3f396",
    borderWidth: 1,
    borderColor: "#0000003f",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  icon: {
    width: 20,
    height: 20,
  },

  text: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000000",
  },
});
