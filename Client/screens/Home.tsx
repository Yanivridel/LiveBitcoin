import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Signup: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomeScreenNavigationProp;
}

const Home: React.FC<Props> = ({ navigation }) => {
    return (
        <View className='mx-auto bg-red-500'>
            <Text>Welcome to the Home Screen!!!!!!</Text>
            <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
            <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
        </View>
    );
};

export default Home;
