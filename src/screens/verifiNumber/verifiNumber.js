/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';

import image from '../../images/logo.png';
import email_icon from '../../images/newIcons/icon1.png';
// import gif from '../../assets/uncle111.gif';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import validate from '../../Validate/Validate';
import {loginUser,VerifyAccount,SendNewVerificationNumber,CheckIfCustomerIsVerifiedOrNot,CheckIfTechnicianIsVerifiedOrNot} from '../../store/actions/index';
import AsyncStorage from '@react-native-community/async-storage';
import DefaultButton from '../../components/DefaultButton/DefaultButton';
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
  Button
} from 'react-native';
import { appColor } from '../../components/variables/variables';


class VerifiedNumber extends React.Component {


  constructor(props) {
    super(props);
    this.getMyValue();
    AsyncStorage.setItem("ComponentId", JSON.stringify(this.props.componentId));
  }

  componentWillUpdate(){
    console.log(this.props.isVerified);
  
  }
  componentDidUpdate(){
    console.log('called');

    // if(this.props.user.technician && this.props.isVerified)
    // { 
    //   console.log('changed');
    //   changeScreen('uncle-fixer.TechProfile');
    // }else if(!this.props.user.technician && this.props.isVerified) {
    //   changeScreen('uncle-fixer.CustomerProfile');
    // }
  }

