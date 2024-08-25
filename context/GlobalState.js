// import React from "react";
// import AppContext from "./AppContext";

// export default class State extends React.Component {
//   constructor(props) {
//     super(props);

//     this.setIsLoggedIn = (data) => {
//       this.setState(() => ({
//         isLoggedin: data,
//       }));
//     };

//     this.setUserData = (data) => this.setState({ userData: data });

//     this.unsetUserData = () => this.setState({ userData: null });

//     this.setBusiness = (data) => this.setState({ businessData: data });

//     this.unsetBusiness = () => this.setState({ businessData: [] });

//     this.setSelectedBusiness = (data) => this.setState({ selectedBusiness: data });

//     this.unsetSelectedBusiness = () => this.setState({ selectedBusiness: [] });

//     this.state = {
//       isLoggedin: false,
//   	  setIsLoggedIn: () => {},
//       userData: props.persistantData,
//       setUserData: this.setUserData,
//       unsetUserData: this.unsetUserData,
//       setBusiness: this.setBusiness,
//       unsetBusiness: this.unsetBusiness,
//       businessData: [],
//       selectedBusiness:{},
//       setSelectedBusiness: this.setSelectedBusiness,
//       unsetSelectedBusiness: this.unsetSelectedBusiness
//     };
//   }

//   render = () => {
//     return (
//       <AppContext.Provider value={this.state}>
//         {this.props.children}
//       </AppContext.Provider>
//     );
//   };
// }

