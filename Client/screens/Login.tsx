import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Signup: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
    navigation: LoginScreenNavigationProp;
}

const Login: React.FC<Props> = ({ navigation }) => {
    return (
    <View>
        <Text>Login Screen</Text>
        <Button title="Go to Home" onPress={() => navigation.goBack()} />
    </View>
    );
};

export default Login;