  state={
   code:'',
   screenHeight:0,
}

getMyValue = async () => {
  try {
    const value = await AsyncStorage.getItem('appState');
    const  fcmToken = await AsyncStorage.getItem('fcmToken'); 
    data=JSON.parse(value);

      console.log(data);

      if(data.isLoggedIn)
      {
        this.props.CheckCustomer(data.user.email);
      }
   
  } catch(e) {
    // read error
    console.log(e);
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


  changeScreen = (screen) =>{
    Navigation.push(this.props.componentId, {
      component: {
        name: screen,
        passProps: {
          text: 'Hellow world'
        },
        options: {
          topBar: {
            visible:false
          }
        }
      }
    });
  }

  loginUser = () => {
    this.props.checkIfThereIsdata(this.state.code);
    Keyboard.dismiss()
   
  }
  onContentSizeChange = (contentWidth,contentHeight) =>{
    this.setState({
      screenHeight:contentHeight
    })
  }
  logoutUser = () => {
    let appState = {
      isLoggedIn: false,
      user: {}
    }
    AsyncStorage.setItem("appState", JSON.stringify(appState));


  };
 

  
  render() {

      let LoginButton =(<DefaultButton
        onPress={()=>{
          this.loginUser();
        }}
        style={{backgroundColor:appColor,fontWeight: 'bold', borderRadius:50,elevation:3
        ,fontSize: wp('4.1%'),}}
        innerText={'Verify Account'}
        />     );

  

  let Loader =(
    <View>

    </View>
  );

  if(this.props.isLoading)
{
  Loader = (
    <View style={{zIndex:999999,justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'rgba(0,0,0,.6)',position:'absolute',top:0,left: 0,right: 0, bottom: 0,flex: 1}}>
    <ActivityIndicator size={'large'} color={'#e2e2e2'}  />
    </View>
   )
} 
let scroll = this.state.screenHeight > hp('100%') ;
   
    return (
      <View style={styles.conatainer}>
        {Loader}
        <ScrollView
        scrollEnabled={scroll}
        onContentSizeChange={this.onContentSizeChange}
        >
          
          <KeyboardAvoidingView>
        <View style={styles.image_styles}>
          <Image
            style={{height: wp('65%'), width: wp('65%')}}
            source={image}></Image>
        </View>

        <View
          style={{
            paddingLeft: wp('5%'),
            paddingRight: wp('5%'),
            marginTop: wp('5%'),
          }}>
          <View
            style={[{
              flexDirection: 'row',
              borderBottomColor: '#333',
              borderBottomWidth: 1,
              alignContent: 'center',
              alignItems: 'center',
            }]}>
            <View
              style={{
                width: wp('15%'),
                alignItems: 'flex-start',
                alignContent: 'center',
              }}>
              <Image
                style={{height: wp('8%'), width: wp('8%')}}
                source={email_icon}
              />
            </View>

            <View style={{width: wp('80%'), alignItems: 'flex-start'}}>
              <TextInput
                keyboardType={'number-pad'}
                autoCorrect={false}
                placeholder='Your Verification Code'
                autoCapitalize="none" 
                value={this.state.code} 
                onChangeText={(text) => this.setState({
                    code:text
                })} 
                
                style={{
                  fontSize: wp('4.5%'),
                  paddingTop: wp('2%'),
                  width:'100%',
                }} />
            </View>
          </View>
          
        </View>
        <TouchableOpacity onPress={()=>this.props.SendNewVerificatoin()}  style={styles.forgot}>
        <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginEnd: wp('5%'),

                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: '#333',
                  fontSize: wp('3.5%'),
                }}>
                Resend Verification Code
              </Text>
            </View>
        </TouchableOpacity>

              {LoginButton}

       

        
        </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    zIndex:0
  },

  image_styles: {
    justifyContent: 'center',
    marginTop: hp('5%'),
    alignContent: 'center',
    alignItems: 'center',
  },

  input_Text: {
    justifyContent: 'center',
    height: hp('10%'),
    width: wp('90%'),
    fontSize: wp('10%'),
    fontFamily: 'regular',
  },

  forgot: {
    flexDirection: 'row',
    height: wp('7%'),
    width: wp('100%'),
    fontSize: wp('10%'),
    marginTop: wp('3%'),
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  login_btn: {
    alignContent: 'center',
    alignItems: 'center',
    height: hp('7%'),
    width: wp('90%'),
    justifyContent: 'center',
    padding: wp('4%'),
    backgroundColor: '#5ba505',
    fontFamily: 'bold',
  },

  or: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop:wp('1%'),
    paddingBottom:wp('1%'),
    paddingLeft:wp('1.5%'),
    paddingRight:wp('1.5%'),
    backgroundColor:'#333',
    borderRadius:wp('3.4%')
  },
  signup: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('6%'),
    flexDirection: 'row',
  },
  signupmargin: {
    alignContent: 'center',
    alignItems: 'center',
    height: hp('7%'),
    width: wp('90%'),
    justifyContent: 'center',
    backgroundColor: '#5ba505',
    marginTop: hp('3%'),
  },
  parent_or: {
    flexDirection: 'row',
    height: hp('4%'),
    marginTop: hp('2%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  place_icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },invalid:{
    borderBottomColor:'red',
  },
  isvalid:{
    borderBottomColor:'green',
  },
  disapair:{
    height:0,
    opacity:0
  },
  show:{
    opacity:100,
  },
  warrnings:{
    fontSize:wp('3%'),
    color:'red',
    fontFamily:'Arial',
    textAlign:'center',
    marginBottom:wp('1%')
  },
});
const mapStateToProps = state => {
  return {
    user: state.user.user,
    isLoading: state.ui.isLoading,
    isVerified:state.user.isVerified,
    InternetInfo:state.ui.InternetInfo
  };
};
const mapsDespathToProps =dispatch =>{
  return{
    onloginUser :(authDta) =>dispatch(loginUser(authDta)),
    checkIfThereIsdata : (code) => dispatch(VerifyAccount(code)),
    SendNewVerificatoin:()=>dispatch(SendNewVerificationNumber()),
    CheckCustomer:(email)=>dispatch(CheckIfCustomerIsVerifiedOrNot(email)),
    CheckTehnician:(email)=>dispatch(CheckIfTechnicianIsVerifiedOrNot(email))

  }
}
export default connect(mapStateToProps,mapsDespathToProps)(VerifiedNumber);