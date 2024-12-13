import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Image, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import Logo from '../assets/images/Logo.png'
import { ChevronRight } from 'lucide-react-native'
import { FIREBASE_AUTH } from '@/hooks/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

const ProfileUser = ({navigation}:any) => {
    const [userName, setUserName] = useState('Guest');
    const [userEmail, setUserEmail] = useState('');
    const auth = FIREBASE_AUTH;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              
                setUserName(user.displayName || user.email?.split('@')[0] || 'User');
                setUserEmail(user.email || '');
            } else {
                
                setUserName('Guest');
                setUserEmail('');
            }
        });

    
        return () => unsubscribe();
    }, []);

    const gotoartist = () => {
        navigation.navigate('ArtistLogin');
    }

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Logout',
                    onPress: () => {
                        signOut(auth)
                            .then(() => {
                                // Sign-out successful.
                                navigation.navigate('Login');
                            })
                            .catch((error) => {
                                // An error happened.
                                console.error('Logout error:', error);
                                Alert.alert('Logout Error', error.message);
                            });
                    }
                }
            ]
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={Logo}
                        style={styles.avatar}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.userInfoContainer}>
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.userID}>{userEmail}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.artistButton}
                        onPress={gotoartist}
                    >
                        <Text style={styles.artistButtonText}>Go to artist</Text>
                        <ChevronRight color="#fff" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.logoutButton}
                        onPress={handleLogout}
                    >
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: '#1a1a2e',
    },
    profileContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    avatarContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    userInfoContainer: {
        flex: 1,
        marginLeft: 15,
    },
    userName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    userID: {
        color: '#B3B3B3',
        fontSize: 14,
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    artistButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#9d4edd',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 25,
        marginBottom: 5,
    },
    artistButtonText: {
        color: '#fff',
        marginRight: 10,
        fontWeight: '600',
    },
    logoutButton: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 25,
    },
    logoutButtonText: {
        color: '#fff',
        fontWeight: '600',
    }
})

export default ProfileUser