import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Speech from "expo-speech";
import { BackendAdress } from "../utils/BackendAdress";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function Practice(props) {
  const [exercises, setExercises] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answeredCount, setAnsweredCount] = useState(0); // Compteur des réponses
  const uri = BackendAdress.uri;
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.value);

  const speak = (text) => {
    Speech.speak(text, { language: "ja", pitch: 1, rate: 0.5 });
  };

  useEffect(() => {
    fetch(`http://${uri}:3000/practicies/showPractice/${props.lessonId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data.themes) {
          const selectedTheme = data.data.themes[props.lessonIndex];
          if (selectedTheme && selectedTheme.exo) {
            setExercises(selectedTheme.exo);
          }
        }
      })
      .catch((error) => console.log("Error fetching exercises:", error));
  }, [props.lessonId, props.lessonIndex]);

  const shuffleOptions = (exercise) => {
    const options = [
      { text: exercise.good_answer, isCorrect: true },
      { text: exercise.wrong_answer_a, isCorrect: false },
      { text: exercise.wrong_answer_b, isCorrect: false },
      { text: exercise.wrong_answer_c, isCorrect: false },
    ];
    return options.sort(() => Math.random() - 0.5);
  };

  const handleCompletion = async () => {
    try {
      await fetch(`http://${uri}:3000/users/updatePractice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: user.token, practiceId: props.lessonId }),
      });

      const delay = exercises.length * 3000;
      setTimeout(() => {
        navigation.navigate("TabNavigator", { screen: "dashboard" });
      }, delay);
    } catch (error) {
      console.error("Error updating practice:", error);
    }
  };

  const handleOptionSelect = (exerciseIndex, isCorrect) => {
    if (selectedAnswers[exerciseIndex] === undefined) {
      setSelectedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [exerciseIndex]: isCorrect,
      }));

      setAnsweredCount((prevCount) => prevCount + 1);
    }
  };

  // Ici, le useEffect surveille answeredCount
  useEffect(() => {
    if (answeredCount === exercises.length && exercises.length > 0) {
      handleCompletion();
    }
  }, [answeredCount, exercises.length]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={exercises}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseQuestion}>
              {index + 1}. What does "{item.word_jp}" mean?
              <TouchableOpacity
                style={styles.speakerbutton}
                onPress={() => speak(item.word_jp)}
              >
                <Text style={styles.speaker}>🔊</Text>
              </TouchableOpacity>
            </Text>
            <View style={styles.optionsContainer}>
              {shuffleOptions(item).map((option, optIndex) => (
                <TouchableOpacity
                  key={optIndex}
                  onPress={() => handleOptionSelect(index, option.isCorrect)}
                  style={[
                    styles.optionContainer,
                    selectedAnswers[index] !== undefined &&
                      option.isCorrect &&
                      styles.correctAnswer,
                    selectedAnswers[index] !== undefined &&
                      !option.isCorrect &&
                      styles.wrongAnswer,
                  ]}
                >
                  <Text style={styles.option}>
                    {String.fromCharCode(65 + optIndex)}: {option.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />
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
  optionContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  correctAnswer: {
    backgroundColor: "#d4edda",
    borderColor: "#155724",
  },
  wrongAnswer: {
    backgroundColor: "#f8d7da",
    borderColor: "#721c24",
  },
  option: {
    fontSize: 14,
  },
});
