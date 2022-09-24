import {Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'


const CustomBotton = ({ onPress, title }) => (
    <TouchableOpacity  onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
export default CustomBotton;

  const styles = StyleSheet.create({
    appButtonContainer: {
      width:"90%",
      elevation: 8,
      backgroundColor: "#111",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      alignSelf:"center",
      margin:10,
      padding:10,
      
    },
    appButtonText: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
  });