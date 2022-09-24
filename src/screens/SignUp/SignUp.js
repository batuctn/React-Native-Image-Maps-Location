import {useNavigation} from '@react-navigation/native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {setDoc, doc} from 'firebase/firestore';
import {Button, Input, Pressable, Text, View} from 'native-base';
import {Controller, useForm} from 'react-hook-form';
import CustomBotton from '../../components/CustomBotton';
import {auth, db} from '../../utils/firebase';

const SignUp = () => {
  const {control, handleSubmit} = useForm();
  const {navigate} = useNavigation();

  const handleSignUp = data => {
    console.log("datas",data);
    createUserWithEmailAndPassword(auth, data.email, data.password).then(
      async response => {
        await setDoc(doc(db, `user`, response.user.uid), {
          email: response.user.email,
          id: response.user.uid,
        });
        navigate('SignIn');
      },
    );
  };

  return (
    <View p={4}>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'Email is required'},
          minLength: {value: 10, message: 'Email can be at least 10 chars. '},
        }}
        name="email"
        render={({field}) => {
          return (
            <Input
              placeholder="E-mail"
              {...field}
              my={2}
              onChangeText={field.onChange}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="password"
        rules={{
          required: {value: true, message: 'Password is required'},
          minLength: {value: 6, message: 'Password can be at least 6 chars. '},
        }}
        render={({field}) => (
          <Input
            placeholder="Password"
            {...field}
            my={2}
            onChangeText={field.onChange}
            secureTextEntry={true}
          />
        )}
      />

      <CustomBotton title="Sign Up" onPress={handleSubmit(handleSignUp)} />
        
     
    </View>
  );
};
export default SignUp;