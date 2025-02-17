import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Home" component={Home} options={ {headerShown: false }}/>
            <Stack.Screen name="Login" component={Login} options={ {headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ title: "Back To Login" }} />
        </Stack.Navigator>
    </NavigationContainer>
    );
};

export default StackNavigator;
