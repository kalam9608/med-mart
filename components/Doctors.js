import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native";
import colors from "../configs/colors";
import Button from "./Button";
import { useState } from "react";
import Configs from "../configs/Configs";

export default function Doctors({
  clinicData,
  onPressDetail,
  onPressRupees,
  handleMoreData,
  empty,
  pagination,
  renderFooter,
  fav,
}) {
  const renderData = ({ item }) => {
    // console.log(item,"doctor list");
    return (
      <View style={styles.MainDiv}>
        <View style={styles.MainUpperDiv}>
          <View style={styles.imageDiv}>
            <Image
              style={styles.image}
              source={{
                uri: item?.profile_pic
                  ? `${Configs.IMG_BASE_URL}${item?.profile_pic}`
                  : `https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg`,
              }}
            />
          </View>
          <View style={styles.RightUpperDiv}>
            {fav ? (
              <Text style={styles.nameText} onPress={() => onPressDetail(item)}>
                {item?.doctor?.name}
              </Text>
            ) : (
              <Text style={styles.nameText} onPress={() => onPressDetail(item)}>
                {item?.name}
              </Text>
            )}
            {fav ? (
              <Text style={styles.roleText}>
                {item?.doctor?.specialization?.name}
              </Text>
            ) : (
              <Text style={styles.roleText}>{item?.specialization?.name}</Text>
            )}
            {/* <Text style={styles.experienceText}>{item.experience_in_year} years experience overall</Text>
            <Text style={styles.feesText}>
              <Text style={styles.fees}>{item.fees}</Text> Consultation Fees
            </Text> */}
          </View>
        </View>
        {/* <View style={{ marginTop: 10, marginBottom: 20 }}>
            <Text style={styles.address}>{item.address}</Text>
        </View> */}
        <TouchableOpacity
          style={styles.ClinicVisitBtn}
          onPress={() => onPressRupees(item)}
        >
          <Text style={styles.ClinicVisitBtnText}>
            {/* Book Clinic Visit 12 Rupees for Platfom Charge */}
            Appointment Booking
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.ClinicVisitBtn}>
          <Button BtnText={"Book Doctor"} onPress={() => onPress(item)} />
        </TouchableOpacity> */}
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={clinicData}
        renderItem={renderData}
        ListEmptyComponent={
          empty ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: colors.white,
                }}
              >
                No Result Found
              </Text>
            </View>
          ) : null
        }
        onEndReached={handleMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  MainDiv: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 5,
    borderColor: "#D6D8D7",
    backgroundColor: "white",
  },
  MainUpperDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#D6D8D7",
  },
  imageDiv: {
    height: 100,
    width: 100,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  RightUpperDiv: {
    width: Dimensions.get("window").width * 0.6,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "500",
  },
  roleText: {
    fontSize: 17,
  },
  experienceText: {
    fontSize: 17,
  },
  fees: {
    fontSize: 17,
    fontWeight: "500",
  },
  feesText: {
    fontSize: 17,
  },
  hospital: {
    fontSize: 17,
  },
  address: {
    fontSize: 17,
    fontWeight: "500",
  },
  // ClinicVisitBtn: {
  //   width: Dimensions.get("window").width * 0.52,
  //   alignSelf: "flex-end",
  // },
  // ClinicVisitBtnText: {
  //   color: "white",
  //   fontSize: 17,
  // },
  ClinicVisitBtn: {
    backgroundColor: colors.primary,
    marginVertical: 10,
    paddingHorizontal: 5,
    height: 46,
    width: Dimensions.get("window").width * 0.93,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    borderRadius: 7,
  },
  ClinicVisitBtnText: {
    color: "white",
    fontSize: 20,
  },
});
