import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import WebView from 'react-native-webview';
import { loginUser } from 'utils/api/userApi';
import { getToken } from 'utils/authStorage';

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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin() {
        setIsLoading(true);
        try {
            const user = await loginUser(email,password);
            console.log(user)
            navigation.navigate('Home')
        } catch(err) {
            setError("Something went wrong try again later...")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View className="flex-1 justify-center items-center bg-gray-100 p-6">

            <View className="w-16 h-16 mb-8">
                <WebView
                    source={require('./../assets/images/bitcoinGif.gif')}
                    style={{ width: '100%', height: '100%' }}
                />
            </View>

            <Text className="text-2xl font-bold text-gray-800 mb-6">Login</Text>
            
            <TextInput
                className="w-full bg-white p-4 rounded-lg mb-4 border border-gray-300"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            
            <TextInput
                className="w-full bg-white p-4 rounded-lg mb-6 border border-gray-300"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            { error && 
                <Text className="text-red-600 font-medium my-5">{error}</Text>
            }

            <TouchableOpacity 
                className={`w-full bg-blue-600 p-4 rounded-lg mb-4`}
                disabled={isLoading}
                onPress={() => handleLogin()}
            >
                <Text className="text-white text-center font-semibold">{isLoading ? "...":"Login"}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('Signup')} >
                <Text className="text-blue-600 font-medium">Don't have an account? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;
