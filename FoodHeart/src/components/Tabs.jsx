import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Conta from "./Conta";


const Tab = createBottomTabNavigator();

export default function Tabs({ route }) {
  const { email } = route.params;

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Conta" 
        component={Conta} 
        initialParams={{ email }} 
      />
    </Tab.Navigator>
  );
}