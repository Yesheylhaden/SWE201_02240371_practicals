import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/Navigation/MainStackNavigator';
import BottomTabs from './src/Navigation/BottomTabs';

export default function App() {
  return (
    <NavigationContainer>
        {/* <MainStackNavigator /> */}
        <BottomTabs />
    </NavigationContainer>
  );
}