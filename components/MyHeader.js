import React, { Component } from 'react';
import { Header, Icon, Badge } from 'react-native-elements';
import { View, Text, StyeSheet, Alert } from 'react-native';

const MyHeader = props => {
  return (
    <Header
      leftComponent={<Icon name='bars' type='font-awesome' color='black' onPress={() => props.navigation.toggleDrawer()} />}
      centerComponent={{ text: props.title, style: { color: 'black', fontSize: 20, fontWeight: "bold", } }}
      backgroundColor="#ffba0c"
    />
  );
};

export default MyHeader;
