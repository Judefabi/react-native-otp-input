import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../globals/colors";

const NumberInput = () => {
  const navigation = useNavigation();
  const [number, setNumber] = useState();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topView}>
        <Text style={styles.pageTitle}>Register.</Text>
        <Text style={styles.pageDescription}>
          Enter your number and start having fun with our space.{" "}
        </Text>
      </View>
      <View style={styles.phoneNumberInputCover}>
        <TouchableOpacity style={styles.countryCodeView}>
          <Text style={styles.countryCode}>+254</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.inputView}
          placeholder="Phone Number"
          placeholderTextColor={colors.grey}
          onChangeText={(number) => setNumber(number)}
        />
      </View>
      <View style={styles.navigationView}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("OTP", {
              codedNumber: number,
            })
          }
          style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}>
          <Text style={styles.loginButtonText}>
            Already have an account?<Text style={styles.loginText}> Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NumberInput;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topView: {
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingVertical: 50,
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: 30,
    color: colors.text,
  },
  pageDescription: {
    color: colors.text,
  },
  inputsView: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputViewCover: {
    marginVertical: 5,
  },
  inputViewTitle: {
    fontWeight: "bold",
    color: colors.text,
    paddingVertical: 10,
  },
  inputView: {
    padding: 10,
    borderBottomColor: colors.grey,
    borderBottomWidth: 0.5,
    // backgroundColor: colors.line,
    width: Dimensions.get("window").width * 0.75,
    fontSize: 20,
    color: colors.text,
  },
  phoneNumberInputCover: {
    flexDirection: "row",
    alignContent: "center",
  },
  countryCodeView: {
    justifyContent: "center",
    width: Dimensions.get("window").width * 0.2,
    alignItems: "center",
  },
  countryCode: {
    color: colors.text,
    fontSize: 20,
  },
  button: {
    width: Dimensions.get("window").width * 0.9,
    alignSelf: "center",
    backgroundColor: colors.button,
    height: 50,
    marginVertical: 20,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: colors.buttonText,
    alignSelf: "center",
    fontSize: 16,
  },
  loginButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: colors.text,
  },
  loginText: {
    fontWeight: "bold",
  },
  navigationView: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
});
