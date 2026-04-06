import { createStackNavigator } from "@react-navigation/stack";
import PurpleScreen from "../Screen/PurpleScreen";
import GoldScreen from "../Screen/GoldScreen";
import TomatoScreen from "../Screen/TomatoScreen";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Purple" component={PurpleScreen} />
      <Stack.Screen name="Gold" component={GoldScreen} />
      <Stack.Screen name="Tomato" component={TomatoScreen} />
    </Stack.Navigator>
  );
}
