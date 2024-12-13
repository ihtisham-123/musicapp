import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Home, Search, User } from 'lucide-react-native';

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity 
        style={styles.iconContainer}
        onPress={() => navigation.navigate('AlbumMixList')}
      >
        <Home color="black" size={24} />
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.iconContainer}
        onPress={() => navigation.navigate('user')}
      >
        <Search color="black" size={24} />
        <Text style={styles.iconText}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Profile')}
      >
        <User color="black" size={24} />
        <Text style={styles.iconText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0'
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconText: {
    marginTop: 5,
    fontSize: 12
  }
});

export default Navbar;