import axios from "axios";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BasePages from "../components/BasePages";
import { ip } from "../ip";

export default function CriarConta({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cep, setCep] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (loading) return;

    setLoading(true);

    if (!nome || !email || !senha || !cep) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`http://${ip}:5000/pessoas/cadastro`, {
        nome,
        email,
        senha,
        cep,
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
        navigation.navigate("Tabs", { email: email });
      }
    } catch (error) {
      console.log("ERRO:", error.response?.data);

      if (error.response) {
        const { status, data } = error.response;
        const message = data?.message || data?.error || "";

        if (status === 400 && message.toLowerCase().includes("e-mail")) {
          Alert.alert(
            "Erro",
            "Já existe uma conta cadastrada com esse e-mail."
          );
        } else if (
          status === 400 &&
          message.toLowerCase().includes("campos obrigatórios")
        ) {
          Alert.alert("Erro", "Todos os campos são obrigatórios.");
        } else {
          Alert.alert(
            "Erro",
            message ||
              "Erro ao cadastrar. Verifique os dados e tente novamente."
          );
        }
      } else {
        Alert.alert("Erro", "Não foi possível conectar ao servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <BasePages>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Crie sua conta</Text>
          <Text style={styles.heartFood}>Heart Food</Text>
          <Text style={styles.benefits}>
            para aproveitar todos{"\n"}nossos benefícios
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputField}>
            <TextInput
              placeholder="digite seu nome completo"
              placeholderTextColor="#999"
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              placeholder="digite seu email"
              placeholderTextColor="#999"
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              placeholder="crie uma senha"
              placeholderTextColor="#999"
              secureTextEntry
              style={styles.input}
              value={senha}
              onChangeText={setSenha}
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              placeholder="digite seu CEP"
              placeholderTextColor="#999"
              style={styles.input}
              keyboardType="numeric"
              maxLength={9}
              value={cep}
              onChangeText={setCep}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.createButton, loading && { opacity: 0.6 }]}
          onPress={handleCadastro}
          disabled={loading}
        >
          <Text style={styles.createButtonText}>
            {loading ? "Cadastrando..." : "Criar Conta"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.loginLinkText}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </BasePages>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 25,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  heartFood: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF0066",
    textAlign: "center",
  },
  benefits: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  inputContainer: {
    width: 200,
    marginVertical: 15,
  },
  inputField: {
    backgroundColor: "#E8E8E8",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 6,
    height: 45,
    justifyContent: "center",
  },
  input: {
    fontSize: 16,
  },
  createButton: {
    backgroundColor: "#FF0066",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginVertical: 8,
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginLink: {
    marginTop: 8,
  },
  loginLinkText: {
    color: "#666",
    fontSize: 14,
  },
});
