import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export default function BasePages({ children, navegar }) {
  const route = useRoute();

  const hideScreens = ["Login", "CriarConta", "RecuperarSenha"];

  const ShowLogout = !hideScreens.includes(route.name);

  return (
    <View style={styles.container}>
      {/* {ShowLogout && (
        <TouchableOpacity style={styles.btnLogOut} onPress={navegar}>
          <MaterialIcons
            size={34}
            name="logout"
            color="#F80465"
            style={styles.iconLogOut}
          />
        </TouchableOpacity>
      )} */}

      <View style={styles.header}>
        <Image
          style={styles.logohomepage}
          source={require("../../assets/Logo.png")}
        />
        <Text style={styles.textHeader}>Food Heart</Text>
      </View>

      <View style={styles.whiteRectangle}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F80465",
  },

  whiteRectangle: {
    width: 400,
    height: 640,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "black",
    padding: 10,
    textAlign: "center",
  },

  header: {
    flexDirection: "row",
  },

  logohomepage: {
    marginBottom: 20,
    width: 80,
    height: 80,
  },

  textHeader: {
    marginTop: 20,
    marginLeft: 10,
    fontSize: 30,
    color: "white",
  },
  btnLogOut: {
    backgroundColor: "white",
    width: 44,
    height: 44,
    borderRadius: "100%",
    justifyContent: "center",
    position: "absolute",
    alignItems: "center",
    top: 52,
    right: 20,
  },
  iconLogOut: {
    alignContent: "center",
  },
});
