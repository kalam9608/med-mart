import React from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	StatusBar,
} from "react-native";
import Colors from "../configs/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = (props) => {

	const navigation = useNavigation();

	const gotoBack = () => navigation.goBack();

	const profile = () => navigation.navigate('ProfileDetails')

		return (
			<>
				<StatusBar
					barStyle="dark-content"
					backgroundColor={Colors.white}
					animated={true}
				/>
				<View style={styles.header}>
					{props.leftIconName ? (
						<TouchableOpacity
							style={{ width: "15%" }}
							onPress={props.route === "Home" ? toggleDrawer : gotoBack}
						>
							<Ionicons
								name={props.leftIconName}
								size={28}
								color={Colors.black}
							/>
						</TouchableOpacity>
					) : null}

					{props.title ? (
						<View style={styles.headerLeft}>
							<Text style={styles.headerLeftTitle}>{props.title}</Text>
							{props.subTitle ? (
								<Text style={styles.headerLeftSubTitle}>{props.subTitle}</Text>
							) : null}
						</View>
					) : null}
					{props.rightIconName ? (
						<View
							style={{
								width: "30%",
								alignItems: "center",
								flexDirection: "row",
								justifyContent: "space-around",
							}}
						>
							<TouchableOpacity
							activeOpacity={1}
						>
							<Ionicons
								name={props.rightIconName}
								size={28}
								color={Colors.black}
							/>
						</TouchableOpacity>
						</View>
					) : null}
				</View>
			</>
		);
}
export default Header;

const styles = StyleSheet.create({
	header: {
		height: 50,
		alignItems: "center",
		paddingHorizontal: 15,
		flexDirection: "row",
		backgroundColor: Colors.white,
		//borderWidth: 1,
	},
	headerLeft: {
		// borderWidth: 1,
		width: "65%",
		paddingLeft: 10,
		//alignItems: "center",
	},
	headerLeftTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: Colors.black,
	},
	headerLeftSubTitle: {
		// color: Colors.medium,
		fontSize: 15,
	},
});