import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Play, Pause, Heart } from 'lucide-react-native';
import useMusicPlayerStore from '@/hooks/playbackStore';
import Navbar from './Navbar';

const PlayScreen = ({ route, navigation }: any) => {
  const { 
    loadTrack, 
    togglePlay, 
    toggleLike, 
    currentTrack, 
    isPlaying, 
    isLiked,
  } = useMusicPlayerStore();

  // Loading state will now be handled by the store's track loading
  const loading = !currentTrack;

  useEffect(() => {
    const initTrack = async () => {
      try {
        // Determine track details based on route params
        let trackDetails;

        switch (route.params.source) {
          case 'search':
            trackDetails = {
              title: route.params.title,
              artist: route.params.artist,
              coverUrl: route.params.coverUrl,
              previewUrl: route.params.previewUrl
            };
            break;

          case 'albumMix':
            // Fetch tracks for album
            const trackResponse = await fetch(`https://api.deezer.com/album/${route.params.id}/tracks`);
            const trackData = await trackResponse.json();
            
            if (!trackData.data || trackData.data.length === 0) {
              Alert.alert('No tracks found', 'Unable to find tracks for this album.');
              return;
            }

            // Get the first track's details
            const firstTrack = trackData.data[0];
            trackDetails = {
              title: firstTrack.title,
              artist: route.params.artist,
              coverUrl: route.params.coverUrl,
              previewUrl: firstTrack.preview
            };
            break;

          case 'likedSongs':
            trackDetails = {
              title: route.params.title,
              artist: route.params.artist,
              coverUrl: route.params.coverUrl,
              previewUrl: route.params.previewUrl
            };
            break;

          default:
            throw new Error('Invalid source');
        }

        // Load track using Zustand store
        await loadTrack(trackDetails, route.params.source);
      } catch (error) {
        console.error("Error initializing track:", error);
        Alert.alert('Error', 'Unable to load track.');
      }
    };

    initTrack();

    // Cleanup
    return () => {
      // Cleanup will be handled by the store's clearSound method
    };
  }, [route.params]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7b2cbf" />
      </View>
    );
  }

  if (!currentTrack) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Unable to load track details</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Image 
          source={{ uri: currentTrack.coverUrl }} 
          style={styles.albumArt} 
        />
        <Text style={styles.trackTitle} numberOfLines={2}>
          {currentTrack.title}
        </Text>
        <Text style={styles.artistName} numberOfLines={1}>
          {currentTrack.artist}
        </Text>
        
        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={togglePlay} style={styles.playButton}>
            {isPlaying ? <Pause color="#FFF" size={32} /> : <Play color="#FFF" size={32} />}
          </TouchableOpacity>
          
          <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
            <Heart 
              color={isLiked ? "#FF0000" : "#FFF"} 
              fill={isLiked ? "#FF0000" : "transparent"}
              size={28} 
            />
          </TouchableOpacity>
        </View>
      </View>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#1a1a2e', 
    padding: 20 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e'
  },
  albumArt: { 
    width: 250, 
    height: 250, 
    borderRadius: 20, 
    marginBottom: 30 
  },
  trackTitle: { 
    color: '#FFF', 
    fontSize: 22, 
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 20
  },
  artistName: {
    color: '#B3B3B3',
    fontSize: 18,
    marginBottom: 20
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  playButton: { 
    padding: 15, 
    backgroundColor: '#7b2cbf', 
    borderRadius: 50 
  },
  likeButton: {
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50
  },
  errorText: {
    color: '#FFF',
    fontSize: 18
  }
});

export default PlayScreen;