import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { signupUser } from 'utils/api/userApi';

type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Signup: undefined;
};

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

interface Props {
    navigation: SignupScreenNavigationProp;
}

const Signup: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSignup() {
        if(password !== repeatPassword){
            setError("Passwords Do Not Match")
            return;
        }
        setIsLoading(true);
        try {
            const user = await signupUser(username, email,password);
            console.log(user)
            navigation.navigate('Login')
        } catch(err) {
            setError("Something went wrong try again later...")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View className="flex-1 justify-center items-center bg-gray-100 p-6">
            <Text className="text-2xl font-bold text-gray-800 mb-6">Sign Up</Text>
            
            <TextInput
                className="w-full bg-white p-4 rounded-lg mb-4 border border-gray-300"
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            
            <TextInput
                className="w-full bg-white p-4 rounded-lg mb-4 border border-gray-300"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            
            <TextInput
                className="w-full bg-white p-4 rounded-lg mb-4 border border-gray-300"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            
            <TextInput
                className="w-full bg-white p-4 rounded-lg mb-6 border border-gray-300"
                placeholder="Repeat Password"
                value={repeatPassword}
                onChangeText={setRepeatPassword}
                secureTextEntry
            />

            { error && 
                <Text className="text-red-600 font-medium my-5">{error}</Text>
            }

            <TouchableOpacity 
                className={`w-full bg-blue-600 p-4 rounded-lg mb-4`}
                disabled={isLoading}
                onPress={() => handleSignup()}
            >
                <Text className="text-white text-center font-semibold">{isLoading ? "...":"Sign Up"}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className="text-blue-600 font-medium">Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Signup;
