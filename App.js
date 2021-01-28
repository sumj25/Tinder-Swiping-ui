import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
Dimensions,
  StyleSheet,
  Image,Text
} from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

import Tinder from './components/Tinder';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH= Dimensions.get('window').width
const mydata = [
  {
    id: 1,
    text: 'card 1',
    uri: 'https://th.bing.com/th/id/OIP.tUdxadzYOcnOuOEyCPc9uQHaKt?pid=Api&rs=1'
  },
  { id: 2, text: 'card 2', uri: 'https://th.bing.com/th/id/OIP.sZR8glsYEOuhC4Wbxu2K0AHaJ4?pid=Api&rs=1' },
  {
    id: 3,
    text: 'card 3',
    uri: 'https://th.bing.com/th/id/OIP.6nStQOiedolM-F72C8FbrQHaIS?pid=Api&rs=1'
  },
  { id: 4, text: 'card 4', uri: 'https://th.bing.com/th/id/OIP.b2EUJ1Gcj7f2bMjB28D_7gHaJ4?pid=Api&rs=1' },
  { id: 5, text: 'card 5', uri: 'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2019/04/03/808708-773760-deepika-padukone-10.jpg' },
  { id: 6, text: 'card 6', uri: 'https://source.unsplash.com/RfoISVdKM4U' },
  { id: 7, text: 'card 6', uri: 'https://th.bing.com/th/id/OIP.ReLgSprWUzJ5PNQz5_aNQAHaLO?pid=Api&rs=1' },
  
];

class App extends React.Component {
  
  renderCard(item){
    return(
      <View style={{margin:10}} key={item.id}>
      <View style={{height:60}}>
      
      </View>
     
      <Image
      style={{flex:1,height:SCREEN_HEIGHT-120,width:null,resizeMode:'cover',borderRadius: 40}}
       source={{uri:item.uri}}
       />
      
     
     </View>
    )
  }
  renderNoMoreCards(){
    return(
    <View style={{margin:50}}>
    <Card>
    <Card.Title title="sab thik hai" />
    <Paragraph>sab kuchh chalta haii</Paragraph></Card>
    <Text>"alone"</Text>
  
    </View>)
  }
  render(){
    return(
      <View >
     
      <Tinder
      data={mydata}
      renderCards={this.renderCard}
      renderNoMoreCards={this.renderNoMoreCards} />
     
      </View>
    
    )
  }}
  const styles=StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#fff',
      margin:10
     
    }
  })

export default App;
