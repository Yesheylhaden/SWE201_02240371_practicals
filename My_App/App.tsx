import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/Navigation/MainStackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}

