import { View, Text, Button, Image, ImageBackground, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import {db} from '../../utils/firebase';
import {doc, updateDoc} from 'firebase/firestore';
import {useSelector,useDispatch} from 'react-redux';
import {updateUser} from '../../store/index';
import * as Location from 'expo-location';
import UploadImageAsync from '../../components/UploadImageAsync';
import CustomBotton from '../../components/CustomBotton';


const HomeScreen = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [image, setImage] = useState(null);
  const [isActive,setIsActive]=useState(false)
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      const photoURL = await UploadImageAsync({uri:result.uri});
      setImage(photoURL);
      setIsActive(true);
      
    }
  };
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      const photoURL = await UploadImageAsync({uri:result.uri});
      setImage(photoURL);
      setIsActive(true);
     
    }
}

const handleSubmitPhoto = async data => {
  const place = await Location.reverseGeocodeAsync({
            latitude : location?.coords.latitude,
            longitude : location?.coords.longitude
        });
  const docRef = doc(db, 'user', user.id);
  await updateDoc(docRef, {
    ...data,
    photoURL: image,
    longitude:location.coords.longitude,
    latitude:location.coords.latitude,
    place:place,
  }).then(response => {
    dispatch(updateUser({...data, 
      photoURL: image,
      longitude:location.coords.longitude,
      latitude:location.coords.latitude,

    }));
  });
};

  return (
    <View style={{justifyContent:"center",alignContent:"center",flex:1,}}>
      
      {isActive ? (
      <ImageBackground style={{width:"100%",height:"100%"}} source={{uri:image}}>
        <Button title='send'onPress={()=>{handleSubmitPhoto(),setIsActive(false)}}  />
      </ImageBackground>) : 
      (
        <View>
          <CustomBotton title='library' onPress={pickImage} />
          <CustomBotton title='camera' onPress={openCamera} />
        </View>)}
    </View>
  )
}

export default HomeScreen