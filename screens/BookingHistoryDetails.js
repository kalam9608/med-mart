import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import colors from "../configs/colors";
import Head from "../components/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import Configs from "../configs/Configs";
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
const BookingHistoryDetails = ({ route }) => {
  const data = route.params;
  console.log(data, "{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}");
  const status =
    data?.doctor?.status.charAt(0).toUpperCase() +
    data?.doctor?.status.slice(1);
  const [datePart, timePart] = data?.booking_date.split(" ");
  const convertedDate = moment(datePart).format("DD-MM-YYYY");
  const convertedTime = moment(timePart, "HH:mm").format("LT");
  const confirm =
    data?.booking_status.charAt(0).toUpperCase() +
    data?.booking_status.slice(1);
  return (
    <SafeAreaView style={styles.Loadercontainer}>
      <Head
        Icon={false}
        profile={true}
        leftIcon={"arrow-left"}
        title={"Booking History Details"}
      />
      <View style={{ backgroundColor: colors.primary, flex: 1 }}>
        <View style={styles.MainDiv}>
          {data?.clinic ? (
            <>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                Clinic's Details
              </Text>
              <View style={styles.MainUpperDiv}>
              <View style={styles.imageDiv}>
              <Image
                style={styles.image}
                source={{
                  uri: `https://images.squarespace-cdn.com/content/v1/56f2595e8a65e2db95a7d983/1519477300151-60MN9OMXJSZEWL1G5L5M/Designing+A+Doctor%27s+Clinic+%286%29.jpg?format=1500w`,
                }}
              />
            </View>
                <View style={styles.RightUpperDiv}>
                  <Text style={styles.nameText}>{data?.clinic?.name}</Text>
                  <Text style={styles.roleText}>
                    {data?.clinic?.address}
                  </Text>
                </View>
              </View>
            </>
          )
            : (
              null
            )}
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Doctor's Details
          </Text>
          <View style={styles.MainUpperDiv}>
            <View style={styles.imageDiv}>
              <Image
                style={styles.image}
                source={{
                  uri: `${Configs.IMG_BASE_URL}${data?.doctor?.profile_pic}`,
                }}
              />
            </View>
            <View style={styles.RightUpperDiv}>
              <Text style={styles.nameText}>{data?.doctor?.name}</Text>
              <Text style={[styles.roleText]}>{data?.doctor?.specialization?.name}</Text>
              <Text style={styles.experienceText}>
                {data?.doctor?.experience_in_year} years experience overall
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Patient's Details
          </Text>
          <View style={styles.MainUpperDiv}>
            {/* <View style={styles.imageDiv}>
              <Image
                style={styles.image}
                source={{
                  uri: data?.patient_profile_pic ? `${Configs.IMG_BASE_URL}${data?.patient_profile_pic}`
                   : "https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000",
                }}
              />
            </View> */}
            <View style={styles.RightUpperDiv}>
              <Text style={styles.nameText}>{data?.patient_name}</Text>
              <Text style={styles.roleText}>
                <Text style={{ fontWeight: "bold" }}>Invoice Id: </Text>
                {data?.invoice_no}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.roleText}>
                  <Text style={{ fontWeight: "bold" }}>Platform Fees: </Text>
                  {data?.platform_charge}/-
                </Text>
              </View>
              <Text style={[styles.roleText, { fontWeight: "bold" }]}>
                Booking Status: <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    color: data?.booking_status == "confirmed" ? colors.green : colors.red,
                  }}
                >
                  {confirm}
                </Text>
              </Text>
              <Text style={styles.roleText}>
                <Text style={{ fontWeight: "bold" }}>Booking Date:</Text> {convertedDate}
              </Text>
              {/* <Text style={styles.roleText}>
                <Text style={{ fontWeight: "bold" }}>Booking Time:</Text> {convertedTime}
              </Text> */}
            </View>
          </View>
        </View>
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
    paddingVertical: 10,
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  MainUpperDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
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

export default BookingHistoryDetails;
