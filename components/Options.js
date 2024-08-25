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
import Configs from "../configs/Configs";

export default function Options({ OptionsData, onPress }) {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => onPress(item.id,item.name)}
        style={styles.mainBarDiv}
      >
        <View style={styles.mainBarLeftDiv}>
          <Text style={styles.mainBarHeading}>{item.name}</Text>
        </View>
        <View style={styles.mainBarRightDiv}>
          <Image
            style={styles.mainBarImage}
            source={{
              uri:
                item?.name == "Clinic" || item?.name == "Doctors"
                  ? item.image_name
                  : `${Configs.IMG_BASE_URL}${item.image_name}`,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <FlatList data={OptionsData} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mainBarDiv: {
    flexDirection: "row",
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.95,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: colors.ash,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingLeft: 25,
    marginVertical: 10,
    backgroundColor: colors.white,
  },
  mainBarRightDiv: {
    height: 80,
    width: 80,
  },
  mainBarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  mainBarLeftDiv: {
    width: Dimensions.get("window").width * 0.6,
  },
  mainBarHeading: {
    fontSize: 23,
    fontWeight: "400",
  },
});
