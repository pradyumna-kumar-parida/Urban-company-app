import { useState } from "react";
import {
  Animated,
  Easing,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Simple animated pin using Animated API
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect as RNEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustemStyles } from "../../components/Theme/custemAll";
import AppButton from "../../components/buttons/custemButton";
export default function LocationScreen({ navigation }) {
  const [selected, setSelected] = useState(null);

  // Pin pulse animation
  const pulse = useRef(new Animated.Value(1)).current;
  const pinDrop = useRef(new Animated.Value(-30)).current;
  const pinOpacity = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  RNEffect(() => {
    // Drop pin in on mount
    Animated.parallel([
      Animated.spring(pinDrop, {
        toValue: 0,
        tension: 60,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(pinOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse rings
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.35,
          duration: 900,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const handleSelect = (type) => {
    router.replace("/(tabs)/home");
    setSelected(type);
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Map placeholder area */}
      <View style={s.mapArea}>
        {/* Subtle grid lines to suggest map */}
        {[...Array(8)].map((_, i) => (
          <View
            key={`h${i}`}
            style={[s.gridLineH, { top: `${(i + 1) * 11}%` }]}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <View
            key={`v${i}`}
            style={[s.gridLineV, { left: `${(i + 1) * 15}%` }]}
          />
        ))}

        {/* Road-like shapes */}
        <View style={s.roadH} />
        <View style={s.roadV} />

        {/* Pulse rings */}
        <View style={s.pinCenter}>
          <Animated.View
            style={[
              s.pulseRing,
              s.pulseRing3,
              { transform: [{ scale: pulse }], opacity: 0.1 },
            ]}
          />
          <Animated.View
            style={[
              s.pulseRing,
              s.pulseRing2,
              { transform: [{ scale: pulse }], opacity: 0.18 },
            ]}
          />
          <Animated.View
            style={[
              s.pulseRing,
              s.pulseRing1,
              { transform: [{ scale: pulse }], opacity: 0.28 },
            ]}
          />

          {/* Pin */}
          <Animated.View
            style={{
              transform: [{ translateY: pinDrop }],
              opacity: pinOpacity,
              alignItems: "center",
            }}
          >
            <View style={s.pinHead}>
              <Image
                source={require("../../assets/images/location-logo.png")}
                style={s.location}
              />
            </View>
          </Animated.View>
        </View>
      </View>

      {/* Bottom Sheet */}
      <View style={s.sheet}>
        <View style={s.sheetHandle} />

        <Text style={[s.sheetTitle, CustemStyles.TITLE]}>
          Where do you want{"\n"}your service?
        </Text>

        {/* Current Location Button */}
        <AppButton
          title="At my current location"
          selected={selected === "current"}
          onPress={() => handleSelect("current")}
          style={{ marginBottom: "10" }}
        />

        {/* Manual Entry Button */}
        <TouchableOpacity
          style={[s.secondaryBtn]}
          activeOpacity={0.85}
          onPress={() => handleSelect("manual")}
        >
          <Text style={s.secondaryBtnTxt}>I'll enter my location manually</Text>
        </TouchableOpacity>

        <Text style={CustemStyles.MUTEDNOTES}>
          🔒 Your location is only used to find nearby professionals
        </Text>
      </View>
    </SafeAreaView>
  );
}

const TEXT = "#1A1A2E";

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Map
  mapArea: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    position: "relative",
    overflow: "hidden",
  },
  location: {
    height: 90,
    width: 90,
  },
  // Grid lines (fake map)
  gridLineH: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(180,190,210,0.35)",
  },
  gridLineV: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "rgba(180,190,210,0.35)",
  },

  // Fake roads
  roadH: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "48%",
    height: 10,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(200,210,225,0.5)",
  },
  roadV: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "49%",
    width: 10,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(200,210,225,0.5)",
  },

  // Pin center
  pinCenter: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  // Pulse rings
  pulseRing: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: CustemStyles.PRIMARY.background,
  },
  pulseRing1: { width: 100, height: 100 },
  pulseRing2: { width: 140, height: 140 },
  pulseRing3: { width: 210, height: 210 },

  // Pin

  // Bottom Sheet
  sheet: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 14,
   paddingBottom: 20,
    // elevation: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#DDE2EA",
    alignSelf: "center",
    marginBottom: 22,
  },
  sheetTitle: {
    textAlign: "center",
    lineHeight: 30,
    letterSpacing: -0.3,
    paddingBottom: 15,
  },

  locationDotIcon: { fontSize: 18 },
  primaryBtnTxt: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },

  secondaryBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: CustemStyles.PRIMARY.background,
    marginBottom: 20,
    backgroundColor: "#fff",
  },

  secondaryBtnTxt: {
    fontSize: 14,
    fontWeight: "400",
    color: CustemStyles.PRIMARY.background,
  },
});
