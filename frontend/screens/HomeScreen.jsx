import React, { useRef, useEffect } from "react";
import {
    Animated,
    View,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
} from "react-native";
import { useFonts } from "expo-font";

export default function HomeScreen({ navigation }) {
    // Fonts loading
    const [fontsLoaded] = useFonts({
        Satoshi: require("../assets/fonts/Satoshi-BlackKotf.otf"),
        NotoSansJP: require("../assets/fonts/NotoSansJP-Thin.ttf"),
    });

    // Navigation function
    const handleSubmit = () => {
        navigation.navigate("Auth");
    };

    // Animation values for each text
    const fadeAnim1 = useRef(new Animated.Value(0)).current;
    const fadeAnim2 = useRef(new Animated.Value(0)).current;
    const fadeAnim3 = useRef(new Animated.Value(0)).current;
    const fadeAnim4 = useRef(new Animated.Value(0)).current;
    const fadeAnim5 = useRef(new Animated.Value(0)).current;

    // Trigger fade effect with delays
    useEffect(() => {
        Animated.stagger(1200, [
            Animated.timing(fadeAnim1, {
                toValue: 1,
                duration: 2000, // Durée réduite pour un fade plus rapide
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim2, {
                toValue: 1,
                duration: 3500, // Durée réduite pour un fade plus rapide
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim3, {
                toValue: 1,
                duration: 5500, // Durée réduite pour un fade plus rapide
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim4, {
                toValue: 1,
                duration: 6700, // Durée réduite pour un fade plus rapide
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim5, {
                toValue: 1,
                duration: 8300, // Durée réduite pour un fade plus rapide
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    // Loading state if fonts are not loaded
    if (!fontsLoaded) {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20 }}>Loading...</Text>
            </View>
        );
    }

    // Render the UI with animated fade
    return (
        <View style={styles.container}>
            <View styles={styles.box}>
                <Animated.Text style={[styles.text, { opacity: fadeAnim1 }]}>
                    So you want to learn Japanese?
                </Animated.Text>
                <Animated.Text style={[styles.text, { opacity: fadeAnim2 }]}>
                    And you want to personalize your learning?
                </Animated.Text>
                <Animated.Text style={[styles.text, { opacity: fadeAnim3 }]}>
                    Are you ready to be surrounded by Kanji all day?
                </Animated.Text>
                <Animated.Text style={[styles.text, { opacity: fadeAnim4 }]}>
                    Then...
                </Animated.Text>
            </View>
            <Animated.View style={[styles.box, { opacity: fadeAnim5 }]}>
                <Text style={styles.title} onPress={handleSubmit}>
                    Welcome to YOMIKATA
                </Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black", // Noir pur
        opacity: 1, // Assure que l'opacité est à 1
    },

    box: {
        backgroundColor: "black", // Noir pur
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        opacity: 1, // Assure que l'opacité est à 1
    },

    title: {
        fontSize: 36,
        fontWeight: "600",
        fontFamily: "Satoshi",
        color: "red",
    },
    text: {
        fontSize: 24,
        fontWeight: "600",
        fontFamily: "NotoSansJP",
        textAlign: "center",
        marginBottom: 15,
        color: "#fff",
    },
});

