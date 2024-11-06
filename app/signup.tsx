import { View, StyleSheet } from "react-native";
import SignupScreen from "@/components/loginSignupScreen";
import { Link } from "expo-router";

export default function Login() {
  return (
    <View style={styles.container}>
      <SignupScreen />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 200,
        backgroundColor: "#245681",
    }
})