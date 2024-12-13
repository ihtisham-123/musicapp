import React from 'react';
import { Image, StyleSheet } from 'react-native';
import logo from '../assets/images/Logo.png';

const Logo = () => {
  return (
    <>
      <Image source={logo} style={styles.logo} />
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100, // Adjust width
    height: 100, // Adjust height
  },
});

export default Logo;
