import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Head from "../components/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import ListedItems from "../components/ListedItems";
import colors from "../configs/colors";
import { useEffect } from "react";
import { useState } from "react";
import { get, getWithToken } from "../components/Api";
import Loader from "../components/Loader";

const pharmaData = [
  {
    id: 1,
    name: "Dr. Lal PathLabs",
    image:
      "https://www.clinico.in/wp-content/uploads/2021/09/Quality-Policy-01.png",
    address: "Kolkata",
  },
  {
    id: 2,
    name: "SRS Diagnostic",
    image:
      "https://content3.jdmagicbox.com/comp/def_content/Pathology_Labs/default-pathology-labs-249.jpg",
    address: "Bhubaneswar",
  },
  {
    id: 3,
    name: "My Lab Diagnostic",
    image:
      "https://content.jdmagicbox.com/comp/bangalore/y6/080pxx80.xx80.120616013957.c2y6/catalogue/amruth-diagnostic-centre-sahakara-nagar-bangalore-diagnostic-centres-for-kidney-procedure-rcyn224qtm.jpg?clr=263340",
    address: "Delhi",
  },
  {
    id: 4,
    name: "Radiance Diagnostic",
    image:
      "https://www.accuhealthlabs.com/wp-content/uploads/2020/08/diagonostic-center-inner-img1.jpg",
    address: "Ranchi",
  },
  {
    id: 5,
    name: "One Teck Path Lab",
    image:
      "https://www.vrdiagnostics.in/blog/wp-content/uploads/2022/05/diagnostic-center-noida.jpg",
    address: "Goa",
  },

  {
    id: 6,
    name: "Ndnc Diagnostics",
    image:
      "https://citymedworld.files.wordpress.com/2022/07/6_20220710_092523_0005.png",
    address: "Ranchi",
  },
  {
    id: 7,
    name: "House Of Diagnostics",
    image:
      "https://www.sagarhospitals.in/wp-content/uploads/2020/04/2_tn-36.jpg",
    address: "Goa",
  },
];
const ScanCenter = (props) => {
  const navigation = useNavigation();
  const [scancenter, setScancenter] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDetails = (item) => {
    navigation.navigate("ScanCenterDetails", { item });
  };

  useEffect(() => {
    setLoading(true);
    getWithToken("scancenter")
      .then((res) => {
        setScancenter(res?.data);
        console.log("pharmaciespharmacies====>", res?.data);
        setLoading(false);
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
                <Head
                  Icon={false}
                  leftIcon={"arrow-left"}
                  title={props.route.params.name}
                />
                <ScrollView>
                  <View style={styles.SndDiv}>
                    <Text style={styles.SndDivHeading}>
                      All {props.route.params.name}s
                    </Text>
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
                        {scancenter.length}
                      </Text>{" "}
                      Total
                    </Text>
                  </View>
                  <ListedItems
                    ListedItems={scancenter}
                    onPress={handleDetails}
                    pharma={true}
                  />
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

export default ScanCenter;
