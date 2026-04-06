import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import GoldScreen from '../Screen/GoldScreen';
import TomatoScreen from '../Screen/TomatoScreen';
import PurpleScreen from '../Screen/PurpleScreen';
import AntDesign from '@expo/vector-icons/AntDesign';


const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
            options={{
                tabBarIcon: () => (
                    <AntDesign name="ant-design" size={24} color="gold" />
                )
            }}
            name="Gold" 
            component={GoldScreen} />
            <Tab.Screen options={{
                tabBarIcon: () => (
                    <AntDesign name="ant-design" size={24} color="tomato" />
                )
            }}
            name="Tomato" 
            component={TomatoScreen} />
            <Tab.Screen options={{
                tabBarIcon: () => (
                    <AntDesign name="ant-design" size={24} color="purple" />
                )
            }}
            name="Purple" 
            component={PurpleScreen} />
        </Tab.Navigator>
    )
};