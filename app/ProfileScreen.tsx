import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Trash2 } from 'lucide-react-native';
import Navbar from '@/components/Navbar';
import ProfileUser from '@/components/ProfileUser';

interface LikedTrack {
  title: string;
  artist: string;
  coverUrl: string;
  previewUrl: string;
}

const ProfileScreen = ({navigation}) => {
  const [likedTracks, setLikedTracks] = useState<LikedTrack[]>([]);
 

  useEffect(() => {
    const fetchLikedTracks = async () => {
      try {
        const storedLikedTracks = await AsyncStorage.getItem('likedTracks');
        if (storedLikedTracks) {
          setLikedTracks(JSON.parse(storedLikedTracks));
        }
      } catch (error) {
        console.error("Error fetching liked tracks:", error);
        Alert.alert("Error", "Unable to load liked tracks.");
      }
    };

    // Fetch liked tracks when screen comes into focus
    const unsubscribe = navigation.addListener('focus', fetchLikedTracks);

    return unsubscribe;
  }, [navigation]);

  const removeFromLikedTracks = async (trackToRemove: LikedTrack) => {
    try {
      const updatedLikedTracks = likedTracks.filter(
        track => 
          !(track.title === trackToRemove.title && track.artist === trackToRemove.artist)
      );
      
      await AsyncStorage.setItem('likedTracks', JSON.stringify(updatedLikedTracks));
      setLikedTracks(updatedLikedTracks);
    } catch (error) {
      console.error("Error removing liked track:", error);
      Alert.alert("Error", "Unable to remove track from liked songs.");
    }
  };

  const playTrack = (track: LikedTrack) => {
    navigation.navigate('PlayScreen', {
      source: 'search',
      title: track.title,
      artist: track.artist,
      coverUrl: track.coverUrl,
      previewUrl: track.previewUrl
    });
  };

  const renderLikedTrack = ({ item }: { item: LikedTrack }) => (
    <View style={styles.trackContainer}>
      <TouchableOpacity 
        style={styles.trackInfo} 
        onPress={() => playTrack(item)}
      >
        <Image 
          source={{ uri: item.coverUrl }} 
          style={styles.albumArt} 
        />
        <View style={styles.trackDetails}>
          <Text 
            style={styles.trackTitle} 
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text 
            style={styles.artistName} 
            numberOfLines={1}
          >
            {item.artist}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => removeFromLikedTracks(item)}
      >
        <Trash2 color="red" size={24} />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
   
    <View style={styles.container}>
   
      <Text style={styles.screenTitle}>Liked Songs</Text>
      {likedTracks.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No liked songs yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Start liking songs to see them here
          </Text>
        </View>
      ) : (
        <FlatList
          data={likedTracks}
          renderItem={renderLikedTrack}
          keyExtractor={(item, index) => `${item.title}-${item.artist}-${index}`}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
    <ProfileUser navigation={navigation}/>
    <Navbar/>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingTop: 50
  },
  screenTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  listContainer: {
    paddingHorizontal: 20
  },
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 10
  },
  trackInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15
  },
  trackDetails: {
    flex: 1
  },
  trackTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  artistName: {
    color: '#B3B3B3',
    fontSize: 14
  },
  deleteButton: {
    padding: 10
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyStateText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  emptyStateSubtext: {
    color: '#B3B3B3',
    fontSize: 16,
    marginTop: 10
  }
});

export default ProfileScreen;