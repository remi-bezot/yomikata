import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableHighlight,
	Animated,
} from "react-native";
import { useSelector } from "react-redux";
import * as Speech from "expo-speech";
import { BackendAdress } from "../utils/BackendAdress";

const LessonComponent = (props) => {
	const [lessons, setLessons] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isGood, setIsGood] = useState(false);
	const [isBad, setIsBad] = useState(false);

	const uri = BackendAdress.uri;
	const user = useSelector((state) => state.user.value);

	const speak = (text) => {
		Speech.speak(text, {
			language: "ja",
			pitch: 1.2,
			rate: 0.8,
		});
	};
	const Validate = () => {
		navigation.navigate("Dialogue", {
			lessonId: lessonId,
			themeIndex: themeIndex,
		});
	};

	useEffect(() => {
		// Fetch pour récupérer toutes les leçons
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

	const exerciseToDisplay = lessons.find((lesson) => lesson._id === props.id);

	if (loading) {
		return <Text>Loading...</Text>;
	}

	if (!exerciseToDisplay) {
		return <Text>No exercise found</Text>;
	}

	// Map pour afficher les exercices
	const exercises = exerciseToDisplay.themes
		.map((theme) => theme.exo[props.index]) // Récupère le premier exercice de chaque thème
		.filter((exercise) => exercise !== undefined); // Filtre les thèmes sans exercice

	const singleExercise = exercises[0]; // Prend le premier exercice trouvé
	if (!singleExercise) {
		return <Text>No exercise found</Text>;
	}

	return (
		<View style={styles.container}>
			{/* Carte centrale pour le mot japonais */}
			<View style={styles.wordCard}>
				<Text style={styles.word}>{singleExercise.word_jp}</Text>
				<TouchableOpacity
					style={styles.icon}
					onPress={() => speak(singleExercise.word_jp)}
				>
					<Text style={styles.speakerText}>🔉</Text>
				</TouchableOpacity>
			</View>

			{/* Grille pour les réponses */}
			<View style={styles.gridContainer}>
				<TouchableOpacity
					style={[styles.button, isGood && styles.goodAnswerButton]}
					onPress={() => setIsGood(true)}
				>
					<Text style={styles.answerText}>{singleExercise.good_answer}</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, isGood && styles.badAnswerButton]}
					onPress={() => setIsBad(true)}
				>
					<Text style={styles.answerText}>{singleExercise.wrong_answer_a}</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, isGood && styles.badAnswerButton]}
					onPress={() => setIsBad(true)}
				>
					<Text style={styles.answerText}>{singleExercise.wrong_answer_b}</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, isGood && styles.badAnswerButton]}
					onPress={() => setIsBad(true)}
				>
					<Text style={styles.answerText}>{singleExercise.wrong_answer_c}</Text>
				</TouchableOpacity>
			</View>
			<TouchableHighlight
				onPress={Validate}
				style={styles.answer}
				key1={singleExercise.good_answer}
			>
				<Text style={styles.answerText}>Next</Text>
			</TouchableHighlight>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		color: "black",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 50,
		top: 240,
	},
	wordCard: {
		backgroundColor: "#D56565",
		paddingVertical: 40,
		paddingHorizontal: 50,
		borderRadius: 15,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 5 },
		shadowRadius: 10,
		elevation: 8,
		marginBottom: 30,
		width: "90%",
	},
	word: {
		fontSize: 48,
		fontWeight: "bold",
		color: "black",
		textAlign: "center",
		letterSpacing: 1,
	},

	speakerText: {
		fontSize: 40,
		textAlign: "center",
	},
	gridContainer: {
		marginTop: 20,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
		width: "100%",
	},
	button: {
		backgroundColor: "#EEC1C0",
		paddingVertical: 20,
		paddingHorizontal: 10,
		borderRadius: 10,
		width: "45%",
		marginBottom: 20,
		shadowColor: "#000",
		shadowOpacity: 0.25,
		shadowOffset: { width: 0, height: 4 },
		shadowRadius: 5,
		elevation: 5,
	},
	goodAnswerButton: {
		backgroundColor: "Green",
		paddingVertical: 20,
		paddingHorizontal: 10,
		borderRadius: 10,
		width: "45%",
		marginBottom: 20,
		shadowColor: "#000",
		shadowOpacity: 0.25,
		shadowOffset: { width: 0, height: 4 },
		shadowRadius: 5,
		elevation: 5,
	},
	badAnswerButton: {
		backgroundColor: "Red",
		paddingVertical: 20,
		paddingHorizontal: 10,
		borderRadius: 10,
		width: "45%",
		marginBottom: 20,
		shadowColor: "#000",
		shadowOpacity: 0.25,
		shadowOffset: { width: 0, height: 4 },
		shadowRadius: 5,
		elevation: 5,
	},
	answer: {
		backgroundColor: "#EEC1C0",
		paddingVertical: 20,
		paddingHorizontal: 10,
		borderRadius: 10,
		width: "45%",
		marginBottom: 20,
		shadowColor: "#000",
		shadowOpacity: 0.25,
		shadowOffset: { width: 0, height: 4 },
		shadowRadius: 5,
		elevation: 5,
		justifyContent: "center",
		alignItems: "center",
	},

	answerText: {
		fontSize: 28,
		color: "Black",
		textAlign: "center",
		fontWeight: "600",
	},
});

export default LessonComponent;
