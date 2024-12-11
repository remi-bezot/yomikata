import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { customStyles } from "../utils/CustomStyle";
import { useDispatch, useSelector } from "react-redux";
import { Const } from "../utils/Const";
import Icon from "react-native-vector-icons/FontAwesome";

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

  useEffect(() => {
    fetch(`http://${uri}:3000/lessons/showAllLessons/${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setallLessons(data.data);
        }
      })
      .catch((error) => console.error("Erreur with lessons :", error));
  }, []);

  const handleGoLesson = (id) => {
    fetch(`http://${uri}:3000/lessons/showLesson/${id}/${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setLessonData(data.data.dialogue);
          setCurrentLessonId(id);
        }
      });
  };

  // Fonction pour mettre la première lettre en majuscule
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        {currentLessonId === null ? (
          <FlatList
            data={allLessons}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <View style={styles.lessonContainer}>
                <Text style={styles.lessonTitle}>
                  {capitalizeFirstLetter(item.theme)}
                </Text>
                <Text>Number: {item.number}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleGoLesson(item._id)}
                >
                  <Text>Go to</Text>
                </TouchableOpacity>
              </View>
            )}
            ListHeaderComponent={
              <Text style={[styles.title, styles.lessonHeader]}>Lessons</Text>
            }
          />
        ) : (
          <FlatList
            data={lessonData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => {
              const alignment = index % 2 === 0 ? "row" : "row-reverse";
              const iconColor = index % 2 === 0 ? "#4CAF50" : "#2196F3";

              return (
                <View key={index} style={[styles.dialogue]}>
                  <View
                    style={[styles.dialogue1, { flexDirection: alignment }]}
                  >
                    <Icon
                      name="user"
                      size={24}
                      color={iconColor}
                      style={styles.icon}
                    />
                    <View style={styles.dialogueChild}>
                      <View>
                        <Text>Speaker : {item.speaker}</Text>
                      </View>
                      <View>
                        <View>
                          <Text>Japanese :</Text>
                        </View>
                        <View>
                          <Text>{item.japanese}</Text>
                        </View>
                      </View>
                      <View>
                        <View>
                          <Text>English :</Text>
                        </View>
                        <View>
                          <Text>{item.english}</Text>
                        </View>
                      </View>
                      <View>
                        <View>
                          <Text>Romanji :</Text>
                        </View>
                        <View>
                          <Text>{item.romanji}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
            ListHeaderComponent={
              <Text style={[styles.title, styles.dialogueHeader]}>
                Dialogues
              </Text>
            }
          />
        )}
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
  title: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: customStyles.defaultFontFamily,
    marginBottom: 10,
    textAlign: "center",
  },
  lessonHeader: {
    marginTop: 20, // Ajoute un espacement supérieur pour Lessons
  },
  dialogueHeader: {
    marginTop: 20, // Ajoute un espacement supérieur pour Dialogues
  },
  lessonContainer: {
    borderWidth: 2,
    borderColor: "black",
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  button: {
    backgroundColor: customStyles.buttonBackgroundColor,
    borderRadius: customStyles.buttonRadius,
    width: customStyles.buttonWidth,
    height: customStyles.buttonHeight,
    display: customStyles.buttonDisplay,
    flexDirection: customStyles.buttonFlexDirection,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  dialogue: {
    flex: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  dialogueChild: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexShrink: 1,
  },
  dialogue1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  icon: {
    flexShrink: 0,
    marginHorizontal: 10,
  },
});
