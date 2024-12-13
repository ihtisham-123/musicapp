
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Navbar from './Navbar';

const artistIds = [1199677, 4344, 405736,1511979 ];

interface Album {
  id: number;
  title: string;
  coverUrl: string;
  artist: string;
}

interface ArtistAlbums {
  artistName: string;
  albums: Album[];
}

const AlbumMixList = ({ navigation }: any) => {
  const [artistAlbumList, setArtistAlbumList] = useState<ArtistAlbums[]>([]);
  const [loading, setLoading] = useState(true);

  const navigateToPlayScreen = async (album: Album) => {
    navigation.navigate('PlayScreen', {
      source: 'albumMix',  // Add source identifier
      id: album.id,
      title: album.title,
      coverUrl: album.coverUrl,
      artist: album.artist
    });
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const artistAlbumData: ArtistAlbums[] = await Promise.all(
          artistIds.map(async (artistId) => {
            // Fetch artist details
            const artistResponse = await fetch(`https://api.deezer.com/artist/${artistId}`);
            const artistDetails = await artistResponse.json();

            // Fetch artist's albums
            const albumResponse = await fetch(`https://api.deezer.com/artist/${artistId}/albums`);
            const albumData = await albumResponse.json();

            // Map albums with artist details
            const albums: Album[] = albumData.data.map((album: any) => ({
              id: album.id,
              title: album.title,
              coverUrl: album.cover_medium,
              artist: artistDetails.name,
            }));

            return { artistName: artistDetails.name, albums };
          })
        );

        setArtistAlbumList(artistAlbumData);
      } catch (error) {
        console.error("Error fetching albums:", error);
        Alert.alert('Error', 'Unable to fetch album information.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7b2cbf" />
      </View>
    );
  }

  return (
    <>
     <View style={styles.container}>
      <ScrollView>
        {artistAlbumList.map((artistAlbums) => (
          <View key={artistAlbums.artistName}>
            <Text style={styles.heading}>{artistAlbums.artistName}'s Albums</Text>
            <FlatList
              data={artistAlbums.albums}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigateToPlayScreen(item)}>
                  <View style={styles.card}>
                    <Image source={{ uri: item.coverUrl }} style={styles.image} />
                    <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.artist} numberOfLines={1}>{item.artist}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        ))}
      </ScrollView>
    </View>
    <Navbar/>
    </>
   
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', paddingTop: 20 },
  heading: { marginTop: 30, color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginHorizontal: 16 },
  listContainer: { paddingHorizontal: 16 },
  card: { backgroundColor: '#7b2cbf', borderRadius: 12, width: 160, marginRight: 16, padding: 10, alignItems: 'center' },
  image: { width: '100%', height: 120, borderRadius: 8 },
  title: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold', marginTop: 8, textAlign: 'center' },
  artist: { color: '#B3B3B3', fontSize: 12, marginTop: 4, textAlign: 'center' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a2e' },
});

export default AlbumMixList;