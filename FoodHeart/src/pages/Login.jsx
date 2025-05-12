import axios from "axios";
import { useState } from "react";
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

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post(`http://${ip}:5000/auth`, {
        email,
        senha,
      });

      if (response.status === 200) {
        console.log("Login realizado com sucesso:", response.data);

        navigation.navigate("Tabs", { email: email });
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Alert.alert("Erro", "Email ou senha inválidos.");
    }
  };

  return (
    <BasePages>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Entre na sua conta</Text>
          <Text style={styles.heartFood}>Food Heart</Text>
          <Text style={styles.benefits}>
            para conseguir seus{"\n"}benefícios
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputField}>
            <TextInput
              placeholder="Digite o seu email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              placeholder="Digite a sua senha"
              placeholderTextColor="#999"
              secureTextEntry
              style={styles.input}
              value={senha}
              onChangeText={setSenha}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginOptions}
          onPress={() => navigation.navigate("RecuperarSenha")}
        >
          <Text style={styles.loginOptionsText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginOptions}
          onPress={() => navigation.navigate("CriarConta")}
        >
          <Text style={styles.loginOptionsText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </BasePages>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  heartFood: {
    fontSize: 24,
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
    width: "100%",
    marginVertical: 20,
  },
  inputField: {
    backgroundColor: "#E8E8E8",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 8,
    height: 45,
    width: 300,
    justifyContent: "center",
  },
  input: {
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#FF0066",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginOptions: {
    marginTop: 10,
  },
  loginOptionsText: {
    color: "#666",
    fontSize: 16,
    marginTop: 12,
  },
});
