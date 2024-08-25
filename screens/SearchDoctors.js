import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../configs/colors";
import { useRef } from "react";
import { useEffect } from "react";
import Head from "../components/Head";
import { get, getWithToken, post, postFormData } from "../components/Api";
import Loader from "../components/Loader";
import Doctors from "../components/Doctors";
import { AppContext } from "../context/AppContext";
import PaymentScreen from "./Payment";

const SearchDoctors = (props) => {
  const inputRef = useRef(null);
  const navigation = useNavigation();
  const [doctorList, setDoctorList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [doctorId, setDoctorId] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const { userCity, userData } = useContext(AppContext);
  const [isModalVisible, setModalVisible] = useState(false);


  const closeModal = () => {
    setModalVisible(false)
    getWithToken(`doctor/${selectedDoctor?.id}/show?app_user_id=${userData?.id}`)
      .then((res) => {
        console.log(res?.data, "doctor/1/show/doctor/1/show");
        if (res?.data?.hasOwnProperty('transaction')) {
          navigation.navigate("ClinicVisit", { item: selectedDoctor, id: selectedDoctor.id });
        }
        else {
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    setIsSearching(true)
    inputRef.current.focus();
    doctorSearchData("")
  }, []);

  const doctorSearchData = (data) => {
    getWithToken(`doctors/city/${userCity?.id}/search/${data}`)
      .then((res) => {
        if (res?.data?.length > 0) {
          console.log(res?.data, "iiiiiiittttttteeeeemmm");
          setDoctorList(res?.data);
          setIsSearching(false);
        } else {
          setDoctorList([]);
          setIsSearching(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSearching(false);
      });
  };
  const handleDesp = (item) => {
    console.log("??????item???", item);
    navigation.navigate("DoctorDetails", { item, id: item.id });
  };
  const handleVisit = (item) => {
    setSelectedDoctor(item);
    console.log(item, "open modal response----------->")
    // getWithToken(`doctor/${item?.id}/show?app_user_id=${userData?.id}`)
    //   .then((res) => {
    //     console.log(res?.data?.transaction, "doctor/1/show/doctor/1/show");
    //     if (res?.data?.hasOwnProperty('transaction')) {
    //       navigation.navigate("ClinicVisit", { item, id: item.id });
    //     }
    //     else {
    //       setModalVisible(true)
    //       const formData = new FormData();
    //       if (userData?.name !== null) {
    //         formData.append("name", userData?.name);
    //       }
    //       if (userData?.email !== null) {
    //         formData.append("email", userData?.email);
    //       }
    //       if (userData?.mobile !== null) {
    //         formData.append("mobile", userData?.mobile);
    //       }
    //       if (item?.id !== null) {
    //         formData.append("doctor_id", item?.id);
    //       }
    //       formData.append("amount", 12);
    //       console.log(formData, "formDataformData");
    //       postFormData("cashfree/payments/store", formData)
    //         .then((res) => {
    //           console.log(res, "cashfree/payments/store");
    //           if (res) {
    //             if (res?.name && res?.email) {
    //               alert("Please update your profile")
    //             }
    //             else if (res?.name) {
    //               alert(res?.name)
    //             }
    //             else if (res?.email) {
    //               alert(res?.email)
    //             }
    //           }
    //           else {
    //             setModalVisible(true)
    //           }
    //         })
    //         .catch(err => {
    //           console.log(err);
    //         })
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    navigation.navigate("ClinicVisit", { item, id: item.id });

  };
  const renderItem = ({ item }) => {
    // console.log(item, "itemitemitemitemitemitem");
    const handleDoctorDetails = (item) => {
      navigation.navigate("ClinicDetails", {
        item,
        id: item?.clinic_id,
      });
    };
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          backgroundColor: colors.white,
          marginVertical: 10,
          marginHorizontal: 15,
          padding: 10,
          borderRadius: 50,
          alignItems: "center",
        }}
        onPress={() => {
          handleDoctorDetails(item);
        }}
      >
        <View style={{ width: 60, height: 60, borderRadius: 100 }}>
          <Image
            style={{ width: "100%", height: "100%", borderRadius: 100 }}
            source={{
              uri: item?.profile_pic
                ? `https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?cs=srgb&dl=pexels-thirdman-5327585.jpg&fm=jpg`
                : `https://gym.ehostingguru.com/public/${item?.profile_pic}`,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            {item?.name}
          </Text>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 15,
              fontWeight: "400",
            }}
          >
            Mob: {item?.mobile}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Head
        Icon={false}
        leftIcon={"arrow-left"}
        title={props.route.params.name}
      />
      <View style={styles.container}>
        <View style={styles.searchInputDiv}>
          <Octicons
            style={styles.searchInputIcon}
            name="search"
            size={24}
            color="black"
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for doctors"
            ref={inputRef}
            autoFocus={true}
            onChangeText={(data) => {
              setSearchValue(data);
              doctorSearchData(data);
              setIsSearching(true);
            }}
            value={searchValue}
          />
        </View>
        {searchValue.length >= 0 ? (
          isSearching ? (
            <Loader size={60} color={colors.white} message={"Searching..."} />
          ) : (
            <Doctors
              clinicData={doctorList}
              onPressDetail={handleDesp}
              onPressRupees={handleVisit}
              empty={true}
              pagination={true}
            />
          )
        ) : null}
      </View>
      {/* {isModalVisible && (
        <PaymentScreen onClose={closeModal} item={selectedDoctor} />
      )} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  searchInputDiv: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  searchInput: {
    backgroundColor: colors.white,
    height: 60,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    borderRadius: 30,
    width: Dimensions.get("window").width * 0.95,
    marginBottom: 15,
    marginTop: 10,
    paddingLeft: 60,
    justifyContent: "center",
    elevation: 5,
    shadowColor: colors.grey,
  },
  searchInputIcon: {
    position: "absolute",
    color: "grey",
    zIndex: 20,
    marginLeft: 35,
  },
});

export default SearchDoctors;