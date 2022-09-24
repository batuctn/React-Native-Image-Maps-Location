import React, { useEffect, useRef } from 'react';

import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from '../../utils/firebase';
import {useDispatch} from 'react-redux';
import {setUser} from '../../store/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {Button, Input, Text, View, useToast} from 'native-base';
import {doc, getDoc} from 'firebase/firestore';
import CustomBotton from '../../components/CustomBotton';
import LottieView from 'lottie-react-native';

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const {show} = useToast();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const animation = useRef(null);

  const handleSignIn = data => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async response => {
        const userDoc = doc(db, 'user', response.user.uid);
        const userRef = await getDoc(userDoc);
        if (userRef.exists()) {
          AsyncStorage.setItem('userStorage', JSON.stringify(userRef.data()));
          dispatch(setUser(userRef.data()));
        }
      })
      .catch(err => {
        show({
          description: err.message,
        });
      });
  };

  useEffect(() => {
    AsyncStorage.getItem('userStorage').then((parserespo) => {
      const parsedata = JSON.parse(parserespo);
      dispatch(setUser(parsedata));
    });
  }, []);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    animation.current?.play();
  }, []);
  return (
    <View p={4} style={{justifyContent:"center",alignContent:"center",flex:1}}>
       <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          alignSelf:"center"
     
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../../assets/5849-camera-icon.json')}
      />
      <Controller 
        name="email"
        control={control}
        rules={{

          required: {value: true, message: 'Email is required'},
          minLength: {value: 10, message: 'Email can be at least 10 chars. '},
        }}
        render={({field}) => {
          return (
            <Input
              w={"90%"}
              alignSelf="center"
              placeholder="E-mail"
              autoCapitalize="none"
              my={2}
              {...field}
              onChangeText={field.onChange}
            />
          );
        }}
      />
      {errors.email ? (
        <Text style={{color: 'red'}}>{errors.email.message}</Text>
      ) : null}

      <Controller
        name="password"
        control={control}
        render={({field}) => {
          return (
            <Input  
              w={"90%"}
              alignSelf="center"
              autoCapitalize="none"
              secureTextEntry
              placeholder="Password"
              my={2}
              {...field}
              onChangeText={field.onChange}
            />
          );
        }}
      />

      <CustomBotton title="Sign In" onPress={handleSubmit(handleSignIn)} />

      <CustomBotton
        title="Reset Password"
        variant={'ghost'}
        onPress={() => {
          navigate('ForgotPassword');
        }}/>
      

      <CustomBotton
        title="Sign Up"
        onPress={() => {
          navigate('SignUp');
        }} />
        
     
    </View>
  );
};
export default SignIn;