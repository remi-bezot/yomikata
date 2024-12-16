import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { BarChart, PieChart } from "react-native-gifted-charts";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import { BackendAdress } from "../utils/BackendAdress";
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

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.font}>Welcome User</Text>
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
						<MaterialCommunityIcons
							style={styles.Arrow}
							name="arrow-bottom-right-thin-circle-outline"
							size={24}
							color="black"
						/>
					</View>

					<View
						style={[styles.ThemeBubbleTop, { minHeight: 149, maxHeight: 150 }]}
					>
						<Text style={styles.BubbleHeaderTwo}>Continue ?</Text>
						<View>
							<Text>blablabla</Text>
							<Text>blablabla</Text>
							<Text>blablabla</Text>

							<MaterialCommunityIcons
								style={styles.Arrow}
								name="arrow-bottom-right-thin-circle-outline"
								size={24}
								color="black"
							/>
						</View>
					</View>
				</View>
				<View style={styles.BubbleBottomContainer}>
					<Text style={styles.text}>Dialogues</Text>
					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						style={styles.scrollView}
					>
						{lessons.map((lesson, lessonIndex) => (
							<View key={lessonIndex} style={styles.lessonContainer}>
								{lesson.themes.map((theme, themeIndex) => (
									<View key={themeIndex} style={styles.ThemeBubbleUp}>
										<Text style={styles.text}>
											Speaker Number: {theme.speaker_number}
										</Text>
										<Text style={styles.text}>Theme: {theme.theme}</Text>
									</View>
								))}
							</View>
						))}
					</ScrollView>
					<Text style={styles.text}>Practice</Text>
					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						style={styles.scrollView}
					>
						{lessons.map((lesson, lessonIndex) => (
							<View key={lessonIndex} style={styles.lessonContainer}>
								{lesson.themes.map((theme, themeIndex) => (
									<View key={themeIndex} style={styles.themeBubbleDown}>
										<Text style={styles.text}>Theme: {theme.theme}</Text>
										<Text style={styles.text}>
											Exercises: {theme.exo.length}
										</Text>
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
		backgroundColor: "#EEC1C0", // Couleur issue de la navBarBackgroundColor
	},
	diagonalLine: {
		position: "absolute",
		width: "118%",
		top: 82,
		right: 0,
		left: 4,
		bottom: 1,
		borderBottomWidth: 2, // Largeur de la ligne
		borderColor: "#090909", // Couleur de la ligne noire
		transform: [{ rotate: "146deg" }], // Rotation de 45° pour la ligne diagonale
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
		backgroundColor: "#CC4646", // headingColor pour harmoniser avec les titres
		borderRadius: 15,
		elevation: 10,
		borderWidth: 0.5, // headingBorderSize
		borderColor: "#090909", // headingBorderColor
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
		borderTopLeftRadius: 15, // Arrondir le coin supérieur gauche
		borderTopRightRadius: 15, // Arrondir le coin supérieur droit
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
		borderTopLeftRadius: 15, // Arrondir le coin supérieur gauche
		borderTopRightRadius: 15, // Arrondir le coin supérieur droit
	},
	Arrow: {
		position: "relative",
		bottom: 5,
		left: 65,
	},

	ThemeBubbleUp: {
		width: 180,
		height: 120,
		alignItems: "center",
		justifyContent: "center",
		margin: 10,
		marginVertical: 30,
		backgroundColor: "#D56565", // headingColor pour harmoniser avec les titres
		borderRadius: 15,
		elevation: 10,
		borderWidth: 0.5, // headingBorderSize
		borderColor: "#090909", // headingBorderColor
	},
	themeBubbleDown: {
		width: 180,
		height: 120,
		alignItems: "center",
		justifyContent: "center",
		margin: 10,
		marginVertical: 30,
		backgroundColor: "#D56565", // navBarIconSelectedColor
		borderRadius: 20,
		elevation: 10,
		borderWidth: 0.5, // headingBorderSize
		borderColor: "#090909", // headingBorderColor
	},
	BubbleTopContainer: {
		flexDirection: "row", // Positionne les éléments côte à côte
		justifyContent: "space-between", // Ajuste l'espace entre les éléments (modifiable selon le besoin)
		alignItems: "center", // Centre les éléments verticalement
		padding: 10,
	},
	text: {
		fontSize: 15,
		fontFamily: "Comic sans MS", // headingFont
		color: "#090909", // headingBorderColor
		textAlign: "center",
		textShadowColor: "#CC4646", // headingColor comme effet de texte
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
	},
	italicText: {
		fontStyle: "italic", // Mettre en italique
		color: "blue", // Optionnel : changer la couleur
	},
	button: {
		backgroundColor: "#EEC1C0", // buttonBackgroundColor
		width: "90%", // buttonWidth
		height: 50, // buttonHeight
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12, // buttonRadius
		marginBlock: 10,
	},
	buttonText: {
		fontSize: 20, // buttonTextSize
		color: "#070000", // navBarBorderColor pour le contraste
		textAlign: "center",
		fontFamily: "Noto Sans JP", // defaultFontFamily
	},
	horizontalSeparator: {
		height: 1,
		width: "100%",
		backgroundColor: "#070000", // navBarBorderColor pour un contraste subtil
		marginVertical: 10,
	},
});
