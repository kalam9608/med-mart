import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../configs/colors";
import { useRef } from "react";
import { useEffect } from "react";
import NotifyCards from "../components/NotifyCards";
import Head from "../components/Head";
import { getWithToken } from "../components/Api";
import Loader from "../components/Loader";
import NoDataFound from "../components/NoDataFound";

const NotifyData = [
  {
    id: 1,
    NotifyText: "You are logged in",
    NotifyDes: "You are logged in",
    time: 'now'
  },
  {
    id: 2,
    NotifyText: "Ticket booked in MED PLUS",
    NotifyDes: "You are logged in",
    time: '10 min ago'
  },
  {
    id: 3,
    NotifyText: "Missed the appointment for Dr. Sudha",
    NotifyDes: "You are logged in",
    time: '21 min ago'
  },
  {
    id: 4,
    NotifyText: "Ticket booked in MED PHARMA",
    NotifyDes: "You are logged in",
    time: '1 hr ago'
  },
  {
    id: 5,
    NotifyText: "You are logged in",
    NotifyDes: "You are logged in",
    time: '12 hr ago'
  },
  {
    id: 6,
    NotifyText: "Missed the appointment for Dr. SP Singh",
    NotifyDes: "You are logged in",
    time: '1 day ago'
  },
  {
    id: 7,
    NotifyText: "You are logged in",
    NotifyDes: "You are logged in",
    time: '5 day ago'
  },
  {
    id: 8,
    NotifyText: "Ticket booked in MED PLUS",
    NotifyDes: "You are logged in",
    time: '11 day ago'
  },
  {
    id: 9,
    NotifyText: "Missed the appointment for Dr. Sudha",
    NotifyDes: "You are logged in",
    time: '21 day ago'
  },
  {
    id: 10,
    NotifyText: "Ticket booked in MED PHARMA",
    NotifyDes: "You are logged in",
    time: '1 month ago'
  },
  {
    id: 11,
    NotifyText: "You are logged in",
    NotifyDes: "You are logged in",
    time: '11 month ago'
  },
  {
    id: 12,
    NotifyText: "Missed the appointment for Dr. SP Singh",
    NotifyDes: "You are logged in",
    time: '1 year ago'
  },
];

const Notification = () => {
  const [notification, setNotification] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    setIsLoading(true)
    getWithToken("notification")
      .then((res) => {
        setNotification(res?.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false)
      })
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Head Icon={false} leftIcon={"arrow-left"} title={'Notifications'} />
      <View style={styles.container}>
        {isLoading ? (
          <Loader size={60} color={colors.white} message={"Please Wait..."} />
        ) : (
          <>
            {notification.length == 0 ? (
              <NoDataFound color={colors.white}
                message={`No Notification found`} />
            ) : (
              <NotifyCards NofityData={notification} />
            )
            }
            </>
        )
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 10
  },
});

export default Notification;
