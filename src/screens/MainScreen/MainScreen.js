/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import call from '../../images/call.png';
import logo from '../../images/headerLogo.png';
import bg1 from '../../images/bg1.jpg';
import whatsapp from '../../images/whstapp.png';
import callon from '../../images/callon.png';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import validate from '../../Validate/Validate';
import {loginUser,saveUserInfo} from '../../store/actions/index';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import bg from '../../images/bg.jpg';
import * as Animatable from 'react-native-animatable';
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
  Linking

} from 'react-native';
import DefaultButton from '../../components/DefaultButton/DefaultButton';
import AlertSuccess from '../../components/alertBoxs/successAlert';
import AlertError from '../../components/alertBoxs/errorAlert';
import { Root, Popup, } from 'popup-ui'
const zoomIn = {
  0: {
    opacity: 0,
    scale: 0,
  },
  0.3: {
    opacity: 0.2,
    scale: 0.2,
  },
  0.5: {
    opacity: 0.5,
    scale: 0.5,
  },
  0.7: {
    opacity: 0.7,
    scale: 0.7,
  },
  1: {  
    opacity: 1,
    scale: 1,
  },
};
class MainScreen extends React.Component {
  constructor(props){
    super(props);
  // AsyncStorage.setItem("ComponentId", JSON.stringify(this.props.componentId));
  Navigation.events().bindComponent(this);
  Keyboard.dismiss();
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
               waitForRender: true
            }
         }
        }
      }
    });
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

    GotoWhatsApp = () =>{
        let url = 'whatsapp://send?text=We have an EMERGENCY please respond&phone=923332222200';
        Linking.openURL(url).then((data) => {
          console.log('WhatsApp Opened');
        }).catch(() => {
          alert('Make sure Whatsapp installed on your device');
        });
    }
  
  render() {
    // console.log(this.props);
    let email= this.state.inputs.email.valid;
      let password= this.state.inputs.password.valid;
      let LoginButton =( <View>

      </View>);
    let scroll = this.state.scrennSize > hp('100%');
    return (
      <Root>

      
      <View style={styles.conatainer}>
 <View>
            <AlertSuccess />
            </View>
            <View>
            <AlertError />
            </View>

            <View style={styles.MainSec}>
      <TouchableOpacity 
      style={
        {
          marginLeft:wp('3%'),
          width:wp('12%'),
          height:wp('12%'),
          justifyContent:'center',
          alignContent:'center',
          alignItems:'center',
          alignSelf:'auto'
        }} onPress={() =>{
           Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
              left: {
                visible: true,
              }
            }
          });
      }} >
  <Icon style={{fontSize:wp('7.5%'),color:'#fff'}} name="bars" />
      </TouchableOpacity>

            <View style={{flex:1,alignContent:'center',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:wp('6.5%'),color:'#fff',fontFamily:'Roboto',fontWeight:'bold'}}> Doc On Call </Text>
            </View>
            <View style={{alignContent:'flex-start',alignItems:'flex-start',justifyContent:'flex-start',marginRight:wp('2%'),  paddingTop:Platform.OS==='ios'?0:wp('2.5%')}}>
                  <Image style={{width:wp('10%'),height:wp('10%')}} source={logo} />
            </View>
      </View>
     
      
    <ImageBackground style={{flex:1,width:wp('100%'),height:wp('140%')}} source={bg1}>
      <TouchableOpacity style={styles.body}>
          <View style={styles.headletter}>
                <Text style={styles.headlettertxt}>For Emergency Call </Text>
          </View> 
          <Animatable.View animation={zoomIn} ref={this.handleViewRef}
          style={styles.bodySec} >
            <View style={styles.Section}>
              <View style={styles.SectionView}>
                  <TouchableOpacity   onPress={() =>{
                    let phoneNumber='03332222200';
                      let ForBoth=Platform.OS==='android'?`tel:${phoneNumber}`:`telprompt:${phoneNumber}`;
                      Linking.openURL(ForBoth)
                  }}
                    style={styles.SectionViewIcon}>
                    <Image style={{width:wp('49%'),height:wp('49%')}} source={call} />
                  </TouchableOpacity>

              </View>
            </View>
        </Animatable.View>
      </TouchableOpacity>
    </ImageBackground>     
    <View style={{flexDirection:'row', alignContent:'center',alignItems:'center',justifyContent:'center',
  backgroundColor:'#d1d1d1',width:wp('100%'),height:Platform.OS==='ios'?wp('25%') :wp('20%'),paddingBottom:Platform.OS==='ios'?wp('5%'):0}}>
      <View style={{height:wp('15%'),width:wp('80%'),alignContent:'center',backgroundColor:'#fff',width:wp('70%'),height:wp('12%'),
     marginRight:15, alignItems:'center',justifyContent:'center',marginBottom:wp('1%'),borderRadius:5}}>     
            <TouchableOpacity onPress={()=>{
                  this.GotoWhatsApp()
      }} style={{flexDirection:'row',alignItems:'center', marginLeft:wp('20%')}}>
                <Image style={{width:wp('12%'),height:wp('12%')}} source={whatsapp} /><Text>{"   "}</Text>
                <Text style={{fontSize:wp('4%'),color:'#000',fontWeight:'bold'}}>Whatsapp</Text>
          </TouchableOpacity >
        </View>  
        <View style={{height:wp('15%'),width:wp('80%'),alignContent:'center',backgroundColor:'#fff',width:wp('70%'),height:wp('12%'),
        alignItems:'center',justifyContent:'center',borderRadius:5,marginBottom:wp('1%'),}}>     
            <TouchableOpacity onPress={() =>{
                    
                  let phoneNumber='03332222200';
                    let ForBoth=Platform.OS==='android'?`tel:${phoneNumber}`:`telprompt:${phoneNumber}`;
                    Linking.openURL(ForBoth)
                }}
                
            style={{flexDirection:'row',alignItems:'center',marginLeft:wp('-28%')}}>
                <Image style={{width:wp('12%'),height:wp('12%')}} source={callon} /><Text>{"   "}</Text>
                <Text style={{fontSize:wp('4%'),color:'#000',fontWeight:'bold'}}>Doc on Call</Text>
            </TouchableOpacity>
        </View>           
    </View>
    </View>
    </Root>
    );
  }
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    zIndex:0,
    
  },
  body:
  {
      flex:0.8,
      flexDirection:'column',
      alignContent:'center',
      alignItems:'center',
      justifyContent:'center',
      
  },
  headletter:
  {
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:wp('5%'),
  },
  headlettertxt:
  {
      fontSize:wp('8%'),
      fontWeight:'bold',
      fontFamily:'Roboto'
  },
  // body1:
  // {
      
  //     width:wp('90%'),
  //     height:wp('100%'),
  //     alignContent:'center',
  //     alignItems:'center',
  //     justifyContent:'center',
  //     marginTop:wp('5%'),
  //     borderColor:'#d1d1d1',
  //     borderWidth:1,
  //     borderRadius:1000
      
  // },
  bodySec:
  {
   
    backgroundColor:'#fe001a',
    width:wp('51%'),
    height:wp('51%'),
    borderRadius:450,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    
   
  },
  Section:
  {
    backgroundColor:'#fff',
    width:wp('50%'),
    height:wp('50%'),
    borderRadius:450,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
  },
  SectionView:
  {
    flexDirection:'column',
  
    width:wp('45%'),
    height:wp('45%'),
    borderRadius:500,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
  },
  SectionView1:
  {
    
    flexDirection:'row',
    backgroundColor:'#25D366',
    width:wp('60%'),
    height:wp('12%'),
    borderRadius:5,
    alignContent:'flex-start',
    alignItems:'flex-start',
    justifyContent:'center',
   
  },
  SectionViewIcon1:
  {
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:wp('3%')
  },
  SectionViewTxt:
  {
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
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
    fontSize:wp('3%'),
    color:'#8b0000',
    fontFamily:'Arial',
    textAlign:'center',
    marginBottom:wp('1%')
  },
  TextInputStyle:{
    fontSize:wp('5%'),
    // paddingTop:wp('2%'),
    height:wp('14%'),
    marginTop:wp('1%'),
    marginBottom:wp('1%'),
    width:'100%',
    fontFamily:'Raleway-Light'
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
export default connect(mapStateToProps,mapsDespathToProps)(MainScreen);