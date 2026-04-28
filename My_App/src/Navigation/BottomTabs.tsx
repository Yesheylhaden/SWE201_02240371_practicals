import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import GoldScreen from '../Screen/GoldScreen';
import TomatoScreen from '../Screen/TomatoScreen';
import PurpleScreen from '../Screen/PurpleScreen';
import FadeInBox from '../Screen/FadeInBox';
import SlideInCard from '../Screen/SlideInCard';
import HeartButton from '../Screen/HeartButton';
import MoveRight from '../Screen/MoveRight';
import Animated from '../Screen/AnimatedTodoList';
import LoadingScreen from '../Screen/LoadingScreen';
import SuccessAnimation from '../Screen/SuccessAnimation';
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

            <Tab.Screen options={{
                tabBarIcon: () => (
                    <AntDesign name="ant-design" size={24} color="Red" />
                )
            }}
            name="FadeIn" 
            component={FadeInBox} /> 

            <Tab.Screen options={{
                tabBarIcon: () => (
                    <AntDesign name="ant-design" size={24} color="pink" />
                )
            }}
            name="SlideIn" 
            component={SlideInCard} /> 

            <Tab.Screen options={{
                tabBarIcon: () => (
                    <AntDesign name="ant-design" size={24} color="blue" />
                )
            }}
            name="Heart" 
            component={HeartButton} /> 

            <Tab.Screen options={{
                tabBarIcon: () => (
                    <AntDesign name="ant-design" size={24} color="green" />
                )
            }}
            name="MoveRight" 
            component={MoveRight} /> 

            <Tab.Screen options={{
                tabBarIcon: () => (
                    <AntDesign name="ant-design" size={24} color="orange" />
                )
            }}
            name="Animated" 
            component={Animated} /> 

            <Tab.Screen options={{
                tabBarIcon: () => (
                    <AntDesign name="ant-design" size={24} color="brown" />
                )
            }}
            name="LoadingScreen" 
            component={LoadingScreen} /> 

            <Tab.Screen options={{
                tabBarIcon: () => (
                    <AntDesign name="ant-design" size={24} color="green" />
                )
            }}
            name="SuccessAnimation" 
            component={SuccessAnimation} /> 
            
        </Tab.Navigator>
    )
};