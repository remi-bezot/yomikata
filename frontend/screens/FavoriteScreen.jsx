import { Text, View, StyleSheet} from 'react-native'
import React from 'react'
import {  useSelector } from "react-redux";
import {login} from '../reducers/users';
import { useEffect, useState } from 'react';
import { customStyles } from "../utils/CustomStyle";
import { Const } from "../utils/Const";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from "expo-font";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function FavoriteScreen() {

  

  const user = useSelector((state) => state.user.value);
  const token = 'leTNmBK8F-FKRA1WrgIG2e364rxgWlTf'
  const uri = Const.uri;
  const [words, setWords] = useState([])

  // Récupération des favoris lors de la connexion
  useEffect(() => {
    fetch(`http://${uri}:3000/favorites/${token}`)
      .then(response => response.json())
      .then(data => {
        setWords(data.result)
     
      });
  }, []);
  
  

   const favoriteswords = words && words.map((data, i) => {
     return <View style={styles.card} key={i}>
      <View> 
       <View style={styles.deleteIcon}><FontAwesome name="close" size={15} color="#000000" /></View>
        <Text style={styles.word}>{data.Word_JP}</Text>
      </View>
      <Text style={styles.word}>{data.Word_EN}</Text>
      <Text style={styles.word}>{data.Romanji}</Text>
      <Text style={styles.word}>{data.Grammar}</Text>
    </View>
  });

  // const [fontsLoaded] = useFonts({
	// 	OverusedGrotesk: require("../assets/fonts/Satoshi-BlackK"),
	// });

	// if (!fontsLoaded) {
	// 	return null;
	// }



    return (
      <SafeAreaView style={styles.container}>
         <View style={styles.titlecontainer}><Text style={styles.title}>Favorites</Text></View>
        
        <View style={styles.cardsList}>{favoriteswords}</View>
      </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
  },
  titlecontainer:{
    backgroundColor:'red',
    
  },
  title: {
    fontSize: 25,
    fontFamily: "Satoshi-Black",
    fontWeight:'bold'
    },
  
    card: {
     display:'flex',
     flexDirection:'column',
     justifyContent:'center',
     alignItems:'center',
     width: '25%', 
     height: '30%', 
     margin: 10, 
     borderRadius: customStyles.buttonRadius,
     backgroundColor: '#EEC1C0', 
    },
    cardsList: {
    display:'flex',
     flexDirection:'row',
     justifyContent:'center',
     flexWrap:'wrap'
    },
    word: {
      margin: 5, 
    },
    deleteIcon: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      width: "80%",
    }

  })

