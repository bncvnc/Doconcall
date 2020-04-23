/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import email_icon from '../../images/newIcons/icon1.png';
import terms from '../../images/terms.jpg';
import emailpage from '../../images/emailpage.png';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import validate from '../../Validate/Validate';
import {loginUser,saveUserInfo} from '../../store/actions/index';
import AsyncStorage from '@react-native-community/async-storage';
 import * as Animatable from 'react-native-animatable';
 import logo from '../../images/logo.png';
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

class TermsScreen extends React.Component {
    state = {
        screenHeight: 0,
    }
    onContentSizeChange = (contentWidth, contentHeight) => {
        // Save the content height in state
        content = contentHeight + 150;
        this.setState({ screenHeight: content });
    };
    constructor(props){
        super(props);
      // AsyncStorage.setItem("ComponentId", JSON.stringify(this.props.componentId));
      Navigation.events().bindComponent(this);
    }
    
    
    componentWillReceiveProps(){
      AsyncStorage.setItem("ComponentId", JSON.stringify(this.props.componentId));
    
     
    }
    
      state={
        
        emailFocused:false,
        scrennSize:0,
        emailBlured:false,
        passwordFocused:false,
        passwordBlured:false,
        inputs:{
          password:{
            value:'',
            valid:false,
            validationRules:{
              checkPassword:6
            },
            touched:false,
            warningText:'Password Must Contain 7 to 15 characters which contain one UpperCase character, One numeric digit'
          },
          email:{
            value:'',
                valid:false,
                validationRules:{
                  isEmail:true
                },
                touched:false,
                warningText:'Please Enter A Valid Email Address'
          },
          name:{
            value:'',
                valid:false,
                validationRules:{
                  minLength:6
                },
                touched:false,
                warningText:'Your Name Must Be 6 Characters Long'
          }
        }
    }
    
    onFieldTextChange = (text,field) => {
      let connectedValue = {};
      this.setState(prevState =>{
        
        return {
          inputs: {
            ...prevState.inputs,
            [field]: {
              ...prevState.inputs[field],
              value: text,
              valid: validate(
                text,
                prevState.inputs[field].validationRules,
                connectedValue
              ),
              touched:true
              
            }
            
          }
          
        };
        
      })
     
    
    }
    
    
      loginUser = () => {
        const authDta ={
          email:this.state.inputs.email.value,
          password:this.state.inputs.password.value
        }
        this.props.onloginUser(authDta)
       
      }
      logoutUser = () => {
        let appState = {
          isLoggedIn: false,
          user: {}
        }
        AsyncStorage.setItem("appState", JSON.stringify(appState));
    
    
      };
      changeScreen = (screen,text) =>{
        AsyncStorage.setItem("screen", JSON.stringify(screen));
          Navigation.push(this.props.componentId, {
            component: {
              name: screen,
              passProps: {
                text: 'Pushed screen'
              },
              options: {
                topBar: {
                  visible:true,
                  title:{
                    text:text,
                    alignment:'center'
                  }
                },
                animations: {
                    push: {
                       waitForRender: true
                    }
                 }
              }
            }
          });
        }
     
      onContentSizeChange = (screenWidth,screenHeight) =>{
        this.setState({
          scrennSize:screenHeight
        })
      }
    
      GotoWhatsApp = () =>{
        let url = 'whatsapp://send?text=We have an EMERGENCY please respond&phone=923332222200';
        Linking.openURL(url).then((data) => {
          console.log('WhatsApp Opened');
        }).catch(() => {
          alert('Make sure Whatsapp installed on your device');
        });
    }
      
