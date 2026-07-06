import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function AppButton({
  title,
  onPress,
  disabled = false,
  selected = false,
  style,
  textStyle,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabled,
        !disabled && (selected ? styles.selected : styles.active),
        style,
      ]}
      onPress={onPress}
      activeOpacity={disabled ? 1 : 0.88}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          disabled && styles.textDisabled,
          !disabled && (selected ? styles.textSelected : styles.textActive),
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const PRIMARY = "#21005f";
const PRESSED = "#140b25"; // slightly darker
const DISABLED_BG = "#E5EAF0";
const DISABLED_TEXT = "#A0AABB";

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: DISABLED_BG,
  },

  active: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },

  selected: {
    backgroundColor: PRESSED,
  },

  disabled: {
    backgroundColor: DISABLED_BG,
  },

  text: {
    fontSize: 14,
    fontWeight: "400",
  },

  textActive: {
    color: "#fff",
  },

  textSelected: {
    color: "#fff",
  },

  textDisabled: {
    color: DISABLED_TEXT,
  },
});
