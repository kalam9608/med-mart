import AsyncStorage from "@react-native-async-storage/async-storage";
import * as mime from "react-native-mime-types";
import queryString from "query-string";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

/**
 * Gets Data from async storage
 * @param {\} key
 * @returns
 */
export const readData = async (key) => {
  try {
    let rawData = await AsyncStorage.getItem(key);
    return rawData !== null ? JSON.parse(rawData) : null;
  } catch (e) {
    throw new Error("failed to retrieve data from storage");
  }
};

/**
 * Stores data in async storage
 * @param {*} key
 * @param {*} value
 */
export const writeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    throw new Error("failed to write data in storage");
  }
};

export const clearUserData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    throw new Error("failed to remove data from device");
  }
};

export const getFileData = (obj = {}) => {
  let uri = obj.uri;
  let arr = uri.split("/");
  let fileName = arr[arr.length - 1];

  return {
    uri: uri,
    name: fileName,
    type: mime.lookup(fileName),
  };
};

export const extractCoordinatesFromGoogleMapsURL = (url) => {
  const parsedUrl = queryString.parseUrl(url);
  const { query } = parsedUrl;

  if (query && query[0]) {
    const [lat, lng] = query[0].split(",");
    return {
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
    };
  }

  return null;
};

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  if (Device.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return null;
    }
    try {
      token = (await Notifications.getExpoPushTokenAsync({ experienceId: "@desun/medical-app" })).data;
    } catch (error) {
      console.error("Error getting token:", error);

    }
    console.log(token, "tokentokentokentokentokentokentoken");
  } else {
    alert("Must use physical device for Push Notifications");
    return null;
  }

  return token;
}

export const getDeviceToken = async () => {
 
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
 
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
};




































// export const getDeviceToken = async () => {
// 	let token = null;

// 	if (Device.isDevice) {
// 		const { status: existingStatus } = await Permissions.getAsync(
// 			Permissions.NOTIFICATIONS
// 		);
// 		let finalStatus = existingStatus;

// 		if (existingStatus !== "granted") {
// 			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
// 			finalStatus = status;
// 		}
// 		if (finalStatus === "granted") {
//       try {
//         const tokenData = await Notifications.getExpoPushTokenAsync({experienceId: '@desun2//medical-app'});
//         token = tokenData.data;
//     } catch (error) {
//         console.log('Error getting push token:', error);
//     }
// 			// token = await Notifications.getExpoPushTokenAsync();
// 		} else {
// 			console.log("Failed to get push token for push notification!");
// 		}
// 	} else {
// 		console.log("Must use physical device for Push Notifications");
// 	}

// 	if (Platform.OS === "android") {
// 		Notifications.setNotificationChannelAsync("default", {
// 			name: "default",
// 			importance: Notifications.AndroidImportance.MAX,
// 			vibrationPattern: [0, 250, 250, 250],
// 			lightColor: "#FF231F7C",
// 		});
// 	}

// 	return token;
// };
