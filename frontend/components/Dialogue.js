import React, { useState, useEffect } from "react";
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BackendAdress } from "../utils/BackendAdress";
import { customStyles } from "../utils/CustomStyle";
import * as Speech from "expo-speech";

export default function Dialogue(props) {
	const [lessons, setLessons] = useState([]);
	const [currentLessonId, setCurrentLessonId] = useState(null);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);

	const speak = (text) => {
		Speech.speak(text, {
			language: "ja",
			pitch: 1.2,
			rate: 0.8,
		});
	};

	let token = "QrKuMTUO4rHBg2gkGW2acAzFbc3w9H7x";
	let id = "675db08ec53a0c941602663a";

	const uri = BackendAdress.uri;

	// const handleGoLesson = (id) => {};

	useEffect(() => {
		fetch(`http://${uri}:3000/lessons/showAllLessons/${user.token}`)
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					setLessons(data.data);
				} else {
					console.error("No data found.");
				}
			})
			.catch((error) => console.error("Erreur with lessons :", error))
			.finally(() => setLoading(false));
	}, [uri, user.token]);
	const lessonToDisplay = lessons.find((lesson) => lesson._id === props.id);

	if (loading) {
		return <Text>Loading...</Text>;
	}
	if (!lessonToDisplay) {
		return <Text>No lesson found</Text>;
	}

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={styles.container}>
				{/* Affichage du thème et des dialogues associés à cette leçon */}
				{lessonToDisplay.themes.map((theme, themeIndex) => {
					// Afficher seulement le thème correspondant à props.index
					if (themeIndex === props.index) {
						return (
							<View key={themeIndex}>
								{/* Affiche le titre du thème */}
								<Text style={styles.themeTitle}>{theme.theme}</Text>

								{/* Affiche les lignes de dialogues pour ce thème */}
								{theme.lines.map((line, lineIndex) => (
									<View
										key={lineIndex}
										style={[
											styles.dialogue,
											{
												alignSelf:
													line.speaker === "Person A"
														? "flex-end"
														: "flex-start", // Alignement
												backgroundColor:
													line.speaker === "Person A" ? "#FFE4E1" : "#FDEDED", // Couleur personnalisée
											},
										]}
									>
										<Text style={styles.speakerText}>{line.speaker}</Text>
										<View style={styles.separator} />
										<Text style={styles.japaneseText}>{line.japanese}</Text>
										<Text style={styles.romanjiText}>{line.romanji}</Text>
										<Text style={styles.englishText}>{line.english}</Text>
										<TouchableOpacity
											style={styles.icon}
											onPress={() => speak(line.japanese)}
										>
											<Text style={styles.speakerText}>🔉</Text>
										</TouchableOpacity>
									</View>
								))}
							</View>
						);
					}
					return;
				})}
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
	content: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: "700",
		textAlign: "center",
	},
	lessonHeader: {
		marginTop: 20,
		paddingLeft: 20,
	},
	dialogueHeader: {
		marginTop: 20,
		paddingLeft: 20,
	},
	lessonContainer: {
		borderWidth: 2,
		borderColor: "black",
		padding: 15,
		marginVertical: 10,
		borderRadius: 5,
	},
	lessonTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 5,
	},
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
	dialogue: {
		marginBottom: 10,
		paddingHorizontal: 10,
	},
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
	icon: {
		marginHorizontal: 10,
		padding: 10,
		backgroundColor: "#EEC1C0",
		borderRadius: 25,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
		width: 50,
		height: 50,
		textAlign: "center",
	},
	wordsContainer: {
		flexWrap: "wrap",
	},
	word: {
		fontSize: 16,
		marginHorizontal: 5,
	},
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
	modalText: {
		fontSize: 18,
		marginBottom: 10,
	},
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#F8F9FA",
	},
	dialogue: {
		borderWidth: 0,
		borderRadius: 20,
		padding: 20,
		marginBottom: 15,
		width: "auto",
		maxWidth: "75%",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 6,
		elevation: 5,
	},
	speakerText: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#555",
		marginBottom: 5,
	},
	japaneseText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 5,
	},
	romanjiText: {
		fontSize: 14,
		fontStyle: "italic",
		color: "#666",
		marginBottom: 5,
	},
	englishText: {
		fontSize: 14,
		color: "#444",
	},
	separator: {
		height: 10,
	},
});
