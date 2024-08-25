import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Head from "../components/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import ListedItems from "../components/ListedItems";
import colors from "../configs/colors";
import { useEffect } from "react";
import { get, getWithToken } from "../components/Api";
import { useState } from "react";
import Loader from "../components/Loader";
import NoDataFound from "../components/NoDataFound";
import { AppContext } from "../context/AppContext";

const pharmaData = [
  {
    id: 1,
    name: "MED PHARMA",
    image:
      "https://as2.ftcdn.net/v2/jpg/04/04/86/17/1000_F_404861716_2ynwZwrzZzuasOrEom2z23Zl2CoAusom.jpg",
    address: "Kolkata",
  },
  {
    id: 2,
    name: "CITY PHARMA",
    image:
      "https://img.freepik.com/premium-vector/doodle-online-pharmacy-medicine-with-colored-hand-drawn-cartoon-style_288411-1122.jpg",
    address: "Bhubaneswar",
  },
  {
    id: 3,
    name: "MED PLUS",
    image:
      "https://img.freepik.com/premium-vector/pills-liquids-medicine-children-kawaii-doodle-flat-vector-illustration_609998-86.jpg?w=2000",
    address: "Delhi",
  },
  {
    id: 4,
    name: "EASY PHARMA",
    image:
      "https://t4.ftcdn.net/jpg/00/75/78/31/360_F_75783184_fCmgIS3e05tWlGhNPe5aOEWknoxb6Pzb.jpg",
    address: "Ranchi",
  },
  {
    id: 5,
    name: "CITY MED",
    image:
      "https://img.freepik.com/free-vector/medicine-pharmacy-set-with-isolated-medical-products-pharmaceutical-drugs-pills-vector-illustration_1150-65696.jpg",
    address: "Goa",
  },

  {
    id: 6,
    name: "BEST PHARMA",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAw9RBWwIviLpD1KRQqHeY1ZS9JxINYxs4TT5Ck0oRoJNGme8RqHnXj_RASw8qE4s6xQg&usqp=CAU",
    address: "Ranchi",
  },
];
const Pharmacy = ({ route }) => {
  const data = route.params;
  const { userCity } = useContext(AppContext);
  const navigation = useNavigation();
  const [pharmacy, setPharmacy] = useState([]);
  const [pharmacyImages, setPharmacyImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDetails = (item) => {
    let imageUrl = item?.department_images?.filter(
      (ele) => ele?.for === "images"
    );
    const pharmacyImages = [];
    for (let img of imageUrl) {
      pharmacyImages.push(
        `https://gym.ehostingguru.com/public/${img.image_name}`
      );
    }
    console.log(pharmacyImages, "fbhjbhjgkhuadghhghdgdgdgkjkjdgdfnh");

    navigation.navigate("PharmacyDetails", { item, pharmacyImages });
  };
  useEffect(() => {
    setLoading(true);
    getWithToken(`medical-department/${data?.id}/city/${userCity?.id}/search/`)
      .then((res) => {
        console.log(userCity?.id, data?.id, "res?.data?.department_images");
        setPharmacy(res?.data);
        setLoading(false);

        // let imageUrl = res?.data?.department_images?.filter(
        //   (ele) => ele?.for === "images"
        // );
        // const PharmacyImagesArray = [];
        // for (let img of imageUrl) {
        //   PharmacyImagesArray.push(
        //     `https://gym.ehostingguru.com/public/${img.image_name}`
        //   );
        // }
        // setPharmacyImages(PharmacyImagesArray);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <Loader size={60} color={colors.primary} message={"Please Wait..."} />
      ) : (
        <FlatList
          data={["1"]}
          renderItem={(item) => {
            return (
              <View style={styles.container}>
                <Head Icon={false} leftIcon={"arrow-left"} title={data?.name} />
                <ScrollView>
                  <View style={styles.SndDiv}>
                    <Text style={styles.SndDivHeading}>All {data?.name}s</Text>
                    <Text
                      style={{
                        color: "#A5ADB3",
                        fontWeight: "400",
                        fontSize: 18,
                      }}
                    >
                      <Text
                        style={{
                          color: "grey",
                          fontWeight: "600",
                          fontSize: 18,
                        }}
                      >
                        {pharmacy.length}
                      </Text>{" "}
                      Total
                    </Text>
                  </View>
                  {pharmacy.length == 0 ? (
                    <NoDataFound
                      color={colors.primary}
                      message={`No ${data?.name} found in this city`}
                    />
                  ) : (
                    <ListedItems
                      ListedItems={pharmacy}
                      onPress={handleDetails}
                      pharma={true}
                    />
                  )}
                </ScrollView>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginVertical: 20,
    flexDirection: "row",
    marginHorizontal: 15,
    alignItems: "center",
    height: 65,
    borderBottomWidth: 1,
    borderColor: colors.ash,
  },
  headerText: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "600",
  },
  SndDiv: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  SndDivHeading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 7,
  },
  mainBarDiv: {
    height: Dimensions.get("window").height * 0.2,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: colors.ash,
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainBarImageDiv: {
    width: Dimensions.get("window").width * 0.35,
    height: Dimensions.get("window").height * 0.13,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 15,
  },
  mainBarImage: {
    width: "100%",
    height: "100%",
  },
  mainBarRightDiv: {
    width: Dimensions.get("window").width * 0.55,
    marginRight: 15,
  },
  mainBarRightHeading: {
    fontSize: 20,
    fontWeight: "500",
  },
  mainBarRightAddress: {
    fontSize: 17,
    fontWeight: "400",
    color: "grey",
    marginVertical: 5,
  },
  mainBarRightBtn: {
    borderWidth: 2,
    borderColor: colors.ash,
    height: 45,
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  mainBarRightBtnText: {
    fontSize: 17,
    color: "#0091F7",
    fontWeight: "500",
  },
});

export default Pharmacy;
