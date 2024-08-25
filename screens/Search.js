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
import ListedItems from "../components/ListedItems";

const Search = () => {
  const inputRef = useRef(null);
  const navigation = useNavigation();
  const [clinicList, setClinicList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { userCity } = useContext(AppContext);

  useEffect(() => {
    setIsSearching(true)
    inputRef.current.focus();
    doctorSearchData("")
  }, []);

  const doctorSearchData = (data) => {
      getWithToken(`clinic/city/${userCity?.id}/search/${data}`)
        .then((res) => {
          if (res?.data?.length > 0) {
            console.log(res?.data, "iiiiiiittttttteeeeemmm");
            setClinicList(res?.data);
            setIsSearching(false);
          } else {
            setClinicList([]);
            setIsSearching(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  };
  const handleDetails = (item) => {
    navigation.navigate("ClinicDetails", {
      item,
      id: clinicList.id,
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Head
        Icon={false}
        leftIcon={"arrow-left"}
        title={"Clinics"}
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
            placeholder="Search for clinics"
            placeholderTextColor={colors.white}
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
            <Loader size={60} color={colors.primary} message={"Searching..."} />
          ) : (
            <ListedItems
            ListedItems={clinicList}
            onPress={handleDetails}
            empty={true}
          />
          )
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  searchInputDiv: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  searchInput: {
    backgroundColor: colors.primary,
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
    color: colors.white,
  },
  searchInputIcon: {
    position: "absolute",
    color: colors.white,
    zIndex: 20,
    marginLeft: 35,
  },
});

export default Search;