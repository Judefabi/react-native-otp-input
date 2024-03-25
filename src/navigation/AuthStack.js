import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NumberInput from "../AuthenticationScreens/RegistrationStack/NumberInputScreen";
import OTPScreen from "../AuthenticationScreens/RegistrationStack/OTPScreen";
import Home from "../Home";

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
  let routename;
  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null; //handle error message to show if
  } else if (isFirstLaunch === true) {
    routename = "Registration";
  } else {
    routename = "Login Stack";
  }
  return (
    <Stack.Navigator
      initialRouteName={routename}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Number" component={NumberInput} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
