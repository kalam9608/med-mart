import { useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import firebase from "../../firebaseConfig";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { useEffect, useRef } from "react";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useState } from "react";
import firebaseConfig from "../../firebaseConfig";
import colors from "../../configs/colors";
import Button from "../../components/Button";

export default function Otp({ route }) {
  const navigation = useNavigation();
  const data = route.params;
  // const [verificationId, setVerificationId] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const recaptchaVerifier = useRef();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [resendOtp, setResendOtp] = useState(false);
  const ref = useBlurOnFulfill({ otp, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    otp,
    setOtp,
  });
  const [validationError, setValidationError] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  const goBack = () => navigation.goBack();
  const errors = {};

  useEffect(() => {
    // setVerificationId(data.verificationId);
    setPhoneNumber(data.phn);
  }, []);

  function validateOtp() {
    if (otp == null) {
      errors.otp = "OTP is required";
    }
    if (otp == "") {
      errors.otp = "OTP is required";
    }
    if (otp != "") {
      if (otp?.length < 5) {
        errors.otp = "OTP should be 6 digit";
      }
    }

    setValidationError({});

    if (Object.keys(errors)?.length > 0) {
      setValidationError(errors);

      return false;
    }

    return true;
  }

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      setResendOtp(true);
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);
  const handleResendOtp = () => {
    setOtp("")
    try {
      const phoneProvider = new firebaseConfig.auth.PhoneAuthProvider();
      phoneProvider
        .verifyPhoneNumber("+91" + phoneNumber, recaptchaVerifier.current)
        .then((id) => {
          // setVerificationId(id);
          setTimer(30);
        })
        .catch((error) => {
          alert(error);
        });
    } catch (error) {
      alert(error);
    }
  };
  const handleVerifyOTP = (otp) => {
    setIsLoading(true);
    if (validateOtp() === false) {
      setIsLoading(false);
      return;
    } else {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        data.verificationId,
        otp
      );

      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          setIsLoading(false);
          navigation.navigate("Password", {
            mobile: data.phn
          });
        })
        .catch((error) => {
          console.log("error-->", error);
          setIsLoading(false);
          errors.otp = "Wrong OTP entered";
          setValidationError(errors);
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
        attemptInvisibleVerification={false}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Feather name="arrow-left" size={30} color="black" onPress={goBack} />
        </View>
        <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 15 }}>
          Enter the 6-digit OTP sent to
        </Text>
        <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 15 }}>
          +91{data.phn}
        </Text>
        <CodeField
          ref={ref}
          {...props}
          value={otp}
          onChangeText={setOtp}
          cellCount={6}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View style={styles.cellwrap}>
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
        {validationError.otp && (
          <Text
            style={{ color: "red", marginHorizontal: 15, marginVertical: 10 }}
          >
            {validationError.otp}
          </Text>
        )}
        <View style={styles.timmingDiv}>
          {resendOtp && (
            <Text style={styles.timeText}>
              Didn't receive the code?{" "}
              <Text style={styles.ResendText} onPress={handleResendOtp}>
                Resend
              </Text>
            </Text>
          )}
          <Text style={styles.timeText}>{timer} sec</Text>
        </View>
      </View>
      <View style={{ bottom: 10 }}>
        <Button BtnText={'Continue'} size={22} onPress={() => handleVerifyOTP(otp)} isLoading={isLoading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingLeft: 15,
  },
  inputsDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    marginHorizontal: 15,
  },
  inputs: {
    borderWidth: 2,
    borderColor: colors.ash,
    width: Dimensions.get("window").width * 0.12,
    borderRadius: 15,
    height: 65,
    fontSize: 30,
    textAlign: "center",
  },
  timmingDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  timeText: {
    fontSize: 17,
    color: "grey",
    fontWeight: "500",
  },
  ResendText: {
    color: "#0091F7",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupBtnDiv: {
    position: "absolute",
    bottom: 0,
    width: Dimensions.get("window").width * 0.92,
    backgroundColor: colors.primary,
    height: 55,
    marginHorizontal: 15,
    borderRadius: 7,
    justifyContent: "center",
    marginVertical: 20,
  },
  signupText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  codeFieldRoot: {
    marginVertical: 20,
    marginHorizontal: 15,
  },
  cellwrap: {
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width * 0.12,
    borderRadius: 15,
    height: 65,
    borderWidth: 2,
    borderColor: colors.ash,
  },
  cell: {
    fontSize: 35,
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});
