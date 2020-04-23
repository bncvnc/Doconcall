/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import email_icon from '../../images/newIcons/icon1.png';
import pass_icon from '../../images/newIcons/icon2.png';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import validate from '../../Validate/Validate';
import {loginUser,saveUserInfo,ForegetPasswordLink} from '../../store/actions/index';
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
import DefaultButton from '../../components/DefaultButton/DefaultButton';
import changeScreen from '../../components/changeScreen/changeScreen';
import SplashScreen from 'react-native-splash-screen';
import AlertSuccess from '../../components/alertBoxs/successAlert';
import AlertError from '../../components/alertBoxs/errorAlert';
import { Root, Popup, } from 'popup-ui'
const zoomOut = {
  0: {
    opacity: 0,
    scale: 0,
  },
  0.5: {
    opacity: 1,
    scale: 0.3,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
};
class ForgetPassword extends React.Component {
  constructor(props){
    super(props);
  // AsyncStorage.setItem("ComponentId", JSON.stringify(this.props.componentId));
this.getMyValue();

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


  changeScreen = (screen) =>{
    Navigation.push(this.props.componentId, {
      component: {
        name: screen,
        passProps: {
          text: 'Hellow world'
        },
        options: {
          topBar: {
            visible:true,
            title:{
              text:'Register Customer',
              alignment:'center'
            },
            
            // rightButtons: [
            //   {
            //     id: 'buttonOne',
            //     icon: pro_image,
            //     height:10,
            //     width:10
            //   }
            // ]
          }, animations: {
            push: {
               waitForRender: false
            }
         }
        }
      }
    });
  }

  getMyValue = async () => {
           
    try {
   
      const value = await AsyncStorage.getItem('appState');
     let data=JSON.parse(value);
      console.log(data);
      if(data.isLoggedIn){

        if(data.isLoggedIn)
        {
          this.props.checkIfThereIsdata(data);

          changeScreen('doconcall.MainScreen');
          setTimeout(()=>{
            SplashScreen.hide();
            
          },600)
          // AsyncStorage.setItem("screen", JSON.stringify('uncle-fixer.CustomerProfile'));

        }

      }
     
    } catch(e) {
      // read error
      setTimeout(()=>{
        SplashScreen.hide();
        
      },600)
      console.log(e);
      // this.props.usiStop();
    }
    
  
  }
 
  

  loginUser = () => {
    const authDta ={
      email:this.state.inputs.email.value,
      password:this.state.inputs.password.value
    }
    this.props.ForegetPasswordLink(this.state.inputs.email.value)
   
  }
  logoutUser = () => {
    let appState = {
      isLoggedIn: false,
      user: {}
    }
    AsyncStorage.setItem("appState", JSON.stringify(appState));


  };
  changeScreenTo = (screen,text) =>{
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

  render() {
    // console.log(this.props);
    let email= this.state.inputs.email.valid;
      let password= this.state.inputs.password.valid;
      let LoginButton =( <View>

      </View>);
      if(this.props.isLoading) {
        LoginButton =(
          <View style={{zIndex:999999,justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'rgba(0,0,0,.6)',position:'absolute',top:0,left: 0,right: 0, bottom: 0,flex: 1}}>
          <ActivityIndicator size={'large'} color={appColor}  />
       </View>
        )
      }
    let scroll = this.state.scrennSize > hp('100%');
    return (
      <Root>

   
      <View style={styles.conatainer}>
        {LoginButton}
        <ScrollView
        // scrollEnabled={scroll}

        //   onContentSizeChange={this.onContentSizeChange}
        >
          <View>
            <AlertSuccess />
            </View>
            <View>
            <AlertError />
            </View>
          <View style={styles.logo_Sec}>
              <Image style={styles.logo} source={logo} />
          </View>
          <KeyboardAvoidingView>

        <View
          style={{
            paddingLeft: wp('5%'),
            paddingRight: wp('5%'),
            marginTop: wp('5%'),
          }}>
          <Animatable.View animation={zoomOut}
            style={[{
              flexDirection: 'row',
              height:wp('12%'),
              borderRadius:50,
              backgroundColor:'#fff',
              elevation:5,
              alignContent: 'center',
              alignItems: 'center',
              shadowOffset: { width: 1, height: 1 },
              shadowColor: 'rgba(0,0,0,.4)',
              shadowOpacity: .5,
            },this.state.emailFocused && this.state.emailBlured && !this.state.inputs.email.valid ?styles.invalid:styles.isvalid]}>
            <View
              style={{
                
                width: wp('15%'),
                alignItems: 'flex-start',
                alignContent: 'center',
                paddingLeft:15
              }}>
                <Icon style={{fontSize:wp('7%'), color:appColor}} name="envelope-square" />
              
            </View>

            <View style={{width: '100%', alignItems: 'flex-start'}}>
              <TextInput
                keyboardType={'email-address'}
                placeholderTextColor={'#a0a0a0'}
                returnKeyType="next"
                // autoFocus={true}
                autoCorrect={false}
                blurOnSubmit={false}
                placeholder='Email Address'
                autoCapitalize="none" 
                value={this.state.inputs.email.value} 
                onChangeText={(text) => this.onFieldTextChange(text,'email')} 
                onFocus={()=>this.setState({
                  emailFocused:true
                 
                })}
                onBlur={()=>this.setState({
                  emailBlured:true
                })}
                style={[styles.TextInputStyle,{color:this.props.mode === 'dark' ?'black':'black'}]} />
            </View>
          </Animatable.View>
          
        </View>
        <Text 
      style={[styles.warrnings,this.state.emailFocused && this.state.emailBlured && !this.state.inputs.email.valid ?styles.show:styles.disapair]}
      >{this.state.inputs.email.warningText}</Text>


       <DefaultButton
        onPress={()=>{
          this.loginUser();
        }}
        disabled={email? false : true}
        style={{backgroundColor:email && password ? appColor : appColor,fontWeight: 'bold', borderRadius:50,elevation:3
      ,fontSize: wp('4.1%'),}}
        innerText={'Reset Password'}
       />       
      
        {/* <DefaultButton 
        onPress={()=>{
          this.setState(prevState =>{
      
            return {
              inputs: {
                ...prevState.inputs,
                email: {
                  ...prevState.inputs.email,
                  value: '',
                  valid:false,
                  touched:false
                },
                password: {
                  ...prevState.inputs.password,
                  value: '',
                  valid:false,
                  touched:false
                }
              },
              passwordFocused:false,
              passwordBlured:false,
              emailFocused:false,
              emailBlured:false,
              
            };
            
          })
          this.changeScreenTo('doconcall.RegisterScreen','SignUp')
        }}
        innerText={<React.Fragment>
            <Text
                  style={{
                    color: '#969696',
                    fontFamily: 'Raleway-Light',
                    fontSize: wp('3.7%'),
                    paddingLeft:wp('5%'),
                  }}>
                  New User?<Text>{" "}</Text>
                </Text>
                <Text 
                  style={{
                    color: appColor,
                    fontFamily: 'Raleway-Bold',
                    fontSize: wp('4.2%'),
                    textAlign:'center'
                  }}>
                  Register 
                </Text>
            
        </React.Fragment>}
       />        */}
        </KeyboardAvoidingView>
        </ScrollView>
      </View>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
   conatainer: {
    flex: 1,
    backgroundColor:'#f4f6fa'
  },
  logo_Sec:
  {
      alignContent:'center',
      alignItems:'center',
      marginTop:wp('20%')
  },
  logo:
  {
    width:wp('35%'),
    height:wp('35%'),
      marginBottom:wp('12%')
  },
  image_styles: {
    justifyContent: 'center',
    marginTop: Platform.OS==='ios'? wp('10%'):wp('5%'),
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
    width: wp('100%'),
    fontSize: wp('10%'),
    marginTop: wp('2%'),
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
    height: wp('11%'),
    flexDirection: 'row',
  },
  signupmargin: {
    alignContent: 'center',
    alignItems: 'center',
    height: wp('12%'),
    width: wp('90%'),
    justifyContent: 'center',
    backgroundColor: '#5ba505',
    marginTop: wp('3%'),
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
    borderBottomColor:'#8b0000',
  },
  isvalid:{
    borderBottomColor:'rgba(204, 204, 204, .6)',
  },
  disapair:{
    height:0,
    opacity:0
  },
  show:{
    opacity:100,
  },
  warrnings:{
    fontSize:wp('2.9%'),
    color:'#8b0000',
    fontFamily:'Arial',
    textAlign:'center',
    marginBottom:wp('1.5%'),
    marginTop:wp('1.5%')
  },
  TextInputStyle:{
    fontSize:wp('4%'),
    // paddingTop:wp('2%'),
    height:wp('14%'),
    marginTop:wp('1%'),
    marginBottom:wp('1%'),
    width:'80%',
    fontFamily:'Raleway-Light'
  }
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
    checkIfThereIsdata : (authDta) => dispatch(saveUserInfo(authDta)),
    ForegetPasswordLink:(email)=>dispatch(ForegetPasswordLink(email))
  }
}
export default connect(mapStateToProps,mapsDespathToProps)(ForgetPassword);