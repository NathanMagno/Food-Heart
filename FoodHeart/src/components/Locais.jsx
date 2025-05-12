import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Locais({ Name, address, distance }) {

  return (
    <View style={styles.card}>
      <View style={styles.contentContainer}>
        <View style={styles.leftContent}>
          <View style={styles.headerRow}>
            <Text style={styles.hospitalName}>{Name}</Text>
            <View style={styles.distanceContainer}>
              <MaterialCommunityIcons name="map-marker-path" size={20} />
              <Text style={styles.distanceText}>{distance}</Text>
            </View>
          </View>
          <Text style={styles.addressText}>{address}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  contentContainer: {
    flexDirection: "column",
  },
  leftContent: {
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  addressText: {
    fontSize: 14,
    color: "#555",
    marginTop: 8,
  },
  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  distanceText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 4,
  },
});
