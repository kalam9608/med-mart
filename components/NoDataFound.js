import React from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";

const NoDataFound = ({ color, message }) => {
  return (
    <>
      <View
        style={{
          height: Dimensions.get("window").height * 0.7,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{ width: 200, height: 200 }}
          source={
            require("../assets/nodata.png")
          }
        />
        <Text
          style={{ color: color, fontSize: 20, fontWeight: "600" }}
        >
          {message}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Loadercontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NoDataFound;
