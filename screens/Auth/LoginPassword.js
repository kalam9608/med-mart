import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { postFormData, postFormDataToken } from "../../components/Api";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { registerForPushNotificationsAsync, writeData } from "../../util/Util";
import colors from "../../configs/colors";
import Button from "../../components/Button";

export default function LoginPassword({ route }) {
  const data = route.params;
  const navigation = useNavigation();
  const [password, setPassword] = useState(null);
  const [Checkpassword, setCheckPassword] = useState(false);
  const [validationError, setValidationError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [deviceToken, setDeviceToken] = useState(null)

  const errors = {};
  const { setUserData, setIsLoggedin } = useContext(AppContext);

  const HandleChangeNum = () => {
    navigation.navigate("Login");
  };
  function validatePassword() {
    if (password == null) {
      errors.password = "Password is required";
    }
    if (password == "") {
      errors.password = "Password is required";
    }
    setValidationError({});

    if (Object.keys(errors)?.length > 0) {
      setValidationError(errors);

      return false;
    }

    return true;
  }

  const handleConfirm = () => {
    setIsLoading(true);
    if (validatePassword() === false) {
      setIsLoading(false);
      return;
    } else {
      const formData = new FormData();
      formData.append("mobile", data.mobile);
      formData.append("password", password);
      postFormData("check_login_password", formData)
        .then((res) => {
          if (res?.success) {
            writeData("user_data", res?.data);
            writeData("token", res?.data?.token);
            setUserData(res?.data);
            registerForPushNotificationsAsync()
            .then((res) => {
              console.warn(res, "<--------------device_token");
              setDeviceToken(res)
            })
            .catch((err) => {
              console.log(err,"<--------------device_token");
            });
            setIsLoggedin(true);
            setIsLoading(false);
          } else {
            errors.password = "Enter correct password";
            setValidationError(errors);
            setIsLoading(false);
            return;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const formData = new FormData();
    formData.append("firebase_token", deviceToken);

    postFormDataToken("update_profile", formData)
      .then((res) => {
        console.log("res for update=============>", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },[deviceToken])

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            <Text style={styles.getStartedText}>Enter your password</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor={colors.ash}
            onChangeText={(value) => setPassword(value)}
          />
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View>
              {validationError.password && (
                <Text
                  style={{
                    color: "red",
                    marginHorizontal: 15,
                    marginVertical: 10,
                  }}
                >
                  {validationError.password}
                </Text>
              )}
            </View>

            <Text style={styles.TermsCondText} onPress={HandleChangeNum}>
              Change Mobile Number
            </Text>
          </View>

          {/* <Text style={styles.agreeText}>Bycontinuing, you agree to our</Text>
          <Text style={styles.TermsCondText}>Terms & Conditions</Text> */}
          {/* <TouchableOpacity style={styles.signupBtnDiv} onPress={handleConfirm}>
            {isLoading ? <ActivityIndicator size='large' color='white' /> : (
              <Text style={styles.signupText}>Confirm</Text>
            )
            }
          </TouchableOpacity> */}
        </View>
      </ScrollView>
      <View style={{ bottom: 10 }}>
        <Button
          BtnText={"Confirm"}
          onPress={handleConfirm}
          isLoading={isLoading}
          size={22}
        />
      </View>
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
    paddingVertical: 10,
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
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.92,
    marginTop: 10,
    // marginBottom:40
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
    fontSize: 15,
    marginTop: 10,
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
  confirmBtn: {
    bottom: 0,
  },
});
