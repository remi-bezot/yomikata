import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { customStyles } from "../utils/CustomStyle";
import { useDispatch, useSelector } from "react-redux";
import { Const } from "../utils/Const";
const uri = Const.uri;

export default function Lessons() {
  const [lessonData, setLessonData] = useState({});
  const [allLessons, setallLessons] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch(`http://${uri}:3000/lessons/showAllLessons`, {})
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (data && data.message) {
            setallLessons(data.message);
          }
        }
      });
  }, []);

  const handleGoLesson = (id) => {
    let token = "jkfhd154fd6";
    fetch(`http://${uri}:3000/lessons/showLessons/${id}/${token}`, {})
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data.dialogues);

          setLessonData(data);
        }
      });
  };

  const lessons = allLessons.map((lesson, i) => (
    <View key={i}>
      <Text>{lesson.theme}</Text>
      <Text>Number: {lesson.number}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleGoLesson(lesson.id)}
      >
        <Text>Go to</Text>
      </TouchableOpacity>
    </View>
  ));

  const dialogues = lessonData.dialogues
    ? lessonData.dialogues.map((dialogue, i) => (
        <View key={i}>
          <Text>Speaker {dialogue.speaker}</Text>
          <Text>Japanese: {dialogue.japanese}</Text>
          <Text>English: {dialogue.english}</Text>
          <Text>Romanji: {dialogue.romanji}</Text>
        </View>
      ))
    : null;

  return (
    <KeyboardAvoidingView style={styles.container}>
      {allLessons.length !== 0 ? (
        <View>
          <Text style={styles.title}>Lessons</Text>
          {lessons}
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Dialogues</Text>
          {dialogues}
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  inputStyles: {
    height: 40,
    width: customStyles.buttonWidth,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputTitle: {
    fontFamily: "noto sans jp",
    fontSize: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: customStyles.defaultFontFamily,
  },
  text: {
    fontFamily: customStyles.defaultFontFamily,
  },
  button: {
    backgroundColor: customStyles.buttonBackgroundColor,
    borderRadius: customStyles.buttonRadius,
    width: customStyles.buttonWidth,
    height: customStyles.buttonHeight,
    display: customStyles.buttonDisplay,
    flexDirection: customStyles.buttonFlexDirection,
    alignItems: customStyles.buttonAlignItems,
    justifyContent: customStyles.buttonJustifyContent,
  },
});
