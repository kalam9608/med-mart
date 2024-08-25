import { useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  FlatList,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ImageSlider from "react-native-image-slider";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../configs/colors";
import Button from "../components/Button";
import Head from "../components/Head";
import { useEffect, useState } from "react";
import moment from "moment";

const images = [
  "https://www.supermarketnews.com/sites/supermarketnews.com/files/styles/article_featured_retina/public/Wegmans_pharmacy_dept_0.png?itok=rc0gmhe6",
  "https://www.supermarketnews.com/sites/supermarketnews.com/files/styles/article_featured_retina/public/Wegmans_in-store_pharmacy-Amherst_NY.jpg?itok=Y4BMJEd5",
  "https://www.fingerlakes1.com/wp-content/uploads/2021/08/auto-draft-71.jpg",
];
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export default function PharmacyDetails({ route }) {
  const details = route.params;
  console.log(details,"99999999999999999999999999999999999");
  const goBack = () => navigation.goBack();
  const [pharmacyImages, setPharmacyImages] = useState([]);


  const navigation = useNavigation();
  const open_time = moment(details?.item?.open_time, "HH:mm").format("LT");
  const close_time = moment(details?.item?.close_time, "HH:mm").format(
    "LT"
  );
  const openFromIndex = daysOfWeek.indexOf(details?.item?.open_form);
  const openToIndex = daysOfWeek.indexOf(details?.item?.open_to);
  const openingDays = [];

  const curentDate=new Date().getDay();

  const Today=daysOfWeek[curentDate].toLocaleUpperCase().slice(0,3);

  // useEffect(() => {
  //   let imageUrl = details?.department_images[0]?.filter(
  //     (ele) => ele?.for === "images"
  //   );
  //   const PharmacyImagesArray = [];
  //   for (let img of imageUrl) {
  //     PharmacyImagesArray.push(
  //       `https://gym.ehostingguru.com/public/${img.image_name}`
  //     );
  //   }
  //   setPharmacyImages(PharmacyImagesArray);
  // },[])
  for (let i = openFromIndex; i <= openToIndex; i++) {
    openingDays.push(daysOfWeek[i].substr(0, 3).toUpperCase());
  }

  const shareContent = async () => {
    try {
      const imageUrl =
        "https://www.fingerlakes1.com/wp-content/uploads/2021/08/auto-draft-71.jpg";
      const result = await Share.share({
        message: `${details.item.name},${details.item.address}`,
        url: imageUrl,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCallPress = () => {
    const url = `tel:${details?.item?.telephone}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log(`Can't handle URL: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={["1"]}
        renderItem={(item) => {
          return (
            <ScrollView>
              <View style={styles.mainContainer}>
                <View style={styles.mainImageDiv}>
                  <ImageSlider
                    loopBothSides
                    autoPlayWithInterval={3000}
                    images={details?.pharmacyImages}
                  />
                </View>
                <Head
                  Icon={true}
                  leftIcon="arrow-left"
                  rightIcon="share-2"
                  name={details.item.name}
                  address={details.item.address}
                  onPressrightIcon={shareContent}
                />
                <View style={styles.FstDiv}>
                  <MaterialIcons name="access-time" size={24} color="grey" />
                  <View style={styles.FstRightDiv}>
                          <Text style={styles.openText}>OPEN TIME</Text>
                          {openingDays.map((day, index) => (
                            <View style={styles.dayTimeDiv}>
                              <Text style={[
                                styles.tymText,
                                {
                                  color: Today!==day?colors.primary:colors.green,
                                  marginRight: 10,
                                  width: Dimensions.get("window").width * 0.11,
                                },
                              ]} key={index}>
                                {day}-
                              </Text>
                              <Text style={[styles.tymText,{
                                color: Today!==day?colors.primary:colors.green,
                              }]}>
                                {open_time} - {close_time}
                              </Text>
                            </View>
                          ))}
                        </View>
                </View>
                {/* 
      <View style={styles.SecondDiv}>
        <Ionicons name="location-outline" size={26} color="grey" />
        <View style={styles.SecondInsideDiv}>
          <Text style={{ color: "grey" }}>Kolkata, West Bengal 700084</Text>
          <View style={styles.SecondMapDiv}>
            <MapView style={styles.map} />
          </View>
        </View>
      </View> */}
              </View>
            </ScrollView>
          );
        }}
      />
      <View style={{ bottom: 10 }}>
        <Button BtnText={"Call Now"} onPress={handleCallPress} size={22}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
});
