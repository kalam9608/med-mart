import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import colors from "../configs/colors";
import { ActivityIndicator } from "react-native-paper";
import Head from "../components/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { getWithToken } from "../components/Api";
import Communications from 'react-native-communications';

const HelpCenter = () => {
  const [helpCenter, setHelpCenter] = useState([]);

  // useEffect(() => {
  //   getWithToken("staticpage/type/Help Center")
  //     .then((res) => {
  //       console.log(res?.data);
  //       setHelpCenter(res?.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    getWithToken("settings")
      .then((res) => {
        console.log(res?.data[0]?.whatsapp,"whatsapp");
        setHelpCenter(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleWhatsappSupport = () => {
    const phoneNumber = helpCenter[0]?.whatsapp;
    const message = 'Hello, Need Help';

    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    Linking.canOpenURL(url)
        .then(supported => {
            return Linking.openURL(url);
        })
        .catch(error => console.log("Error:", error));
};
  const handleCallPress = () => {
    const url = `tel:${helpCenter[0]?.phone}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log(`Can't handle URL: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };
  return (
    <SafeAreaView style={styles.Loadercontainer}>
      <Head
        Icon={false}
        profile={true}
        leftIcon={"arrow-left"}
        title={"Help Center"}
      />
      <ScrollView
        style={{ marginHorizontal: 15, paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            alignSelf: "center",
            marginBottom:30
          }}
          source={{
            uri:
              "https://w7.pngwing.com/pngs/198/625/png-transparent-call-centre-customer-service-computer-icons-call-centre-miscellaneous-face-telephone-call.png",
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: colors.primary,
            textAlign: "center",
            marginVertical: 10,
            marginHorizontal: 10,
          }}
        >
          WE ARE HAPPY TO HELP YOU
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: colors.primary,
            textAlign: "center",
            marginHorizontal: 10,
          }}
        >
          Just give us a call or whatsapp your query
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: colors.primary,
            textAlign: "center",
            marginHorizontal: 10,
            marginTop: 20,
          }}
        >
          Our Support Executive will resolve your query as on priority
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 50,
          }}
        >
          <TouchableOpacity
            style={{
              height: 150,
              width: 150,
              backgroundColor: colors.white,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
              borderWidth:1,
              borderColor:colors.ash
            }}
            onPress={handleCallPress}
          >
            <Feather name="phone-call" size={100} color={colors.themeBlue} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 150,
              width: 150,
              backgroundColor: colors.white,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
              borderWidth:1,
              borderColor:colors.ash
            }}
            onPress={handleWhatsappSupport}
          >
            <Ionicons name="logo-whatsapp" size={100} color={colors.green} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Loadercontainer: {
    flex: 1,
  },
});

export default HelpCenter;
