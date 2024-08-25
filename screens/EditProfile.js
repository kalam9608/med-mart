import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
  Platform,
  ActivityIndicator,
  Button,
} from "react-native";
import Head from "../components/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
import {
  getWithToken,
  postFormData,
  postFormDataToken,
  putFormData,
} from "../components/Api";
import * as ImagePicker from "expo-image-picker";
import { useRef } from "react";
import colors from "../configs/colors";
import { getFileData, writeData } from "../util/Util";
import Configs from "../configs/Configs";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function EditProfile() {
  const { userData, setUserData } = useContext(AppContext);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState("add name");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("add email");
  const [gender, setGender] = useState("add gender");
  const [bloodGroup, setBloodGroup] = useState("add bloodGroup");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("add address");
  const [maritalStatus, setMaritalStatus] = useState("add maritalStatus");
  const [height, setHeight] = useState("add height");
  const [weight, setWeight] = useState("add weight");
  const [emergencyContact, setEmergencyContact] = useState(
    "add emergencyContact"
  );
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [validationError, setValidationError] = useState({});
  const errors = {};
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setSelectedDate(date.toISOString().split('T')[0]);
    hideDatePicker();
  };
  // function validatePassword() {
  //   if (email == null) {
  //     errors.email = "Email is required";
  //     alert("Email is required")
  //   }
  //   if (email == "") {
  //     errors.email = "Email is required";
  //     alert("Email is required")
  //   }
  //   if (name == null) {
  //     errors.name = "Name is required";
  //     alert("Name is required")
  //   }
  //   if (name == "") {
  //     errors.name = "Name is required";
  //     alert("Name is required")
  //   }
  //   setValidationError({});

  //   if (Object.keys(errors)?.length > 0) {
  //     setValidationError(errors);

  //     return false;
  //   }

  //   return true;
  // }
  const showToast = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      alert(message);
    }
  };

  const choosePhotos = async () => {
    let options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
      aspect: [4, 4],
    };

    ImagePicker.launchImageLibraryAsync(options).then((result) => {
      console.log("result=========>", result);
      if (!result.canceled) {
        let image = getFileData(result.assets[0]);
        console.log("pic-->", image);
        setImage(image);
        setProfileImage(null);
        setImageUri(result.assets[0].uri);
      }
    });
  };

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      setIsLoading(true);

      getWithToken("edit_profile")
        .then((res) => {
          console.log("res for edit profile============>", res);
          setUserData(res?.data);
          setId(res?.data?.id);
          setName(res?.data?.name);
          setEmail(res?.data?.email);
          setGender(res?.data?.gender);
          setBloodGroup(res?.data?.blood_group);
          setSelectedDate(res?.data?.dob);
          setAddress(res?.data?.address);
          // setImage(res?.data?.profile_pic);
          setProfileImage(res?.data?.profile_pic);
          setMaritalStatus(res?.data?.marital_status);
          setHeight(res?.data?.height);
          setWeight(res?.data?.weight);
          setEmergencyContact(res?.data?.emergency_contact);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err, "----------err-----------");
        });
    });

    return focusListener;
  }, [navigation]);

  const toggleEditability = () => {
    setEditable(!editable);
    showToast("Now you can edit your profile");
  };
  const currentDate = new Date();
  const handleEditProfile = () => {
    // if (!validatePassword()) {
    //   return;
    // }
    // else {
    setEditable(false);
    const formData = new FormData();
    if (id !== null) {
      formData.append("id", id);
    }
    if (name !== null) {
      formData.append("name", name);
    }
    if (email !== null) {
      formData.append("email", email);
    }
    if (gender !== null) {
      formData.append("gender", gender);
    }
    if (bloodGroup !== null) {
      formData.append("blood_group", bloodGroup);
    }
    if (selectedDate !== null) {
      formData.append("dob", selectedDate);
    }
    if (address !== null) {
      formData.append("address", address);
    }
    if (maritalStatus !== null) {
      formData.append("marital_status", maritalStatus);
    }
    if (height !== null) {
      formData.append("height", height);
    }
    if (weight !== null) {
      formData.append("weight", weight);
    }
    if (emergencyContact !== null) {
      formData.append("emergency_contact", emergencyContact);
    }
    if (image !== null) {
      formData.append("profile_pic", {
        uri: image?.uri,
        name: image?.name,
        type: image?.type,
      });
    }
    // console.log( "=============formData",formData,);
    // return
    postFormDataToken("update_profile", formData)
      .then((res) => {
        console.log("res for update=============>", res);
        setUserData(res?.data);
        writeData("user_data", res?.data)
        setImage(res?.data?.profile_pic);
        showToast("Profile updated sucessfully");
        navigation.navigate("Dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  };
  const handleChange = () => {
    console.log("dhfhdsfgvb");
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <Head
          Icon={false}
          profile={true}
          leftIcon={"arrow-left"}
          title={
            isLoading ? (
              <ActivityIndicator size="large" color={colors.ash} />
            ) : (
              name
            )
          }
        />
        <ScrollView>
          <Text style={styles.editProfile}>Edit Profile</Text>
          <View>
            <View style={styles.addPhotoDiv}>
              <View>
                <Text style={styles.textGrey}>Name</Text>
                {isLoading ? (
                  <ActivityIndicator size="large" color={colors.ash} />
                ) : (
                  <>
                    <TextInput
                      style={{ fontSize: 18 }}
                      value={name}
                      editable={editable}
                      onChangeText={setName}
                    />

                  </>
                )}
              </View>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                <>
                  {profileImage || imageUri ? (
                    <TouchableOpacity
                      disabled={!editable}
                      onPress={() => choosePhotos()}
                    >
                      {imageUri ? (
                        <Image
                          source={{
                            uri: `${imageUri}`,
                          }}
                          style={styles.addPhotoRightDiv}
                        />
                      ) : (
                        <Image
                          source={{
                            uri: `${Configs.IMG_BASE_URL}${profileImage}`,
                          }}
                          style={styles.addPhotoRightDiv}
                        />
                      )}
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.addPhotoRightDiv}
                      onPress={() => choosePhotos()}
                      disabled={!editable}
                    >
                      <Text style={styles.addPhotoRightDivText}>add photo</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
            <View style={styles.addPhotoDiv}>
              <Text style={styles.textGrey}>Contact Number</Text>
              {/* <TextInput placeholder="+91-9874651230"/> */}
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                <Text style={{ fontSize: 16 }}>+91-{userData?.mobile}</Text>
              )}
            </View>
            <View style={styles.addPhotoDiv}>
              <Text style={styles.textGrey}>Email Id</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                <>
                  <TextInput
                    value={email}
                    editable={editable}
                    onChangeText={setEmail}
                  />
                </>
              )}
            </View>
            <View style={styles.addPhotoDiv}>
              <Text style={styles.textGrey}>Gender</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                <TextInput
                  value={gender}
                  editable={editable}
                  onChangeText={setGender}
                />
              )}
            </View>
            <View style={styles.addPhotoDiv}>
              <Text style={styles.textGrey}>Date of Birth</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                // <TextInput
                //   value={dob}
                //   editable={editable}
                //   onChangeText={setDob}
                //   placeholder="yyyy-mm-dd"
                // />
                <View>
                  {editable ? (
                    <TouchableOpacity onPress={showDatePicker}>
                      <Text>{selectedDate || 'Select Date'}</Text>
                    </TouchableOpacity>
                  )
                    : (
                        <Text style={{color:colors.mediumGrey}}>{selectedDate || 'Select Date'}</Text>
                    )}
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    maximumDate={currentDate}
                  />
                </View>
              )}
            </View>
            <View style={styles.addPhotoDiv}>
              <Text style={styles.textGrey}>Blood Group</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                <TextInput
                  value={bloodGroup}
                  editable={editable}
                  onChangeText={setBloodGroup}
                />
              )}
            </View>
            <View style={styles.addPhotoDiv}>
              <Text style={styles.textGrey}>Marital Status</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                <TextInput
                  value={maritalStatus}
                  editable={editable}
                  onChangeText={setMaritalStatus}
                />
              )}
            </View>
            <View style={styles.addPhotoDiv}>
              <Text style={styles.textGrey}>Height</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                <TextInput
                  value={height}
                  editable={editable}
                  onChangeText={setHeight}
                />
              )}
            </View>
            <View style={styles.addPhotoDiv}>
              <Text style={styles.textGrey}>Weight</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                <TextInput
                  value={weight}
                  editable={editable}
                  onChangeText={setWeight}
                />
              )}
            </View>
            <View style={styles.addPhotoDiv}>
              <Text style={styles.textGrey}>Emergency Contact</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                <TextInput
                  value={emergencyContact}
                  editable={editable}
                  onChangeText={setEmergencyContact}
                />
              )}
            </View>
            <View style={styles.addPhotoDiv}>
              <Text style={styles.textGrey}>Location</Text>
              {isLoading ? (
                <ActivityIndicator size="large" color={colors.ash} />
              ) : (
                <TextInput
                  value={address}
                  editable={editable}
                  onChangeText={setAddress}
                />
              )}
            </View>
          </View>
        </ScrollView>
        {editable ? (
          <TouchableOpacity
            style={styles.bookClinicBtn}
            onPress={handleEditProfile}
          >
            <Text style={styles.bookClinicBtnText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.bookClinicBtn}
            onPress={toggleEditability}
          >
            <Text style={styles.bookClinicBtnText}>Edit</Text>
          </TouchableOpacity>
        )}
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
    paddingVertical: 25,
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
