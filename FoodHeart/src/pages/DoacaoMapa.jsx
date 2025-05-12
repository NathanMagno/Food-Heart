import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import BasePages from '../components/BasePages'
import { MaterialIcons } from "@expo/vector-icons";

export default function DoacaoMapa({ route, navigation }) {
  const [userLocation, setUserLocation] = useState(null)

  const hospital = route?.params?.hospital || 'Hospital desconhecido'
  const address = route?.params?.address || ''
  const destinationCoords = route?.params?.coords || {
    latitude: -23.55052,
    longitude: -46.633308,
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Permissão de localização negada')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setUserLocation(location.coords)
    })()
  }, [])

  if (!userLocation) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#F80465" />
        <Text>Carregando localização...</Text>
      </View>
    )
  }

  return (
    <BasePages
          navegar={() =>
            navigation.reset({ index: 0, routes: [{ name: "Login" }] })
          }
        >
      <TouchableOpacity
        style={{ position: 'absolute', top: 10, left: 20, zIndex: 1 }}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={34} color="#F80465" />
      </TouchableOpacity>
      <Text style={styles.title}>{hospital}</Text>
      <Text style={styles.address}>{address}</Text>

      <MapView
        style={styles.map}
        region={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        <Marker
          coordinate={{
            latitude: destinationCoords.latitude,
            longitude: destinationCoords.longitude,
          }}
          title={hospital}
          description={address}
          pinColor="#FF0066"
        />
      </MapView>
    </BasePages>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F80465',
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  address: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
    color: '#555',
  },
  map: {
    flex: 1,
    height: 300,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eaeaea',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
})