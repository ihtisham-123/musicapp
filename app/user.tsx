import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, TextInput, ActivityIndicator, SafeAreaView } from 'react-native';
import { Play } from 'lucide-react-native';
import Navbar from '@/components/Navbar';

interface Track {
  id: number;
  songName: string;
  artistName: string;
  albumCover: string;
  previewUrl: string;
}

const User = ({navigation}) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDeezerTracks = async (artistName: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.deezer.com/search?q=artist:"${artistName}"`);
      const data = await response.json();
      const trackData: Track[] = data.data.map(track => ({
        id: track.id,
        songName: track.title,
        artistName: track.artist.name,
        albumCover: track.album.cover_medium,
        previewUrl: track.preview,
      }));
      setTracks(trackData);
      console.log(trackData)
    } catch (error) {
      console.error('Error fetching Deezer tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeezerTracks(''); // Initial load with an empty artist name
  }, []);

  const navigateToPlayScreen = (track: Track) => {
    navigation.navigate('PlayScreen', {
      source: 'search',  // Add source identifier
      title: track.songName,
      artist: track.artistName,
      coverUrl: track.albumCover,
      previewUrl: track.previewUrl
    });
  };

  const handleSearch = () => {
    fetchDeezerTracks(searchQuery);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7b2cbf" />
      </View>
    );
  }

  return (
    <>
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Search Tracks by Artist</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter artist name"
          placeholderTextColor="#B3B3B3"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.trackContainer} 
            onPress={() => navigateToPlayScreen(item)}
          >
            <Image source={{ uri: item.albumCover }} style={styles.albumCover} />
            <View style={styles.textContainer}>
              <Text style={styles.songName} numberOfLines={1}>{item.songName}</Text>
              <Text style={styles.artistName} numberOfLines={1}>{item.artistName}</Text>
            </View>
            <View style={styles.playButton}>
              <Play color="#FFFFFF" size={24} />
            </View>
          </TouchableOpacity>
        )}
      />
      
    </SafeAreaView>
    <Navbar/>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    height: 50,
    backgroundColor: 'rgba(123, 44, 191, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#7b2cbf',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7b2cbf',
    borderRadius: 12,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  albumCover: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  songName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistName: {
    color: '#B3B3B3',
    fontSize: 14,
    marginTop: 3,
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default User;