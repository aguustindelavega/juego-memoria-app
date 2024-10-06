import * as React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function Card({ isTurnOver, onPress, children }) {
  return (
    <Pressable
      onPress={onPress}
      style={isTurnOver ? styles.cardUp : styles.cardDown}
    >
      {isTurnOver ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        <Text style={styles.text}>?</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardUp: {
    width: 100,
    height: 100,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "25%",
    backgroundColor: "#1e293b",
  },
  cardDown: {
    width: 100,
    height: 100,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 10,
    borderRadius: "25%",
    borderColor: "#334155",
    backgroundColor: "#1e293b",
  },
  text: {
    fontSize: 46,
    color: "#334155",
  },
});
