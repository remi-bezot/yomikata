import { StatusBar } from "expo-status-bar";
import { customStyles } from "../utils/CustomStyle";
import { useState } from "react";
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import FontAwesome from "react-native-vector-icons/FontAwesome";

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
        animationType="fade"
        transparent={true}
        visible={signUpModalVisible}
        onRequestClose={handleCancelSignUp} 
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentSignup}>
            <View style={styles.deleteIcon}>
                <FontAwesome name="close" size={20} color="#000000" onPress={handleCancelSignUp}  />
            </View>
            <SignUp/>
          </View>
        </View>
      </Modal>

    
      <Modal
        animationType="fade"
        transparent={true}
        visible={signInModalVisible}
        onRequestClose={handleCancelSignIn} 
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentSignin}>
          <View style={styles.deleteIcon}>
                <FontAwesome name="close" size={20} color="#000000" onPress={handleCancelSignIn}  />
          </View>
          <SignIn/>
          </View>
        </View>
      </Modal>

      
      <TouchableOpacity onPress={showSignInModal} style={styles.login}>
        <Text>Signin</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={showSignUpModal} style={styles.login}>
        <Text>Signup</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.1)", 
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentSignin: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    height: '35%',
  },
  modalContentSignup: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    height: '55%',
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
  deleteIcon: {
    display:'flex', 
    flexDirection: 'row', 
    justifyContent:'flex-end', 
    width: '100%'
  }
});
