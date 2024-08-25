import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../configs/colors";
import Head from "../components/Head";
import Loader from "../components/Loader";
import Doctors from "../components/Doctors";
import { getWithToken } from "../components/Api";
import { useNavigation } from "@react-navigation/native";
import NoDataFound from "../components/NoDataFound";

const pharmaData = [
  {
    id: 1,
    name: "MED PHARMA",
    image:
      "https://t4.ftcdn.net/jpg/00/75/78/31/360_F_75783184_fCmgIS3e05tWlGhNPe5aOEWknoxb6Pzb.jpg",
    address: "Kolkata",
    specialization: {
      name: "Medicine",
    },
  },
  {
    id: 2,
    name: "CITY MED",
    image:
      "https://img.freepik.com/premium-vector/pills-liquids-medicine-children-kawaii-doodle-flat-vector-illustration_609998-86.jpg?w=2000",
    specialization: {
      name: "Endocrinologist",
    },
  },
  {
    id: 3,
    name: "EASY PHARMA",
    image:
      "https://img.freepik.com/premium-vector/pills-liquids-medicine-children-kawaii-doodle-flat-vector-illustration_609998-86.jpg?w=2000",
    address: "Delhi",
    specialization: {
      name: "Dentist",
    },
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
    specialization: {
      name: "ENT",
    },
  },

  {
    id: 6,
    name: "BARSU PHARMA",
    image:
      "https://t4.ftcdn.net/jpg/00/75/78/31/360_F_75783184_fCmgIS3e05tWlGhNPe5aOEWknoxb6Pzb.jpg",
    address: "Ranchi",
    specialization: {
      name: "ENT",
    },
  },
  {
    id: 7,
    name: "KALAM PHARMA",
    image:
      "https://img.freepik.com/premium-vector/open-jar-with-pills-flat-style-different-pills-fall-out-jar-isolated-white-background_710535-117.jpg",
    address: "Goa",
  },
];
const Favorite = () => {
  const navigation = useNavigation();
  const [fav, setFav] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    setIsLoading(true);
    getWithToken("favouritelist")
      .then((res) => {
        console.log(res?.data);
        setFav(res?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  const handleDesp = (item) => {
    console.log("??????item???", item);
    navigation.navigate("DoctorDetails", { item, id: item.doctor_id });
  };
  const handleVisit = (item) => {
    navigation.navigate("ClinicVisit", { item, id: item.doctor_id });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Head Icon={false} leftIcon={"arrow-left"} title={"Favorite Doctors"} />
      <View style={styles.container}>
        {isLoading == true ? (
          <Loader message={"Please Wait..."} size={60} color={colors.white} />
        ) : (
          <>
            {fav.length == 0 ? (
              <NoDataFound
                color={colors.white}
                message={`No favorite found`}
              />
            ) : (
              <Doctors
                clinicData={fav}
                fav={true}
                onPressDetail={handleDesp}
                onPressRupees={handleVisit}
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});

export default Favorite;
