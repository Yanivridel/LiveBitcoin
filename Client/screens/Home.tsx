import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { logoutUser } from 'utils/api/userApi';
import { fetchCoins } from 'utils/api/coinApi';

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
    const [bitcoinRate, setBitcoinRate] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setLoading(true);
            fetchCoins()
                .then(data => setBitcoinRate(data[0].rate))
                .catch(err => console.error("Error fetching Bitcoin rate:", err))
                .finally(() => setLoading(false));
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);

    const handleLogout = async () => {
        await logoutUser();
        navigation.replace('Login');
    };

    return (
        <View className="flex-1 justify-center items-center bg-red-500 p-6">
            <Text className="text-white text-2xl font-bold mb-4">Welcome to the Live BITCOIN !</Text>
            
            {loading && 
                <ActivityIndicator size="large" color="#ffffff" />
            }
            <Text className="text-white text-xl font-semibold mb-6">
                Bitcoin Rate: ${bitcoinRate?.toFixed(2) ?? 'N/A'}
            </Text>
            

            <View style={{ height: 20 }} /> 
            <Button title="Logout" onPress={handleLogout} color="red" />
        </View>
    );
};

export default Home;