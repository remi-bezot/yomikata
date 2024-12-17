import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  FlatList,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { BackendAdress } from "../utils/BackendAdress";

export default function Practice(props) {
  const [exercises, setExercises] = useState([]);
  const user = useSelector((state) => state.user.value);
  const token = user.token;
  const uri = BackendAdress.uri;

  useEffect(() => {
    // Fetch les données d'exercices via le lessonId et le lessonIndex
    fetch(`http://${uri}:3000/practicies/showPractice/${props.lessonId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data.themes) {
          const selectedTheme = data.data.themes[props.lessonIndex];
          if (selectedTheme && selectedTheme.exo) {
            setExercises(selectedTheme.exo);
          } else {
            console.log("No exercises found for the selected theme.");
          }
        } else {
          console.log("Invalid data format or no themes available.");
        }
      })
      .catch((error) => console.log("Error fetching exercises:", error));
  }, [props.lessonId, props.lessonIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.content}>
          {/* Liste des exercices */}
          <FlatList
            data={exercises}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.exerciseContainer}>
                <Text style={styles.exerciseQuestion}>
                  {index + 1}. What does "{item.word_jp}" mean?
                </Text>
                <View style={styles.optionsContainer}>
                  <Text style={styles.option}>A: {item.good_answer}</Text>
                  <Text style={styles.option}>B: {item.wrong_answer_a}</Text>
                  <Text style={styles.option}>C: {item.wrong_answer_b}</Text>
                  <Text style={styles.option}>D: {item.wrong_answer_c}</Text>
                </View>
              </View>
            )}
            ListHeaderComponent={
              <Text style={[styles.title, styles.exerciseHeader]}>
                Exercises for Selected Theme
              </Text>
            }
          />
        </View>
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
  content: { flex: 1 },
  title: { fontSize: 20, fontWeight: "700", textAlign: "center" },
  exerciseHeader: { marginTop: 20, color: "green", textAlign: "center" },
  exerciseContainer: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
  },
  exerciseQuestion: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  optionsContainer: {
    marginLeft: 10,
  },
  option: {
    fontSize: 14,
    marginBottom: 2,
  },
});
