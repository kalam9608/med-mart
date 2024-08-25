import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../configs/colors";
import { ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const Button = ({ onPress, BtnText, isLoading,call,size }) => {
  return (
    <>
      {call ? (
        <TouchableOpacity style={styles.signupBtnDiv} onPress={onPress}>
          {isLoading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="call"
                size={24}
                color="white"
                style={{ marginRight: 10 }}
              />
              <Text style={[styles.signupText,{
              fontSize:size
            }]}>{BtnText}</Text>
            </View>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.signupBtnDiv} onPress={onPress}>
          {isLoading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Text style={[styles.signupText,{
              fontSize:size
            }]}>{BtnText}</Text>
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  signupBtnDiv: {
    backgroundColor: colors.primary,
    height: 55,
    marginHorizontal: 15,
    borderRadius: 7,
    justifyContent: "center",
    // marginVertical: 20,
  },
  signupText: {
    color: "white",
    // fontSize: 22,
    textAlign: "center",
  },
});

export default Button;
