import { useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  FlatList,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ImageSlider from "react-native-image-slider";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../configs/colors";
import Button from "../components/Button";
import Head from "../components/Head";

const images = [
  "https://www.supermarketnews.com/sites/supermarketnews.com/files/styles/article_featured_retina/public/Wegmans_pharmacy_dept_0.png?itok=rc0gmhe6",
  "https://www.supermarketnews.com/sites/supermarketnews.com/files/styles/article_featured_retina/public/Wegmans_in-store_pharmacy-Amherst_NY.jpg?itok=Y4BMJEd5",
  "https://www.fingerlakes1.com/wp-content/uploads/2021/08/auto-draft-71.jpg",
];

export default function ScanCenterDetails({ route }) {
  const details = route.params;
  const goBack = () => navigation.goBack();
  const navigation = useNavigation();
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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={["1"]}
        renderItem={(item) => {
          return (
            <>
              <ScrollView>
                <View style={styles.mainContainer}>
                  <View style={styles.mainImageDiv}>
                    <ImageSlider
                      loopBothSides
                      autoPlayWithInterval={3000}
                      images={images}
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
                      <View>
                        <View style={styles.dayTimeDiv}>
                          <Text
                            style={[
                              styles.tymText,
                              {
                                color: colors.primary,
                                marginRight: 10,
                                width: Dimensions.get("window").width * 0.1,
                              },
                            ]}
                          >
                            MON-
                          </Text>
                          <Text style={styles.tymText}>09:00 AM - 9:00 PM</Text>
                        </View>
                        <View style={styles.dayTimeDiv}>
                          <Text
                            style={[
                              styles.tymText,
                              {
                                color: colors.primary,
                                marginRight: 10,
                                width: Dimensions.get("window").width * 0.1,
                              },
                            ]}
                          >
                            TUE-
                          </Text>
                          <Text style={styles.tymText}>09:00 AM - 9:00 PM</Text>
                        </View>
                        <View style={styles.dayTimeDiv}>
                          <Text
                            style={[
                              styles.tymText,
                              {
                                color: colors.primary,
                                marginRight: 10,
                                width: Dimensions.get("window").width * 0.1,
                              },
                            ]}
                          >
                            WED-
                          </Text>
                          <Text style={styles.tymText}>09:00 AM - 9:00 PM</Text>
                        </View>
                        <View style={styles.dayTimeDiv}>
                          <Text
                            style={[
                              styles.tymText,
                              {
                                color: colors.primary,
                                marginRight: 10,
                                width: Dimensions.get("window").width * 0.1,
                              },
                            ]}
                          >
                            THU-
                          </Text>
                          <Text style={styles.tymText}>09:00 AM - 9:00 PM</Text>
                        </View>
                        <View style={styles.dayTimeDiv}>
                          <Text
                            style={[
                              styles.tymText,
                              {
                                color: colors.primary,
                                marginRight: 10,
                                width: Dimensions.get("window").width * 0.1,
                              },
                            ]}
                          >
                            FRI-
                          </Text>
                          <Text style={styles.tymText}>09:00 AM - 9:00 PM</Text>
                        </View>
                        <View style={styles.dayTimeDiv}>
                          <Text
                            style={[
                              styles.tymText,
                              {
                                color: colors.primary,
                                marginRight: 10,
                                width: Dimensions.get("window").width * 0.1,
                              },
                            ]}
                          >
                            SAT-
                          </Text>
                          <Text style={styles.tymText}>09:00 AM - 9:00 PM</Text>
                        </View>
                        <View style={styles.dayTimeDiv}>
                          <Text
                            style={[
                              styles.tymText,
                              {
                                color: colors.primary,
                                marginRight: 10,
                                width: Dimensions.get("window").width * 0.1,
                              },
                            ]}
                          >
                            SUN-
                          </Text>
                          <Text style={[styles.tymText, { color: colors.red }]}>
                            CLOSED
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </>
          );
        }}
      />
      <View style={{ bottom: 10 }}>
        <Button BtnText={"Call Now"} size={22}/>
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
