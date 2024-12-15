import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { login } from "../reducers/users";
import { useEffect, useState } from "react";
import { BackendAdress } from "../utils/BackendAdress";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { customStyles } from "../utils/CustomStyle";
import * as Speech from 'expo-speech'


export default function FavoriteScreen() {
	const user = useSelector((state) => state.user.value);

	const token = user.token;
	const uri = BackendAdress.uri;
	const [words, setWords] = useState([]);
	const [cardsIsVisible, setCardsIsVisible] = useState(true)

	const [fontsLoaded] = useFonts({
		Satoshi: require("../assets/fonts/Satoshi-BlackKotf.otf"),
	});

	if (!fontsLoaded) {
		return null;
	}

	const handleClick = () => {
		fetch(`http://${uri}:3000/deleteFavorite/${token}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				Word_JP: words.Word_JP,
			})
		})
		.then((response) => response.json())
		.then((data) => {
				console.log(data)})
	}

	

	// Récupération des favoris lors de la connexion
	useEffect(() => {
		fetch(`http://${uri}:3000/showFavorites/${token}`)
		.then((response) => response.json())
		.then((data) => {
			setWords(data.result);
			console.log(words, 'here')

		});
	}, []);

	
const speak = (text) => {
	Speech.speak(text, {
		language: 'ja', 
		pitch: 1, 
		rate: 1, 
	})
}
	

	const favoriteswords =
	words.length>0 && words.map((data, i) => {

		if(cardsIsVisible === true){
			return (
				<View style={styles.card} key={i}>
					<View>
						<View style={styles.deleteIcon}>
							<FontAwesome name="close" size={15} color="#000000" onPress={() => handleClick() }/>
						</View>
					</View>
					<Text style={styles.word}>{data.Word_JP}</Text>
					<Text style={styles.word}>{data.Word_EN}</Text>
					<Text style={styles.word}>{data.Romanji}</Text>
					<Text style={styles.word}>{data.Grammar}</Text>
					<TouchableOpacity
                            style={styles.button}
                            onPress={() => speak(data.Word_JP)}
                        >
                            <Text>🔊</Text>
                        </TouchableOpacity>

				</View>
			);
		} else {
			
		}
			
		});

	

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.titlecontainer}>
				<Text style={styles.title}>Favorites ({words.length})</Text>
			</View>

			<View style={styles.cardsList}>{favoriteswords}</View>
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
		fontWeight: "bold",
	},

	card: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: "25%",
		height: "40%",
		margin: 10,
		borderRadius: customStyles.buttonRadius,
		backgroundColor: "#EEC1C0",
	},
	cardsList: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		flexWrap: "wrap",
	},
	word: {
		margin: 5,
	},
	deleteIcon: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		width: "80%",
	},
});
