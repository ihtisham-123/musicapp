import AlbumMixList from '@/components/AlbumMixList'
import Navbar from '@/components/Navbar'
import React from 'react'

const songHomepage = ({navigation}) => {
  return (
    <>
      <AlbumMixList navigation={navigation}/>
      <Navbar/>
    </>
  
  )
}

export default songHomepage