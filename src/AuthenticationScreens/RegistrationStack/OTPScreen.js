import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../globals/colors";

const OTPScreen = ({ route }) => {
  const navigation = useNavigation();
  const { codedNumber } = route.params;
  const number = codedNumber;
  const [otpArray, setOtpArray] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  // console.log(number);
  // const [code, setCode] = useState(null);

  // TextInput refs to focus programmatically while entering OTP
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);

  const code = otpArray.join("");

  const refCallback = (textInputRef) => (node) => {
    textInputRef.current = node;
  };

  //autofocus input on next value
  const onOtpChange = (index) => {
    return (value) => {
      if (isNaN(Number(value))) {
        // do nothing when a non digit is pressed
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);

      // auto focus to next InputText if value is not blank
      if (value !== "") {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        }
      }
    };
  };

  //clear inout and go back to previous input automatically
  const onOtpKeyPress = (index) => {
    return ({ nativeEvent: { key: value } }) => {
      // auto focus to previous InputText if value is blank and existing value is also blank
      if (value === "Backspace" && otpArray[index] === "") {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        }

        if (index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = ""; // clear the previous box which will be in focus
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  const confirmOtp = () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.topView}>
        <Text style={styles.pageTitle}>OTP Confirmation.</Text>
        <Text style={styles.pageDescription}>
          Enter the confirmation code sent to your device.{" "}
        </Text>
      </View>

      <View style={styles.inputCover}>
        {[
          firstTextInputRef,
          secondTextInputRef,
          thirdTextInputRef,
          fourthTextInputRef,
        ].map((textInputRef, index) => (
          <TextInput
            ref={textInputRef}
            style={styles.singleInput}
            value={otpArray[index]}
            onChangeText={onOtpChange(index)}
            onKeyPress={onOtpKeyPress(index)}
            keyboardType={"numeric"}
            maxLength={1}
            refCallback={refCallback(textInputRef)}
            autoFocus={index === 0 ? true : undefined}
            key={index}></TextInput>
        ))}
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>Didn't get the code? </Text>
          <TouchableOpacity>
            <Text style={styles.resendButton}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.mainButton} onPress={confirmOtp}>
            <View>
              <Text
                style={{
                  color: "white",
                  paddingHorizontal: 20,
                  alignSelf: "center",
                  paddingVertical: 10,
                  fontSize: 20,
                }}>
                Continue
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default OTPScreen;

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

  headerText: {
    color: colors.text,
  },
  number: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  inputCover: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
    height: 80,
    // alignItems: 'center',
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  singleInput: {
    backgroundColor: colors.background,
    marginHorizontal: 10,
    width: Dimensions.get("window").width * 0.17,
    borderBottomWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    textAlign: "center",
    color: colors.text,
    // padding: 15,
  },
  text: {
    marginVertical: 20,
    color: colors.text,
  },
  resendButton: {
    marginVertical: 20,
    color: colors.primary,
  },
  mainButton: {
    backgroundColor: colors.text,
    width: Dimensions.get("window").width * 0.9,
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  logo: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.3,
    resizeMode: "contain",
    marginVertical: 50,
  },
});
