import React, { useState, useEffect } from "react";
import {
	SafeAreaView,
	KeyboardAvoidingView,
	FlatList,
	Text,
	StyleSheet,
	TouchableOpacity,
	View,
	Dimensions,
} from "react-native";
import { customStyles } from "../utils/CustomStyle";
import { useDispatch, useSelector } from "react-redux";
import { BackendAdress } from "../utils/BackendAdress";
import Icon from "react-native-vector-icons/FontAwesome";
<<<<<<< HEAD
import * as Speech from "expo-speech";
import { SpeakerWave } from "./ui/SpeakerWave";
=======
import { capitalizeFirstLetter } from "../utils/TextUtils";
>>>>>>> ebe5e40702eb4e7d5ea771b4fc40839a42d14fe8

const uri = BackendAdress.uri;

export default function Lessons() {
<<<<<<< HEAD
	const [lessonData, setLessonData] = useState([]);
	const [allLessons, setallLessons] = useState([]);
	const [currentLessonId, setCurrentLessonId] = useState(null);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	let token = "lciXA-SA2SLUsydGqZ6VZFmN4rxGcQvo";

	useEffect(() => {
		fetch(`http://${uri}:3000/lessons/showAllLessons/${token}`)
			.then((response) => response.json())
			.then((data) => {
				if (data && data.data) {
					setallLessons(data.data);
				}
			})
			.catch((error) => console.error("Erreur with lessons :", error));
	}, []);
=======
  const [lessonData, setLessonData] = useState([]);
  const [allLessons, setallLessons] = useState([]);
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  let token = "lciXA-SA2SLUsydGqZ6VZFmN4rxGcQvo";
  const uri = BackendAdress.uri;
  
  useEffect(() => {
    fetch(`http://${uri}:3000/lessons/showAllLessons/${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setallLessons(data.data);
        }
      })
      .catch((error) => console.error("Erreur with lessons :", error));
  }, []);
>>>>>>> ebe5e40702eb4e7d5ea771b4fc40839a42d14fe8

	const handleGoLesson = (id) => {
		fetch(`http://${uri}:3000/lessons/showLesson/${id}/${token}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data) {
					console.log("yesss");

<<<<<<< HEAD
					setLessonData(data.data.dialogue);
					setCurrentLessonId(id);
				}
			});
	};

	const speak = (text) => {
		Speech.speak(text, {
			language: "ja",
			pitch: 1,
			rate: 1,
		});
	};
