import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Text,
  StyleSheet
} from 'react-native';

import { LogBox } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;

const SWIPE_LIMIT =SCREEN_WIDTH /2;
class Tinder extends React.Component{
    constructor(props){
        super(props);
        this.state={
            index:0
        }
        const position = new Animated.ValueXY();
        this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder:()=> true,
        onPanResponderMove:(e,gesture)=>{
            position.setValue({x:gesture.dx,y:gesture.dy})
        },
        onPanResponderRelease:(e,gesture)=>{
            if(gesture.dx>SWIPE_LIMIT){
            this.swiped("right")
            }
            if(gesture.dx <-SWIPE_LIMIT){
           this.swiped("left")
            }
            else{
            this.reserPosition()}
        }
        })
        
        this.position=position
        this.likeOpacity=position.x.interpolate({
            inputRange:[-SCREEN_WIDTH,0,SCREEN_WIDTH],
            outputRange:[0,0,8],
            extrapole:'clamp'
          })
          this.dislikeOpacity=position.x.interpolate({
            inputRange:[-SCREEN_WIDTH,0,SCREEN_WIDTH],
            outputRange:[8,0,0],
            extrapole:'clamp'
          })
    }
    componentDidUpdate(nextProps) {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();}
    
    swiped(direction){
        const x= direction==='right' ?SCREEN_WIDTH*3: -SCREEN_WIDTH*3
        Animated.timing(this.position,{
            toValue:{x:x,y:0},
           
        }).start(()=>{
            this.position.setValue({x:0,y:0}),
            this.setState({index:this.state.index+1})
        })
    }
    reserPosition(){
        Animated.spring(this.position,{
            toValue:{x:0,y:0},
         
            
        }).start()
    }
    mycardStyle(){
        const rotate =this.position.x.interpolate({
            inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
            outputRange:['-10deg','0deg','10deg'],
            extrapolate:'clamp'
        })
return {
   ...this.position.getLayout(),
   transform:[{rotate:rotate}]
}
    }
    rendercard() {
        if(this.state.index >= this.props.data.length){
            return this.props.renderNoMoreCards()
        }
        return this.props.data.map((item,i)=>{
            if(i<this.state.index){
                return null
            }
            if(i===this.state.index){
                return(
                    <Animated.View 
                    key={item.id} style={[this.mycardStyle(),styles.cardStyle]} 
                    {...this.panResponder.panHandlers}>
                    
                    <Animated.View style={{opacity:this.likeOpacity,transform:[{rotate:'30deg'}],position:'absolute',top:90,right:50,zIndex:1000}}>
      <Text style={{borderWidth:1,borderColor:'red',color:'red',fontSize:30,fontWeight:'900',padding:10}}>NOPE</Text></Animated.View>
      <Animated.View style={{opacity:this.dislikeOpacity,transform:[{rotate:'-30deg'}],position:'absolute',top:90,left:50,zIndex:1000}}>
      <Text style={{borderWidth:1,borderColor:'green',color:'green',fontSize:32,fontWeight:'900',padding:10}}>LIKE</Text></Animated.View>
                   {this.props.renderCards(item)}
                    </Animated.View>
                )
            }
            return (
                <Animated.View key={item.id} style={[styles.cardStyle]}>
                {this.props.renderCards(item)} 
                </Animated.View>
            )
            
        }).reverse()
    }
    render(){
        return(
            <View>
            <View style={{flex: 1}}>
           
            <View style={{flex: 1}}></View>
             {this.rendercard()}
             </View>
             <View style={{height:60}}>

             
  
             </View>
             </View>
           
        )
    }
}
const styles = StyleSheet.create({
    cardStyle:{
        position:"absolute",
        zIndex:1,
        width:SCREEN_WIDTH
    }
})
export default Tinder;