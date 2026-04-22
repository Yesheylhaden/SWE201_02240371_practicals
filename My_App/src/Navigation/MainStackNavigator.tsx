import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "./BottomTabs";
import PurpleScreen from "../Screen/PurpleScreen";
import GoldScreen from "../Screen/GoldScreen";
import TomatoScreen from "../Screen/TomatoScreen";
import FadeInBox from '../Screen/FadeInBox';
import SlideInCard from '../Screen/SlideInCard';
import HeartButton from '../Screen/HeartButton';
import MoveRight from '../Screen/MoveRight';
import Animated from '../Screen/AnimatedTodoList';
import LoadingScreen from '../Screen/LoadingScreen';
import SuccessAnimation from '../Screen/SuccessAnimation';
import "../Screen/SuccessAnimation"


const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Purple" component={PurpleScreen} />
      <Stack.Screen name="Gold" component={GoldScreen} />
      <Stack.Screen name="Tomato" component={TomatoScreen} />
      <Stack.Screen name="FadeIn" component={FadeInBox} />
      <Stack.Screen name="SlideIn" component={SlideInCard} />
      <Stack.Screen name="HeartButton" component={HeartButton} />
      <Stack.Screen name="MoveRight" component={MoveRight} />
      <Stack.Screen name="Animated" component={Animated} />
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="SuccessAnimation" component={SuccessAnimation} /> 
    </Stack.Navigator>
  );
}