import {create} from 'zustand';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define track interface
interface Track {
  title: string;
  artist: string;
  coverUrl: string;
  previewUrl: string;
}

// Music player store interface
interface MusicPlayerState {
  // Current track state
  currentTrack: Track | null;
  isPlaying: boolean;
  sound: Audio.Sound | null;
  isLiked: boolean;
  likedTracks: Track[];

  // Track management methods
  loadTrack: (track: Track, source: 'search' | 'albumMix' | 'likedSongs') => Promise<void>;
  togglePlay: () => Promise<void>;
  toggleLike: () => Promise<void>;
  
  // Liked tracks management
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
  loadTrack: async (track, source) => {
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
        likedTracks: parsedLikedTracks
      });

      // Setup playback status update
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          set({ isPlaying: false });
        }
      });
    } catch (error) {
      console.error("Error loading track:", error);
      throw error;
    }
  },

  // Toggle play/pause
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
      console.error("Error toggling play:", error);
      throw error;
    }
  },

  // Toggle like status
  toggleLike: async () => {
    const { currentTrack, isLiked, likedTracks } = get();

    if (!currentTrack) return;

    try {
      let updatedLikedTracks;

      if (isLiked) {
        // Remove from liked tracks
        updatedLikedTracks = likedTracks.filter(
          (track) => 
            !(track.title === currentTrack.title && track.artist === currentTrack.artist)
        );
      } else {
        // Add to liked tracks
        updatedLikedTracks = [
          ...likedTracks, 
          currentTrack
        ];
      }

      // Save to AsyncStorage
      await AsyncStorage.setItem('likedTracks', JSON.stringify(updatedLikedTracks));

      // Update state
      set({ 
        isLiked: !isLiked,
        likedTracks: updatedLikedTracks 
      });
    } catch (error) {
      console.error("Error toggling like:", error);
      throw error;
    }
  },

  // Fetch liked tracks
  fetchLikedTracks: async () => {
    try {
      const likedTracks = await AsyncStorage.getItem('likedTracks');
      const parsedLikedTracks = likedTracks ? JSON.parse(likedTracks) : [];
      
      set({ likedTracks: parsedLikedTracks });
    } catch (error) {
      console.error("Error fetching liked tracks:", error);
      throw error;
    }
  },

  // Clear current sound
  clearSound: async () => {
    const { sound } = get();
    
    try {
      await sound?.unloadAsync();
      set({ 
        sound: null, 
        isPlaying: false 
      });
    } catch (error) {
      console.error("Error clearing sound:", error);
    }
  }
}));

export default useMusicPlayerStore;