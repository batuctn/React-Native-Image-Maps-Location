
import {View, Text, Input, Button} from 'native-base';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import {collection, doc, getDoc, query, updateDoc} from 'firebase/firestore';
import {db} from '../../utils/firebase';
import { updateUser } from '../../store';
import CustomBotton from '../../components/CustomBotton';
import CustomInput from '../../components/Input';


const EditProfile = () => {
  
  const user = useSelector(state => state.user.user);
  console.log("reduxuser",user)
  const dispatch = useDispatch();
 
  const {control, handleSubmit} = useForm({
    defaultValues: {
      ...user,
    },
  });

  const handleSubmitProfile = async data => {
    console.log(data);
    const docRef = doc(db, 'user', user.id);
    await updateDoc(docRef, {
      ...data,
    }).then(response => {
      dispatch(updateUser({...data}));
    });
  };
  return (
    <View style={{padding:4,margin:12,display:"flex",justifyContent:"center",alignContent:"center",flex:1}}>
      <Controller
        control={control}
        name="firstName"
        render={({field}) => {
          return (
            <CustomInput placeholder="First Name" field={field}/>
          );
        }}
      />
    <Controller
      control={control}
      name="lastName"
      render={({field}) => (
        <CustomInput field={field} placeholder="Last Name"/>
      )}
    />
    <Controller
      control={control}
      name="location"
      render={({field}) => (
        <CustomInput placeholder="Location" field={field}/>
      )}
    />
    <CustomBotton title="Update Profile" onPress={handleSubmit(handleSubmitProfile)} />
  </View>
  )
}

export default EditProfile