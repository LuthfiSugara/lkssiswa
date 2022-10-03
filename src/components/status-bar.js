import React from 'react';
import { StatusBar } from 'react-native';

const Statusbar = (props) => {
  
  return (
    <StatusBar
        animated={true}
        backgroundColor={props.page === 'login' ? "#0d9488" : "#ffffff" }
        barStyle={props.page === 'login' ? "default" : "dark-content"}
        showHideTransition="fade"
        hidden={false} 
    />
  );
};



export default Statusbar;