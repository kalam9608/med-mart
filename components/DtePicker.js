// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Platform,
//   StyleSheet,
// } from "react-native";
// import moment from "moment";

// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { Ionicons } from "@expo/vector-icons";
// import colors from "../configs/colors";

// export const SingleDatePicker = (props) => {
//   const [isDateTimePickerVisible, setDatePickerVisibility] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(
//     moment(new Date()).format("YYYY-MM-DD")
//   );
//   const [nextDate, setNextdate] = useState(moment().add(1, "day"));

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   useEffect(() => {
//     props.getSelectedDate(selectedDate);
//   }, [selectedDate]);

//   const handleConfirm = (selectedDate) => {
//     setSelectedDate(moment(selectedDate).format("YYYY-MM-DD"));
//     hideDatePicker();
//   };

//   const handlePrevDayPress = () => {
//     const prevDate = new Date(selectedDate);
//     prevDate.setDate(prevDate.getDate() - 1);
//     let pDate = moment(prevDate).format("YYYY-MM-DD");

//     setSelectedDate(pDate);
//   };

//   const handleNextDayPress = () => {
//     const nextDate = new Date(selectedDate);
//     nextDate.setDate(nextDate.getDate() + 1);
//     let nDate = moment(nextDate).format("YYYY-MM-DD");

//     setSelectedDate(nDate);
//   };

//   return (
//     // <View style={styles.dateRangePickerWrapper}>
//     <View style={{ padding: 5 }}>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <TouchableOpacity onPress={handlePrevDayPress}>
//           <Ionicons
//             name="caret-back-outline"
//             size={25}
//             style={{ color: colors.primary }}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => {
//             showDatePicker("from");
//           }}
//           style={styles.dateRangePickerDateContainer}
//         >
//           <Text style={{ color: colors.primary, fontSize: 16 }}>
//             {moment(selectedDate).format("Do MMM yy")}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleNextDayPress}>
//           <Ionicons
//             name="caret-forward-outline"
//             size={25}
//             style={{ color: colors.primary }}
//           />
//         </TouchableOpacity>
//       </View>

//       <DateTimePickerModal
//         // display={Platform.OS == "ios" ? display : "default"}
//         mode={"date"}
//         isVisible={isDateTimePickerVisible}
//         onConfirm={handleConfirm}
//         onCancel={hideDatePicker}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   images: { height: 15, width: 15, resizeMode: "contain" },
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   body: {
//     flex: 9,
//   },
//   icon: {
//     position: "absolute",
//     bottom: 20,
//     width: "100%",
//     left: 290,
//     zIndex: 1,
//   },
//   numberBox: {
//     position: "absolute",
//     bottom: 75,
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     left: 330,
//     zIndex: 3,
//     backgroundColor: "#e3e3e3",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   number: { fontSize: 14, color: "#000" },
//   dateRangePickerWrapper: {
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//     paddingHorizontal: 5,
//     paddingVertical: 5,
//     borderRadius: 3,
//     width: "100%",
//     marginTop: 10,
//     flexDirection: "row",
//     alignItems: "flex-start",
//     justifyContent: "space-between",
//   },
//   dateRangePickerDateContainer: {
//     paddingHorizontal: 15,
//   },
//   listItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 5,
//     paddingHorizontal: 8,
//     borderWidth: 0.6,
//     borderRadius: 2,
//     borderColor: colors.primary,
//     marginRight: 5,
//   },
//   name: {
//     fontSize: 14,
//     color: colors.white,
//   },
// });
// export default styles;