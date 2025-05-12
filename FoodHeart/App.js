import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

// Páginas
import HomePage from "./src/pages/HomePage";
import ParticipantsPage from "./src/pages/ParticipantesPage";
import Login from "./src/pages/Login";
import CriarConta from "./src/pages/CriarConta";
import RecuperarSenha from "./src/pages/RecuperarSenha";
import Doacao from "./src/pages/Doacao";
import Conta from "./src/pages/Conta";
import DoacaoMapa from "./src/pages/DoacaoMapa";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator({ route }) {
  const { email } = route.params || {};

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#F80465",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Doacao"
        component={Doacao}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="heart" size={size} color={color} />
          ),
          tabBarLabel: "doação",
        }}
      />
      <Tab.Screen
        name="ParticipantesPage"
        component={ParticipantsPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="users" size={size} color={color} />
          ),
          tabBarLabel: "participantes",
        }}
      />
      <Tab.Screen
        name="Conta"
        component={Conta}
        initialParams={{ email }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
          tabBarLabel: "usuário",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CriarConta"
          component={CriarConta}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecuperarSenha"
          component={RecuperarSenha}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DoacaoMapa"
          component={DoacaoMapa}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F80465",
    alignItems: "center",
    justifyContent: "center",
  },

  texthomepage: {
    marginBottom: 20,
    fontSize: 30,
    color: "white",
  },

  logohomepage: {
    width: 190,
    height: 190,
  },

  btnhomepage: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
  },

  TextBtnhomepage: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
