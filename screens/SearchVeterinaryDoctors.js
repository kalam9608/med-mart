import React, { useState } from "react";
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
import { postFormData } from "../components/Api";
import Loader from "../components/Loader";
import Configs from "../configs/Configs";

const SearchVeterinaryDoctors = (props) => {
  const inputRef = useRef(null);
  const navigation = useNavigation();
  const [doctorList, setDoctorList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const doctorSearchData = (data) => {
    // const formData = new FormData();
    // formData.append("searchkey", data);
    // formData.append("per_page", 1);
    const formData = {
      searchkey: data,
      per_page: 10,
    };
    postFormData("doctorlistbyname", formData)
      .then((res) => {
        // console.log(res?.data?.data, "iiiiiiittttttteeeeemmm");
        if (res?.data?.data?.length > 0) {
          setDoctorList(res?.data?.data);
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

  const renderItem = ({ item }) => {
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
        onPress={() => {handleDoctorDetails(item)}}
      >
        <View style={{ width: 60, height: 60, borderRadius: 100 }}>
          <Image
            style={{ width: "100%", height: "100%", borderRadius: 100 }}
            source={{
              uri: item?.profile_pic
                ? `https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?cs=srgb&dl=pexels-thirdman-5327585.jpg&fm=jpg`
                : `${Configs.IMG_BASE_URL}${item?.profile_pic}`,
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
            placeholder="Search for veterinarian doctors"
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
        {searchValue.length > 0 ? (
          isSearching ? (
            <Loader size={60} color={colors.white} message={"Searching..."} />
          ) : (
            <FlatList
              data={doctorList}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={(item) => (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: colors.white,
                    }}
                  >
                    No Result Found
                  </Text>
                </View>
              )}
              renderItem={renderItem}
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

export default SearchVeterinaryDoctors;
