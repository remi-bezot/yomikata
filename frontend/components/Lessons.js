import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BackendAdress } from "../utils/BackendAdress";
import { customStyles } from "../utils/CustomStyle";

export default function Lessons() {
	const [lessons, setLessons] = useState([]);
	const [currentLessonId, setCurrentLessonId] = useState(null);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	
	const uri = BackendAdress.uri;

	const handleGoLesson = (id) => {
		fetch(`http://${uri}:3000/lessons/showLesson/${id}/${user.token}`)
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					setLessons(data.data);
					setCurrentLessonId(id);
				}
			});
	};

	useEffect(() => {
		fetch(
			`http://${uri}:3000/lessons/showAllLessons/QrKuMTUO4rHBg2gkGW2acAzFbc3w9H7x`
		)
			.then((response) => response.json())
			.then((data) => {
				console.log("ok");

				if (data.result) {
					setLessons(data.data);
				} else {
					console.log("no");

					console.error("No data.");
				}
			})
			.catch((error) => console.error("Erreur with lessons :", error))
			.finally(() => setLoading(false));
	}, [uri, user.token]);

	if (loading) {
		return <Text>Loading...</Text>;
	}

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={styles.container}>
				{lessons.map((lesson, lessonIndex) => (
					<View key={lessonIndex}>
						{lesson.themes.map((theme, themeIndex) => (
							<View key={themeIndex}>
								{theme.lines.map((line, lineIndex) => (
									<View
										style={[
											styles.dialogue,
											{
												alignSelf:
													line.speaker === "Person A"
														? "flex-end"
														: "flex-start", // Condition d'alignement
												backgroundColor:
													line.speaker === "Person A" ? "#FFE4E1" : "#FDEDED", // Couleur personnalisée pour chaque personne
											},
										]}
										key={lineIndex}
									>
										<Text style={styles.speakerText}>{line.speaker}</Text>
										<View style={styles.separator} />
										<Text style={styles.japaneseText}>{line.japanese}</Text>
										<Text style={styles.romanjiText}>{line.romanji}</Text>
										<Text style={styles.englishText}>{line.english}</Text>
									</View>
								))}
							</View>
						))}
					</View>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  content: { flex: 1 },
  title: { fontSize: 20, fontWeight: "700", textAlign: "center" },
  lessonHeader: { marginTop: 20, paddingLeft: 20 },
  dialogueHeader: { marginTop: 20, paddingLeft: 20 },
  lessonContainer: {
    borderWidth: 2,
    borderColor: "black",
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  lessonTitle: { fontSize: 18, fontWeight: "600", marginBottom: 5 },
  button: {
    backgroundColor: customStyles.buttonBackgroundColor,
    borderRadius: customStyles.buttonRadius,
    width: customStyles.buttonWidth,
    height: customStyles.buttonHeight,
    display: customStyles.buttonDisplay,
    flexDirection: customStyles.buttonFlexDirection,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: customStyles.buttonTextColor,
    fontSize: customStyles.buttonTextFontSize,
    fontWeight: customStyles.buttonTextFontWeight,
  },
  dialogue: { marginBottom: 10, paddingHorizontal: 10 },
  dialogueChild: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "80%",
  },
  dialogue1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: { marginHorizontal: 10 },
  // wordsContainer: { flexDirection: "row", flexWrap: "wrap" },
  wordsContainer: { flexWrap: "wrap" },
  word: { fontSize: 16, marginHorizontal: 5 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: { fontSize: 18, marginBottom: 10 },
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#F8F9FA", // Fond général de la vue pour un contraste agréable
	},
	dialogue: {
		borderWidth: 0, // Retrait de la bordure pour un rendu moderne
		borderRadius: 20, // Coins très arrondis pour un effet "bulle"
		padding: 20, // Espacement interne généreux
		marginBottom: 15, // Espacement entre les bulles
		width: "auto", // S'adapte au contenu
		maxWidth: "75%", // Limite la largeur des bulles pour éviter qu'elles ne soient trop grandes
		shadowColor: "#000", // Ombre douce
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 5, // Pour un effet d'ombre sur Android
	},
	speakerText: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#555", // Couleur douce pour le texte des speakers
		marginBottom: 5,
	},
	japaneseText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333", // Texte principal en noir pour une bonne lisibilité
		marginBottom: 5,
	},
	romanjiText: {
		fontSize: 14,
		fontStyle: "italic",
		color: "#666", // Romanji avec une couleur légèrement plus claire
		marginBottom: 5,
	},
	englishText: {
		fontSize: 14,
		color: "#444", // Texte en anglais légèrement plus foncé que le romanji
	},
	separator: {
		height: 10, // Espace visuel entre les éléments
	},
});
