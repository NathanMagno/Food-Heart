import axios from "axios";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BasePages from "../components/BasePages";
import { ip } from "../ip";

export default function RecuperarSenha({ navigation }) {
  const [email, setEmail] = useState(null);

  const findEmail = async () => {
    try {
      const response = await axios.get(`http://${ip}:5000/infos/${email}`);

      if (response.status === 200) {
        const dados = response.data;
        alert(`Sua senha é: ${dados.senha}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("E-mail não encontrado. Por favor, verifique e tente novamente.");
      } else {
        console.log("Erro desconhecido: ", error);
        alert("Ocorreu um erro. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <BasePages>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Recupere sua senha</Text>
          <Text style={styles.heartFood}>Heart Food</Text>
          <Text style={styles.instructions}>
            informe seu email para{"\n"}receber as instruções
          </Text>
        </View>

        <View style={styles.inputContainer}>
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
        </View>

        <TouchableOpacity
          style={styles.recoverButton}
          onPress={() => {
            findEmail();
          }}
        >
          <Text style={styles.recoverButtonText}>Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.loginLinkText}>Voltar para o login</Text>
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
  instructions: {
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
  recoverButton: {
    backgroundColor: "#FF0066",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginVertical: 15,
  },
  recoverButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginLink: {
    marginTop: 10,
  },
  loginLinkText: {
    color: "#666",
    fontSize: 14,
  },
});
