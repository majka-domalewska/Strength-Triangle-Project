import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { loginUser } from "../backend/api";

const LoginScreen = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleSignup = async() => {
        try {
            const response = await loginUser(email, password);
            Alert.alert("Success", response.message);
        } catch(error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View>
            <Text>Login</Text>
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
            <Button title="Login" onPress={handleSignup} />
        </View>
    );
};

export default LoginScreen;