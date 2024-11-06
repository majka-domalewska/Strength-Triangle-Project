import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { loginUser, signupUser } from '@/backend/api';

const LoginSignupScreen = () => {
    const [isLogin, setIsLogin] = useState(true); // Track whether it's login or signup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await loginUser(email, password);
            Alert.alert("Success", response.message);
            // Navigate to a different screen or store user data
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    const handleSignup = async () => {
        try {
            const response = await signupUser(email, password);
            Alert.alert("Success", response.message);
            // You could also set isLogin to true to go back to login after signup
            setIsLogin(true);
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setEmail('');
        setPassword('');
    };

    return (
        <View>
            <Text>{isLogin ? 'Login' : 'Signup'}</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {isLogin ? (
                <Button title="Login" onPress={handleLogin} />
            ) : (
                <Button title="Sign Up" onPress={handleSignup} />
            )}

            <Button
                title={isLogin ? "Switch to Signup" : "Switch to Login"}
                onPress={toggleForm}
            />
        </View>
    );
};

export default LoginSignupScreen;