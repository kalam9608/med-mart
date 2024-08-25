import React from "react";
import { Switch } from "react-native";
import colors from "../configs/colors";


const SwitchButton = ({ value, onValueChange }) => {
  return (
    <>
      <Switch
        trackColor={{ false: "#767577", true: "#dfd0f7" }}
        thumbColor={value ? "#6610f2" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
      />
    </>
  );
};

export default SwitchButton;
