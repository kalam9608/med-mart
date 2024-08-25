import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../configs/colors";
import { LinearGradient } from "expo-linear-gradient";

const Head = (props) => {
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();
  return (
    <>
      {props.Icon ? (
        <View style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          paddingVertical: 10,
          width: Dimensions.get("window").width * 1
        }}>
          <View style={[styles.HeaderDiv]}>
            <Feather
              name={props.leftIcon}
              size={30}
              color="white"
              onPress={goBack}
            />
            <View style={styles.HeaderMiddleDiv}>

              <Text numberOfLines={1} style={styles.HeaderName}>
                {props.name}
              </Text>
              <Text numberOfLines={1} style={styles.HeaderAddress}>
                {props.address}
              </Text>
            </View>
            <Feather
              name={props.rightIcon}
              onPress={props.onPressrightIcon}
              size={24}
              color="white"
            />
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.header,
            {
              backgroundColor: props.profile ? colors.primary : "transparent",
              justifyContent: props.details ? "space-between" : null,
            },
          ]}
        >
          {props.leftIcon ? (
            <Feather
              name={props.leftIcon}
              size={30}
              color={props.profile ? "white" : "black"}
              onPress={goBack}
            />
          ) : null}
          {props.title ? (
            <Text
              style={[
                styles.headerText,
                {
                  color: props.profile ? "white" : "black",
                },
              ]}
            >
              {props.title}
            </Text>
          ) : null}
          {props.details ? (
            <View style={styles.headerRightDiv}>
              <AntDesign
                name={props.lstFstIcon}
                size={24}
                color="white"
                onPress={props.onLstFstIcon}
              />
              <Feather
                name={props.lstSndIcon}
                size={24}
                color="white"
                onPress={props.onlstSndIcon}
              />
            </View>
          ) : null}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  HeaderDiv: {
    width: Dimensions.get("window").width * 0.9,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  HeaderMiddleDiv: {
    width: Dimensions.get("window").width * 0.6,
    elevation: 50,
  },
  HeaderName: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
  },
  HeaderAddress: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    height: 65,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.ash,
  },
  headerText: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "600",
  },
  headerRightDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width * 0.2,
  },
});

export default Head;
