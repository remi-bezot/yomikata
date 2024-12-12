import { AnimatedScrollview } from "animated-scrollview";

export default function FavoriteScreen() {
	return (
		<AnimatedScrollview
			config={{
				firstChild: {
					fixate: false,
					relativeOffsetFromBottom: 0,
					springConfig: { mass: 2 },
					animation: {
						opacity: { start: 0, end: 1 },
						translateX: { start: 100, end: 0, unit: "%" },
						rotate: { start: 180, end: 0 },
						order: ["translateX", "rotate"],
					},
				},
			}}
		>
			<View key="firstChild">
				<Text>My first Child</Text>
			</View>
			<View key="secondChild">
				<Text>My second Child</Text>
			</View>
			<View key="thirdChild">
				<Text>My third Child</Text>
			</View>
		</AnimatedScrollview>
	);
}
