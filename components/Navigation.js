import React, { Component, useContext } from "react";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  Fontisto,
  Entypo,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Auth/Login";
import Password from "../screens/Auth/Password";
import LoginPassword from "../screens/Auth/LoginPassword";
import Otp from "../screens/Auth/Otp";
import Pharmacy from "../screens/Pharmacy";
import PharmacyDetails from "../screens/PharmacyDetails";
import ClinicDetails from "../screens/ClinicDetails";
import Clinic from "../screens/Clinic";
import ClinicVisit from "../screens/ClinicVisit";
import EditProfile from "../screens/EditProfile";
import { useSelector } from "react-redux";
import { AppContext } from "../context/AppContext";
import { clearUserData } from "../util/Util";
import colors from "../configs/colors";
import SearchScreen from "../screens/Search";
import Notification from "../screens/Notification";
import CustomDrawerContent from "./CustomDrawerContent";
import DoctorDetails from "../screens/DoctorDetails";
import SearchDoctors from "../screens/SearchDoctors";
import SearchVeterinaryDoctors from "../screens/SearchVeterinaryDoctors";
import ScanCenter from "../screens/ScanCenter";
import ScanCenterDetails from "../screens/ScanCenterDetails";
import AboutUs from "../screens/AboutUs";
import HelpCenter from "../screens/HelpCenter";
import BookingHistory from "../screens/BookingHistory";
import SearchCity from "../screens/SearchCity";
import PatientForm from "../screens/PatientForm";
import BookingDetails from "../screens/BookingDetails";
import BookingHistoryDetails from "../screens/BookingHistoryDetails";
import Favorite from "../screens/Favorite";
import PaymentScreen from "../screens/Payment";
import TermsConditions from "../screens/TermsConditions";
import BookingViewDetails from "../screens/BookingViewDetails";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const activeIconSize = 15;
const inactiveIconSize = 20;

const LoginStack = () => {
  // const { users } = useSelector((store) => {
  //   return {
  //     users: store.user.users
  //   }
  // })

  // if(users.message === 'User Present'){
  //
  // }

  // console.log(users, 'userssss')

  return (
    <Stack.Navigator initialRouteName={"Login"}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Password"
        component={Password}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="LoginPassword"
        component={LoginPassword}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Otp"
        component={Otp}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="TermsConditions"
        component={TermsConditions}
      />
    </Stack.Navigator>
  );
};

const MainStack = () => (
  <Stack.Navigator
    initialRouteName="Dashboard"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      options={{
        title: "",
        headerShown: false,
      }}
      name="Dashboard"
      component={DrawerNav}
    />
    <Stack.Screen
      options={{
        title: "",
        headerShown: false,
      }}
      name="EditProfile"
      component={EditProfile}
    />
    <Stack.Screen
      options={{
        title: "",
        headerShown: false,
      }}
      name="SearchScreen"
      component={SearchScreen}
    />
    <Stack.Screen
      options={{
        title: "",
        headerShown: false,
      }}
      name="Notification"
      component={Notification}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="Pharmacy"
      component={Pharmacy}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="PharmacyDetails"
      component={PharmacyDetails}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="Clinic"
      component={Clinic}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="ClinicDetails"
      component={ClinicDetails}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="ClinicVisit"
      component={ClinicVisit}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="DoctorDetails"
      component={DoctorDetails}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="SearchDoctors"
      component={SearchDoctors}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="SearchVeterinaryDoctors"
      component={SearchVeterinaryDoctors}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="ScanCenter"
      component={ScanCenter}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="ScanCenterDetails"
      component={ScanCenterDetails}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="AboutUs"
      component={AboutUs}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="HelpCenter"
      component={HelpCenter}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="BookingHistory"
      component={BookingHistory}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="SearchCity"
      component={SearchCity}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="PatientForm"
      component={PatientForm}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="BookingDetails"
      component={BookingDetails}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="BookingHistoryDetails"
      component={BookingHistoryDetails}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="Favorite"
      component={Favorite}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="PaymentScreen"
      component={PaymentScreen}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="BookingViewDetails"
      component={BookingViewDetails}
    />
  </Stack.Navigator>
);

const DrawerNav = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: false,
    }}
    drawerContent={CustomDrawerContent}
  >
    <Drawer.Screen name="Dash" component={Dashboard} />
  </Drawer.Navigator>
);

export default class Navigation extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      isLoggedin: false,
    };
  }

  componentDidMount() {
    const { userData } = this.context;
    if (userData?.data?.status !== "active") {
      this.setState({
        isLoggedin: false,
      });
    } else {
      this.setState({
        isLoggedin: true,
      });
    }
  }

  render() {
    // console.log(this.context.userData, "this.context.userData");

    return (
      <NavigationContainer>
        {this.context?.userData != null ? <MainStack /> : <LoginStack />}
      </NavigationContainer>
    );
  }
}
