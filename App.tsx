import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

const Stack = createStackNavigator();

// Dummy login check
const isLoggedIn = () => true; // Replace with actual login check logic

const HomeScreen = () => (
  <View>
    <Text>Home Screen</Text>
  </View>
);

const LoginScreen = () => (
  <View>
    <Text>Login Screen</Text>
  </View>
);

export default function App() {
  const [locationPermission, setLocationPermission] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationPermission(false);
        return;
      }
      setLocationPermission(true);
    })();
  }, []);

  if (locationPermission === null) {
    return <Text>Requesting for location permission...</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn() ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}