import { BarChart } from "react-native-gifted-charts";

import { View, Text } from "react-native";
import React from "react";

export default function TestScreen() {
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

	return (
		<View
			style={{
				margin: 10,
				padding: 16,
				borderRadius: 20,
				backgroundColor: "#232B5D",
				top: 90,
			}}
		>
			<Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
				Overview
			</Text>
			<View style={{ padding: 20, alignItems: "center" }}>
				<BarChart
					data={data}
					barWidth={16}
					initialSpacing={10}
					spacing={14}
					barBorderRadius={4}
					showGradient
					yAxisThickness={0}
					xAxisType={"dashed"}
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
		</View>
	);
}
