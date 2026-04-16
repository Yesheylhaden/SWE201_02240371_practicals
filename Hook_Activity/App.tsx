import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/Navigation/BottomTabs';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}