  render() {

    
    let enable = this.state.scrennSize > hp('100%');
    return (
      <View style={styles.conatainer}>
       
        <ScrollView scrollEnabled={enable}  showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator ={false}
        onContentSizeChange={this.onContentSizeChange}>
            <View style={styles.MainSec}>
                <TouchableOpacity onPress={() =>{
                  Navigation.pop(this.props.componentId)
                }} style={styles.MainHead}>
                        
                    <Icon style={{fontSize:wp('5%'),color:'#fff'}} name="chevron-left" />
                </TouchableOpacity>
                <View style={styles.MainHead1}>
                    <Text style={{fontSize:wp('5%'),color:'#fff',fontWeight:'bold'}}>Terms & Conditions</Text>
                </View>
            </View>
            <ImageBackground style={styles.MainBody} source={terms} />
            <View style={styles.bodySec}>
                {/* <Text style={styles.txtbody} >
                    Terms & Conditions
                </Text> */}
                <View style={{width: wp('20%'),height:wp('0.5%'),backgroundColor:'#cd2026',marginBottom:wp('2%'),marginTop:wp('1%'),}} />
                <View style={{width: wp('5%'),height:wp('0.5%'),backgroundColor:'#cd2026',marginBottom:wp('3%')}} />
                <Text style={styles.txtbody1} >
                - Telemedicine and Digital Health are the future of healthcare 
                delivery and promising mediums to offer Healthcare services across the globe. 
                Telemedicine and Digital Health are the future of healthcare 
                delivery and promising mediums to offer Healthcare services across the globe. 
                Telemedicine and Digital Health are the future of healthcare 
                delivery and promising mediums to offer Healthcare services across the globe. 
                </Text>
                <Text style={styles.txtbody1} >
                - Telemedicine and Digital Health are the future of healthcare 
                delivery and promising mediums to offer Healthcare services across the globe. 
                Telemedicine and Digital Health are the future of healthcare 
                delivery and promising mediums to offer Healthcare services across the globe. 
                Telemedicine and Digital Health are the future of healthcare 
                delivery and promising mediums to offer Healthcare services across the globe. 
                </Text>
                <Text style={styles.txtbody1} >
                - Telemedicine and Digital Health are the future of healthcare 
                delivery and promising mediums to offer Healthcare services across the globe. 
                Telemedicine and Digital Health are the future of healthcare 
                delivery and promising mediums to offer Healthcare services across the globe. 
                Telemedicine and Digital Health are the future of healthcare 
                delivery and promising mediums to offer Healthcare services across the globe. 
                </Text>
            </View>
            
        </ScrollView>
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
    width:wp('12%'),
    height:wp('12%'),
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    alignSelf:'auto'
  },
  MainHead1:
  {
    flex:0.9,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  MainBody:
  { 
    width:wp('100%'),
    height:wp('50%'),
    resizeMode:'cover',
    marginBottom:wp('2%')
  },
  bodySec:
  {
      
      alignContent:'center',
      alignItems:'center',
      justifyContent:'center',
      padding:25,
      marginBottom:wp('4%')
  },
  txtbody:
  {
      fontFamily:'Roboto',
      fontSize:wp('4.5%'),
      textAlign:'justify',
      fontWeight:'bold',
      
  },
  txtbody1:
  {
      fontFamily:'Roboto',
      fontSize:wp('3.6%'),
      textAlign:'justify',
      marginBottom:wp('1.5%')
    
  },
  bodySecc:
  {
      flexDirection:'row',
      width:wp('90%'),
      height:wp('15%'),
      marginBottom:wp('2%'),
      marginTop:wp('8%'),
      marginLeft:wp('5%'),
      backgroundColor:'#cd2026',
      alignContent:'center',
      alignItems:'center',
      justifyContent:'center',
      borderTopLeftRadius:10,
      borderBottomRightRadius:10,
      borderTopRightRadius:2,
      borderBottomLeftRadius:2
     
  },
  txtbodyy:
  {
      fontFamily:'Roboto',
      fontSize:wp('4.5%'),
      textAlign:'justify',
      fontWeight:'bold',
      color:'#fff'
      
  },
  ImagEmail:
    {
      width:wp('20%'),
      height:wp('20%'),
      resizeMode:'contain',
      marginRight:wp('7%')
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
  export default connect(mapStateToProps,mapsDespathToProps)(TermsScreen);