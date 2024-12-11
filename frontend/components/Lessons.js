import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { customStyles } from "../utils/CustomStyle";
import { useDispatch, useSelector } from "react-redux";
import { Const } from "../utils/Const";

const uri = Const.uri;

export default function Lessons() {
  const [lessonData, setLessonData] = useState([]);
  const [allLessons, setallLessons] = useState([]);
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  let token = "lciXA-SA2SLUsydGqZ6VZFmN4rxGcQvo";

  //   useEffect(() => {
  //     const handleResize = () => {
  //       setScreenWidth(Dimensions.get("window").width);
  //     };

  //     const subscription = Dimensions.addEventListener("change", handleResize);

  //     return () => subscription?.remove();
  //   }, []);

  useEffect(() => {
    fetch(`http://${uri}:3000/lessons/showAllLessons/${token}`, {})
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.data) {
          setallLessons(data.data);
        }
      })
      .catch((error) => {
        console.error("Erreur with lessons :", error);
      });
  }, []);

  const handleGoLesson = (id) => {
    fetch(`http://${uri}:3000/lessons/showLessons/${id}/${token}`, {})
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data);

          setLessonData(data.dialogues);
          setCurrentLessonId(id);
        }
      });
  };

  const lessons =
    allLessons &&
    allLessons.map((lesson, i) => (
      <View key={i}>
        <Text>{lesson.theme}</Text>
        <Text>Number: {lesson.number}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleGoLesson(lesson._id)}
        >
          <Text>Go to</Text>
        </TouchableOpacity>
      </View>
    ));
  const dialogues =
    lessonData &&
    lessonData.map((dialogue, i) => {
      const alignment = i % 2 === 0 ? "flex-start" : "flex-end";
      return (
        <View key={i} style={[styles.dialogue, { alignSelf: alignment }]}>
          <View style={styles.dialogueChild}>
            <Text>Speaker {dialogue.speaker}</Text>
            <Text>Japanese: {dialogue.japanese}</Text>
            <Text>English: {dialogue.english}</Text>
            <Text>Romanji: {dialogue.romanji}</Text>
          </View>
        </View>
      );
    });

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      width: screenWidth,
    },
  });

  return (
    <KeyboardAvoidingView style={dynamicStyles.container}>
      {currentLessonId === null ? (
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
  dialogue: {
    width: 350,
  },
  dialogueChild: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});
