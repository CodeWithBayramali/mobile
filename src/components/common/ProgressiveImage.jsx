import { View, Text,StyleSheet,Animated,Easing,Dimensions } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const {width} = Dimensions.get('window')

export default function ProgressiveImage({source,style,...props}) {
    let defaultImageAnimated = new Animated.Value(0)
    let imageAnimated = new Animated.Value(0)

    const AnimatedLG = Animated.createAnimatedComponent(LinearGradient)

    const handleDefaultImageLoad = () => {
      Animated.loop(
        Animated.timing(defaultImageAnimated,{
          toValue:1,
          duration:2000,
          easing: Easing.linear,
          useNativeDriver:true
      })
      ).start()
        
    }

    const handleImageLoad = () => {
        Animated.timing(imageAnimated,{
            toValue:1,
            useNativeDriver:true
        }).start()
    }

  return (
    <View>
      
      {/* <AnimatedLG colors={["#a0a0a0", "#b0b0b0", "#b0b0b0", "#a0a0a0"]}
        start={{ x:0, y:0 }}
        end={{ x:1, y:0 }}
        style={[{transform:[{translateX:translateY}]}]}
        
      /> */}

      <Animated.Image {...props} source={require('../../../assets/images/default.jpg')} style={[style,{opacity:defaultImageAnimated}]} 
        onLoad={handleDefaultImageLoad}
        blurRadius={1}
      />

      <Animated.Image {...props} source={source} style={[style,{opacity:imageAnimated},styles.imageOverlay]} 
        onLoad={handleImageLoad}
        blurRadius={0}
      />

    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:'#e1e4e8'
    },
    imageOverlay:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
    }
})