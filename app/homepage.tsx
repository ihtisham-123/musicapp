import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const Homepage = ({ navigation }) => {
  const [pressedArtist, setPressedArtist] = useState(false);
  const [pressedUser, setPressedUser] = useState(false);

  return (
    <LinearGradient
      colors={['#0F172A', '#020617', '#000000']}
      style={styles.container}
    >
      {/* Ambient Background Effects */}
      <View style={styles.ambientLight1} />
      <View style={styles.ambientLight2} />

      {/* Artist Button */}
      <TouchableOpacity
        onPressIn={() => setPressedArtist(true)}
        onPressOut={() => setPressedArtist(false)}
        style={styles.buttonContainer}
      >
        <LinearGradient
          colors={pressedArtist 
            ? ['#312E81', '#1E40AF'] 
            : ['#1E40AF', '#3730A3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.box, pressedArtist && styles.boxPressed]}
        >
          <BlurView intensity={20} style={styles.blurOverlay}>
            <Text style={styles.title}>Artist</Text>
            <Text style={styles.subtitle}>In process</Text>
          </BlurView>
        </LinearGradient>
      </TouchableOpacity>

      {/* User Button */}
      <TouchableOpacity
        onPressIn={() => setPressedUser(true)}
        onPressOut={() => setPressedUser(false)}
        onPress={() => navigation.navigate('Login')}
        style={styles.buttonContainer}
      >
        <LinearGradient
          colors={pressedUser 
            ? ['#312E81', '#1E40AF'] 
            : ['#1E40AF', '#3730A3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.box, pressedUser && styles.boxPressed]}
        >
          <BlurView intensity={20} style={styles.blurOverlay}>
            <Text style={styles.title}>User</Text>
          </BlurView>
        </LinearGradient>
      </TouchableOpacity>

      {/* Decorative Elements */}
      <View style={styles.glowEffect1} />
      <View style={styles.glowEffect2} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000000',
  },
  buttonContainer: {
    marginBottom: 30,
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 16,
  },
  box: {
    height: 200,
    width: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(147, 197, 253, 0.3)',
    overflow: 'hidden',
  },
  boxPressed: {
    transform: [{ scale: 0.95 }],
    borderColor: 'rgba(147, 197, 253, 0.5)',
  },
  blurOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(99, 102, 241, 0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  ambientLight1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    top: '10%',
    left: '10%',
    filter: 'blur(70px)',
  },
  ambientLight2: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(147, 197, 253, 0.1)',
    bottom: '15%',
    right: '10%',
    filter: 'blur(60px)',
  },
  glowEffect1: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    top: '30%',
    right: '20%',
    filter: 'blur(40px)',
  },
  glowEffect2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(147, 197, 253, 0.12)',
    bottom: '25%',
    left: '15%',
    filter: 'blur(45px)',
  }
});

export default Homepage;