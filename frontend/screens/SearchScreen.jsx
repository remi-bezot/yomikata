import  {useState} from "react";
import * as Speech from 'expo-speech'
import { useSelector } from "react-redux";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { BackendAdress } from "../utils/BackendAdress";



const uri = BackendAdress.uri;

export default function SearchScreen() {

// const user = useSelector((state) => state.user.value);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const speak = (text) => {
	Speech.speak(text, {
		language: "ja",
		pitch: 1.2,
		rate: 0.8,
	});
};

  // Fonction pour lancer la recherche
  const handleSearch = () => {
    if (query.trim() === "") return; // Empêcher une recherche vide

    fetch(`http://${uri}:3000/word/getWord/he8G56G5cU2ideOMyGG6DWcYXxaFvXxz/${query}`)
      .then((response) => response.json())
      .then((data) => {
        setResults([data]);
      })
      .catch((error) => console.error("Erreur de fetch :", error));
  };

  console.log(results, 'here')



  return (
    <View style={styles.container}>

      {/* Barre de recherche */}
      <View style={styles.searchBar}>
        <FontAwesome6 name="magnifying-glass" size={20} color="#fff" />
        <TextInput
          style={styles.input}
          placeholder="Rechercher un mot japonais..."
          placeholderTextColor="black"
          value={query}
          onChangeText={(text) => setQuery(text)} // Mettre à jour query uniquement
        />

        {/* Bouton pour lancer la recherche */}
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Rechercher</Text>
        </TouchableOpacity>
      </View>
	  {results.length > 0 &&
  results.map((favorite, index) => {
    return (
      <View key={index} style={styles.resultContainer}>
        <Text style={styles.resultText}>
          Kanji: {favorite.wanikaniLow.Kanji}
        </Text>
        <Text style={styles.resultText}>
          Hiragana: {favorite.wanikaniLow.Hiragana[0].reading}
        </Text>
        <Text style={styles.resultText}>Romaji: {favorite.romaji}</Text>
        <Text style={styles.resultText}>
          Grammar: {favorite.wanikaniLow.Grammar[0]}
        </Text>
        <TouchableOpacity
          style={styles.speakerButton}
          onPress={() => speak(favorite.wanikaniLow.Hiragana[0].reading)}
        >
          <Text style={styles.resultText}>🔊</Text>
        </TouchableOpacity>
      </View>
    );
  })}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#EEC1C0",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  input: {
    flex: 1,
    color: "black",
    fontSize: 16,
    marginLeft: 10,
  },
  searchButton: {
    backgroundColor: "#C12E2E",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  resultContainer: {
	flexDirection: "column", // Affiche les résultats en ligne
	justifyContent: "space-between", // Espacement entre les colonnes
	alignItems: "center", // Aligne les éléments au centre verticalement
	backgroundColor: "#C12E2E", 
	borderRadius: 10, // Coins arrondis
	paddingVertical: 10, // Espacement vertical
	paddingHorizontal: 15, // Espacement horizontal
	marginVertical: 5, // Espacement entre les résultats
	shadowColor: "#fff", // Légère ombre blanche
	shadowOpacity: 0.2,
	shadowRadius: 3,
  },
  resultText: {
	color: "black", // Texte blanc
	fontSize: 16, // Taille de police
	fontWeight: "500", // Police semi-gras
  },
  speakerButton: {
	marginLeft: 10, // Espace pour l'icône
  },
  
});



