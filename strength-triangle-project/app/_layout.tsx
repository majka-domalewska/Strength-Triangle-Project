import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="Index" />
      <Stack.Screen name="Drihoek" />

    </Stack>
  );
}
