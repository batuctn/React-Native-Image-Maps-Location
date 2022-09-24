import { View, Button, Image, Pressable } from 'react-native'
import React from 'react'
import { useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../store/index';
import * as ImagePicker from 'expo-image-picker';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '../../utils/firebase';

import {updateUser} from '../../store/index';
import CustomBotton from '../../components/CustomBotton';
import UploadImageAsync from '../../components/UploadImageAsync';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      const ProfilePhotoUrl = await UploadImageAsync({uri:result.uri});
          const docRef = doc(db, 'user', user.id);
          await updateDoc(docRef, {
            ProfilePhotoUrl:ProfilePhotoUrl
          }).then(response => {
            dispatch(updateUser({ProfilePhotoUrl: ProfilePhotoUrl}));
          });      
    }
  };
  return (
    <View style={{justifyContent:"center",alignContent:"center",flex:1,}}>
      <Pressable onPress={pickImage}>
        <Image source={{uri:user.ProfilePhotoUrl}} style={{width:100,height:100,borderRadius:50,alignSelf:"center",backgroundColor: "gray"}} />
      </Pressable>
      <CustomBotton title='Edit Profile' onPress={()=>{
        navigation.navigate("EditProfile")
      }}/>
      <CustomBotton  title='Theme' onPress={()=>{
        navigation.navigate("Theme")
      }}/>
      <CustomBotton title='logout' onPress={async()=>{
        await AsyncStorage.removeItem('userStorage');
        dispatch(logout());
      }} />
    </View>
  )
}

export default Profile