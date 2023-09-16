import { View,TextInput } from "react-native";
import {Feather,Ionicons} from '@expo/vector-icons'
import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { useColorScheme } from "react-native";

export default Searchbar = () => {
    const colorScheme = useColorScheme();
    return (
      <View style={styles.container}>
        <Feather
          name="search"
          style={styles.searchIcon}
          size={24}
          color={Colors[colorScheme].maincolortSearchBar}
        />
        <TextInput
          placeholderTextColor={
            Platform.OS === 'android' && Colors[colorScheme].borderColor
          }
          style={{
            height: 55,
            borderRadius: 5,
            paddingLeft: 60,
            fontSize: 18,
            backgroundColor: Colors[colorScheme].darkModeBackground,
            width: '100%',
          }}
          placeholder="Satıcı yada ürün bul"
        />
        <Ionicons
          name="ios-filter"
          size={24}
          color={Colors[colorScheme].maincolortSearchBar}
          style={styles.filteringIcon}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container:{
        marginVertical:10,
        marginHorizontal:5,
        flexDirection:'row',
    },
    tinput:{
        height:50,
        borderRadius:5,
        paddingLeft:15,
    },
    searchIcon:{
        position:'absolute',
        left:10,
        bottom:14,
        zIndex:1
    },
    filteringIcon:{
        position:'absolute',
        right:10,
        bottom:14
        
    },
})