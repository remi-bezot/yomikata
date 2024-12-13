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

const uri = BackendAdress;

export default function Lessons() {
  const [lessonData, setLessonData] = useState([]);
  const [allLessons, setallLessons] = useState([]);
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [wordApi, setWordApi] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  let token = "_w2_R3IVDGZIlgPxysRf7B4U8wBfkp7f";
  const uri = BackendAdress.uri;

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
          setLessonData([
            { speaker: "A", japanese: "example text example word" },
          ]);
          setCurrentLessonId(id);
        }
      });
  };

  const handleLongPressWord = (word) => {
    setSelectedWord(word);
    setModalVisible(true);
    let isPresent = wordApi.includes(word);
    if (!isPresent) {
      wordApi.push(word);
    }
  };
  console.log(wordApi);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.content}>
          {currentLessonId === null ? (
            <FlatList
              data={allLessons}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => (
                <View style={styles.lessonContainer}>
                  <Text style={styles.lessonTitle}>
                    {capitalizeFirstLetter(item.dialogue.theme)}
                  </Text>
                  <Text>Number: {item.dialogue.number}</Text>
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
                          <Text>Japanese :</Text>
                          <View style={styles.wordsContainer}>
                            {item.japanese.split(" ").map((word, idx) => (
                              <TouchableOpacity
                                key={idx}
                                onLongPress={() => handleLongPressWord(word)}
                              >
                                <Text style={styles.word}>{word} </Text>
                              </TouchableOpacity>
                            ))}
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
        </View>

        {currentLessonId && (
          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        )}

        {/* Modale */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Selected Word: {selectedWord}
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
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: customStyles.defaultFontFamily,
    marginBottom: 10,
    textAlign: "center",
  },
  lessonHeader: {
    marginTop: 20,
  },
  dialogueHeader: {
    marginTop: 20,
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
  nextButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  wordsContainer: {
    flexDirection: "row",
  },
  word: {
    fontSize: 16,
    marginHorizontal: 5,
  },
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
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
