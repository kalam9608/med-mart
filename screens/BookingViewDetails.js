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
import { get, getWithToken } from "../components/Api";
import Loader from "../components/Loader";
import MapView from "react-native-maps";
import { extractCoordinatesFromGoogleMapsURL } from "../util/Util";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { AppContext } from "../context/AppContext";

export default function BookingViewDetails({ route }) {
    const data = route.params;
    console.log(data,"________________________________________");
    const { userData } = useContext(AppContext)
    const [detailsData, setDetailsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fav, setFav] = useState(false);
    const [slot, setSlot] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [doctorDetail, setDoctorDetail] = useState([]);

    const navigation = useNavigation();
    // useEffect(() => {
    //   setLoading(true);
    //   getWithToken(`doctor/${data?.id}/show?app_user_id=${userData?.id}`)
    //     .then((res) => {
    //       console.log(res, "doctor/1/show/doctor/1/show");
    //       setDoctorDetail(res?.data)
    //       if (res?.data?.is_favourite == true) {
    //         setFav(true)
    //       }
    //       else {
    //         setFav(false)
    //       }
    //       setLoading(false);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setLoading(false);
    //     })
    // }, [])

    // const shareContent = async () => {
    //   try {
    //     const imageUrl =
    //       "https://www.fingerlakes1.com/wp-content/uploads/2021/08/auto-draft-71.jpg";
    //     const result = await Share.share({
    //       message: `${data.item.name}\nRole: ${data.item.role}\nSpecification: MD General Medicine\nExperience: ${data.item.experience}`,
    //       url: imageUrl,
    //     });
    //   } catch (error) {
    //     alert(error.message);
    //   }
    // };
    // const handleCallPress = () => {
    //   const url = `tel:${data?.Details[0]?.mobile}`;
    //   Linking.canOpenURL(url)
    //     .then((supported) => {
    //       if (!supported) {
    //         console.log(`Can't handle URL: ${url}`);
    //       } else {
    //         return Linking.openURL(url);
    //       }
    //     })
    //     .catch((err) => console.error("An error occurred", err));
    // };

    const handleDirection = () => {
      if(data?.Details[0]?.google_map_link){
        Linking.openURL(data?.Details[0]?.google_map_link);
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
                        title={ data?.Details[0]?.doctor?.name }
                    // onLstFstIcon={handleClick}
                    // onlstSndIcon={shareContent}
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
                                <Text style={styles.nameText}>{ data?.Details[0]?.doctor?.name }</Text>
                                <Text style={styles.roleText}>
                                    ENT
                                </Text>
                                <Text style={styles.experienceText}>
                                { data?.Details[0]?.doctor?.experience_in_year } years experience overall
                                </Text>
                                <Text style={styles.feesText}>
                                    <Text style={styles.fees}>₹{ data?.Details[0]?.doctor?.fees }</Text>{" "}
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
                                        ₹200 Fees
                                    </Text>
                                </View>
                            </View>
                            <View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
                                <Text style={{ fontSize: 17, fontWeight: "600" }}>
                                    { data?.Details[0]?.clinic?.name }
                                </Text>
                                <Text style={{ fontSize: 17 }}>{ data?.Details[0]?.clinic?.address }</Text>
                            </View>

                        </View>

                        <View style={styles.SecondDiv}>
                            <Ionicons name="location-outline" size={26} color="grey" />
                            <View style={styles.SecondInsideDiv}>
                                <Text style={{ color: "grey" }}>{ data?.Details[0]?.clinic?.address }</Text>
                                <View>
                                    <TouchableOpacity
                                        onPress={handleDirection}
                                        style={{
                                            padding: 10,
                                            borderWidth: 2,
                                            borderRadius: 50,
                                            borderColor: colors.lightBlue,
                                            alignItems: "center",
                                        }}
                                    >
                                        <FontAwesome5
                                            name="directions"
                                            size={25}
                                            color={colors.themeBlue}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{ color: colors.themeBlue }}>Direction</Text>
                                </View>
                                {/* <FontAwesome5 name="directions" size={24} color="black" /> */}
                            </View>
                        </View>
                    </ScrollView>
                    {/* <TouchableOpacity style={styles.bookClinicBtn}>
            <Text style={styles.bookClinicBtnText}>Book Clinic Visit</Text>
          </TouchableOpacity> */}
                    <TouchableOpacity style={{ bottom: 10 }}>
                        <Button
                            BtnText={"Call Now"}
                            call={true}
                            size={22}
                        // onPress={handleCallPress}
                        />
                    </TouchableOpacity>
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
