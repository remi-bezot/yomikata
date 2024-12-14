import "./polyfills";
import { Image, Text, SafeAreaView, View } from "react-native";
import { AnimatedScrollview } from "animated-scrollview";
import { animatedScrollviewConfig } from "./animatedScrollviewConfig";
import { styles } from "./styles";

export default function firstPage() {
	return (
		<SafeAreaView style={styles.container}>
			<AnimatedScrollview config={animatedScrollviewConfig}>
				<View key="headerContainer" style={styles.headerContainer}>
					<Text style={styles.h1}>&#60;AnimatedScrollview /&#62;</Text>
					<Text style={styles.h2}>DEMO 🧙‍♀️</Text>
					<Text style={styles.h3}>⬇ scroll down to see the magic ⬇</Text>
				</View>
				<View key="demoStatic1" style={[styles.row, styles.demoBasic1]}>
					<View style={styles.inner}>
						<Text style={styles.rowText}>
							You might not see the first few elements moving...
						</Text>
					</View>
				</View>
				<View key="demoStatic2" style={[styles.row, styles.demoBasic2]}>
					<View style={styles.inner}>
						<Text style={styles.rowText}>
							...because they are already on the screen...
						</Text>
					</View>
				</View>
				<View key="demoStatic3" style={[styles.row, styles.demoBasic3]}>
					<View style={styles.inner}>
						<Text style={styles.rowText}>
							...but once you start scrolling down...
						</Text>
					</View>
				</View>
				<View key="demoSlide1" style={[styles.row, styles.demoSlide1]}>
					<View style={styles.inner}>
						<Image
							style={styles.image}
							source={{
								uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
							}}
						/>
					</View>
				</View>
				<View key="demoSlide2" style={[styles.row, styles.demoSlide2]}>
					<View style={styles.inner}>
						<Image
							style={styles.image}
							source={{
								uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
							}}
						/>
					</View>
				</View>
				<View key="demoRotateAndScale" style={styles.row}>
					<View style={styles.inner}>
						<Image
							style={styles.image}
							source={{
								uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
							}}
						/>
					</View>
				</View>
				<View key="titleNested" style={[styles.row, styles.demoBasic1]}>
					<View style={styles.inner}>
						<Text style={styles.rowText}>
							Elements on a row can also have different animations:
						</Text>
					</View>
				</View>
				<View
					key="parentWithNestedKids"
					style={[styles.row, styles.parentWithNestedKids]}
				>
					<View key="nestedKid1" style={styles.nestedKid1}>
						<Image
							style={styles.image}
							source={{
								uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
							}}
						/>
					</View>
					<View key="nestedKid2" style={styles.nestedKid2}>
						<Image
							style={styles.image}
							source={{
								uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/135.png",
							}}
						/>
					</View>
				</View>
				<View key="titleFixated" style={[styles.row, styles.demoBasic1]}>
					<View style={styles.inner}>
						<Text style={styles.rowText}>
							Elements can even stay on screen once they appeared:
						</Text>
					</View>
				</View>
				<View key="demoFixated" style={styles.row}>
					<View style={styles.inner}>
						<Image
							style={styles.image}
							source={{
								uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/79.png",
							}}
						/>
					</View>
				</View>
				<View key="titleFixated" style={[styles.row, styles.demoBasic1]}>
					<View style={styles.inner}>
						<Text style={styles.rowText}>
							Just scroll up again, the image above will stay on screen!
						</Text>
					</View>
				</View>
				<View key="installBanner" style={[styles.row, styles.install]}>
					<View style={styles.inner}>
						<Text style={styles.rowText}>Install via</Text>
						<Text style={styles.rowTextCode}>
							expo install animated-scrollview
						</Text>
						<Text style={styles.rowText}>or</Text>
						<Text style={styles.rowTextCode}>
							npm i animated-scrollview --save
						</Text>
						<Text style={styles.rowText}>or</Text>
						<Text style={styles.rowTextCode}>yarn add animated-scrollview</Text>
					</View>
				</View>
			</AnimatedScrollview>
		</SafeAreaView>
	);
}
