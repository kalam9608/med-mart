import {
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
import { useEffect, useState } from "react";
import Configs from "../configs/Configs";

export default function ListedItems({ ListedItems, onPress ,pharma,empty }) {
  const [img, setImg] = useState([]);
  // console.log(ListedItems, "ListedItems===========");



  const renderItem = ({ item }) => {
    let imageUrl = item?.images?.filter((ele) => ele?.for === "profile")
    let imageUrlMedical = item?.department_images?.filter((ele) => ele?.for === "profile")
    return(
    <TouchableOpacity style={styles.mainBarDiv}>
      <View style={styles.mainBarImageDiv}>
          <Image
            style={styles.mainBarImage}
            source={{
              uri: pharma ? `${Configs.IMG_BASE_URL}${imageUrlMedical[0]?.image_name}` : `${Configs.IMG_BASE_URL}${imageUrl[0]?.image_name}`,
            }}
          />
      </View>
      <View style={styles.mainBarRightDiv}>
        <Text style={styles.mainBarRightHeading}>{item?.name}</Text>
        <Text style={styles.mainBarRightAddress}>{item?.address}</Text>
        <TouchableOpacity
          style={styles.mainBarRightBtn}
          key={item?.id}
          onPress={() => onPress(item)}
        >
          <Text style={styles.mainBarRightBtnText}>View</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
    )
          };
  return (
    <View style={styles.mainContainer}>
      <FlatList data={ListedItems}
       renderItem={renderItem} 
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
                color: colors.primary,
              }}
            >
              No Result Found
            </Text>
          </View>
        ) : null
      }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mainBarDiv: {
    height: Dimensions.get("window").height * 0.2,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: colors.ash,
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainBarImageDiv: {
    width: Dimensions.get("window").width * 0.35,
    height: Dimensions.get("window").height * 0.13,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 15,
  },
  mainBarImage: {
    width: "100%",
    height: "100%",
  },
  mainBarRightDiv: {
    width: Dimensions.get("window").width * 0.55,
    marginRight: 15,
  },
  mainBarRightHeading: {
    fontSize: 20,
    fontWeight: "500",
  },
  mainBarRightAddress: {
    fontSize: 17,
    fontWeight: "400",
    color: "grey",
    marginVertical: 5,
  },
  mainBarRightBtn: {
    backgroundColor: colors.primary,
    height: 45,
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  mainBarRightBtnText: {
    fontSize: 17,
    color: colors.white,
    fontWeight: "500",
  },
});
