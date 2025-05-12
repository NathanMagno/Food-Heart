import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import BasePages from "../components/BasePages";
import Locais from "../components/Locais";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

export default function Doacao({ navigation }) {
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permissão de localização negada");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    const fetchHospitais = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLocation.latitude},
          ${userLocation.longitude}&radius=5000&type=hospital&key=`);

        const data = response.data;

        if (data.results && data.results.length > 0) {
          const hospitaisFormatados = data.results.map((hospital) => ({
            id: hospital.place_id,
            name: hospital.name,
            address: hospital.vicinity,
            latitude: hospital.geometry.location.lat,
            longitude: hospital.geometry.location.lng,
          }));

          setHospitals(hospitaisFormatados);
          console.log("Hospitais:", hospitaisFormatados);
        } else {
          setHospitals([
            {
              id: "1",
              name: "Hospital 9 de Julho",
              address: "R. Peixoto Gomide, 545 - Bela Vista",
              latitude: -23.56483,
              longitude: -46.65255,
            },
            {
              id: "2",
              name: "Hospital Santa Catarina",
              address: "Av. Paulista, 200 - Bela Vista",
              latitude: -23.57327,
              longitude: -46.64186,
            },
            {
              id: "3",
              name: "Hospital Sírio-Libanês",
              address: "R. Dona Adma Jafet, 91 - Bela Vista",
              latitude: -23.55707,
              longitude: -46.66015,
            },
            {
              id: "4",
              name: "Hospital Alemão Oswaldo Cruz",
              address: "R. João Julião, 331 - Bela Vista",
              latitude: -23.5684,
              longitude: -46.6416,
            },
          ]);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchHospitais();
  }, [userLocation]);

  if (!userLocation) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#F80465" />
        <Text>Carregando localização...</Text>
      </View>
    );
  }

  return (
    <BasePages
      navegar={() =>
        navigation.reset({ index: 0, routes: [{ name: "Login" }] })
      }
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>Hospitais disponíveis para doação</Text>

        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation
          showsMyLocationButton
        >
          {hospitals.map((hospital) => (
            <Marker
              key={hospital.id}
              coordinate={{
                latitude: hospital.latitude,
                longitude: hospital.longitude,
              }}
              title={hospital.name}
              description={hospital.address}
              pinColor="#FF0066"
            />
          ))}
        </MapView>
      </View>
      <View style={styles.container}>
        <Text style={styles.headerText}>
          Selecione onde deseja realizar sua doação
        </Text>

        <ScrollView style={styles.scrollContainer}>
          {hospitals.map((hospital) => (
            <TouchableOpacity
              key={hospital.id}
              onPress={() =>
                navigation.navigate("DoacaoMapa", {
                  hospital: hospital.name,
                  address: hospital.address,
                  coords: {
                    latitude: hospital.latitude,
                    longitude: hospital.longitude,
                  },
                })
              }
            >
              <Locais
                Name={hospital.name}
                address={hospital.address}
                distance={hospital.distance}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </BasePages>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 16,
    textAlign: "center",
  },
  scrollContainer: {
    width: "100%",
  },
});
