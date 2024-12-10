import React, { useState } from "react";
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

export default function Lessons() {
  const [lessonId, setLessonId] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleGoLesson = (id) => {
    let token = "jkfhd154fd6";
    // user.token
    setLessonId(id);
    fetch(`http://10.172.88.9:3000/lessons/showLessons/${id}/${token}`, {})
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data);

          setLessonId(id);
        }
      });
  };

  let dataReturn = [
    {
      theme: "train",
      number: 1,
      id: 1,
    },
    {
      theme: "travel",
      number: 1,
      id: 2,
    },
    {
      theme: "train",
      number: 2,
      id: 3,
    },
    {
      theme: "restaurant",
      number: 1,
      id: 4,
    },
  ];

  const lessons = dataReturn.map((data, i) => {
    return (
      <View key={i}>
        <Text>{data.theme}</Text>
        <Text>{data.number}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleGoLesson(data.id)}
        >
          <Text>Go to</Text>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Lessons</Text>
      {lessonId === 0 ? lessons : <Text>id</Text>}
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
