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
  Modal,
  Button,
} from "react-native";
import { customStyles } from "../utils/CustomStyle";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { capitalizeFirstLetter } from "../utils/TextUtils";
import { BackendAdress } from "../utils/BackendAdress";

export default function Lessons(props) {
  const [lessonData, setLessonData] = useState([]);
  const [allThemes, setAllThemes] = useState([]);
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [wordApi, setWordApi] = useState([]);
  const [speakerColors, setSpeakerColors] = useState({});
  const [exercises, setExercises] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  let token = "inaVhmzsm2S_Aq0Aik2ZcJjFX7M_2Uw9";
  const uri = BackendAdress.uri;
  useEffect(() => {
    fetch(`http://${uri}:3000/lessons/showLesson/${token}/${props.lessonId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          const dialogues = [];
          const exercisesList = [];
          for (let theme of data.data.themes) {
            dialogues.push(...theme.lines);
            exercisesList.push(...theme.exo);
          }
          setLessonData(dialogues);
          setExercises(exercisesList);
          setCurrentLessonId(props.lessonId);
        }
      })
      .catch((error) => console.error("Error fetching lesson:", error));
  }, [props.lessonId, currentLessonId]);

  const handleLongPressWord = (word) => {
    setSelectedWord(word);
    setModalVisible(true);
    if (!wordApi.includes(word)) {
      fetch(`http://${uri}:3000/dico/${word}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            console.log("Dictionary:", data);
          }
        })
        .catch((error) => console.error("Error fetching dictionary:", error));
      setWordApi([...wordApi, word]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.content}>
          {currentLessonId === null ? (
            <FlatList
              data={allThemes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.lessonContainer}>
                  <Text style={styles.lessonTitle}>
                    Theme: {capitalizeFirstLetter(item.theme || "No theme")}
                  </Text>
                  <Text>Level: {item.level}</Text>
                  <Text>Speaker count: {item.speaker_number || 0}</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleGoLesson(item.lessonId)}
                  >
                    <Text style={styles.buttonText}>View Lesson</Text>
                  </TouchableOpacity>
                </View>
              )}
              ListHeaderComponent={
                <Text style={[styles.title, styles.lessonHeader]}>
                  Available Lessons
                </Text>
              }
            />
          ) : (
            <FlatList
              data={lessonData}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => {
                const alignment = index % 2 === 0 ? "row" : "row-reverse";
                const iconColor = speakerColors[item.speaker];

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
                        <Text>Speaker: {item.speaker}</Text>
                        <Text>Japanese text:</Text>
                        <View style={styles.wordsContainer}>
                          {item.japanese
                            .split(
                              /([\p{Script=Han}]+|[\u3041-\u309F]+|[\u30A1-\u30FF]+)/gu
                            )
                            .map((segment, idx) => {
                              const isJapaneseWord =
                                /[\p{Script=Han}]+|[\u3041-\u309F]+|[\u30A1-\u30FF]+/u.test(
                                  segment
                                );

                              return isJapaneseWord ? (
                                <TouchableOpacity
                                  key={idx}
                                  onLongPress={() =>
                                    handleLongPressWord(segment)
                                  }
                                >
                                  <Text style={styles.word}>{segment}</Text>
                                </TouchableOpacity>
                              ) : (
                                <Text key={idx} style={styles.nonClickableText}>
                                  {segment}
                                </Text>
                              );
                            })}
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
        </View>

        {currentLessonId && (
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => console.log("Redirect to Exercises:", exercises)}
            >
              <Text style={styles.buttonText}>Go to Exercises</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setCurrentLessonId(null)}
            >
              <Text style={styles.buttonText}>Back to Lessons</Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Selected word: {selectedWord}
              </Text>
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
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
  lessonHeader: { marginTop: 20 },
  dialogueHeader: { marginTop: 20 },
  lessonContainer: {
    borderWidth: 2,
    borderColor: "black",
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  lessonTitle: { fontSize: 18, fontWeight: "600", marginBottom: 5 },
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
  buttonText: {
    color: customStyles.buttonTextColor,
    fontSize: customStyles.buttonTextFontSize,
    fontWeight: customStyles.buttonTextFontWeight,
  },
  dialogue: { marginBottom: 10, paddingHorizontal: 10 },
  dialogueChild: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  dialogue1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: { marginHorizontal: 10 },
  wordsContainer: { flexDirection: "row", flexWrap: "wrap" },
  word: { fontSize: 16, marginHorizontal: 5 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: { fontSize: 18, marginBottom: 10 },
});
