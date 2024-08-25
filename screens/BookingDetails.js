import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  ToastAndroid,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import colors from "../configs/colors";
import { ActivityIndicator } from "react-native-paper";
import Head from "../components/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import { get, getWithToken, postFormDataToken, postWithToken } from "../components/Api";
import Button from "../components/Button";
import moment from "moment";
import { AppContext } from "../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import PaymentScreen from "./Payment";

const BookingDetails = ({ route }) => {
  const data = route.params;
  console.log(data, "datadata");
  const { userData } = useContext(AppContext);
  const navigation = useNavigation();
  const [bookingDate, setBookingDate] = useState(null)
  const [bookingTime, setBookingTime] = useState(null)
  const [transId, setTransId] = useState(null)
  const [platformCharge, setPlatformCharge] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    const convertedDate = moment(data?.data?.item?.start_date).format("DD MMM YYYY");
    setBookingDate(convertedDate)
    setBookingTime(data?.data?.item?.start_time)

    getWithToken(`doctor/${data?.data?.data?.item?.id}/show?app_user_id=${userData?.id}`)
      .then((res) => {

        // console.log("------------------------->doctor rs",res?.data)
        setSelectedDoctor(res?.data);
        setTransId(res?.data?.transaction?.id)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    getWithToken("settings")
      .then((res) => {
        console.log(res?.data)
        setPlatformCharge(res?.data[0]?.platform_charge)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const showToast = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      alert(message);
    }
  };

  const handleBookingCreation = () => {
    setModalVisible(true)
    // console.log(selectedDoctor,"<---------------------selectedDoctor");
  }

  const closeModal = () => {
    setModalVisible(false)
    getWithToken(`doctor/${data?.data?.data?.item?.id}/show?app_user_id=${userData?.id}`)
      .then((res) => {
        console.log(res?.data, "last transcatsgrjgj");
        if (res?.data?.hasOwnProperty('transaction')) {
          const formData = new FormData();
          if (data?.data?.data?.item?.clinic_id !== null) {
            formData.append("clinic_id", data?.data?.data?.item?.clinic_id);
          }
          if (data?.data?.data?.item?.id !== null) {
            formData.append("doctor_id", data?.data?.data?.item?.id);
          }
          if (data?.data?.data?.item?.id !== null) {
            formData.append("doctor_slot_id", data?.data?.item?.id);
          }
          if (data?.data?.item?.start_date !== null) {
            formData.append("booking_date", data?.data?.item?.start_date);
          }
          if (data?.patientDetail?.disease !== null) {
            formData.append("disease_name", data?.patientDetail?.disease);
          }
          if (data?.patientDetail?.name !== null) {
            formData.append("patient_name", data?.patientDetail?.name);
          }
          if (data?.patientDetail?.gender !== null) {
            formData.append("patient_gender", data?.patientDetail?.gender);
          }
          if (data?.patientDetail?.mobile !== null) {
            formData.append("patient_mobile", data?.patientDetail?.mobile);
          }
          if (data?.patientDetail?.email !== null) {
            formData.append("patient_email", data?.patientDetail?.email);
          }
          if (data?.patientDetail?.dob !== null) {
            formData.append("patient_dob", data?.patientDetail?.dob);
          }
          if (data?.patientDetail?.address !== null) {
            formData.append("patient_address", data?.patientDetail?.address);
          }
          if (data?.patientDetail?.bloodGroup !== null) {
            formData.append("patient_blood_group", data?.patientDetail?.bloodGroup);
          }
          if (data?.data?.data?.item?.aadhar_no !== null) {
            formData.append("aadhar_no", data?.data?.data?.item?.aadhar_no);
          }
          if (data?.data?.data?.item?.booking_amount !== null) {
            formData.append("booking_amount", data?.data?.data?.item?.booking_amount);
          }
          if (data?.data?.data?.item?.fees !== null) {
            formData.append("full_amount", data?.data?.data?.item?.fees);
          }
          if (res?.data?.transaction?.id !== null) {
            formData.append("transaction_id", res?.data?.transaction?.id);
          }
          if (platformCharge !== null) {
            formData.append("platform_charge", platformCharge);
          }
          formData.append("remaining_amount", "");
          formData.append("aadhar_no", "");
          formData.append("booking_status", "pending");
          formData.append("patient_profile_pic", "");
          formData.append("adhar_card_front", "");
          formData.append("adhar_card_back", "");
          formData.append("doc", "");
          formData.append("description", "");
          console.log(formData);
          postFormDataToken("booking_creation", formData)
            .then((res) => {
              console.log(res?.data, "booking_creation");
              // setTimeout(() => {
              if (res?.success) {
                showToast("Booking created successfully");
                navigation.navigate("BookingViewDetails", { Details: res?.data })
              }
              // }, 2000);
            })
            .catch(err => {
              console.log(err);
            })
        }
        else {
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };
  const HandleChange = () => {
    navigation.goBack();
    navigation.goBack();
  };
  return (
    <>
      <SafeAreaView style={styles.Loadercontainer}>
        <Head
          Icon={false}
          profile={true}
          leftIcon={"arrow-left"}
          title={"Booking Details"}
        />
        <View style={styles.MainDiv}>
          <View style={styles.MainUpperDiv}>
            <View style={styles.imageDiv}>
              <Image
                style={styles.image}
                source={{
                  uri: `https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg`,
                }}
              />
            </View>
            <View style={styles.RightUpperDiv}>
              <Text style={styles.nameText}>{data?.data?.data?.item?.name}</Text>
              <Text style={styles.roleText}>{data?.data?.data?.item?.specialization?.name}</Text>
              <Text style={styles.experienceText}>
                {data?.data?.data?.item?.experience_in_year} years experience overall
              </Text>
              <Text style={styles.feesText}>
                <Text style={styles.fees}>₹{data?.data?.data?.item?.fees} </Text> Consultation Fees
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.clinicCard}>
          <View style={styles.clinicCardTopDiv}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.clinicCardIconDiv}>
                <MaterialCommunityIcons
                  name="home-plus-outline"
                  size={24}
                  color={colors.primary}
                />
              </View>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                In-clinic Appointment
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>₹{data?.data?.data?.item?.fees} Fees</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 20,
              paddingHorizontal: 15,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="calendar" size={15} color="black" />
              <Text style={{ marginLeft: 5 }}>{bookingDate}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="clock" size={15} color="black" />
              <Text style={{ marginLeft: 5 }}>On {bookingTime}</Text>
            </View>
          </View>
          <Text
            style={{
              color: colors.themeBlue,
              paddingBottom: 20,
              paddingHorizontal: 15,
              fontWeight: "500",
            }}
            onPress={HandleChange}
          >
            Change Date & Time
          </Text>
        </View>
      </SafeAreaView>
      <View style={{ bottom: 20 }}>
        <Button BtnText={"CONFIRM"} size={22} onPress={handleBookingCreation} />
      </View>

      {isModalVisible && (
        <PaymentScreen onClose={closeModal} item={selectedDoctor} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  Loadercontainer: {
    flex: 1,
  },
  MainDiv: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.ash,
  },
  MainUpperDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  imageDiv: {
    height: 100,
    width: 100,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  RightUpperDiv: {
    width: Dimensions.get("window").width * 0.6,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "500",
    // marginLeft: 15,
  },
  roleText: {
    fontSize: 15,
    // marginLeft: 15,
  },
  clinicCard: {
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: colors.ash,
    marginHorizontal: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  clinicCardTopDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 15,
    backgroundColor: colors.primaryLight,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignItems: "center",
  },
  clinicCardIconDiv: {
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 50,
    marginRight: 5,
  },
  despDiv: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderWidth: 0.7,
    borderColor: colors.ash,
  },
  despDivPara1: {
    fontSize: 18,
    lineHeight: 25,
  },
});

export default BookingDetails;