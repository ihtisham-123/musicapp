import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FIREBASE_AUTH } from '@/hooks/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth=FIREBASE_AUTH

  const signup=async()=>{
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert("Account has created");
      navigation.navigate('Login');
      setPassword('')
      setUsername('')
      setEmail('')
  } catch (error: any) {
      console.log(error)
      alert('Didn`t sign in ' + error.message)

  }

  }

 
  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e']}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>USERNAME</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your username"
                  placeholderTextColor="#666"
                  value={username}
                  onChangeText={setUsername}
                  selectionColor="#7b2cbf"
                />
              </View>
            </View>

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

            <TouchableOpacity
              style={styles.button}
              onPress={
                signup

              }
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#7b2cbf', '#9d4edd']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>SIGN UP</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signupLink}>Log In</Text>
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
  button: {
    marginTop: 20,
    shadowColor: '#7b2cbf',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 16,
  },
  buttonGradient: {
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  signupContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#fff',
    fontSize: 14,
  },
  signupLink: {
    color: '#9d4edd',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Signup;



// import React, { useState } from 'react';
// import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import { getFirestore, doc, setDoc } from 'firebase/firestore';
// import { app } from '../hooks/firebase'; // Adjust the import path as needed

// const Signup = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const auth = getAuth(app);
//   const firestore = getFirestore(app);

//   const handleSignup = async () => {
//     // Validate input
//     if (!username || !email || !password) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       Alert.alert('Error', 'Please enter a valid email address');
//       return;
//     }

//     // Password strength validation
//     if (password.length < 6) {
//       Alert.alert('Error', 'Password must be at least 6 characters long');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Create user in Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Create a user document in Firestore
//       await setDoc(doc(firestore, 'users', user.uid), {
//         username: username,
//         email: email,
//         createdAt: new Date(),
//         // Add any additional user fields you want to store
//       });

//       // Clear form and navigate
//       setUsername('');
//       setEmail('');
//       setPassword('');
      
//       Alert.alert(
//         'Signup Successful', 
//         'Your account has been created!',
//         [{ 
//           text: 'OK', 
//           onPress: () => navigation.navigate('Login') 
//         }]
//       );
//     } catch (error) {
//       // Handle specific Firebase authentication errors
//       let errorMessage = 'An error occurred during signup';
      
//       switch (error.code) {
//         case 'auth/email-already-in-use':
//           errorMessage = 'Email is already in use';
//           break;
//         case 'auth/invalid-email':
//           errorMessage = 'Invalid email address';
//           break;
//         case 'auth/weak-password':
//           errorMessage = 'Password is too weak';
//           break;
//       }

//       Alert.alert('Signup Error', errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <LinearGradient
//       colors={['#1a1a2e', '#16213e']}
//       style={styles.gradient}
//     >
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.container}
//       >
//         <View style={styles.innerContainer}>
//           <View style={styles.headerContainer}>
//             <Text style={styles.title}>Create Account</Text>
//             <Text style={styles.subtitle}>Sign up to get started</Text>
//           </View>

//           <View style={styles.formContainer}>
//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>USERNAME</Text>
//               <View style={styles.inputWrapper}>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your username"
//                   placeholderTextColor="#666"
//                   value={username}
//                   onChangeText={setUsername}
//                   selectionColor="#7b2cbf"
//                 />
//               </View>
//             </View>

//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>EMAIL</Text>
//               <View style={styles.inputWrapper}>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your email"
//                   placeholderTextColor="#666"
//                   value={email}
//                   onChangeText={setEmail}
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                   selectionColor="#7b2cbf"
//                 />
//               </View>
//             </View>

//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>PASSWORD</Text>
//               <View style={styles.inputWrapper}>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your password"
//                   placeholderTextColor="#666"
//                   value={password}
//                   onChangeText={setPassword}
//                   secureTextEntry
//                   selectionColor="#7b2cbf"
//                 />
//               </View>
//             </View>

//             <TouchableOpacity
//               style={styles.button}
//               onPress={handleSignup}
//               activeOpacity={0.8}
//               disabled={loading}
//             >
//               <LinearGradient
//                 colors={['#7b2cbf', '#9d4edd']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.buttonGradient}
//               >
//                 <Text style={styles.buttonText}>
//                   {loading ? 'SIGNING UP...' : 'SIGN UP'}
//                 </Text>
//               </LinearGradient>
//             </TouchableOpacity>

//             <View style={styles.signupContainer}>
//               <Text style={styles.signupText}>Already have an account? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//                 <Text style={styles.signupLink}>Log In</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </LinearGradient>
//   );
// };