// import React, { useContext, useEffect, useState } from "react";
// import { Linking, ToastAndroid, View } from "react-native";
// import { WebView } from "react-native-webview";
// import { useNavigation } from "@react-navigation/native";
// import Configs from "../configs/Configs";
// import { AppContext } from "../context/AppContext";
// import { SafeAreaView } from "react-native-safe-area-context";

// const PaymentScreen = () => {
//   const { userData } = useContext(AppContext);
//   console.log(userData,"userData");

//   const formData = new FormData();
//   formData.append('name', userData?.name);
//   formData.append('email', userData?.email);
//   formData.append('mobile', userData?.mobile);
//   formData.append('amount', 12);
//   return (
//     <>
//         <WebView
//           source={{
//             uri: `${Configs.BASE_URL}/cashfree/payments/store`,
//             method: "POST",
//             body:{formData}
//           }}
//           style={{ flex: 1 }}
//         />
//     </>
//   );
// };

// export default PaymentScreen;










import React, { useContext, useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
import Configs from "../configs/Configs";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import colors from "../configs/colors";

const PaymentScreen = ({ onClose, item }) => {
  const navigation = useNavigation();
  const { userData } = useContext(AppContext);
  const [webViewMessage, setWebViewMessage] = useState('');


  const handleWebViewMessage = (event) => {
    const message = event.nativeEvent.data;
    setWebViewMessage(message);
  };

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      console.log('webViewMessage======================>', item);
    });
    return focusListener;
  }, [webViewMessage, navigation]);


  const injectScript = `
    // This script listens for messages from the web page
    window.addEventListener('message', function(e) {
      // Pass the payment response data to the handlePaymentResponse function
      window.ReactNativeWebView.postMessage(e.data);
    });
  `;
  
  const postData = `name=${userData?.name}&email=${userData?.email}&mobile=${userData?.mobile}&amount=12&doctor_id=${item.id}`;

  return (
    <>
      <Modal animationType="slide" visible={true}>
        <View style={{ flex: 1 }}>
          {/* Custom header with close button */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
            <Text style={{ fontSize: 12, color: colors.green }}>Don't close until the payment process completed</Text>
            <TouchableOpacity onPress={onClose} style={{ padding: 10 }}>
              <Text style={{ color: colors.red }}>Close</Text>
            </TouchableOpacity>
          </View>

          <WebView
            source={{
              uri: `${Configs.BASE_URL}/cashfree/payments/store`,
              method: "POST",
              body: postData,
            }}
            injectedJavaScript={injectScript}
            onMessage={handleWebViewMessage}
            style={{ flex: 1 }}
          />
        </View>
      </Modal>
    </>
  );
};

export default PaymentScreen;

