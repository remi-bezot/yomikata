import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { BarChart, PieChart } from "react-native-gifted-charts";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
	TouchableHighlight,
} from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import { BackendAdress } from "../utils/BackendAdress";
import Dialogue from "./DialogueScreen";
const uri = BackendAdress.uri;

export default function DashboardScreen() {
	const data = [
		{
			value: 25,
			frontColor: "red",
			gradientColor: "red",
			spacing: 6,
			label: "Mon",
		},
		{ value: 24, frontColor: "black", gradientColor: "white" },

		{
			value: 35,
			frontColor: "red",
			gradientColor: "#009FFF",
			spacing: 6,
			label: "Tue",
		},
		{ value: 30, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },

		{
			value: 45,
			frontColor: "red",
			gradientColor: "#009FFF",
			spacing: 6,
			label: "Wed",
		},
		{ value: 40, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },

		{
			value: 52,
			frontColor: "red",
			gradientColor: "#009FFF",
			spacing: 6,
			label: "Thur",
		},
		{ value: 49, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },

		{
			value: 70,
			frontColor: "red",
			gradientColor: "#009FFF",
			spacing: 6,
			label: "Fri",
		},
		{ value: 80, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
		{
			value: 52,
			frontColor: "red",
			gradientColor: "#009FFF",
			spacing: 6,
			label: "Sat",
		},
		{ value: 49, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
		{
			value: 52,
			frontColor: "red",
			gradientColor: "#009FFF",
			spacing: 6,
			label: "Sun",
		},
		{ value: 49, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
	];

	const pieData = [
		{
			value: 47,
			color: "#009FFF",
			gradientCenterColor: "#006DFF",
			focused: true,
		},
		{ value: 40, color: "#93FCF8", gradientCenterColor: "#3BE9DE" },
		{ value: 16, color: "#BDB2FA", gradientCenterColor: "#8F80F3" },
		{ value: 3, color: "#FFA5BA", gradientCenterColor: "#FF7F97" },
	];

	const renderDot = (color) => {
		return (
			<View
				style={{
					height: 10,
					width: 10,
					borderRadius: 5,
					backgroundColor: color,
					marginRight: 10,
				}}
			/>
		);
	};

	const renderLegendComponent = () => {
		return (
			<>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						marginBottom: 10,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							width: 120,
							marginRight: 20,
						}}
					>
						{renderDot("#006DFF")}
						<Text style={{ color: "white" }}>Excellent: 47%</Text>
					</View>
					<View
						style={{ flexDirection: "row", alignItems: "center", width: 120 }}
					>
						{renderDot("#8F80F3")}
						<Text style={{ color: "white" }}>Okay: 16%</Text>
					</View>
				</View>
				<View style={{ flexDirection: "row", justifyContent: "center" }}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							width: 120,
							marginRight: 20,
						}}
					>
						{renderDot("#3BE9DE")}
						<Text style={{ color: "white" }}>Good: 40%</Text>
					</View>
					<View
						style={{ flexDirection: "row", alignItems: "center", width: 120 }}
					>
						{renderDot("#FF7F97")}
						<Text style={{ color: "white" }}>Poor: 3%</Text>
					</View>
				</View>
			</>
		);
	};
	const centerLabelComponent = () => {
		return (
			<View style={{ justifyContent: "center", alignItems: "center" }}>
				<Text style={{ fontSize: 22, color: "white", fontWeight: "bold" }}>
					47%
				</Text>
				<Text style={{ fontSize: 14, color: "white" }}>Excellent</Text>
			</View>
		);
	};
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	const [lessons, setLessons] = useState([]);
	const [word, setWord] = useState([]);
	const [meaning, setMeaning] = useState([]);

	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();

	const goDialogue = (lessonId, themeIndex) => {
		navigation.navigate("Dialogue", {
			lessonId: lessonId,
			themeIndex: themeIndex,
		});
	};
	const goExercise = (lessonId, themeIndex) => {
		navigation.navigate("Exercise", {
			lessonId: lessonId,
			themeIndex: themeIndex,
		});
	};

	useEffect(() => {
		fetch(`http://${uri}:3000/lessons/showAllLessons/${user.token}`)
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					setLessons(data.data);
					console.warn(data.data[0]);
				} else {
					console.error("No data found.");
				}
			})
			.catch((error) => console.error("Erreur with lessons :", error))
			.finally(() => setLoading(false));
	}, [uri, user.token]);

	useEffect(() => {
		fetch(`http://${uri}:3000/word/random/`)
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					setWord(data.word);
					setMeaning(data.word.meaning.slice(0, 10));
					console.warn(data.word);
				} else {
					console.error("No new word found.");
				}
			})
			.catch((error) => console.error("Erreur with lessons :", error))
			.finally(() => setLoading(false));
	}, [uri, user.token]);

	useEffect(() => {
		fetch(`http://${uri}:3000/lessons/showAllLessons/${user.token}`)
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					setLessons(data.data);
					console.warn(data.data[0]);
				} else {
					console.error("No data found.");
				}
			})
			.catch((error) => console.error("Erreur with lessons :", error))
			.finally(() => setLoading(false));
	}, [uri, user.token]);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<Image
					source={{
						uri: "data:image/jpeg;base64,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", // Image d'avatar
					}}
					style={styles.avatar}
				/>
				<Text style={styles.font}>Welcome {user.username}</Text>
				<TouchableOpacity style={styles.settings}>
					<FontAwesome6 name="gear" size={24} color="#000" />
				</TouchableOpacity>
			</View>
			<View style={styles.BubbleContainer}>
				<View style={styles.BubbleTopContainer}>
					<View
						style={[styles.ThemeBubbleTop, { minHeight: 149, maxHeight: 150 }]}
					>
						<Text style={styles.BubbleHeaderOne}>Today Word </Text>
						<Text style={styles.text}>{word.word}</Text>
						<Text style={styles.text}>{word.furigana}</Text>
						<Text style={styles.text}>{word.romaji}</Text>
						<Text style={styles.text}>{meaning}</Text>
						<Text style={styles.italicText}>...More</Text>
					</View>

					<View
						style={[styles.ThemeBubbleTop, { minHeight: 149, maxHeight: 150 }]}
					>
						<Text style={styles.BubbleHeaderTwo}>Continue ?</Text>
						<View>
							<Text>blablabla</Text>
							<Text>blablabla</Text>
							<Text>blablabla</Text>
						</View>
					</View>
				</View>
				<View style={styles.BubbleBottomContainer}>
					<Text style={styles.title}>Dialogues</Text>
					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						style={styles.scrollView}
					>
						{lessons.map((lesson, lessonIndex) => (
							<View key={lessonIndex} style={styles.lessonContainer}>
								{lesson.themes.map((theme, themeIndex) => (
									<TouchableHighlight
										onPress={() => goDialogue(lesson._id, themeIndex)} //envoi du props dans la fonction pour l'enfant
										key={themeIndex}
										style={styles.ThemeBubbleUp}
										underlayColor="#CC4646"
									>
										<View>
											<Text style={styles.text}>Touch to start</Text>
											<Text style={styles.text}>
												your {theme.speaker_number}-person dialogue
											</Text>
											<Text style={styles.text}>at the {theme.theme}</Text>
											<SimpleLineIcons
												style={styles.Arrow}
												name="bubbles"
												size={24}
												color="black"
											/>
										</View>
									</TouchableHighlight>
								))}
							</View>
						))}
					</ScrollView>
					<Text style={styles.title}>Practice</Text>
					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						style={styles.scrollView}
					>
						{lessons.map((lesson, lessonIndex) => (
							<View key={lessonIndex} style={styles.lessonContainer}>
								{lesson.themes.map((theme, themeIndex) => (
									<View key={themeIndex} style={styles.themeBubbleDown}>
										<TouchableHighlight
											onPress={() => goExercise(lesson._id, themeIndex)}
											key={themeIndex}
											style={styles.ThemeBubbleUp}
											underlayColor="#CC4646"
										>
											<View>
												<Text style={styles.text}>Start the Word </Text>
												<Text style={styles.text}>Flash Card - </Text>
												<Text style={styles.text}>
													Theme:
													{theme.theme.replace(/\d$/, "")}
												</Text>

												<Text></Text>
												<SimpleLineIcons
													style={styles.Arrow2}
													name="note"
													size={24}
													color="black"
												/>
											</View>
										</TouchableHighlight>
									</View>
								))}
							</View>
						))}
					</ScrollView>
				</View>
			</View>
			<View
				style={{
					margin: 10,
					padding: 16,
					borderRadius: 20,
					backgroundColor: "#D15C5C",
				}}
			>
				<Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
					Overview
				</Text>
				<View style={{ padding: 20, alignItems: "center" }}>
					<BarChart
						data={data}
						width={250}
						barWidth={16}
						initialSpacing={10}
						spacing={14}
						barBorderRadius={4}
						showGradient
						yAxisThickness={0}
						xAxisType={"dashed"}
						xAxisLength={200}
						xAxisColor={"lightgray"}
						yAxisTextStyle={{ color: "lightgray" }}
						stepValue={20}
						maxValue={100}
						noOfSections={6}
						yAxisLabelTexts={["0"]}
						labelWidth={40}
						xAxisLabelTextStyle={{ color: "lightgray", textAlign: "center" }}
						showLine
						lineConfig={{
							color: "#F29C6E",
							thickness: 3,
							curved: true,
							hideDataPoints: true,
							shiftY: 20,
							initialSpacing: -30,
						}}
					/>
				</View>

				<View
					style={{
						paddingBottom: 100,
						flex: 1,
					}}
				>
					<View
						style={{
							margin: 20,
							padding: 16,
							borderRadius: 20,
							backgroundColor: "#D15C5C",
						}}
					>
						<Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
							Performance
						</Text>
						<View style={{ padding: 20, alignItems: "center" }}>
							<PieChart
								data={pieData}
								donut
								showGradient
								sectionAutoFocus
								radius={90}
								innerRadius={60}
								innerCircleColor={"#D15C5C"}
								centerLabelComponent={() => {
									return (
										<View
											style={{ justifyContent: "center", alignItems: "center" }}
										>
											<Text
												style={{
													fontSize: 22,
													color: "white",
													fontWeight: "bold",
												}}
											>
												47%
											</Text>
											<Text style={{ fontSize: 14, color: "white" }}>
												Excellent
											</Text>
										</View>
									);
								}}
							/>
						</View>
						{renderLegendComponent()}
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#EEC1C0",
	},
	diagonalLine: {
		position: "absolute",
		width: "118%",
		top: 82,
		right: 0,
		left: 4,
		bottom: 1,
		borderBottomWidth: 2,
		borderColor: "#090909",
		transform: [{ rotate: "146deg" }],
		zIndex: 1,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 30,
	},
	scrollView: {
		flex: 1,
		right: 13,
	},
	lessonContainer: {
		flexDirection: "row",
		marginHorizontal: 10,
	},
	BubbleContainer: {
		marginTop: 30,
	},
	BubbleBottomContainer: {
		marginRight: -25,
	},
	ThemeBubbleTop: {
		width: 172,
		height: 150,
		alignItems: "center",
		justifyContent: "center",
		margin: 10,
		marginTop: 30,
		backgroundColor: "#CC4646",
		borderRadius: 15,
		elevation: 10,
		borderWidth: 0.5,
		borderColor: "#090909",
		right: 4,
	},
	BubbleHeaderOne: {
		position: "relative",
		padding: 4,
		backgroundColor: "#EEC1C0",
		textAlign: "center",
		justifyContent: "center",
		fontSize: 20,
		color: "black",
		fontWeight: "bold",
		top: -14,
		width: "172",
		borderColor: "#090909",
		borderWidth: 1,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},
	BubbleHeaderTwo: {
		position: "relative",
		padding: 4,
		backgroundColor: "#EEC1C0",
		textAlign: "center",
		justifyContent: "center",
		fontSize: 20,
		color: "black",
		fontWeight: "bold",
		top: -33,
		width: "172",
		borderColor: "#090909",
		borderWidth: 1,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},
	Arrow: {
		position: "relative",
		bottom: -5,

		left: 65,
	},
	Arrow2: {
		position: "relative",
		bottom: 5,
		right: -60,
	},
	ThemeBubbleUp: {
		width: 180,
		height: 120,
		alignItems: "center",
		justifyContent: "center",
		margin: 10,
		marginVertical: 30,
		backgroundColor: "#D56565",
		borderRadius: 15,
		elevation: 10,
		borderWidth: 0.5,
		borderColor: "#090909",
	},
	themeBubbleDown: {
		width: 180,
		height: 120,
		alignItems: "center",
		justifyContent: "center",
		margin: 10,
		marginVertical: 30,
		backgroundColor: "#D56565",
		borderRadius: 20,
		elevation: 10,
		borderWidth: 0.5,
		borderColor: "#090909",
	},
	BubbleTopContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
	},
	text: {
		fontSize: 15,
		fontFamily: "noto sans jp",
		fontWeight: 400,
		color: "#090909",
		textAlign: "center",
		textShadowColor: "#CC4646",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
	},
	title: {
		fontSize: 15,
		fontFamily: "noto sans jp",
		color: "#090909",
		textAlign: "center",
		textShadowColor: "#CC4646",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
		right: 8,
	},
	italicText: {
		fontStyle: "italic",
		color: "blue",
	},
	button: {
		backgroundColor: "#EEC1C0",
		width: "90%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
		marginBlock: 10,
	},
	buttonText: {
		fontSize: 20,
		color: "#070000",
		textAlign: "center",
		fontFamily: "Noto Sans JP",
	},
	horizontalSeparator: {
		height: 1,
		width: "100%",
		backgroundColor: "#070000",
		marginVertical: 10,
	},
});
