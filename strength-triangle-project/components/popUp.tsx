import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, PaperProvider, Text } from 'react-native-paper';

const PopUp = () => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Function to handle Signup
  const handleSignup = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Signup failed");
      }

      // Handle successful signup (e.g., redirect or show success message)
      console.log("Signup successful");
    } catch (error) {
      setErrorMessage(error.message);
      showDialog();
    }
  };

  // Function to handle Login
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      // Handle successful login (e.g., redirect or store auth token)
      console.log("Login successful");
    } catch (error) {
      setErrorMessage(error.message);
      showDialog();
    }
  };

  return (
    <PaperProvider>
      <View style={styles.overflow}>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Error</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">{errorMessage}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {/* Example form inputs for login/signup */}
        <Button onPress={() => handleSignup('test@test.com', 'password123')}>Signup</Button>
        <Button onPress={() => handleLogin('test@test.com', 'password123')}>Login</Button>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  overflow: {
    position: "absolute"
  }
})

export default PopUp;