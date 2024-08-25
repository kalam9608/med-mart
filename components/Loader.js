import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import {FontAwesome} from "@expo/vector-icons"
import colors from "../configs/colors";
import { ActivityIndicator } from "react-native-paper";


const Loader = ({ size,color,message }) => {
    return(
        <>
          <View style={styles.Loadercontainer}>
            <ActivityIndicator size={size} color={color} />
            <Text style={{
              color:color,
              fontWeight:'500'
              }}>{message}</Text>
          </View>
        </>
    )
}

const styles = StyleSheet.create({
    Loadercontainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
})

export default Loader;