/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import validate from '../../Validate/Validate';
import {loginUser,saveUserInfo} from '../../store/actions/index';
import AsyncStorage from '@react-native-community/async-storage';
 import * as Animatable from 'react-native-animatable';
 import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { appColor } from '../../components/variables/variables';
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
import { Root, Popup, } from 'popup-ui'
class SuccessPopup extends React.Component {

  
   
  render() {

    

    return (
      <View style={styles.conatainer}>
            <View style={styles.MainSec}>
                <TouchableOpacity style={styles.MainHead}>
                    <Icon style={{fontSize:wp('5%'),color:'#fff'}} name="chevron-left" />
                </TouchableOpacity>
                <View style={styles.MainHead1}>
                    <Text style={{fontSize:wp('5%'),color:'#fff',fontWeight:'bold'}}>Current Plan</Text>
                </View>
            </View>
            <TouchableOpacity 
                    
                    onPress={() =>
                    Popup.show({
                        type: 'Success',
                        title: 'Upload Successfully',
                        button: false,
                        textBody: 'Congrats! Your upload successfully done',
                        buttontext: 'Ok',
                        
                        callback: () => Popup.hide()
                    })
                    }
                >
                    <Text>Open Popup</Text>
                </TouchableOpacity>
            <Root>
                <View>
                    <TouchableOpacity 
                    
                        onPress={() =>
                        Popup.show({
                            type: 'Success',
                            title: 'Upload Successfully',
                            button: false,
                            textBody: 'Congrats! Your upload successfully done',
                            buttontext: 'Ok',
                            
                            callback: () => Popup.hide()
                        })
                        }
                    >
                        <Text>Open Popup</Text>
                    </TouchableOpacity>
                </View>
            </Root>        
             
      </View>
    );
  }
}

const styles = StyleSheet.create({
   conatainer: {
    flex: 1,
    backgroundColor:'#f0f0f0'
  },
  MainSec:
  {
    flexDirection:'row',
    width:wp('100%'),
    height:Platform.OS==='ios'? wp('25%'):wp('15%'),
    alignContent:'center',
    alignItems:'center',
    backgroundColor:'#cd2026',
    
  },
  MainHead:
  {
    marginLeft:wp('3%')
  },
  MainHead1:
  {
    flex:0.9,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  
});



const mapStateToProps = state => {
    return {
      user: state.user.user,
      isLoading: state.ui.isLoading,
      InternetInfo:state.ui.InternetInfo,
      mode:state.user.mode
    };
  };
  const mapsDespathToProps =dispatch =>{
    return{
      onloginUser :(authDta) =>dispatch(loginUser(authDta)),
      checkIfThereIsdata : (authDta) => dispatch(saveUserInfo(authDta))
    }
  }
  export default connect(mapStateToProps,mapsDespathToProps)(SuccessPopup);