import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import BasePages from "../components/BasePages";

export default function HomePage({ navigation }) {
  return (
    <BasePages
      navegar={() =>
        navigation.reset({ index: 0, routes: [{ name: "Login" }] })
      }
    >
      <Text style={styles.WhoWeAre}>Quem nós somos?</Text>
      <Text style={styles.TextPattern}>
        A <Text style={styles.TextColorDecoration}>Food Heart</Text> é uma
        instituição dedicada a levar alimentos a quem mais precisa, garantindo
        que aqueles em situação de vulnerabilidade possam ter acesso a uma
        alimentação digna e de qualidade.
      </Text>

      <Text style={styles.benifts}>
        Quais os <Text style={styles.TextColorDecoration}>benefícios</Text> de
        criar <Text style={styles.centerword}>uma conta?</Text>
      </Text>
      <Text style={styles.TextPattern}>
        Ao criar uma conta no{" "}
        <Text style={styles.TextColorDecoration}>Food Heart</Text> você tera
        acesso a descontos em lojas parceiras que apoiam o projeto.
      </Text>

      <Text style={styles.partners}>Parcerias</Text>
      <View style={styles.partnerships}>
        <Image
          style={styles.pertnersLogo}
          source={require("../../assets/sonda.png")}
        />
        <Image
          style={styles.pertnersLogo}
          source={require("../../assets/assai.png")}
        />
        <Image
          style={styles.pertnersLogo}
          source={require("../../assets/ifood.png")}
        />
      </View>
    </BasePages>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    marginTop: 20,
    marginLeft: 10,
    fontSize: 30,
    color: "white",
  },

  WhoWeAre: {
    fontSize: 30,
    fontWeight: "bold",
  },

  TextColorDecoration: {
    color: "#F80465",
  },

  benifts: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
  },

  centerword: {
    textAlign: "center",
  },

  TextPattern: {
    fontSize: 18,
  },

  partners: {
    marginTop: 20,
    fontSize: 30,
    color: "#F80465",
    fontWeight: "bold",
  },

  partnerships: {
    flexDirection: "row",
    marginTop: 10,
  },
});
