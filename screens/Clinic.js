import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Head from "../components/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import ListedItems from "../components/ListedItems";
import colors from "../configs/colors";
import { get, getWithToken } from "../components/Api";
import Loader from "../components/Loader";
import NoDataFound from "../components/NoDataFound";

const pharmaData = [
  {
    id: 1,
    name: "MED PHARMA",
    image:
      "https://t4.ftcdn.net/jpg/00/75/78/31/360_F_75783184_fCmgIS3e05tWlGhNPe5aOEWknoxb6Pzb.jpg",
    address: "Kolkata",
  },
  {
    id: 2,
    name: "CITY MED",
    image:
      "https://img.freepik.com/premium-vector/pills-liquids-medicine-children-kawaii-doodle-flat-vector-illustration_609998-86.jpg?w=2000",
    address: "Bhubaneswar",
  },
  {
    id: 3,
    name: "EASY PHARMA",
    image:
      "https://img.freepik.com/premium-vector/pills-liquids-medicine-children-kawaii-doodle-flat-vector-illustration_609998-86.jpg?w=2000",
    address: "Delhi",
  },
  {
    id: 4,
    name: "MED PLUS",
    image:
      "https://t4.ftcdn.net/jpg/00/75/78/31/360_F_75783184_fCmgIS3e05tWlGhNPe5aOEWknoxb6Pzb.jpg",
    address: "Ranchi",
  },
  {
    id: 5,
    name: "RAJ PHARMA",
    image:
      "https://img.freepik.com/premium-vector/open-jar-with-pills-flat-style-different-pills-fall-out-jar-isolated-white-background_710535-117.jpg",
    address: "Goa",
  },

  {
    id: 6,
    name: "BARSU PHARMA",
    image:
      "https://t4.ftcdn.net/jpg/00/75/78/31/360_F_75783184_fCmgIS3e05tWlGhNPe5aOEWknoxb6Pzb.jpg",
    address: "Ranchi",
  },
  {
    id: 7,
    name: "KALAM PHARMA",
    image:
      "https://img.freepik.com/premium-vector/open-jar-with-pills-flat-style-different-pills-fall-out-jar-isolated-white-background_710535-117.jpg",
    address: "Goa",
  },
];
const Clinic = ({ route }) => {
  const data = route.params;
  const navigation = useNavigation();
  const [clinicList, setClinicList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getWithToken(`clinic/city/${data?.userCity?.id}/search`)
      .then((res) => {
        setClinicList(res?.data);
        // setTimeout(() => {
        setLoading(false);
        // },2000)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleDetails = (item) => {
    // console.log("items====>",item)
    navigation.navigate("ClinicDetails", {
      item,
      id: clinicList.id,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Head Icon={false} leftIcon={"arrow-left"} title={"Clinic"} />
        {loading ? (
          <Loader size={60} color={colors.primary} message={"Please Wait..."} />
        ) : (
          <FlatList
            data={["1"]}
            renderItem={(item) => {
              return (
                <ScrollView>
                  <View style={styles.SndDiv}>
                    <Text style={styles.SndDivHeading}>All Clinics</Text>
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
                        {clinicList.length}
                      </Text>{" "}
                      Total
                    </Text>
                  </View>
                  {clinicList?.length == 0 ? (
                    <NoDataFound message={"No Clinics found in this city"} color={colors.primary}/>
                  ) : (
                    <ListedItems
                      ListedItems={clinicList}
                      onPress={handleDetails}
                    />
                  )}
                </ScrollView>
              );
            }}
          />
        )}
      </View>
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

export default Clinic;
