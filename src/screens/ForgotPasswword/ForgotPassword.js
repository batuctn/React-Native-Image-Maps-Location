import React from 'react';

import {sendPasswordResetEmail} from 'firebase/auth';
import {auth} from '../../utils/firebase';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {View, useToast} from 'native-base';
import CustomBotton from '../../components/CustomBotton';
import CustomInput from '../../components/Input';

const ForgotPassword = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {navigate} = useNavigation();
  const {show} = useToast();

  const handleSignIn = data => {
    sendPasswordResetEmail(auth, data.email)
      .then(response => {
        console.log(response);
        show({
          description:
            'Password reset mail has been sent. Please check your email.',
          backgroundColor: 'green.400',
        });
        navigate('SignIn');
      })
      .catch(err => {
        console.log(err.message);
        show({
          description: err.message,
        });
      });
  };

  return (
    <View p={4}>
      <Controller
        name="email"
        control={control}
        rules={{
          required: {value: true, message: 'Email is required'},
          minLength: {value: 10, message: 'Email can be at least 10 chars. '},
        }}
        render={({field}) => {
          return (
            <CustomInput placeholder="Password" field={field}/>
          );
        }}
      />

      <CustomBotton title="Reset" onPress={handleSubmit(handleSignIn)} />
      
    </View>
  );
};
export default ForgotPassword;