import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import colors from "../configs/colors";
import { clearUserData } from "../util/Util";
import { getWithToken, postFormData, postFormDataLogout } from "./Api";
import Configs from "../configs/Configs";

export default function CustomDrawerContent() {
  const navigation = useNavigation();
  const { setUserData, userData, userCity } = useContext(AppContext);
  const [name, setName] = useState(userData?.name);
  const [image, setImage] = useState(userData?.profile_pic);

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      getWithToken("edit_profile")
        .then((res) => {
          console.log(userData?.id, "85555555555555555555555");
          setName(res?.data?.name);
          setImage(res?.data?.profile_pic);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return focusListener;
  }, [navigation]);
  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
    navigation.dispatch(DrawerActions.closeDrawer());
  };
  const handleDashboard = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate("Dashboard");
  };
  const handleFavorite = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate("Favorite");
  };
  const handleClinic = () => {
    navigation.navigate("Clinic", { userCity });
  };
  const handleDoctors = () => {
    navigation.navigate("SearchDoctors", { name: "Doctors", userCity });
  };
  const handleAboutUs = () => {
    navigation.navigate("AboutUs");
    navigation.dispatch(DrawerActions.closeDrawer());
  };
  const handleHelpCenter = () => {
    navigation.navigate("HelpCenter");
    navigation.dispatch(DrawerActions.closeDrawer());
  };
  const handleBookingHistory = () => {
    navigation.navigate("BookingHistory");
    navigation.dispatch(DrawerActions.closeDrawer());
  };
  const handleLogout = () => {
    const formData = new FormData();
    formData.append("user_id", userData?.id);
    postFormData("logout", formData)
      .then((res) => {
        alert(res?.message);
        clearUserData("user_data");
        setUserData(null);
      })
      .catch((err) => {
        console.log(err);
        console.log(err, "logged out");
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          paddingBottom: 10,
          paddingRight: 5,
          borderColor: colors.ash,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onPress={handleEditProfile}
        >
          {image ? (
            <View
              style={{
                width: 60,
                height: 60,
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 100,
                marginHorizontal: 10,
              }}
            >
              <Image
                style={{ width: "100%", height: "100%", borderRadius: 100 }}
                source={{
                  uri: `${Configs.IMG_BASE_URL}${image}`,
                  // "https://img.freepik.com/premium-vector/man-profile-cartoon_18591-58482.jpg?w=360",
                }}
              />
            </View>
          ) : (
            <View style={{ marginHorizontal: 15 }}>
              <FontAwesome name="user-circle" size={50} color="black" />
            </View>
          )}
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>{name}</Text>
            <Text
              style={{ fontSize: 15, fontWeight: "600", color: colors.primary }}
              
            >
              View and edit profile
            </Text>
          </View>
        </TouchableOpacity>
        <MaterialIcons name="arrow-forward-ios" size={15} color="grey" />
      </View>
      <ScrollView>
        <TouchableOpacity
          onPress={handleDashboard}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="dashboard" size={24} color={colors.primary} />
            <Text style={{ fontSize: 17, fontWeight: "500", paddingLeft: 10 }}>
              Dashboard
            </Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={15} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleBookingHistory}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* <MaterialIcons name="dashboard" size={24} color={colors.primary} /> */}
            <FontAwesome name="history" size={24} color={colors.primary} />
            <Text style={{ fontSize: 17, fontWeight: "500", paddingLeft: 10 }}>
              Booking History
            </Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={15} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}
          onPress={handleFavorite}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <AntDesign name="star" size={24} color={colors.primary} />
            <Text style={{ fontSize: 17, fontWeight: "500", paddingLeft: 10 }}>
              Favorite
            </Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={15} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleClinic}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FontAwesome5
              name="clinic-medical"
              size={24}
              color={colors.primary}
            />
            <Text style={{ fontSize: 17, fontWeight: "500", paddingLeft: 10 }}>
              Clinic
            </Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={15} color="grey" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}
          onPress={handleDoctors}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Fontisto name="doctor" size={24} color={colors.primary} />
            <Text style={{ fontSize: 17, fontWeight: "500", paddingLeft: 10 }}>
              Doctors
            </Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={15} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}
          onPress={handleAboutUs}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Entypo name="info-with-circle" size={24} color={colors.primary} />
            <Text style={{ fontSize: 17, fontWeight: "500", paddingLeft: 10 }}>
              About Us
            </Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={15} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}
          onPress={handleHelpCenter}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Entypo name="help-with-circle" size={24} color={colors.primary} />
            <Text style={{ fontSize: 17, fontWeight: "500", paddingLeft: 10 }}>
              Help Center
            </Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={15} color="grey" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginVertical: 20,
            backgroundColor: colors.primary,
            width: Dimensions.get("window").width * 0.6,
            alignSelf: "center",
            alignItems: "center",
            height: 46,
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontSize: 17, fontWeight: "500", color: colors.white }}
            onPress={handleLogout}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
