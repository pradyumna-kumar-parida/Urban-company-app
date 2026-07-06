import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
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
import AppButton from "../../components/buttons/custemButton";
import { CustemStyles } from "../../components/Theme/custemAll";
import { Ionicons } from "@expo/vector-icons";

const OTP_LENGTH = 4;

export default function OtpScreen() {
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [seconds, setSeconds] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const refs = [ref0, ref1, ref2, ref3];

  const timerRef = useRef(null);

  const isValid = otp.every((d) => d !== "");

  useEffect(() => {
    startTimer(30);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function startTimer(from) {
    if (timerRef.current) clearInterval(timerRef.current);
    setSeconds(from);
    setCanResend(false);
    let s = from;
    timerRef.current = setInterval(() => {
      s = s - 1;
      setSeconds(s);
      if (s <= 0) {
        clearInterval(timerRef.current);
        setCanResend(true);
      }
    }, 1000);
  }

  function handleChange(text, index) {
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < OTP_LENGTH - 1) {
      refs[index + 1].current.focus();
    }
  }

  function handleKeyPress(key, index) {
    if (key === "Backspace" && otp[index] === "" && index > 0) {
      const next = [...otp];
      next[index - 1] = "";
      setOtp(next);
      refs[index - 1].current.focus();
    }
  }

  function handleResend() {
    setOtp(["", "", "", ""]);
    const nextTime = resendCount >= 1 ? 20 : 30;
    setResendCount(resendCount + 1);
    startTimer(nextTime);
    setTimeout(() => {
      refs[0].current.focus();
    }, 100);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={18} color={TEXT} />
          <Text style={styles.backTxt}>Back</Text>
        </TouchableOpacity>
      </View> */}

      <KeyboardAvoidingView
        style={styles.body}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Title */}
        <Text style={CustemStyles.TITLE}>Verify your number</Text>
        <Text style={CustemStyles.SUBTITLE}>
          We sent a 4-digit code to{"\n"}
          <Text style={styles.phone}>+91 98765 43210</Text>
        </Text>

        {/* OTP Boxes */}
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={refs[index]}
              style={[styles.otpBox, digit !== "" && styles.otpBoxFilled]}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(nativeEvent.key, index)
              }
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Timer */}
        <View style={styles.timerBadge}>
          <Text style={styles.timerText}>
            {canResend ? "OTP expired" : "OTP expires in " + seconds + "s"}
          </Text>
        </View>
      </KeyboardAvoidingView>

      {/* Footer */}
      <View style={styles.footer}>
        <AppButton
          title="Verify OTP"
          disabled={!isValid}
          onPress={() => router.push("/roleSelect")}
        />

        <View style={styles.resendRow}>
          <Text style={styles.resendLabel}>Didn't receive the code? </Text>
          <TouchableOpacity onPress={handleResend} disabled={!canResend}>
            <Text
              style={[styles.resendBtn, !canResend && styles.resendDisabled]}
            >
              Resend OTP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const TEXT = "#1A1A2E";
const MUTED = "#8A94A6";
const BORDER = "#E5EAF0";
const BG = "#F7F9FC";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    paddingHorizontal: 15,
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6, // spacing between icon and text
  },

  backTxt: {
    fontSize: 15,
    fontWeight: "600",
    color: TEXT,
  },
  body: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 40,
  },

  phone: {
    color: CustemStyles.PRIMARY.background,
    fontWeight: "700",
  },

  otpRow: {
    flexDirection: "row",
    width: 250,
    gap: 10,
    marginTop: 25,
    marginBottom: 24,
  },
  otpBox: {
    flex: 1,
    height: 55,
    borderWidth: 1,
    borderColor: CustemStyles.INPUT_BORDER.bordersCol,
    borderRadius: 14,
    backgroundColor: CustemStyles.INPUT.background,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: TEXT,
  },
  otpBoxFilled: {
    borderColor: CustemStyles.PRIMARY.background,
    backgroundColor: "#fff",
  },

  timerBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F0F4FF",
    borderRadius: 100,
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  timerText: {
    fontSize: 12,
    fontWeight: "600",
    color: CustemStyles.PRIMARY.background,
  },

  footer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    paddingTop: 12,
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  resendLabel: {
    fontSize: 13,
    color: MUTED,
  },
  resendBtn: {
    fontSize: 13,
    fontWeight: "700",
    color: TEXT,
    textDecorationLine: "underline",
  },
  resendDisabled: {
    opacity: 0.35,
  },
});
