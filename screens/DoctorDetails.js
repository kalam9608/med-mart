import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Head from "../components/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../configs/colors";
import Button from "../components/Button";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { getWithToken, postFormDataToken } from "../components/Api";
import Loader from "../components/Loader";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";

// const dates = ["2023-07-27", "2023-07-28", "2023-07-29"];
// const slots = {
//   "2023-07-27": ["10:00 AM", "11:00 AM", "2:00 PM","3:00 AM", "4:00 AM", "5:00 PM"],
//   "2023-07-28": ["9:00 AM", "12:00 PM", "3:00 PM"],
//   "2023-07-29": ["11:00 AM", "1:00 PM"],
// };
const dates = [
  "1 July",
  "2 July",
  "3 July",
  "4 July",
  "5 July",
  "6 July",
  "7 July",
  "8 July",
  "9 July",
  "10 July",
  "11 July",
  "12 July",
  "13 July",
  "14 July",
  "15 July",
];
const slots = {
  "1 July": [
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "3:00 AM",
    "5:00 AM",
    "7:00 PM",
  ],
  "2 July": ["9:00 AM", "12:00 PM", "3:00 PM"],
  "3 July": ["11:00 AM"],
  "4 July": ["10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
  "5 July": [],
  "6 July": ["11:00 AM", "1:00 PM", "4:00 PM", "2:00 PM", "10:00 AM"],
  "7 July": [],
  "8 July": ["9:00 AM"],
  "9 July": ["11:00 AM"],
  "10 July": ["10:00 AM", "11:00 AM", "2:00 PM"],
  "11 July": [],
  "12 July": ["11:00 AM", "1:00 PM", "4:00 PM"],
  "13 July": [
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "4:00 PM",
    "6:00 AM",
    "8:00 AM",
    "9:00 PM",
  ],
  "14 July": ["9:00 AM", "12:00 PM", "3:00 PM"],
  "15 July": ["11:00 AM", "1:00 PM", "4:00 PM", "4:00 PM"],
};

export default function DoctorDetails({ route }) {
  const data = route.params;
  const navigation = useNavigation();
  const [detailsData, setDetailsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fav, setFav] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [doctorDetail, setDoctorDetail] = useState([]);
  const selectedSlots = slots[selectedDate];
  const { userData } = useContext(AppContext);

  useEffect(() => {
    setLoading(true);
    getWithToken(`doctor/${data?.id}/show?app_user_id=${userData?.id}`)
      .then((res) => {
        console.log(res?.data?.is_favourite, "doctor/1/show/doctor/1/show");
        setDoctorDetail(res?.data);
        if (res?.data?.is_favourite == true) {
          setFav(true);
        } else {
          setFav(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleClick = () => {
    setFav(!fav);
    const formData = new FormData();
    formData.append("doctor_id", data?.item?.id);
    formData.append("is_fav", fav ? 0 : 1);
    postFormDataToken("favourite/store", formData)
      .then((res) => {
        if (res?.status) {
          setFav(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setLoading(true);
    getWithToken(`clinic/${data?.item?.actual_clinic_id}/details`)
      .then((res) => {
        setDetailsData(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const shareContent = async () => {
    try {
      const imageUrl =
        "https://www.fingerlakes1.com/wp-content/uploads/2021/08/auto-draft-71.jpg";
      const result = await Share.share({
        message: `${data.item.name}\nRole: ${data.item.role}\nSpecification: MD General Medicine\nExperience: ${data.item.experience}`,
        url: imageUrl,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  const handleVisit = () => {
    let item = data?.item;
    navigation.navigate("ClinicVisit", { item });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <Loader size={60} color={colors.primary} message={"Please Wait..."} />
      ) : (
        <View style={styles.mainContainer}>
          <Head
            Icon={false}
            profile={true}
            leftIcon={"arrow-left"}
            details={true}
            lstFstIcon={fav ? "star" : "staro"}
            lstSndIcon={"share-2"}
            title={doctorDetail?.name}
            onLstFstIcon={handleClick}
            onlstSndIcon={shareContent}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.MainUpperDiv}>
              <View style={styles.imageDiv}>
                <Image
                  style={styles.image}
                  source={{
                    uri:
                      "https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg",
                  }}
                />
              </View>
              <View style={styles.RightUpperDiv}>
                <Text style={styles.nameText}>{doctorDetail?.name}</Text>
                <Text style={styles.roleText}>
                  {doctorDetail?.specialization?.name}
                </Text>
                <Text style={styles.experienceText}>
                  {doctorDetail?.experience_in_year} years experience overall
                </Text>
                <Text style={styles.feesText}>
                  <Text style={styles.fees}>₹{doctorDetail?.fees}</Text>{" "}
                  Consultation Fees
                </Text>
              </View>
            </View>
            <View style={styles.clinicCard}>
              <View style={styles.clinicCardTopDiv}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.clinicCardIconDiv}>
                    <MaterialCommunityIcons
                      name='home-plus-outline'
                      size={24}
                      color={colors.primary}
                    />
                  </View>
                  <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    In-clinic Appointment
                  </Text>
                </View>
                <View>
                  <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    ₹{data.item.fees} Fees
                  </Text>
                </View>
              </View>
              {data?.item?.clinic_id !== null ? (
                <View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
                  <Text style={{ fontSize: 17, fontWeight: "600" }}>
                    {detailsData[0]?.name}
                  </Text>
                  <Text style={{ fontSize: 17 }}>{data.item.address}</Text>
                </View>
              ) : null}
            </View>

            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  marginHorizontal: 15,
                  marginVertical: 15,
                }}
              >
                More about {data.item.name}
              </Text>

              <View style={styles.despDiv}>
                <Text style={styles.despDivPara1}>
                  {doctorDetail?.description}
                </Text>
              </View>
            </View>
          </ScrollView>
          {/* <TouchableOpacity style={styles.bookClinicBtn}>
            <Text style={styles.bookClinicBtnText}>Book Clinic Visit</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity style={{ bottom: 10 }}>
            <Button
              BtnText={"Book Clinic Visit 12 Rupees for Platfom Charge"}
              size={15}
              onPress={handleVisit}
            />
          </TouchableOpacity> */}
        </View>
      )}
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
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width * 0.2,
  },
  MainUpperDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#D6D8D7",
  },
  imageDiv: {
    width: 100,
    height: 100,
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
    fontSize: 17,
  },
  experienceText: {
    fontSize: 17,
    fontWeight: "500",
  },
  fees: {
    fontSize: 17,
    fontWeight: "500",
  },
  feesText: {
    fontSize: 17,
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
  clinicSections: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: "center",
    borderBottomWidth: 0.7,
    borderColor: colors.ash,
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
