import { Stack } from "expo-router";

export default function layout() {
  // Stack For Navigation
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "orange",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="employees" options={{ headerShown: false }} />
      <Stack.Screen name="employee" />
    </Stack>
  );
}
