import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { customStyles } from "../utils/CustomStyle";

const { width, height } = Dimensions.get("window");

export default function LearningSpace() {
  const [actualLevel, setActualLevel] = useState("1");
  const [iKnowLearn, setIKnowLearn] = useState("no");
  const [iKnowSpeak, setIKnowSpeak] = useState("no");
  const [goalLevel, setGoalLevel] = useState("1");
  const [goalLearn, setGoalLearn] = useState("yes");
  const [goalSpeak, setGoalSpeak] = useState("yes");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Permission to access gallery is needed for avatar upload."
        );
      }
    })();
  }, []);

  const pickAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking avatar: ", error);
      Alert.alert("Error", "An error occurred while picking the avatar.");
    }
  };

  const handleSubmitCurrent = () =>
    Alert.alert("Submitted", "Current Level Data Submitted");
  const handleSubmitGoal = () =>
    Alert.alert("Submitted", "Goal Data Submitted");
  const handleSubmitEmail = () => Alert.alert("Submitted", "Email Submitted");
  const handleSubmitPassword = () =>
    Alert.alert("Submitted", "Password Submitted");
  const handleSubmitAvatar = () => Alert.alert("Submitted", "Avatar Submitted");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainHeader}>Learning Space</Text>

        {/* Section Current Level */}
        <Text style={styles.header}>Your Current Level</Text>
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Level</Text>
          <View style={styles.radioContainer}>
            {["1", "2", "3"].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.radioButton,
                  actualLevel === level && styles.radioButtonSelected,
                ]}
                onPress={() => setActualLevel(level)}
              >
                <Text style={styles.radioText}>{`Level ${level}`}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>I know Learn</Text>
          <View style={styles.radioContainer}>
            {["yes", "no"].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.radioButton,
                  iKnowLearn === option && styles.radioButtonSelected,
                ]}
                onPress={() => setIKnowLearn(option)}
              >
                <Text style={styles.radioText}>{option.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>I know Speak</Text>
          <View style={styles.radioContainer}>
            {["yes", "no"].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.radioButton,
                  iKnowSpeak === option && styles.radioButtonSelected,
                ]}
                onPress={() => setIKnowSpeak(option)}
              >
                <Text style={styles.radioText}>{option.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmitCurrent}>
            <Text style={styles.buttonText}>Submit Current Level</Text>
          </TouchableOpacity>
        </View>

        {/* Section Goal */}
        <Text style={styles.header}>Your Goal</Text>
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Goal Level</Text>
          <View style={styles.radioContainer}>
            {["1", "2", "3"].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.radioButton,
                  goalLevel === level && styles.radioButtonSelected,
                ]}
                onPress={() => setGoalLevel(level)}
              >
                <Text style={styles.radioText}>{`Level ${level}`}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Goal Learn</Text>
          <View style={styles.radioContainer}>
            {["yes", "no"].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.radioButton,
                  goalLearn === option && styles.radioButtonSelected,
                ]}
                onPress={() => setGoalLearn(option)}
              >
                <Text style={styles.radioText}>{option.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Goal Speak</Text>
          <View style={styles.radioContainer}>
            {["yes", "no"].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.radioButton,
                  goalSpeak === option && styles.radioButtonSelected,
                ]}
                onPress={() => setGoalSpeak(option)}
              >
                <Text style={styles.radioText}>{option.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmitGoal}>
            <Text style={styles.buttonText}>Submit Goal</Text>
          </TouchableOpacity>
        </View>

        {/* Section Account */}
        <Text style={styles.header}>Modify User Information</Text>
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmitEmail}>
            <Text style={styles.buttonText}>Submit Email</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmitPassword}
          >
            <Text style={styles.buttonText}>Submit Password</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Avatar</Text>
          <TouchableOpacity style={styles.avatarButton} onPress={pickAvatar}>
            <Text style={styles.radioText}>Upload Avatar</Text>
          </TouchableOpacity>
          {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}

          <TouchableOpacity style={styles.button} onPress={handleSubmitAvatar}>
            <Text style={styles.buttonText}>Submit Avatar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    width: width,
    height: height,
  },
  scrollContainer: {
    padding: 20,
    minHeight: height,
  },
  mainHeader: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#333",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#D56565",
    textAlign: "center",
    marginVertical: 10,
  },
  sectionContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
    marginTop: 10,
    color: "#555",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  radioButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#EEE",
    width: width * 0.25,
    alignItems: "center",
  },
  radioButtonSelected: {
    backgroundColor: "#D56565",
  },
  radioText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: customStyles.buttonBackgroundColor,
    borderRadius: customStyles.buttonRadius,
    paddingVertical: 12,
    width: customStyles.buttonWidth,
    height: customStyles.buttonHeight,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  avatarButton: {
    backgroundColor: "#D56565",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 10,
  },
});
