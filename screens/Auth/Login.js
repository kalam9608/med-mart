import { useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Linking,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebaseConfig from "../../firebaseConfig";
import { useRef } from "react";
import { useState } from "react";
import { postFormData } from "../../components/Api";
import { useEffect } from "react";
import colors from "../../configs/colors";
import Button from "../../components/Button";
// import { useDispatch } from "react-redux";

export default function Login() {
  const navigation = useNavigation();
  const recaptchaVerifier = useRef();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validationError, setValidationError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const dispatch = useDispatch()
  const height =Dimensions.get("window").height
  useEffect(() => {
    setPhoneNumber("");
  }, []);
  function validateData() {
    const errors = {};
    if (phoneNumber == null) {
      errors.phoneNumber = "Mobile number is required";
    }
    if (phoneNumber == "") {
      errors.phoneNumber = "Mobile number is required";
    }
    if (phoneNumber != "") {
      if (phoneNumber?.length < 10) {
        errors.phoneNumber = "Mobile number should be 10 digit";
      }
    }

    setValidationError({});

    if (Object.keys(errors)?.length > 0) {
      setValidationError(errors);

      return false;
    }

    return true;
  }
  function verifyPhoneNumber() {
    setIsLoading(true);
    if (validateData() === false) {
      setIsLoading(false);
      return;
    } else {
      try {
        const formData = new FormData();
        formData.append("mobile", phoneNumber);

        postFormData("login", formData)
          .then((res) => {
            if (res?.success == true) {
              setIsLoading(false);
              navigation.navigate("LoginPassword", {
                mobile: phoneNumber,
              });
            } else {
              const phoneProvider = new firebaseConfig.auth.PhoneAuthProvider();
              phoneProvider
                .verifyPhoneNumber(
                  "+91" + phoneNumber,
                  recaptchaVerifier.current
                )
                .then((id) => {
                  setIsLoading(false);
                  navigation.navigate("Otp", {
                    phn: phoneNumber,
                    verificationId: id,
                  });
                })
                .catch((error) => {
                  alert(error);
                });
            }
          })
          .catch((e) => console.log(e));
      } catch (error) {
        alert(error);
      }
    }
  }
  const handleTermsCondition = () => {
      navigation.navigate("TermsConditions")
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig.app().options}
        attemptInvisibleVerification={false}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.Fstcontainer}>
            <View>
              <Text style={styles.LogoText}>Med Mart</Text>
            </View>
            <View style={styles.LogoImagecontainer}>
              <Image
                style={styles.LogoImage}
                source={
                  require('../../assets/pharma.jpg')
                }
              />
            </View>
            <View>
              <Text style={styles.Para}>
                <Text style={{ fontWeight: "600" }}>Book appointments</Text>{" "}
                with top specialists in{" "}
                <Text style={{ fontWeight: "600" }}>your city</Text>
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.getStartedText}>
              Let's get started! Enter your mobile number
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.inputText}>+91</Text>
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              placeholderTextColor={colors.ash}
              onChangeText={(value) => setPhoneNumber(value)}
              maxLength={10}
              keyboardType="numeric"
            />
          </View>
          <View style={{marginBottom:height*0.13}}>
          {validationError.phoneNumber && (
            <Text
              style={{ color: "red", marginHorizontal: 15, marginVertical: 10 }}
            >
              {validationError.phoneNumber}
            </Text>
          )}
          <Text style={styles.agreeText}>By continuing, you agree to our</Text>
          <TouchableOpacity onPress={handleTermsCondition}>
          <Text style={styles.TermsCondText}>Terms & Conditions</Text>
          </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{bottom: 10}}
      >
        <Button
          BtnText={"Signup"}
          onPress={verifyPhoneNumber}
          isLoading={isLoading}
          size={22}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Fstcontainer: {
    backgroundColor: colors.primary,
    height: Dimensions.get("window").height * 0.6,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  LogoText: {
    fontSize: 40,
    color: "white",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  LogoImagecontainer: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.3,
    alignSelf: "center",
    marginVertical: 10,
  },
  LogoImage: {
    width: "100%",
    height: "100%",
    borderRadius: 200,
  },
  Para: {
    color: "white",
    fontWeight: "300",
    fontSize: 25,
    textAlign: "center",
    marginVertical: 10,
  },
  getStartedText: {
    color: "grey",
    paddingVertical: 20,
    fontSize: 17,
    fontWeight: "bold",
    marginHorizontal: 15,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.ash,
    height: 60,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingLeft: 60,
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.92,
  },
  inputText: {
    position: "absolute",
    marginHorizontal: 15,
    paddingHorizontal: 10,
    color: "grey",
    borderRightWidth: 2,
    borderColor: colors.ash,
  },
  agreeText: {
    color: "#CAC8C4",
    marginHorizontal: 15,
    fontSize: 17,
  },
  TermsCondText: {
    color: "grey",
    marginHorizontal: 15,
    fontSize: 17,
    textDecorationLine: "underline",
  },
  signupBtnDiv: {
    backgroundColor: colors.primary,
    height: 55,
    marginHorizontal: 15,
    borderRadius: 7,
    justifyContent: "center",
    marginVertical: 20,
  },
  signupText: {
    color: "white",
    fontSize: 28,
    textAlign: "center",
  },
});
