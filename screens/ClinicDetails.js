import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import ImageSlider from "react-native-image-slider";
import MapView from "react-native-maps";
import Doctors from "../components/Doctors";
import { SafeAreaView } from "react-native-safe-area-context";
import Head from "../components/Head";
import colors from "../configs/colors";
import { color } from "react-native-reanimated";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Button from "../components/Button";
import { useContext, useEffect, useState } from "react";
import { get, getWithToken } from "../components/Api";
import Loader from "../components/Loader";
import moment from "moment";
import PaymentScreen from "./Payment";
import { AppContext } from "../context/AppContext";
import NoDataFound from "../components/NoDataFound";

const images = [
  "https://www.supermarketnews.com/sites/supermarketnews.com/files/styles/article_featured_retina/public/Wegmans_pharmacy_dept_0.png?itok=rc0gmhe6",
  "https://www.supermarketnews.com/sites/supermarketnews.com/files/styles/article_featured_retina/public/Wegmans_in-store_pharmacy-Amherst_NY.jpg?itok=Y4BMJEd5",
  "https://www.fingerlakes1.com/wp-content/uploads/2021/08/auto-draft-71.jpg",
];

const clinicData = [
  {
    id: 1,
    name: "Dr.Sudha Menon",
    image:
      "https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg",
    role: "General Physician",
    experience: "40 years experience overall",
    fees: "₹950",
    address: "Baghajatin Road",
    hospital: "Fortis Hospital",
  },
  {
    id: 2,
    name: "Dr. Siva Singh",
    image:
      "https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000",
    role: "Heart Surgeon",
    experience: "10 years experience overall",
    fees: "₹600",
    address: "Cuttack",
    hospital: "SCB Medical",
  },
  {
    id: 3,
    name: "Dr.Sudha Menon",
    image:
      "https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg",
    role: "General Physician",
    experience: "40 years experience overall",
    fees: "₹950",
    address: "Baghajatin Road",
    hospital: "Fortis Hospital",
  },
  {
    id: 4,
    name: "Dr. Siva Singh",
    image:
      "https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000",
    role: "Heart Surgeon",
    experience: "10 years experience overall",
    fees: "₹600",
    address: "Cuttack",
    hospital: "SCB Medical",
  },
  {
    id: 5,
    name: "Dr.Sudha Menon",
    image:
      "https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg",
    role: "General Physician",
    experience: "40 years experience overall",
    fees: "₹950",
    address: "Baghajatin Road",
    hospital: "Fortis Hospital",
  },
  {
    id: 6,
    name: "Dr. Siva Singh",
    image:
      "https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000",
    role: "Heart Surgeon",
    experience: "10 years experience overall",
    fees: "₹600",
    address: "Cuttack",
    hospital: "SCB Medical",
  },
];

