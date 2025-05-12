import React from "react";
import { Image, Linking, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Integrantes({ urlImage, nome, github }) {

  const openUrl = (github) => {
    const url = github;
    Linking.openURL(url);
  }

  return (
    <>
      <Image style={styles.participants} source={urlImage} />
      <Text style={styles.description}>{nome}</Text>
      <TouchableOpacity style={{ marginTop: 10 }} title="GitHub" onPress={() => openUrl(github)} >
        <Text style={styles.button}>Github</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  description: {
    color: "white",
    fontWeight: "bold",
  },

  participants: {
    width: 150,
    height: 150,
    borderRadius: 100,
    margin: 20,
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  }
});
