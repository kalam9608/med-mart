import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../configs/colors";
import { ActivityIndicator } from "react-native-paper";
import Head from "../components/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import { get, getWithToken } from "../components/Api";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import Configs from "../configs/Configs";
import Loader from "../components/Loader";
const History = [
  {
    id: 1,
    name: "Dr.Sudha Menon",
    image:
      "https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg",
    InvoiceId: "20220928-001",
    experience: "40 years experience overall",
    fees: "₹12",
    address: "Baghajatin Road",
    hospital: "Fortis Hospital",
    Status: "Confirm",
  },
  {
    id: 2,
    name: "Dr. Siva Singh",
    image:
      "https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000",
    InvoiceId: "20220928-002",
    experience: "10 years experience overall",
    fees: "₹12",
    address: "Cuttack",
    hospital: "SCB Medical",
    Status: "Processing",
  },
  {
    id: 3,
    name: "Dr.Sudha Menon",
    image:
      "https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg",
    InvoiceId: "20220928-003",
    experience: "40 years experience overall",
    fees: "₹12",
    address: "Baghajatin Road",
    hospital: "Fortis Hospital",
    Status: "Confirm",
  },
  {
    id: 4,
    name: "Dr. Siva Singh",
    image:
      "https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000",
    InvoiceId: "20220928-004",
    experience: "10 years experience overall",
    fees: "₹12",
    address: "Cuttack",
    hospital: "SCB Medical",
    Status: "Confirm",
  },
  {
    id: 5,
    name: "Dr.Sudha Menon",
    image:
      "https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg",
    InvoiceId: "20220928-005",
    experience: "40 years experience overall",
    fees: "₹12",
    address: "Baghajatin Road",
    hospital: "Fortis Hospital",
    Status: "Processing",
  },
  {
    id: 6,
    name: "Dr. Siva Singh",
    image:
      "https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000",
    InvoiceId: "20220928-006",
    experience: "10 years experience overall",
    fees: "₹12",
    address: "Cuttack",
    hospital: "SCB Medical",
    Status: "Confirm",
  },
];
const BookingHistory = () => {
  const navigation = useNavigation();
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getWithToken("booking_history")
      .then((res) => {
        setBookingHistory(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const HandleMoreDetail = (item) => {
    navigation.navigate("BookingHistoryDetails", item);
  };
  const renderItem = ({ item }) => {
    const [datePart, timePart] = item?.booking_date.split(" ");
    const convertedDate = moment(datePart).format("DD-MM-YYYY");
    const convertedTime = moment(timePart, "HH:mm").format("LT");
    const status =
      item?.booking_status.charAt(0).toUpperCase() +
      item?.booking_status.slice(1);

    return (
      <TouchableOpacity
        style={styles.MainDiv}
        onPress={() => HandleMoreDetail(item)}
      >
        <View style={styles.MainUpperDiv}>
          <View style={styles.imageDiv}>
            <Image
              style={styles.image}
              source={{
                uri: `${Configs.IMG_BASE_URL}${item?.doctor?.profile_pic}`,
              }}
            />
          </View>
          <View style={styles.RightUpperDiv}>
            <Text style={styles.nameText}>{item?.doctor?.name}</Text>
            <Text style={styles.roleText}>
              <Text style={{ fontWeight: "bold" }}>Invoice Id: </Text>
              {item.invoice_no}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.roleText}>
                <Text style={{ fontWeight: "bold" }}>Platform Fees: </Text>
                {item?.platform_charge}/-{" "}
              </Text>
            </View>
            <Text style={[styles.roleText, { fontWeight: "bold" }]}>
              Booking Status:{" "}
              <Text
                style={{
                  fontWeight: "bold",
                  // fontSize: 16,
                  color:
                    item?.booking_status == "confirmed"
                      ? colors.green
                      : colors.red,
                }}
              >
                {status}
              </Text>
            </Text>
            <Text style={styles.roleText}>
              <Text style={{ fontWeight: "bold" }}>Booking Date:</Text>{" "}
              {convertedDate}
            </Text>
            {/* <Text style={styles.roleText}>
              <Text style={{ fontWeight: "bold" }}>Booking Time:</Text>{" "}
              {convertedTime}
            </Text> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.Loadercontainer}>
      <Head
        Icon={false}
        profile={true}
        leftIcon={"arrow-left"}
        title={"Booking History"}
      />
      <View style={{ backgroundColor: colors.primary, flex: 1 }}>
        {loading ? (
          <Loader size={60} color={colors.white} message={"Please Wait..."} />
        ) : (
          <FlatList data={bookingHistory} renderItem={renderItem} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Loadercontainer: {
    flex: 1,
  },
  MainDiv: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "white",
    marginVertical: 5,
    borderRadius: 10,
    marginHorizontal: 10,
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
  },
  roleText: {
    fontSize: 15,
  },
  experienceText: {
    fontSize: 17,
  },
  fees: {
    fontSize: 17,
    fontWeight: "500",
  },
  feesText: {
    fontSize: 17,
  },
  hospital: {
    fontSize: 17,
  },
  address: {
    fontSize: 17,
    fontWeight: "500",
  },
});

export default BookingHistory;
