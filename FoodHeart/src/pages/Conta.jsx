import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BasePages from "../components/BasePages";
import { ip } from "../ip";

export default function Conta({ route, navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const [endereco, setEndereco] = useState({ cidade: "", estado: "", cep: "" });

  useEffect(() => {
    const { email } = route.params || {};

    // if (!email) {
    //   console.log("Email não encontrado, redirecionando...");
    //   navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    //   return;
    // }

    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`http://${ip}:5000/infos/${email}`);
        setUsuario(response.data);

        if (response.data.cep) {
          const cepResponse = await axios.get(
            `https://viacep.com.br/ws/${response.data.cep}/json/`
          );
          if (cepResponse.data) {
            setEndereco({
              cidade: cepResponse.data.localidade,
              estado: cepResponse.data.uf,
              cep: response.data.cep,
            });
          }
        }
      } catch (err) {
        setError("Erro ao carregar os dados do usuário.");
      }
    };

    fetchUsuario();
  }, [route.params, navigation]);

  return (
    <BasePages
      navegar={() =>
        navigation.reset({ index: 0, routes: [{ name: "Login" }] })
      }
    >
      <View style={styles.container}>
        {error ? (
          <Text>{error}</Text>
        ) : usuario ? (
          <>
            <Text style={styles.title}>{usuario.nome}</Text>
            <Text style={styles.email}>{usuario.email}</Text>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Endereço</Text>
              <View style={styles.addressContainer}>
                <Text style={styles.addressText}>
                  {endereco.cep
                    ? `Endereço: ${endereco.cep}`
                    : "Endereço não informado"}
                </Text>
                <Text style={styles.cityStateText}>
                  {endereco.cidade}, {endereco.estado} - CEP{" "}
                  {endereco.cep || "não disponível"}
                </Text>

                <TouchableOpacity style={styles.editButton} onPress={() => {}}>
                  <MaterialIcons name="edit" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Histórico de doações</Text>
              <View style={styles.donationContainer}>
                <Text style={styles.donationText}>Total de doações:</Text>
                <Text style={styles.donationCount}>0</Text>
              </View>
            </View>
          </>
        ) : (
          <Text>Carregando...</Text>
        )}
      </View>
    </BasePages>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  title: {
    backgroundColor: "#F80465",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 5,
    alignSelf: "center",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  sectionContainer: {
    width: "100%",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addressContainer: {
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    position: "relative",
  },
  addressText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cityStateText: {
    fontSize: 14,
    color: "#666",
  },
  editButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "#F80465",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  donationContainer: {
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  donationText: {
    fontSize: 16,
  },
  donationCount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F80465",
  },
});
