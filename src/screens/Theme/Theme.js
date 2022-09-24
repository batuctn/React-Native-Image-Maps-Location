import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../Theme/ThemeStyle';
import { toggleTheme } from '../../store/index';

const Theme = () => {
  const [isActive, setIsActive] = useState(false);
  const theme = useSelector((state) => state.theme.activeTheme);
  const dispatch = useDispatch();

  console.log(theme);
  return (
    <View style={theme === 'light' ? styles.container_light : styles.container_dark}>
      <TouchableOpacity
        onPress={() => {
          setIsActive(!isActive);
          dispatch(toggleTheme());
        }}>
        <View style={styles.iconContain}>
          <View style={styles.icon}>
            {isActive ? (
              <Feather name="sun" size={80} color="black" />
            ) : (
              <Fontisto name="night-clear" size={80} color="black" />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Theme;