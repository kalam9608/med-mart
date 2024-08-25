import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../configs/colors";
import { useRef } from "react";
import { useEffect } from "react";
import { get, getWithToken } from "../components/Api";
import { FlatList } from "react-native";
import { writeData } from "../util/Util";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loader";

const SearchCity = () => {
  const [cityList, setCityList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);
  const navigation = useNavigation();
  const { setUserCity, userCity } = useContext(AppContext);
  

  useEffect(() => {
    setIsSearching(true)
    inputRef.current.focus();
    HandleSearchCity("")
  }, []);

  const HandleSearchCity = (data) => {
    getWithToken(`cityList/${data}`)
      .then((res) => {
        if (res?.data?.length > 0) {
          const cities = res.data;
          const sortedData = cities.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setCityList(sortedData);
          console.log(cityList, "---city list-----");
          setIsSearching(false);
        } else {
          setCityList([]);
          setIsSearching(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSearching(false);
      });
  };

  const HandleCityValue = (item) => {
    console.log(item, "+_+_+_+_+_+userCity");

    setUserCity(item);
    writeData("user_city", item);
    navigation.navigate("Dashboard");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            placeholder="Search for cities"
            ref={inputRef}
            autoFocus={true}
            onChangeText={(data) => {
              setSearchValue(data);
              HandleSearchCity(data);
              setIsSearching(true);
            }}
            value={searchValue}
          />
        </View>
        {/* {isSearching ? (
          <>
            <FlatList
              data={cityList}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={() => HandleCityValue(item)}>
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: "left",
                        color: colors.white,
                        paddingHorizontal: 15,
                        borderBottomWidth: 0.5,
                        paddingVertical: 10,
                        borderColor: colors.white,
                      }}
                    >
                      {item?.name} - {item?.state}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </>
        ) : null} */}

        {searchValue.length >= 0 ? (
          isSearching ? (
            <Loader size={60} color={colors.white} message={"Searching..."} />
          ) : (
            <FlatList
              data={cityList}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={() => HandleCityValue(item)}>
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: "left",
                        color: colors.white,
                        paddingHorizontal: 15,
                        borderBottomWidth: 0.5,
                        paddingVertical: 10,
                        borderColor: colors.white,
                      }}
                    >
                      {item?.name} - {item?.state}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                true ? (
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
                ) : null
              }
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
  },
  searchInputIcon: {
    position: "absolute",
    color: "grey",
    zIndex: 20,
    marginLeft: 35,
  },
});

export default SearchCity;
