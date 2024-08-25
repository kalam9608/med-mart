import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, TextInput, StyleSheet, Text, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const FormInput = ({ label, labelColor, backgroundColor, rightIcon, keyboardType, editable, onSearch, rightIconColor, onChange, defaultValue, placeholder, value, maxLength, autoCapitalize, leftIcon, leftIconColor, onPress, textTransform, multiline, height, borderColor, placeholderTextColor, location, onChooseAddress, place, routeName, fontWeight, fontSize }) => {

  const [number, setNumber] = useState(defaultValue ?? "");

  const [address, setAddress] = useState(place ?? '');
  const [alladdress, setAllAddress] = useState(null);
  const [long_lat, setLongLat] = useState(null);
  

  return (
    
    <View style={[styles.inputBox, {borderColor:borderColor}]}>
      <View style={styles.inputContainer}>
        <Ionicons
          name={rightIcon}
          size={20}
          style={[styles.rightIcon, {marginRight: rightIcon ? 10 :null, width: rightIcon ? 25 : null}]}
          color={rightIconColor}
        />
            <TextInput
              autoCapitalize={autoCapitalize}
              maxLength={maxLength}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              value={value}
              onChangeText={(value) => onSearch(value)}
              editable={editable}
              keyboardType={keyboardType}
              style={[styles.inputType, { flex: rightIcon ? 0.9 : 1, height: height, borderColor: borderColor ? borderColor : '#0D47A1', fontWeight:fontWeight ?? null, paddingLeft: rightIcon ? null : 17, fontSize: fontSize}]}
              multiline={multiline}
            />
        <MaterialCommunityIcons name={leftIcon} size={25} style={styles.leftIcon} color={leftIconColor} onPress={onPress} />
      </View>
      <Text style={[styles.inputLabel, { backgroundColor: backgroundColor, color: labelColor }]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  inputBox: {
    marginVertical: 10,
    borderWidth: 1.5,
    height: 50,
    // borderColor: '#0D47A1',
    borderRadius: 15,
    padding: 5,
    paddingTop: 10,
  },
  inputLabel: {
    position: 'absolute',
    top: -13,
    left: 15,
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputType: {
    flex: 0.9,
    // lineHeight: 35,
    color: 'black',
  },
  rightIcon: {
    // position:'absolute',
    left: 5,
    height: 25,
    // width: 25,
    // marginRight: 10,
    alignSelf:'center'

  },
  leftIcon: {
    position: 'absolute',
    right: 5
  }
})

export default FormInput;