const services = [
  {
    id: 1,
    name: "Cardiology",
  },
  {
    id: 2,
    name: "Dentistry",
  },
  {
    id: 3,
    name: "Urology",
  },
  {
    id: 4,
    name: "Orthopedics",
  },
  {
    id: 5,
    name: "Ophthalmology",
  },
  {
    id: 6,
    name: "Neurology",
  },
  {
    id: 7,
    name: "Gynecology and Obstetrics",
  },
  {
    id: 8,
    name: "Gastroenterology",
  },
  {
    id: 9,
    name: "Ear, Nose, and Throat (ENT)",
  },
  {
    id: 10,
    name: "Physical therapy",
  },
  {
    id: 1,
    name: "Cardiology",
  },
  {
    id: 2,
    name: "Dentistry",
  },
  {
    id: 3,
    name: "Urology",
  },
  {
    id: 4,
    name: "Orthopedics",
  },
  {
    id: 5,
    name: "Ophthalmology",
  },
  {
    id: 6,
    name: "Neurology",
  },
  {
    id: 7,
    name: "Gynecology and Obstetrics",
  },
  {
    id: 8,
    name: "Gastroenterology",
  },
  {
    id: 9,
    name: "Ear, Nose, and Throat (ENT)",
  },
  {
    id: 10,
    name: "Physical therapy",
  },
];
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function ClinicDetails(props) {
  const details = props.route.params;
  // console.log(details, "details");
  const goBack = () => navigation.goBack();
  const navigation = useNavigation();
  const { userData } = useContext(AppContext);
  const [clinicDetails, setClinicDetails] = useState([]);
  const [clinicServices, setClinicServices] = useState([]);
  const [clinicOpenTiming, setClinicOpenTiming] = useState([]);
  const [clinicCloseTiming, setClinicCloseTiming] = useState([]);
  const [clinicId, setClinicId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [clinicImages, setClinicImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const openFromIndex = daysOfWeek.indexOf(details?.item?.open_form);
  const openToIndex = daysOfWeek.indexOf(details?.item?.open_to);
  const openingDays = [];

  for (let i = openFromIndex; i <= openToIndex; i++) {
    openingDays.push(daysOfWeek[i].substr(0, 3).toUpperCase());
  }
  

  const closeModal = () => {
    setModalVisible(false);
    getWithToken(
      `doctor/${selectedDoctor?.id}/show?app_user_id=${userData?.id}`
    )
      .then((res) => {
        // console.log(res?.data, "doctor/1/show/doctor/1/show");
        if (res?.data?.hasOwnProperty("transaction")) {
          navigation.navigate("ClinicVisit", {
            item: selectedDoctor,
            id: selectedDoctor.id,
          });
        } else {
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log("details?.item?.id=====>",details?.item?.id)
  useEffect(() => {
    setLoading(true);
    setClinicId(details?.item?.id);
    getWithToken(`clinic/${details?.item?.id}/details`)
      .then((res) => {
        setClinicDetails(res?.data);
        // console.log(res?.data, "res?.datares?.data");
        const open_time = moment(res?.data?.open_time, "HH:mm").format("LT");
        const close_time = moment(res?.data?.close_time, "HH:mm").format("LT");
        setClinicOpenTiming(open_time);
        setClinicCloseTiming(close_time);
        setDoctors(res?.data?.doctor);
        // console.log("clicnics doctors=====>",res?.data)
        setLoading(false);
        let imageUrl = res?.data?.images?.filter(
          (ele) => ele?.for === "images"
        );
        const clinicImagesArray = [];
        for (let img of imageUrl) {
          clinicImagesArray.push(
            `https://gym.ehostingguru.com/public/${img.image_name}`
          );
        }
        setClinicImages(clinicImagesArray);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    getWithToken(`clinic/${details?.item?.id}/serviceslist`)
      .then((res) => {
        setClinicServices(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleDesp = (item) => {
    // console.log("??????item???", item);
    navigation.navigate("DoctorDetails", { item, id: item.id });
  };
  const handleVisit = (item) => {
    // setSelectedDoctor(item);
    // console.log(item, "open modal response----------->")
    // getWithToken(`doctor/${item?.id}/show?app_user_id=${userData?.id}`)
    //   .then((res) => {
    //     console.log(res?.data, "doctor/1/show/doctor/1/show");
    //     if (res?.data?.hasOwnProperty('transaction')) {
    navigation.navigate("ClinicVisit", { item, id: item.id });
    //   }
    //   else {
    //     setModalVisible(true);
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
  };
  const shareContent = async () => {
    try {
      const imageUrl =
        "https://www.fingerlakes1.com/wp-content/uploads/2021/08/auto-draft-71.jpg";
      const result = await Share.share({
        message: `${details.item.name}\nAddress: ${details.item.address}`,
        url: imageUrl,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const curentDate=new Date();
  const Today=daysOfWeek[curentDate.getDay()]?.slice(0,3)?.toLocaleUpperCase();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <Loader size={60} color={colors.primary} message={"Please Wait..."} />
      ) : (
        <FlatList
          data={["1"]}
          renderItem={(item) => {
            return (
              <View style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={styles.mainContainer}>
                  <View style={styles.mainImageDiv}>
                    <ImageSlider
                      loopBothSides
                      autoPlayWithInterval={3000}
                      images={clinicImages}
                    />
                  </View>
                  <Head
                    Icon={true}
                    leftIcon='arrow-left'
                    rightIcon='share-2'
                    name={clinicDetails?.name}
                    address={clinicDetails?.address}
                    onPressrightIcon={shareContent}
                  />
                  <View style={styles.tabContainer}>
                    <TouchableOpacity
                      onPress={() => setActiveTab("Overview")}
                      style={[
                        styles.tab,
                        activeTab === "Overview" && styles.activeTab,
                        { marginRight: 5 },
                      ]}
                    >
                      <Text
                        style={[
                          styles.tabText,
                          activeTab === "Overview" && styles.activetabText,
                        ]}
                      >
                        Overview
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setActiveTab("Services")}
                      style={[
                        styles.tab,
                        activeTab === "Services" && styles.activeTab,
                        { marginLeft: 5 },
                      ]}
                    >
                      <Text
                        style={[
                          styles.tabText,
                          activeTab === "Services" && styles.activetabText,
                        ]}
                      >
                        Services
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {activeTab === "Overview" ? (
                    <>
                      <View style={[styles.FstDiv]}>
                        <MaterialIcons
                          name='access-time'
                          size={24}
                          color='grey'
                        />
                        <View style={[styles.FstRightDiv]}>
                          <Text style={styles.openText}>OPEN TIME</Text>
                          {openingDays.map((day, index) => (
                            <View style={[styles.dayTimeDiv]}>
                              <Text
                                style={[
                                  styles.tymText,
                                  {
                                    color:Today!==day?colors.primary:colors.green,
                                    marginRight: 10,
                                    width: Dimensions.get("window").width * 0.11,
                                  },
                                ]}
                                key={index}
                              >
                                {day}-
                              </Text>
                              <Text style={[styles.tymText,{
                                color:Today!==day?colors.primary:colors.green,
                              }]}>
                                {clinicOpenTiming} - {clinicCloseTiming}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>

                      {/* <View style={styles.SecondDiv}>
                <Ionicons name="location-outline" size={26} color="grey" />
                <View style={styles.SecondInsideDiv}>
                  <Text style={{ color: "grey" }}>
                    {clinicDetails?.address}
                  </Text>
                  <View style={styles.SecondMapDiv}>
                    <MapView style={styles.map} />
                  </View>
                </View>
              </View> */}
                      <>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "600",
                            marginHorizontal: 20,
                          }}
                        >
                          Doctors List
                        </Text>
                        <Doctors
                          clinicData={doctors}
                          onPressDetail={handleDesp}
                          onPressRupees={handleVisit}
                        />
                      </>
                    </>
                  ) : (
                    <>
                      {clinicServices.length == 0 ? (
                        <>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "600",
                              marginHorizontal: 15,
                              marginVertical: 10,
                            }}
                          >
                            Service Lists
                          </Text>
                          <NoDataFound message={"No Services Found"} />
                        </>
                      ) : (
                        <>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "600",
                              marginHorizontal: 15,
                              marginVertical: 10,
                            }}
                          >
                            Service Lists
                          </Text>
                          <FlatList
                            data={clinicServices}
                            renderItem={({ item }) => {
                              return (
                                <View
                                  style={{
                                    marginHorizontal: 15,
                                    marginVertical: 10,
                                    borderWidth: 1,
                                    borderColor: colors.ash,
                                    paddingVertical: 10,
                                    paddingHorizontal: 10,
                                    borderRadius: 5,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 20,
                                      fontWeight: "bold",
                                      color: colors.primary,
                                    }}
                                  >
                                    {item?.name}
                                  </Text>
                                  <Text style={{ fontSize: 15 }}>
                                    {item?.description}
                                  </Text>
                                </View>
                              );
                            }}
                          />
                        </>
                      )}
                    </>
                  )}
                </View>
              </View>
            );
          }}
        />
      )}
      {/* {isModalVisible && (
        <PaymentScreen onClose={closeModal} item={selectedDoctor} />
      )} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainImageDiv: {
    width: Dimensions.get("window").width * 1,
    height: Dimensions.get("window").height * 0.4,
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  HeaderDiv: {
    width: Dimensions.get("window").width * 0.9,
    marginTop: 25,
    marginHorizontal: 15,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  HeaderMiddleDiv: {
    width: Dimensions.get("window").width * 0.6,
  },
  HeaderName: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
  },
  HeaderAddress: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  FstDiv: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 25,
    marginHorizontal: 15,
  },
  SecondDiv: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 25,
    marginHorizontal: 15,
  },
  SecondInsideDiv: {
    marginLeft: 10,
  },
  FstRightDiv: {
    marginLeft: 10,
  },
  SecondMapDiv: {
    width: Dimensions.get("window").width * 0.85,
  },
  map: {
    width: "100%",
    height: Dimensions.get("window").height * 0.2,
    marginVertical: 10,
  },
  openText: {
    color: colors.white,
    backgroundColor: colors.primary,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 2,
    textAlign: "center",
  },
  tymText: {
    fontWeight: "500",
    marginTop: 5,
  },
  timmingText: {
    fontWeight: "600",
  },
  dayTimeDiv: {
    flexDirection: "row",
    alignItems: "center",
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: colors.ash,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  activeTab: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  tabText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "500",
  },
  activetabText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "500",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
