import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { CustemStyles } from "../../components/Theme/custemAll";
import { useRouter } from "expo-router";
import AppButton from "../../components/buttons/custemButton";
import CustomInput from "../../components/inputs/custemInput"; // adjust path if needed

const PRIMARY = "#21005f";
const PRIMARY_LIGHT = "#EDE8FF";
const MUTED = "#6B7280";
const BORDER = "#F0F0F5";
const BG = "#F7F8FC";
const WHITE = "#fff";

const SKILLS = ["Plumber", "Electrician", "AC Repair", "Cleaner", "Painter"];

export default function ProviderSetupScreen() {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const { control, handleSubmit } = useForm();
  const router = useRouter();

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const onSubmit = (data) => {
    console.log({ ...data, skills: selectedSkills });
    router.push("/location");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor={WHITE} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={CustemStyles.TITLE}>Setup your provider profile</Text>
          <Text style={CustemStyles.SUBTITLE}>
            Tell us a bit about yourself
          </Text>
        </View>

        {/* Full Name */}
        <CustomInput
          control={control}
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          rules={{ required: "Full name is required" }}
        />

        {/* Skills — manual since CustomInput doesn't support chips */}
        <Text style={styles.skillLabel}>Your Skills</Text>
        <View style={styles.skillsWrap}>
          {SKILLS.map((skill) => {
            const active = selectedSkills.includes(skill);
            return (
              <TouchableOpacity
                key={skill}
                style={[styles.skillChip, active && styles.skillChipActive]}
                onPress={() => toggleSkill(skill)}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.skillText, active && styles.skillTextActive]}
                >
                  {skill}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Experience */}
        <CustomInput
          control={control}
          name="experience"
          label="Years of Experience"
          placeholder="e.g. 3"
          keyboardType="numeric"
        />

        {/* Address */}
        <CustomInput
          control={control}
          name="address"
          label="Service Area / Address"
          placeholder="Enter your service area"
        />

        {/* Upload ID */}
        <TouchableOpacity style={styles.uploadBtn} activeOpacity={0.8}>
          <Text style={styles.uploadIcon}>📎</Text>
          <Text style={styles.uploadText}>Upload ID Proof (optional)</Text>
        </TouchableOpacity>

        <View style={{ minHeight: 24 }} />

        {/* CTA */}
        <AppButton
          title="Complete Setup"
          disabled={selectedSkills.length === 0}
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: WHITE },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 16,
    flexGrow: 1,
  },

  header: { paddingTop: 40, marginBottom: 10 },

  skillLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 18,
  },
  skillChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CustemStyles.INPUT_BORDER.bordersCol,
    backgroundColor: BG,
  },
  skillChipActive: {
    borderColor: PRIMARY,
    backgroundColor: PRIMARY_LIGHT,
  },
  skillText: { fontSize: 13, color: MUTED, fontWeight: "400" },
  skillTextActive: { color: PRIMARY },

  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: CustemStyles.INPUT_BORDER.bordersCol,
    borderStyle: "dashed",
    borderRadius: 10,
    padding: 14,
    backgroundColor: BG,
    justifyContent: "center",
    marginBottom: 8,
  },
  uploadIcon: { fontSize: 16 },
  uploadText: { fontSize: 13, color: MUTED, fontWeight: "600" },
});
