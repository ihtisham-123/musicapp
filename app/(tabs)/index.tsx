import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Homepage from '../homepage';
import user from '../user';
import AlbumMixList from '@/components/AlbumMixList';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import PlayScreen from '@/components/PlayScreen';
import songHomepage from '../songHomepage';
import ProfileScreen from '../ProfileScreen';
import ArtistLogin from '../ArtistLogin';




const Stack = createStackNavigator();

export default function HomeScreen() {


  return (
    <>
     {/* <AlbumMixList/> */}
   
      <Stack.Navigator initialRouteName="AlbumMixList">
      <Stack.Screen name="Home" component={Homepage} options={{ headerShown: false }}  />
      <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }}  /> 
      <Stack.Screen name="Signup" component={Signup}   options={{ headerShown: false }}/>
      <Stack.Screen name="AlbumMixList" component={AlbumMixList}  options={{ headerShown: false }}/>
      <Stack.Screen name="PlayScreen" component={PlayScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="user" component={user} options={{ headerShown: false }} />
      <Stack.Screen name='songHomePage' component={songHomepage} options={{ headerShown: false }} />
      <Stack.Screen name='Profile' component={ProfileScreen} options={{headerShown: false}}/>
      <Stack.Screen name='ArtistLogin' component={ArtistLogin} options={{headerShown: false}}/>
      
    

    </Stack.Navigator>  



   
    
    </>

   
  );
}