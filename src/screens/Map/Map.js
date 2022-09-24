import { View, StyleSheet, Alert, Image, Pressable, Button, ImageBackground } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, {Marker} from 'react-native-maps';
import { Dimensions } from 'react-native';
import * as Location from 'expo-location';
import {db} from '../../utils/firebase';
import {
  doc,
  getDocs,
  query,
  updateDoc,
  collection,
  where,
} from 'firebase/firestore';
import {useSelector} from 'react-redux';
import CustomMarker from '../../components/CustomMarker';
import {useIsFocused} from '@react-navigation/native';


const Map = () => {

  const mapRef = useRef()
  const user = useSelector(state => state.user.user);
  const [users, setUsers] = useState([]);
  const isFocused = useIsFocused();


  const getUsers = async () => {
    const q = query(collection(db, 'user'));
    const result = await getDocs(q).then(res => {
      const _users = res.docs.map(item => item.data());
      setUsers(_users);
    });
  };
  useEffect(() => {
    getUsers();
  }, [isFocused]);
 
  return (
    <View>
       
      <MapView 
       initialRegion={{
        latitude: user.latitude,
        longitude: user.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation 
      ref={mapRef} 
      style={styles.map } 
      maxZoomLevel={20} 
      minZoomLevel={5} >
           {users?.map((userItem,index) => {
          return (
            <View key={index}>
            <CustomMarker
              user={userItem}
              lat={userItem.latitude}
              long={userItem.longitude}
              uri={userItem.photoURL}
            />
            </View>
          );
        })}
      </MapView>
      </View>
   
  )
}

export default Map;

const styles = StyleSheet.create ({
  map:{
    width:Dimensions.get('screen').width,
    height:Dimensions.get('screen').height
  }
})