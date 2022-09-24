import { View, Text, Image, Pressable, Modal,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {Marker} from 'react-native-maps';


const CustomMarker = ({uri,user,lat, long}) => {
  const [modalVisible, setModalVisible] = useState(false);
    
    
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={{uri:uri}} style={{width:300,height:300}}/>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    <Pressable onPress={() => setModalVisible(true)}>
    <Marker
    coordinate={{
      latitude: lat,
      longitude: long,
    }}>
    {user?.photoURL ? (
      <Image
      
        style={{width:50,height:50,borderRadius:25,borderColor:"blue.200"}}
        source={{uri: user?.photoURL}}
      />
    ) : (
      <View
        style={{backgroundColor:"blue.400",width:8,height:8,flexDirection:"row",alignItems:"center",justifyContent:"center",display:"flex",rounded:"full"}}>
            <Text color={'white'}>{user.email?.[0]}</Text>
      </View>
    )}
  </Marker>
  </Pressable>
  </View>
  )
}

export default CustomMarker;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },

  buttonClose: {
    backgroundColor: "#2196F3",
    marginTop:10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});