=======
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.content}>
          {currentLessonId === null ? (
            <FlatList
              data={allLessons}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => (
                <View style={styles.lessonContainer}>
                  <Text style={styles.lessonTitle}>
                    {capitalizeFirstLetter(item.theme)}
                  </Text>
                  <Text>Number: {item.number}</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleGoLesson(item._id)}
                  >
                    <Text>Go to</Text>
                  </TouchableOpacity>
                </View>
              )}
              ListHeaderComponent={
                <Text style={[styles.title, styles.lessonHeader]}>Lessons</Text>
              }
            />
          ) : (
            <FlatList
              data={lessonData}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => {
                const alignment = index % 2 === 0 ? "row" : "row-reverse";
                const iconColor = index % 2 === 0 ? "#4CAF50" : "#2196F3";
>>>>>>> ebe5e40702eb4e7d5ea771b4fc40839a42d14fe8

	const phrases = [
		{
			japanese: "私は毎朝コーヒーを飲みます。",
			romaji: "Watashi wa maiasa kōhī o nomimasu.",
			english: "I drink coffee every morning.",
		},
		{
			japanese: "彼はとても優しい人です。",
			romaji: "Kare wa totemo yasashī hito desu.",
			english: "He is a very kind person.",
		},
		{
			japanese: "今日はとても暑いですね。",
			romaji: "Kyō wa totemo atsui desu ne.",
			english: "It is very hot today, isn't it?",
		},
		{
			japanese: "図書館で本を読んでいます。",
			romaji: "Toshokan de hon o yondeimasu.",
			english: "I am reading a book at the library.",
		},
		{
			japanese: "明日学校に行きます。",
			romaji: "Ashita gakkō ni ikimasu.",
			english: "I will go to school tomorrow.",
		},
		{
			japanese: "私は犬が好きです。",
			romaji: "Watashi wa inu ga suki desu.",
			english: "I like dogs.",
		},
		{
			japanese: "この店はとても安いです。",
			romaji: "Kono mise wa totemo yasui desu.",
			english: "This store is very cheap.",
		},
		{
			japanese: "駅まで歩いて行きます。",
			romaji: "Eki made aruite ikimasu.",
			english: "I will walk to the station.",
		},
		{
			japanese: "毎日日本語を勉強しています。",
			romaji: "Mainichi nihongo o benkyō shiteimasu.",
			english: "I study Japanese every day.",
		},
		{
			japanese: "彼女は美しい花を持っています。",
			romaji: "Kanojo wa utsukushī hana o motteimasu.",
			english: "She has a beautiful flower.",
		},
	];

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView style={styles.container}>
				<View style={styles.content}>
					{phrases.map((phrase, index) => (
						<View key={index} style={styles.phraseContainer}>
							<View style={styles.row}>
								<Text style={styles.text}>{phrase.japanese}</Text>
								<Text style={styles.romaji}>{phrase.romaji}</Text>
								<Text style={styles.english}>{phrase.english}</Text>
							</View>
							<TouchableOpacity
								style={styles.button}
								onPress={() => speak(phrase.japanese)}
							>
								<Text style={styles.text}>🔉</Text>
							</TouchableOpacity>
						</View>
					))}
					{/* {currentLessonId === null ? (
						<FlatList
							data={allLessons}
							keyExtractor={(item) => item._id.toString()}
							renderItem={({ item }) => (
								<View style={styles.lessonContainer}>
									<Text style={styles.lessonTitle}>{item.theme}</Text>
									<Text>Number: {item.number}</Text>
									<TouchableOpacity
										style={styles.button}
										onPress={() => handleGoLesson(item._id)}
									>
										<Text>Go to</Text>
									</TouchableOpacity>
								</View>
							)}
							ListHeaderComponent={
								<Text style={[styles.title, styles.lessonHeader]}>Lessons</Text>
							}
						/>
					) : (
						<FlatList
							data={lessonData}
							keyExtractor={(_, index) => index.toString()}
							renderItem={({ item, index }) => {
								const alignment = index % 2 === 0 ? "row" : "row-reverse";
								const iconColor = index % 2 === 0 ? "#4CAF50" : "#2196F3";

								return (
									<View key={index} style={[styles.dialogue]}>
										<View
											style={[styles.dialogue1, { flexDirection: alignment }]}
										>
											<Icon
												name="user"
												size={24}
												color={iconColor}
												style={styles.icon}
											/>
											<View style={styles.dialogueChild}>
												<View>
													<Text>Speaker : {item.speaker}</Text>
												</View>
												<View>
													<View>
														<Text>Japanese :</Text>
													</View>
													<View>
														<Text>{item.japanese}</Text>
														<TouchableOpacity
															style={styles.button}
															onPress={() => speak(item.japanese)}
														>
															<SpeakerWave />
														</TouchableOpacity>
													</View>
												</View>
												<View>
													<View>
														<Text>English :</Text>
													</View>
													<View>
														<Text>{item.english}</Text>
													</View>
												</View>
												<View>
													<View>
														<Text>Romanji :</Text>
													</View>
													<View>
														<Text>{item.romanji}</Text>
													</View>
												</View>
											</View>
										</View>
									</View>
								);
							}}
							ListHeaderComponent={
								<View>
									<Text style={[styles.title, styles.dialogueHeader]}>
										Dialogues
									</Text>
								</View>
							}
						/>
					)} */}
				</View>
				{currentLessonId && (
					<TouchableOpacity style={styles.nextButton}>
						<Text style={styles.nextButtonText}>Next</Text>
					</TouchableOpacity>
				)}
			</KeyboardAvoidingView>
		</SafeAreaView>
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
	text: {
		fontSize: 23,
	},
	title: {
		fontSize: 20,
		fontWeight: "700",
		fontFamily: customStyles.defaultFontFamily,
		marginBottom: 10,
		textAlign: "center",
	},
	lessonHeader: {
		marginTop: 20,
	},
	button: {
		alignContent: "center",
		justifyContent: "center",
	},
	dialogueHeader: {
		marginTop: 20,
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
	dialogue: {
		flex: 1,
		marginBottom: 10,
		paddingHorizontal: 10,
		color: "black",
	},
	dialogueChild: {
		borderWidth: 1,
		borderColor: "black",
		padding: 10,
		marginVertical: 5,
		borderRadius: 5,
		flexShrink: 1,
		color: "black",
	},
	dialogue1: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		color: "black",
	},
	icon: {
		flexShrink: 0,
		marginHorizontal: 10,
	},
	nextButton: {
		backgroundColor: "#007BFF",
		padding: 15,
		alignItems: "center",
		justifyContent: "flex-end",
	},
	nextButtonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
});
