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



export default function Lessons(props) {
  const [lessonData, setLessonData] = useState([]);
  const [currentLessonId, setCurrentLessonId] = useState(null);
 
 
  const [speakerColors, setSpeakerColors] = useState({});
  const [exercises, setExercises] = useState([]);

  const [modalVisible, setModalVisible] = useState(true);
  const [favorites, setFavorites ]= useState ([])
  const [isFavorite, setIsFavorite]= useState(false)
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

  



  const handleLongPressWord = (word) => {
   
    fetch(`http://${uri}:3000/word/getWord`, 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word:word
        })
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, 'omom');
        setFavorites([data])
        setModalVisible(true)
      }
      
      )
        
      // setWordApi([...wordApi, word]);
	  
      

    
    
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
      })
    })
      .then((response) => response.json())
      .then((data) => {
        
        dispatch(addFavorite(data.data));
  })


  setIsFavorite(true)
}



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


  // ajout expo speech modal
  const speak = (text) => {
    Speech.speak(text, {
      language: "ja",
      pitch: 1,
      rate: 0.5,
    });
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
		<View>

      
    {favorites.map((favorite, index) => {
      return(
  <Modal
    key={index}
    visible={modalVisible}
    transparent={true}
    animationType="slide"
    onRequestClose={() => setModalVisible(false)}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
          <View  style={{ marginBottom: 10 }}>
            <Text style={styles.modalText}>Selected word: {favorite.wanikaniLow.Kanji}</Text>
            <Text>Meaning: {favorite.wanikaniLow.English[0]}</Text>
            <Text>Romanji: {favorite.romaji }</Text>
            <Text>Grammar: {favorite.wanikaniLow.Grammar[0]}</Text>

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
            <Button style={styles.closeButton} title="Close" onPress={() => setModalVisible(false)} />
            </View>
           
          </View>
      
      
        
      </View>
    </View>
  </Modal>
    )})}


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
  icons: {
    width: '100%', 
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems:'center'
  },
  iconsStyle:{
    backgroundColor:'#D56565',
		width: 30, 
		height: 30,
		borderRadius: 30, 
    display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		margin : 5, 
  },
  
 
 
});
