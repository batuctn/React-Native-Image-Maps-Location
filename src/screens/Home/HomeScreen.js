import { View, Text, Button, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

const HomeScreen = () => {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View>
      <Text>homes</Text>
      <Button title='library' onPress={pickImage} />
      <Image width={90} height={90} rounded={"full"} source={{uri:image}} />
    </View>
  )
}

export default HomeScreen