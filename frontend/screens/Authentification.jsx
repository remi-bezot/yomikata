import { customStyles } from '../utils/CustomStyle';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn'

export default function Authentification({navigation}) {

  const handlesubmit = () => {
    navigation.navigate('TabNavigator')
  }



  return (
    <View style={styles.container}>
      
      <Text>Yom</Text>
      <Text>Kata</Text>
      <SignUp/>
      <SignIn/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: "100%",
  },
  login:{
    backgroundColor: customStyles.buttonBackgroundColor,
    borderRadius: customStyles.buttonRadius,
    width: customStyles.buttonWidth,
    height: customStyles.buttonHeight,
    display: customStyles.buttonDisplay,
    flexDirection: customStyles.buttonFlexDirection,
    alignItems: customStyles.buttonAlignItems,
    justifyContent: customStyles.buttonJustifyContent,
  }

});
