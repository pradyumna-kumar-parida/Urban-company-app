import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { CustemStyles } from "../Theme/custemAll";

export default function CustomInput({
  control,
  name,
  rules = {},
  placeholder,
  label,
  secureTextEntry = false,
  keyboardType = "default",
  maxLength,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: isFocused 
                    ? CustemStyles.INPUT_BORDER.bordersCol
                    : CustemStyles.INPUT_BORDER.bordersCol,
                },
              ]}
              placeholder={placeholder}
              placeholderTextColor="#888"
              value={value}
              onChangeText={onChange}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              maxLength={maxLength}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 13,
  },
  error: {
    color: "red",
    marginTop: 5,
    fontSize:12
  },
});
