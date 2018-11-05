import React from 'react';
import { View, StyleSheet } from 'react-native';

function ListSeparator() {
  return (
    <View style={styles.ListSeparator} />
  );
}

const styles = StyleSheet.create({
  ListSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'gray',
    width: '100%',    
  }
});

export default ListSeparator;
