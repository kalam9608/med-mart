import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import {FontAwesome} from "@expo/vector-icons"
import colors from "../configs/colors";


const Input = ({onChangeText, leftIcon,placeholder,IconSize}) => {
    return(
        <>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <FontAwesome name={leftIcon} size={IconSize} style={{position:'absolute', left:10, paddingRight:10}} />
                <TextInput 
                    onChangeText={onChangeText}
                    style={{
                        borderWidth:1,
                        borderRadius:7,
                        borderColor:'#ccc',
                        height:46,
                        flex: 1,
                        paddingLeft:leftIcon ? 40 : 10
                    }}
                    placeholder={placeholder}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({

})

export default Input;





