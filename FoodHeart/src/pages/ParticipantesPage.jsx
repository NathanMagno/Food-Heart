import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import Integrantes from "../components/Integrantes";

export default function ParticipantsPage() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Image
          style={styles.logohomepage}
          source={require("../../assets/Logo.png")}
        />
        <Text style={styles.textHeader}>Food Heart</Text>
      </View>

      <Text style={styles.title}>Participantes</Text>

      <Integrantes
        nome="Nathan Magno RM 558987"
        urlImage={require("../../assets/Nathan.png")}
        github="https://github.com/NathanMagno"
      />

      <Integrantes
        nome="Júlio Cesar 557774"
        urlImage={require("../../assets/Jubs.png")}
        github="https://github.com/JubsHereMan"
      />

      <Integrantes
        nome="Luiz Paulo RM 555497"
        urlImage={require("../../assets/Luiz.png")}
        github="https://github.com/luizpaulo73"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F80465",
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  logohomepage: {
    width: 60,
    height: 60,
  },
  textHeader: {
    marginLeft: 10,
    fontSize: 22,
    color: "white",
  },
});
