import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import Head from "../components/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../configs/colors";
import Button from "../components/Button";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { get, getWithToken, postFormDataToken } from "../components/Api";
import Loader from "../components/Loader";
import MapView from "react-native-maps";
import { extractCoordinatesFromGoogleMapsURL } from "../util/Util";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { AppContext } from "../context/AppContext";
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
export default function ClinicVisit({ route }) {
  const data = route.params;
  const { userData } = useContext(AppContext)
  const [detailsData, setDetailsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fav, setFav] = useState(false);
  const [slot, setSlot] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [doctorDetail, setDoctorDetail] = useState([]);

  useEffect(()=>{
    const curtTime = moment(new Date()).format("HH:mm:ss")
    const filterValue=selectedSlots.filter((item)=>{return item?.start_time >curtTime
    })
    setSelectedSlots(filterValue)
  },[slot])

  const navigation = useNavigation();
  useEffect(() => {
    setLoading(true);
    getWithToken(`doctor/${data?.id}/show?app_user_id=${userData?.id}`)
      .then((res) => {
        // console.log(res, "doctor/1/show/doctor/1/show");
        setDoctorDetail(res?.data)
        if (res?.data?.is_favourite == true) {
          setFav(true)
        }
        else {
          setFav(false)
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
  }, [])
  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setSlot(true)
    getWithToken(`doctor-slot/doctor/${data?.item?.id}/date/${date}`)
      .then((res) => {
        setSelectedSlots(res?.data);
        setSlot(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const today = new Date();
  const AllDates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    AllDates.push(formattedDate);
  }

  const handleDetailsForm = (item) => {
    // console.log(item,"slots");
    navigation.navigate("PatientForm", { item, data });
  };

  const renderTab = ({ item }) => {
    const convertedDate = moment(item).format("DD-MM-YYYY");
    const formattedDate = moment(convertedDate, "DD-MM-YYYY").format("D MMM YY");
    const slotCount = selectedSlots.length;
    const slotText =
      slotCount === 0
        ? "No slots"
        : `${slotCount} slot${slotCount !== 1 ? "s" : ""}`;

    return (
      <TouchableOpacity
        style={{
          borderBottomWidth: item === selectedDate ? 5 : 1,
          borderTopWidth: 1,
          borderTopColor: colors.ash,
          borderBottomColor:
            item === selectedDate ? colors.primary : colors.ash,
          paddingHorizontal: 30,
          paddingVertical: 15,
        }}
        onPress={() => handleDateSelection(item)}
      >
        <Text
          style={{
            color: item === selectedDate ? colors.primary : colors.dark,
            fontWeight: "bold",
          }}
        >
          {formattedDate}{" "}
          {item === selectedDate && slot == false ? (
            <Text
              style={{
                color: slotCount !== 0 ? colors.green : colors.grey,
                fontWeight: "400",
              }}
            >
              {slotText}
            </Text>
          ) : null}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSlot = ({ item }) => {
    const open_time = moment(item?.start_time, "HH:mm").format("LT");

    return (
      <>
      <View style={{ paddingHorizontal: 10, paddingVertical: 15}}>
         <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 5,
            }}
            onPress={() => handleDetailsForm(item)}
          >
            <Text style={{ color: colors.white, fontWeight: "bold" }}>
              {open_time}
            </Text>
          </TouchableOpacity>
        </View>
        
      </>
    );
  };

  const handleClick = () => {
    setFav(!fav);
    const formData = new FormData();
    formData.append("doctor_id", data?.id)
    formData.append("is_fav", fav ? 0 : 1)
    postFormDataToken("favourite/store", formData)
      .then((res) => {
        if (res?.status) {
          setFav(true)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };
  useEffect(() => {
    setLoading(true);
    getWithToken(`clinic/${data?.item?.clinic_id}/details`)
      .then((res) => {
        setDetailsData(res?.data);
        // console.log(res?.data,"clinic/${data?.item?.clinic_id}/details");
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
  const handleCallPress = () => {
    const url = `tel:${data?.item?.mobile}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          // console.log(`Can't handle URL: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) =>
        console.error("An error occurred", err)
      );
  };

  const handleDirection = () => {
    if (detailsData[0]?.google_map_link) {
      Linking.openURL(detailsData[0]?.google_map_link);
    }
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
                  <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    ₹{data.item.fees}
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
              ) : (
                null
              )
              }

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  marginHorizontal: 15,
                  marginBottom: 5,
                }}
              >
                Doctor's Slots
              </Text>
              <FlatList
                data={AllDates}
                renderItem={renderTab}
                // keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
              <FlatList
                data={selectedSlots}
                renderItem={renderSlot}
                // keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </ScrollView>
          {/* <TouchableOpacity style={styles.bookClinicBtn}>
          <Text style={styles.bookClinicBtnText}>Book Clinic Visit</Text>
        </TouchableOpacity> */}
          {/* <TouchableOpacity style={{ bottom: 10 }}>
            <Button
              BtnText={"Call Now"}
              call={true}
              size={22}
              onPress={handleCallPress}
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
  SecondDiv: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 25,
    marginHorizontal: 15,
  },
  SecondInsideDiv: {
    marginLeft: 10,
    width: Dimensions.get("window").width * 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  FstRightDiv: {
    marginLeft: 10,
  },
  SecondMapDiv: {
    width: Dimensions.get("window").width * 0.85,
    alignSelf: "flex-end",
  },
  map: {
    width: "90%",
    height: Dimensions.get("window").height * 0.2,
    marginVertical: 10,
  },
});
