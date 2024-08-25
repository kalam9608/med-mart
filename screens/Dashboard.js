import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Options from "../components/Options";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../configs/colors";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import {
  get,
  getWithToken,
  postFormData,
  postFormDataToken,
} from "../components/Api";
import Loader from "../components/Loader";
import * as Location from "expo-location";
import { log } from "react-native-reanimated";
import {
  getDeviceToken,
  readData,
  registerForPushNotificationsAsync,
  writeData,
} from "../util/Util";
import Configs from "../configs/Configs";

const searchData = [
  {
    id: 1,
    name: "Clinic",
    image:
      "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: 2,
    name: "Doctors",
    image:
      "https://images.pexels.com/photos/5327659/pexels-photo-5327659.jpeg?cs=srgb&dl=pexels-thirdman-5327659.jpg&fm=jpg",
  },
];
const Dashboard = () => {
  const navigation = useNavigation();
  const { userData, setUserCity, userCity } = useContext(AppContext);
  const [selectedValue, setSelectedValue] = useState(userCity?.name);
  const [name, setName] = useState(userData?.name);
  const [image, setImage] = useState(userData?.profile_pic);
  const [departmentTypes, setDepartmentTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    setSelectedValue(userCity?.name);
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      getWithToken("edit_profile")
        .then((res) => {
          // console.warn(res?.data?.profile_pic,"<================edit_profile");
          setName(res?.data?.name);
          setImage(res?.data?.profile_pic);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return focusListener;
  }, [navigation]);
  useEffect(() => {
    setIsLoading(true);
    getWithToken("departmenttypelist")
      .then((res) => {
        const newDepartmentTypes = [
          {
            name: "Clinic",
            image_name:
              "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          },
          {
            name: "Doctors",
            image_name:
              "https://images.pexels.com/photos/5327659/pexels-photo-5327659.jpeg?cs=srgb&dl=pexels-thirdman-5327659.jpg&fm=jpg",
          },
          ...res?.data,
        ];
        newDepartmentTypes.push();
        // console.log(newDepartmentTypes, "newDepartmentTypes");
        setDepartmentTypes(newDepartmentTypes);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const handleDropdownToggle = () => {
    navigation.navigate("SearchCity");
  };

  const handleSearch = async () => {
    navigation.navigate("SearchScreen");
  };
  const handleNotification = () => {
    navigation.navigate("Notification");
  };
  const handleClick = (id, name) => {
    if (name == "Clinic") {
      if (userCity?.name) {
        navigation.navigate("Clinic", { userCity });
      } else {
        alert("Please select any city");
      }
    } else if (name == "Doctors") {
      if (userCity?.name) {
        navigation.navigate("SearchDoctors", { name: name, userCity });
      } else {
        alert("Please select any city");
      }
    } else {
      if (userCity?.length == 0) {
        alert("Please select any city");
      } else {
        navigation.navigate("Pharmacy", { id: id, name: name, userCity });
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.Leftheader}>
            {image ? (
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 100,
                }}
                onPress={() => navigation.openDrawer()}
              >
                <Image
                  style={{ width: "100%", height: "100%", borderRadius: 100 }}
                  source={{
                    uri: `${Configs.IMG_BASE_URL}${image}`,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <FontAwesome
                  name="user-circle"
                  size={50}
                  color={colors.white}
                />
              </TouchableOpacity>
            )}
            {name ? (
              <Text
                style={{
                  fontWeight: "bold",
                  color: colors.white,
                  marginLeft: 10,
                  width: Dimensions.get("window").width * 0.24,
                }}
                numberOfLines={1}
              >
                Hi, {name}
              </Text>
            ) : null}
          </View>
          <View style={styles.Rightheader}>
            <View style={styles.RightheaderInside}>
              <MaterialIcons
                name="location-on"
                size={24}
                color={colors.white}
              />
              {userCity?.name ? (
                <Text
                  style={styles.dropdownText}
                  numberOfLines={1}
                  onPress={handleDropdownToggle}
                >
                  {userCity?.name}
                </Text>
              ) : (
                <Text
                  style={styles.dropdownText}
                  numberOfLines={1}
                  onPress={handleDropdownToggle}
                >
                  Choose City
                </Text>
              )}
            </View>
            <MaterialCommunityIcons
              name="bell-ring-outline"
              size={24}
              color={colors.white}
              onPress={handleNotification}
            />
          </View>
        </View>

        <View>
          <View style={styles.searchInputDiv}>
            <Octicons
              style={styles.searchInputIcon}
              name="search"
              size={24}
              color="black"
            />
            <TouchableOpacity style={styles.searchInput} onPress={handleSearch}>
              <Text>Search for clinics</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headingDiv}>
          <Text style={styles.headingDivText}>What are you searching for?</Text>
        </View>
        {isLoading ? (
          <Loader size={60} color={colors.white} message={"Please Wait..."} />
        ) : (
          <Options OptionsData={departmentTypes} onPress={handleClick} />
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
  header: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    alignItems: "center",
  },
  Leftheader: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.45,
    alignItems: "center",
  },
  Rightheader: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.45,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  RightheaderInside: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.28,
    justifyContent: "flex-end",
    marginRight: 20,
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
  headingDiv: {
    width: Dimensions.get("window").width * 0.6,
    alignSelf: "center",
    marginBottom: 10,
  },
  headingDivText: {
    color: colors.white,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "500",
  },
  mainBarDiv: {
    flexDirection: "row",
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.95,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: colors.ash,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingLeft: 25,
    marginVertical: 10,
  },
  mainBarRightDiv: {
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").height * 0.1,
  },
  mainBarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  mainBarLeftDiv: {
    width: Dimensions.get("window").width * 0.6,
  },
  mainBarHeading: {
    fontSize: 23,
    fontWeight: "400",
  },
  dropdown: {
    padding: 10,
  },
  dropdownText: {
    fontSize: 15,
    color: colors.white,
    // width: Dimensions.get("window").width * 0.24,
    textAlign: "right",
    // width:Dimensions.get('window').width * 0.16
  },
  modalContainer: {
    flex: 1,
    alignItems: "flex-end",
    paddingTop: 50,
    paddingRight: 40,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").height * 0.35,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  option: {
    padding: 10,
  },
});

export default Dashboard;
