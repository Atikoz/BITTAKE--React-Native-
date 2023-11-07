import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const Loader = () => {
  return (
    <View style={style.skreenLoaderContainer}>
      <View style={style.loaderTextContainer}>

        <View style={style.loaderContainer}>
          <ActivityIndicator size="large" color="#58FFAF" />
        </View>

        <Text style={style.textLoader}>Loading</Text>
      </View>
    </View>
  )
};

const style = StyleSheet.create({
  skreenLoaderContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#48494a'
  },

  loaderContainer: {
    height: 400,
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 15
  },

  loaderTextContainer: {
    height: 'auto',
    width: 'auto',
    alignItems: 'center'
  },

  textLoader:{
    fontSize: 16,
    fontWeight: '600',
    color: 'white'
  }
});

export default Loader;