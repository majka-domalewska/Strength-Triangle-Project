import React, { useState } from "react";
import { View, Alert } from "react-native";
import { signupUser, loginUser } from "../backend/api";
import { PaperProvider, Button, Text, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import PopUp from "./popUp";

const LoginSignupScreen = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ isLogin, setIsLogin ] = useState(true);

    const handleToggle = () => {
        setIsLogin((prevIsLogin) => !prevIsLogin);
    };

    const handleForm = async() => {

        if (isLogin) {
            try {
                const response = await loginUser(email, password);
                Alert.alert("Success", response.message);
            } catch(error) {
                Alert.alert("Error", error.message);
            }
        } else {
            try {
                const response = await signupUser(email, password);
                Alert.alert("Success", response.message);
            } catch(error) {
                Alert.alert("Error", error.message);
            }
        }
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
            <PopUp style={styles.popup}/>
                <Text style={styles.field} variant="titleLarge">{ isLogin ? "Login" : "Signup" }</Text>
                <TextInput mode="outlined" style={styles.field}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                />
                <TextInput mode="outlined" style={styles.field}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                />
                <Button style={styles.field} mode="contained" onPress = {handleForm}>{ isLogin ? "Login" : "Sign up" }</Button>
                <Button style={styles.field} mode="text" onPress ={handleToggle}>{ isLogin ? "Switch to signup" : "Switch to login" }</Button>
            </View>
        </PaperProvider>
    );
};

export default LoginSignupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "blue",
        minHeight: 100
    },
    field: {
        margin: 12,
        alignContent: "center"
    },
    popup: {
        margin: 0,
        position: "absolute"
    }
});