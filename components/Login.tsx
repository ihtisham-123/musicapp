import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from './Logo';
import { FIREBASE_AUTH } from '@/hooks/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation, firebase }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = FIREBASE_AUTH;



    const gotosignuppage = () => {
        navigation.navigate('Signup');

    }

    const usernameorid=()=>{
        return  auth.currentUser;

    }
    const signin = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert("Login")
            navigation.navigate('AlbumMixList');
            setPassword('');
            setEmail('');
            console.log(usernameorid)
        } catch (error: any) {
            console.log(error)
            alert('Didn`t login ' + error.message)

        }

    }

  

    return (
        <LinearGradient
            colors={['#1a1a2e', '#16213e']}
            style={styles.gradient}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.innerContainer}>
                    <View style={styles.headerContainer}>
                        <Logo />
                        <Text style={styles.title}>Happy Music App</Text>

                        <Text style={styles.subtitle}>Sign in to continue</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>EMAIL</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your email"
                                    placeholderTextColor="#666"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    selectionColor="#7b2cbf"

                                />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>PASSWORD</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#666"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    selectionColor="#7b2cbf"
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={signin}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#7b2cbf', '#9d4edd']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.buttonGradient}
                            >
                                <Text style={styles.buttonText}>LOGIN</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={gotosignuppage}>
                                <Text style={styles.signupLink}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    headerContainer: {
        marginBottom: 50,
        alignItems: 'center',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 16,
        color: '#9d4edd',
        letterSpacing: 0.5,
    },
    formContainer: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 25,
    },
    label: {
        fontSize: 13,
        color: '#9d4edd',
        marginBottom: 8,
        letterSpacing: 1,
        fontWeight: '600',
    },
    inputWrapper: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(157, 78, 221, 0.2)',
        overflow: 'hidden',
    },
    input: {
        height: 55,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#fff',
        letterSpacing: 0.5,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 30,
    },
    forgotPasswordText: {
        color: '#9d4edd',
        fontSize: 14,
        fontWeight: '500',
    },
    button: {
        width: '100%',
        height: 55,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#9d4edd',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    buttonGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1.5,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    signupText: {
        color: '#fff',
        fontSize: 14,
        letterSpacing: 0.5,
    },
    signupLink: {
        color: '#9d4edd',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    }
});

export default Login;