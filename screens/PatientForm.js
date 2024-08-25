import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import Head from "../components/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
import {
  getWithToken,
} from "../components/Api";
import colors from "../configs/colors";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";

export default function PatientForm({ route }) {
  const data = route.params;
  console.log(data, "*****");
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("add name");
  const [mobile, setMobile] = useState("add mobile");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("add email");
  const [gender, setGender] = useState("add gender");
  const [bloodGroup, setBloodGroup] = useState("add bloodGroup");
  const [dob, setDob] = useState("yyyy-mm-dd");
  const [address, setAddress] = useState("add address");
  const [disease, setDisease] = useState("add Disease");
  const [desp, setDesp] = useState("add Desp");
  const [validationError, setValidationError] = useState({});


  useEffect(() => {
    setIsLoading(true);
    getWithToken("edit_profile")
      .then((res) => {
        setUserData(res?.data);
        setId(res?.data?.id);
        setName(res?.data?.name);
        setMobile(res?.data?.mobile);
        setEmail(res?.data?.email);
        setGender(res?.data?.gender);
        setBloodGroup(res?.data?.blood_group);
        setDob(res?.data?.dob);
        setAddress(res?.data?.address);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSearch = () => {
    console.log("ok ok");
  }

  function validateData() {
    const errors = {};
    if (name == null) {
      errors.name = "Name is required";
    }
    if (name == "") {
      errors.name = "Name is required";
    }
    if (address == null) {
      errors.address = "Address is required";
    }
    if (address == "") {
      errors.address = "Address is required";
    }
    if (mobile == null) {
      errors.mobile = "Mobile number is required";
    }
    if (mobile == "") {
      errors.mobile = "Mobile number is required";
    }
    if (mobile != "") {
      if (mobile?.length < 10) {
        errors.mobile = "Mobile number should be 10 digit";
      }
    }

    setValidationError({});

    if (Object.keys(errors)?.length > 0) {
      setValidationError(errors);

      return false;
    }

    return true;
  }
  const HandleSave = () => {
    if (validateData() === false) {
      setIsLoading(false);
      return;
    } else {
      const patientDetail = {
        name: name,
        mobile: mobile,
        email: email,
        gender: gender,
        dob: dob,
        bloodGroup: bloodGroup,
        address: address,
        disease: disease,
        desp: desp
      }
      console.log(patientDetail, "patientDetail");
      navigation.navigate("BookingDetails", { patientDetail, data })
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <Head
          Icon={false}
          profile={true}
          leftIcon={"arrow-left"}
          title={"Patient Details"}
        />
        <ScrollView>
          <View>
            <View style={styles.addPhotoDiv}>
              <Text style={styles.textGrey}>Name</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                <TextInput
                  value={name}
                  editable={true}
                  onChangeText={(e) => setName(e)}
                />
              )}
            </View>
            {validationError.name && (
              <Text
                style={{ color: "red", marginHorizontal: 15, marginVertical: 10, textAlign: "right" }}
              >
                {validationError.name}
              </Text>
            )}
            <View style={styles.addPhotoDiv}>
              <Text style={styles.textGrey}>Mobile</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                <TextInput
                  value={mobile}
                  editable={true}
                  maxLength={10}
                  onChangeText={(e) => setMobile(e)}
                />
              )}
            </View>
            {validationError.mobile && (
              <Text
                style={{ color: "red", marginHorizontal: 15, marginVertical: 10, textAlign: "right" }}
              >
                {validationError.mobile}
              </Text>
            )}
            <View style={styles.addPhotoDiv}>
              <Text style={styles.textGrey}>Email</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                <TextInput
                  value={email}
                  editable={true}
                  onChangeText={(e) => setEmail(e)}
                />
              )}
            </View>
            <View style={styles.addPhotoDiv}>
              <Text style={styles.textGrey}>Gender</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                <TextInput
                  value={gender}
                  editable={true}
                  onChangeText={(e) => setGender(e)}
                />
              )}
            </View>
            <View style={styles.addPhotoDiv}>
              <Text style={styles.textGrey}>Date of Birth</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                <TextInput
                  value={dob}
                  editable={true}
                  onChangeText={(e) => setDob(e)}
                />
              )}
            </View>
            <View style={styles.addPhotoDiv}>
              <Text style={styles.textGrey}>Blood Group</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                <TextInput
                  value={bloodGroup}
                  editable={true}
                  onChangeText={(e) => setBloodGroup(e)}
                />
              )}
            </View>
            <View style={styles.addPhotoDiv}>
              <Text style={styles.textGrey}>Address</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                <TextInput
                  value={address}
                  editable={true}
                  onChangeText={(e) => setAddress(e)}
                />
              )}
            </View>
            {validationError.address && (
              <Text
                style={{ color: "red", marginHorizontal: 15, marginVertical: 10, textAlign: "right" }}
              >
                {validationError.address}
              </Text>
            )}
            <View style={styles.addPhotoDiv}>
              <Text style={styles.textGrey}>Disease Name</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                <TextInput
                  value={disease}
                  editable={true}
                  onChangeText={(e) => setDisease(e)}
                />
              )}
            </View>
            <View style={styles.addPhotoDiv}>
              <Text style={styles.textGrey}>Description</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                <TextInput
                  value={desp}
                  editable={true}
                  onChangeText={(e) => setDesp(e)}
                />
              )}
            </View>
          </View>
        </ScrollView>
        <View style={{ bottom: 10 }}>
          <Button onPress={HandleSave} BtnText={"Save"} size={22} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerDiv: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 60,
    marginTop: 30,
    alignItems: "center",
  },
  headerRightDiv: {
    width: Dimensions.get("window").width * 0.8,
  },
  editProfile: {
    fontSize: 25,
    textAlign: "center",
    paddingVertical: 15,
    fontWeight: "500",
  },
  addPhotoDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.ash,
  },
  addPhotoRightDiv: {
    width: 80,
    height: 80,
    backgroundColor: "#DCDEDD",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  addPhotoRightDivText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
    color: "#0091F7",
  },
  textGrey: {
    fontSize: 17,
    fontWeight: "500",
    color: colors.mediumGrey,
  },
  textGrey1: {
    width: Dimensions.get("window").width * 0.45,
    fontSize: 16,
    textAlign: "right",
    fontWeight: "500",
    color: colors.mediumGrey,
  },
  bookClinicBtn: {
    width: Dimensions.get("window").width * 0.92,
    backgroundColor: colors.primary,
    marginHorizontal: 15,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    alignSelf: "center",
    borderRadius: 7,
  },
  bookClinicBtnText: {
    color: "white",
    fontSize: 20,
  },
});
