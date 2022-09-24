
import React from 'react'
import {Input} from 'native-base';

const CustomInput = ({placeholder,field,secureTextEntry}) => {
  return (
    <Input
        autoCapitalize="none"
        w={"90%"}
        alignSelf="center"
        justifyItems="center"
        secureTextEntry={secureTextEntry}
        my={2}
        p={3}
        placeholder={placeholder}
        {...field}
        onChangeText={field.onChange}
    />
  )
}

export default CustomInput