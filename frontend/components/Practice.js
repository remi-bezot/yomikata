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
import Icon from "react-native-vector-icons/FontAwesome";
import { BackendAdress } from "../utils/BackendAdress";

export default function Practice(props) {
  const [lessonData, setLessonData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [speakerColors, setSpeakerColors] = useState({});
  const [exercises, setExercises] = useState([]);

  const token = "inaVhmzsm2S_Aq0Aik2ZcJjFX7M_2Uw9";
  const uri = BackendAdress.uri;

  useEffect(() => {
    // Fetch the lesson data using the lessonId and lessonIndex
    fetch(`http://${uri}:3000/practicies/showPractice/${props.lessonId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data.themes) {
          const selectedTheme = data.data.themes[props.lessonIndex];
          if (selectedTheme) {
            console.log("Selected theme:", selectedTheme);

            // Update the state with the lines and exercises
            setLessonData(selectedTheme.lines || []);
            setExercises(selectedTheme.exo || []);
          } else {
            console.warn("No theme found at the specified index.");
          }
        } else {
          console.error("Invalid data format or no themes available.");
        }
      })
      .catch((error) => console.error("Error fetching lesson:", error));
  }, [props.lessonId, props.lessonIndex]);

  const handleLongPressWord = (word) => {
    setSelectedWord(word);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.content}>
          <FlatList
            data={lessonData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => {
              const alignment = index % 2 === 0 ? "row" : "row-reverse";
              return (
                <View key={index} style={[styles.dialogue]}>
                  <View
                    style={[styles.dialogue1, { flexDirection: alignment }]}
                  >
                    <Icon
                      name="user"
                      size={24}
                      color={speakerColors[item.speaker] || "blue"}
                      style={styles.icon}
                    />
                    <View style={styles.dialogueChild}>
                      <Text>Speaker: {item.speaker}</Text>
                      <Text>Japanese text:</Text>
                      <View style={styles.wordsContainer}>
                        {item.japanese
                          .split(/([\p{Script=Han}]+)/gu)
                          .map((segment, idx) => {
                            const isJapaneseWord = /[\p{Script=Han}]+/u.test(
                              segment
                            );
                            return isJapaneseWord ? (
                              <TouchableOpacity
                                key={idx}
                                onLongPress={() => handleLongPressWord(segment)}
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
                Dialogues for Selected Theme
              </Text>
            }
          />
        </View>

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
  dialogueHeader: { marginTop: 20 },
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