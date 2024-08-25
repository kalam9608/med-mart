import React, { useContext } from "react";
import GlobalState from "./context/GlobalState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigation from "./components/Navigation";
import { AppContextProvider } from "./context/AppContext";
import "react-native-gesture-handler";
// import { Provider } from "react-redux";
import { store } from "./redux/app/store";
import { readData, registerForPushNotificationsAsync } from "./util/Util";
import { ActivityIndicator, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import * as Notifications from 'expo-notifications';
import ErrorBoundary from "react-native-error-boundary";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      city:{},
      isLoading: true,
    };
    this.notificationListener = React.createRef();
    this.responseListener = React.createRef();
  }

  componentDidMount() {
    // Call the function to register for push notifications when the component mounts
    registerForPushNotificationsAsync();

    // Handle incoming push notifications
    this.notificationSubscription = Notifications.addNotificationReceivedListener(notification => {
      // Handle the received notification here
      console.warn(notification,"notificationnotification");
    });
  }

  componentWillUnmount() {
    // Clean up the subscription when the component unmounts
    if (this.notificationSubscription) {
      this.notificationSubscription.remove();
    }
  }


  
  async componentDidMount() {
    try {
      const user_data = await readData("user_data");
      this.setState({ data: user_data });
      const user_city = await readData("user_city");
      console.log(user_city,"user_cityuser_city");
      this.setState({ city: user_city });
    } catch (error) {
      console.log("error", error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }
  render() {
    if (this.state.isLoading == false) {
      return (
        // <GlobalState>
        <ErrorBoundary>
        <PaperProvider>
          <AppContextProvider wholeData={this.state.data} userCityName={this.state.city}>
            {/* <Provider store={store}> */}
            <Navigation />
            {/* </Provider> */}
          </AppContextProvider>
        </PaperProvider>
        </ErrorBoundary>
        //  </GlobalState>
      );
    } else {
      return (
        <>
          <View>
            <ActivityIndicator size="large" color="red" />
          </View>
        </>
      );
    }
  }
}
