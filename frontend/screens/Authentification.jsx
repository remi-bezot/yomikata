import { StatusBar } from "expo-status-bar";
import { customStyles } from "../utils/CustomStyle";
import { useState } from "react";
import Login from '../components/Login';
import Register from '../components/Register';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from "react-native";

export default function Authentification() {
  const [signUpModalVisible, setSignUpModalVisible] = useState(false);
  const [signInModalVisible, setSignInModalVisible] = useState(false);

  const showSignUpModal = () => {
    setSignUpModalVisible(true);
  };

  const showSignInModal = () => {
    setSignInModalVisible(true);
  };

  const handleCancelSignUp = () => {
    setSignUpModalVisible(false);
  };

  const handleCancelSignIn = () => {
    setSignInModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text>Yom</Text>
      <Text>Kata</Text>

 
      <Modal
        animationType="slide"
        transparent={true}
        visible={signUpModalVisible}
        onRequestClose={handleCancelSignUp} 
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Register/>
            <Pressable
              style={styles.closeButton}
              onPress={handleCancelSignUp}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    
      <Modal
        animationType="slide"
        transparent={true}
        visible={signInModalVisible}
        onRequestClose={handleCancelSignIn} 
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Login/>
            <Pressable
              style={styles.closeButton}
              onPress={handleCancelSignIn}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      
      <TouchableOpacity onPress={showSignInModal} style={styles.login}>
        <Text>Login</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={showSignUpModal} style={styles.login}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
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
  login: {
    backgroundColor: customStyles.buttonBackgroundColor,
    borderRadius: customStyles.buttonRadius,
    width: customStyles.buttonWidth,
    height: customStyles.buttonHeight,
    display: customStyles.buttonDisplay,
    flexDirection: customStyles.buttonFlexDirection,
    alignItems: customStyles.buttonAlignItems,
    justifyContent: customStyles.buttonJustifyContent,
    margin: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    height: '50%',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
