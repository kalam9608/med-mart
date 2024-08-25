import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../configs/colors";
import moment from "moment";

const NotifyCards = ({ NofityData }) => {


  const renderItems = ({ item }) => {
    const parsedDate = moment.utc(item?.created_at);
    const updatedDate = parsedDate.clone().add(5, 'hours').add(30, 'minutes');
    const humanReadable = updatedDate.format('MMMM Do YYYY, h:mm:ss a');
    return  (
      <View style={styles.main_card}>
        <View style={styles.main_card1}>
          <Entypo name="bell" size={24} color={colors.ash} />
          <View>
            <Text style={styles.text}>{item?.title}</Text>
            <Text style={styles.text1}>{item?.message}</Text>
          </View>
        </View>
        <Text style={styles.Timetext}>{humanReadable}</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList renderItem={renderItems} data={NofityData} />
    </View>
  );
};

const styles = StyleSheet.create({
  main_card: {
    width: Dimensions.get("window").width * 0.95,
    minHeight: 60,
    backgroundColor: colors.white,
    marginVertical: 10,
    alignSelf: "center",
    borderRadius: 10,
    paddingVertical: 15,
  },
  main_card1: {
    width: Dimensions.get("window").width * 0.95,
    backgroundColor: colors.white,
    marginVertical: 10,
    alignItems: "center",
    paddingHorizontal: 15,
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "left",
    width: Dimensions.get("window").width * 0.8,
    marginLeft: 10,
    // color:colors.white
  },
  text1: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "left",
    width: Dimensions.get("window").width * 0.8,
    marginLeft: 10,
    // color:colors.white
  },
  Timetext: {
    textAlign: "right",
    marginRight: 10,
    fontWeight: "400",
    color: colors.grey,
  },
});

export default NotifyCards;
