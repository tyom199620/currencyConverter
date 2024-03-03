import * as React from 'react';
import {useEffect, useRef, useState} from 'react';


import {
  ActivityIndicator, StyleSheet, View,
} from "react-native";


function Loader(props) {

  return (
   <View style={styles.loaderWrapper}>
     <ActivityIndicator size={'large'} color={'#8c0000'}/>
   </View>
  );
}

export const styles = StyleSheet.create({
  loaderWrapper: {
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#161616'
  }
})

export default Loader;
