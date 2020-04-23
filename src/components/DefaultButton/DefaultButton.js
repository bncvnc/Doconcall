import React, {Fragment} from 'react';
 
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
  Keyboard, 
  Text, 
  View, 
  TextInput, 
  TouchableWithoutFeedback, 
  ImageBackground, 
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,

} from 'react-native';
const DefaultButton = (props) => {
    // console.log(props);
    return (
        <TouchableOpacity 
        onPress={props.onPress}
        disabled={props.disabled}
        style={{padding: wp('5%')}}>
        <View style={[styles.login_btn,props.style]}>
        <Text
          style={{
            color: '#fff',
            fontSize: wp('5%'),
            fontFamily: 'Raleway-Bold',
          }}>
          {props.innerText}
        </Text>
      </View>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
      login_btn: {
      alignContent: 'center',
      alignItems: 'center',
      height: hp('7%'),
      width: wp('90%'),
      justifyContent: 'center',
      padding: wp('4%'),
      paddingLeft:wp('5%'),
      fontFamily: 'bold',
    },
  

  });

export default DefaultButton;