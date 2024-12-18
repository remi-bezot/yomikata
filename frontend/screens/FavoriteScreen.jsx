import { Text, View, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { BackendAdress } from "../utils/BackendAdress";
import { customStyles } from "../utils/CustomStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Speech from 'expo-speech'
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites, deleteFavorite } from "../reducers/favoritesreducer";
const uri = BackendAdress.uri;


export default function FavoriteScreen() {
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();
  	const favorites = useSelector((state) => state.favorites.value);
	console.log(favorites, 'hoo')

	const token = user.token;
	
	const [selectedCardId, setSelectedCardId] = useState(null)
	const [words, setWords] = useState([]);
	
	

	const [fontsLoaded] = useFonts({
		Satoshi: require("../assets/fonts/Satoshi-BlackKotf.otf"),
		NotoSansJP: require("../assets/fonts/NotoSansJP-Thin.ttf")
	});





		// Récupération des favoris lors de la connexion
	useEffect(() => {
		fetch(`http://${uri}:3000/favorites/showFavorites/${token}`)
		.then((response) => response.json())
		.then((data) => {
			if (data.data){
				dispatch(setFavorites(data.data[0]));
			}				
		});
	}, []);







	const handleClick = (wordId) => {
		
		fetch(`http://${uri}:3000/favorites/deleteFavorite`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: wordId,
			})
		})
		.then((response) => response.json())
		.then((data) => {
				if(data.data){
					dispatch(deleteFavorite(wordId))
				}
			})
	}
	
const handleCard = (wordId) => {
	setSelectedCardId((e) => (e === wordId ? null : wordId)); 
};


	
const speak = (text) => {
	Speech.speak(text, {
		language: 'ja', 
		pitch: 1, 
		rate: 0.5, 
	})
}



	


const favoriteswords = favorites !== 'undefined' && favorites.length > 0  && favorites.map((data, i) => {
	
    console.log(data,"d")
	if(selectedCardId === data._id){
		return (
			<View style={styles.card} key={i}>
				<TouchableOpacity style={styles.icon}  onPress={() => handleClick(data._id)}>
					<View style={styles.deleteIcon}>
						<FontAwesome name="close" size={15} color="#000000" />
					</View>
				</TouchableOpacity>
				<Text style={styles.wordjp} onPress={() => handleCard(data._id)}>{data.Word_JP}</Text>
						<View style={styles.traduction}>
						<Text style={styles.word}>{data.Word_EN}</Text>
						<Text style={styles.word}>{data.Romanji}</Text>
						<Text style={styles.word}>{data.Grammar}</Text>
						</View>
						<TouchableOpacity
							style={styles.speakerbutton}
							onPress={() => speak(data.Word_JP)}
						>
							<Text style={styles.speaker}>🔊</Text>
						</TouchableOpacity>
	
			</View>
		)
		
	} else {
		return (
			<View style={styles.cardClose} key={i}>
				<TouchableOpacity style={styles.icon}  onPress={() => handleClick(data._id)}>
					<View style={styles.deleteIcon}>
						<FontAwesome name="close" size={15} color="#000000"  />
					</View>
				</TouchableOpacity>
				<Text style={styles.wordjp} onPress={() => handleCard(data._id)}>{data.Word_JP}</Text>
			</View>)

	}
    
});
	

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.titlecontainer}>
				<Text style={styles.title}> Favorites ({favorites.length})</Text>
			</View>
			<ScrollView>
			<View style={styles.cardsList}>{favoriteswords}</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "100%",
	},
	title: {
		fontSize: 25,
		fontFamily: 'Satoshi-Black',
		color: '#CC4646',
	},
	titlecontainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems:'center',
		width: '100%',
		height: 100, 
	},
	card: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: 200,
		height: 200,
		margin: 10,
		borderRadius: 25,
		backgroundColor: "#EEC1C0",
	},
	cardClose:{
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: 100,
		height: 100,
		margin: 10,
		borderRadius: 25,
		backgroundColor: "#EEC1C0",
	},
	cardsList: {
		display: "flex",
		flexDirection: "row",
		alignItems:'center',
		justifyContent: "center",
		flexWrap: "wrap",
	},
	word: {
		margin: 5,
		fontSize: 15,
		
	},
	wordjp: {
		fontSize: 20,
		fontWeight:'bold',
		margin: 10,
		backgroundColor: 'white',
	},
	deleteIcon: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		
		
	},
	speakerbutton: {
		backgroundColor:'#D56565',
		width: 30, 
		height: 30,
		borderRadius: 30, 
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		margin : 5, 
	}, 
	traduction: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		padding: 5, 
		borderRadius:'50%', 
	}
});


