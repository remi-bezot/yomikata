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
import * as Speech from "expo-speech";
import { addFavorite } from "../reducers/favoritesreducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { customStyles } from "../utils/CustomStyle";

export default function Lessons(props) {
  const [lessonData, setLessonData] = useState([]);
  const [allThemes, setAllThemes] = useState([]);
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [speakerColors, setSpeakerColors] = useState({});
  const [exercises, setExercises] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  let token = user.token;
  const uri = BackendAdress.uri;

  useEffect(() => {
    fetch(`http://${uri}:3000/lessons/showLesson/${token}/${props.lessonId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data.themes) {
          const selectedTheme = data.data.themes[props.lessonIndex];
          if (selectedTheme) {
            setLessonData(selectedTheme.lines || []);
            setExercises(selectedTheme.exo || []);
          }
        }
      })
      .catch((error) => console.error("Error fetching lesson:", error));
  }, [props.lessonId, props.lessonIndex]);

  //BOUTON POUR AFFICHER LA MODALE POUR FAVORIS
  const handleLongPressWord = (word) => {
    fetch(`http://${uri}:3000/word/getWord/${token}/${word}`)
      .then((response) => response.json())
      .then((data) => {
        setFavorites([data]);
        setModalVisible(true);
      });
  };

  const handleGoToExercise = () => {
    const body = {
      token: user.token,
      lessonId: props.lessonId,
      themeIndex: props.lessonIndex,
    };

    fetch(
      `http://${uri}:3000/users/updateDialogue/${user.token}/${props.lessonId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {});

    fetch(`http://${uri}:3000/users/progress/checkExercise`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result && data.isDone) {
          alert(
            "Vous avez déjà effectué cet exercice ! Redirection vers le tableau de bord."
          );
          navigation.navigate("TabNavigator", { screen: "dashboard" });
        } else {
          navigation.navigate("Practice", {
            lessonId: props.lessonId,
            lessonIndex: props.lessonIndex,
          });
        }
      });
  };

  const handleFavoriteButton = (data) => {
    fetch(`http://${uri}:3000/favorites/createFavorite/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wordjp: data?.wanikaniLow.Kanji,
        worden: data?.wanikaniLow?.English[0],
        romanji: data?.romaji,
        grammar: data?.wanikaniLow.Grammar[0],
        isbook: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(addFavorite(data.data));
        setIsFavorite(true);
      });
  };

  const speak = (text) => {
    Speech.speak(text, {
      language: "ja",
      pitch: 1,
      rate: 0.5,
    });
  };

  const favoriteButtonStyle = isFavorite
    ? {
        backgroundColor: "#EEC1C0",
        width: 30,
        height: 30,
        borderRadius: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
      }
    : {
        backgroundColor: "#D56565",
        width: 30,
        height: 30,
        borderRadius: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
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
                <View key={index} style={styles.dialogue}>
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
                        <TouchableOpacity onPress={() => speak(item.japanese)}>
                          <Text style={styles.speaker}>🔊</Text>
                        </TouchableOpacity>
                        <View style={styles.romaji}>
                          <Text>Romaji:{item.romanji}</Text>
                          <Text>English:{item.english}</Text>
                        </View>
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
              {favorites.map((favorite, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={styles.modalText}>
                    Selected word: {favorite?.wanikaniLow?.Kanji}
                  </Text>
                  <Text>Meaning: {favorite?.wanikaniLow?.English[0]}</Text>
                  <Text>Romanji: {favorite?.romaji}</Text>
                  <Text>Grammar: {favorite?.wanikaniLow?.Grammar[0]}</Text>
                  <View style={styles.icons}>
                    <TouchableOpacity onPress={() => speak(favorite.romaji)}>
                      <Text style={styles.speakerButton}>🔊</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={favoriteButtonStyle}
                      onPress={() => handleFavoriteButton(favorite)}
                    >
                      <Text>❤️</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              <Button
                style={styles.closeButton}
                title="Close"
                onPress={() => setModalVisible(false)}
              />
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
  romaji: { flexDirection: "column" },
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
  button: {
    backgroundColor: customStyles.buttonBackgroundColor,
    borderRadius: customStyles.buttonRadius,
    width: customStyles.buttonWidth,
    height: customStyles.buttonHeight,
    display: customStyles.buttonDisplay,
    flexDirection: customStyles.buttonFlexDirection,
    alignItems: customStyles.buttonAlignItems,
    justifyContent: customStyles.buttonJustifyContent,
    top: 20,
  },
  icons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
