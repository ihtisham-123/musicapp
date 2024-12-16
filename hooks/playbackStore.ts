import { create } from 'zustand';
import { Audio } from 'expo-av';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';

// Define track interface
interface Track {
  title: string;
  artist: string;
  coverUrl: string;
  previewUrl: string;
}

// Music player store interface
interface MusicPlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  sound: Audio.Sound | null;
  isLiked: boolean;
  likedTracks: Track[];

  loadTrack: (
    track: Track,
    source: 'search' | 'albumMix' | 'likedSongs',
    navigation: NavigationProp<any> // Accepts navigation dynamically
  ) => Promise<void>;
  togglePlay: () => Promise<void>;
  toggleLike: () => Promise<void>;
  fetchLikedTracks: () => Promise<void>;
  clearSound: () => Promise<void>;
}

// Create Zustand store
const useMusicPlayerStore = create<MusicPlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  sound: null,
  isLiked: false,
  likedTracks: [],

  // Load and prepare a new track
  loadTrack: async (track, source, navigation) => {
    const { clearSound } = get();

    // Clear any existing sound
    await clearSound();

    try {
      // Create new sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: track.previewUrl },
        { shouldPlay: false }
      );

      // Check if track is liked
      const likedTracks = await AsyncStorage.getItem('likedTracks');
      const parsedLikedTracks = likedTracks ? JSON.parse(likedTracks) : [];

      const isCurrentTrackLiked = parsedLikedTracks.some(
        (likedTrack: Track) =>
          likedTrack.title === track.title &&
          likedTrack.artist === track.artist
      );

      set({
        currentTrack: track,
        sound: newSound,
        isLiked: isCurrentTrackLiked,
        likedTracks: parsedLikedTracks,
      });

      // Setup playback status update
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          set({ isPlaying: false });
        }
      });
    } catch (error) {
      Alert.alert(
        'Unable to play track',
        'Could not load the track. Redirecting to the Play screen.'
      );
      navigation.navigate('AlbumMixList'); // Redirect using passed navigation
      console.error('Error loading track:', error);
      throw error;
    }
  },

  // Other methods remain the same...
  togglePlay: async () => {
    const { sound, isPlaying, currentTrack } = get();

    if (!currentTrack?.previewUrl) {
      throw new Error('No preview available');
    }

    try {
      if (isPlaying) {
        await sound?.pauseAsync();
        set({ isPlaying: false });
      } else {
        await sound?.playAsync();
        set({ isPlaying: true });
      }
    } catch (error) {
      console.error('Error toggling play:', error);
      throw error;
    }
  },

  toggleLike: async () => {
    const { currentTrack, isLiked, likedTracks } = get();

    if (!currentTrack) return;

    try {
      let updatedLikedTracks;

      if (isLiked) {
        updatedLikedTracks = likedTracks.filter(
          (track) =>
            !(
              track.title === currentTrack.title &&
              track.artist === currentTrack.artist
            )
        );
      } else {
        updatedLikedTracks = [...likedTracks, currentTrack];
      }

      await AsyncStorage.setItem(
        'likedTracks',
        JSON.stringify(updatedLikedTracks)
      );

      set({
        isLiked: !isLiked,
        likedTracks: updatedLikedTracks,
      });
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  },

  fetchLikedTracks: async () => {
    try {
      const likedTracks = await AsyncStorage.getItem('likedTracks');
      const parsedLikedTracks = likedTracks ? JSON.parse(likedTracks) : [];
      set({ likedTracks: parsedLikedTracks });
    } catch (error) {
      console.error('Error fetching liked tracks:', error);
      throw error;
    }
  },

  clearSound: async () => {
    const { sound } = get();

    try {
      await sound?.unloadAsync();
      set({
        sound: null,
        isPlaying: false,
      });
    } catch (error) {
      console.error('Error clearing sound:', error);
    }
  },
}));

export default useMusicPlayerStore;
