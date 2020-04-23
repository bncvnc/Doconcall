import React, {Fragment} from 'react';
import email_icon from '../../images/newIcons/icon1.png';
import ServiceIcon from '../../images/ServiceIcon.png';

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
import RNPickerSelect from 'react-native-picker-select';
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
  Picker,
Alert
} from 'react-native';
import bg1 from '../../images/bg1.jpg';
const zoomIn = {
  0: {
    opacity: 0,
    scale: 0,
  },
  0.3: {
    opacity: 0.2,
    scale: 0.2,
  },
  1: {  
    opacity: 1,
    scale: 1,
  },
};
export default class OurPlansPay extends React.Component {

  
  
    state = {
        screenHeight: 0,
    }
    onContentSizeChange = (contentWidth, contentHeight) => {
        // Save the content height in state
        content = contentHeight + 200;
        this.setState({ screenHeight: content });
    };
    // constructor(props){
    //     super(props);
    //   // AsyncStorage.setItem("ComponentId", JSON.stringify(this.props.componentId));
    //   Navigation.events().bindComponent(this);
    // }
    
    
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
   
    
    let enable = this.state.scrennSize > hp('50%');
    return (
      <View style={styles.conatainer}>
            <View style={styles.MainSec}>
                <TouchableOpacity onPress={() =>{
                  Navigation.pop(this.props.componentId);
                }} style={styles.MainHead}>
                    <Icon style={{fontSize:wp('5%'),color:'#fff'}} name="chevron-left" />
                </TouchableOpacity>
                <View style={styles.MainHead1}>
                    <Text style={{fontSize:wp('5%'),color:'#fff',fontWeight:'bold'}}>Our Plans</Text>
                </View>
            </View>
            <View style={styles.Section}>
            <View style={styles.BodySection}>
                <View style={styles.MainSection}>
                    <Text style={styles.TitleSection}>
                        Please Select a Payment Gateway
                    </Text>
                </View>
                <View style={styles.PickerSection}>
                <RNPickerSelect
            onValueChange={(value) => {
              // this.setState({paymentMethode: value})
              this.props.setPaymenTMethcode(value)
            }}
            placeholder={{
              label: 'Please Select A Payemnt Gateway',
              value: '',
              color: 'red',
            }}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 20,
                right: 10,
              },
            }}
            Icon={() => {
              return (
                <View
                  style={{
                    backgroundColor: 'transparent',
                    borderTopWidth: 10,
                    borderTopColor: '#cd2026',
                    borderRightWidth: 10,
                    borderRightColor: 'transparent',
                    borderLeftWidth: 10,
                    borderLeftColor: 'transparent',
                    width: 0,
                    height: 0,
                  }}
                />
              );
            }}
            placeholderTextColor={'black'}
            items={[

                { label:"Pay via cheque" ,value:"check" },
            ]}
        />
                </View>
                {!this.props.alreadySubcribedToStandered?<React.Fragment>
                  <View style={styles.MainSection}>
                    <Text style={styles.TitleSection}>
                        Please Select Months
                    </Text>
                </View>

                <View style={styles.PickerSection}>
                <RNPickerSelect
            onValueChange={(value) => {
                this.props.setMoneths(value);
            }}
            placeholder={{
              label: 'Please Select Months',
              value: '',
              color: 'red',
            }}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 20,
                right: 10,
              },
            }}
            Icon={() => {
              return (
                <View
                  style={{
                    backgroundColor: 'transparent',
                    borderTopWidth: 10,
                    borderTopColor: '#cd2026',
                    borderRightWidth: 10,
                    borderRightColor: 'transparent',
                    borderLeftWidth: 10,
                    borderLeftColor: 'transparent',
                    width: 0,
                    height: 0,
                  }}
                />
              );
            }}
            placeholderTextColor={'black'}
            items={[
                { label:"1" ,value:"1" },
                { label:"2" ,value:"2" },
                { label:"3" ,value:"3" },
                { label:"4" ,value:"4" },
                { label:"5" ,value:"5" },
                { label:"6" ,value:"6" },
                { label:"7" ,value:"7" },
                { label:"8" ,value:"8" },
                { label:"9" ,value:"9" },
                { label:"10" ,value:"10" },
                { label:"11" ,value:"11" },
                { label:"12" ,value:"12" }
            ]}
        />
            
                </View>
                </React.Fragment>:<React.Fragment></React.Fragment>}
               
                <View style={styles.MainSection}>
                    <Text style={styles.TitleSection}>
                        Total Amount Payable
                    </Text>
                </View>
                <View style={styles.MainSection1}>
                    <Text style={styles.TitleSection2}>
                    {!this.props.alreadySubcribedToStandered ?this.props.PlanePrice * this.props.month:this.props.TotalPayable}
                    </Text>
                </View>
                <View style={{width:wp('60%'),backgroundColor:'#cd2026',height:wp('0.3%'),marginTop:wp('5%')}} />
                <View style={{width:wp('40%'),backgroundColor:'#cd2026',height:wp('0.3%'),marginTop:wp('5%')}} />
                <TouchableOpacity 
                  disabled={this.props.paymentMethode.length > 2 && this.props.month > 0?false:true}
                  onPress={()=>{
                    Alert.alert(
                      'Confiormation Alert',
                      'Are you sure you wants to proceed to the payment',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => {
                          // this.props.SubscribeToPacakge()
                          // this.props.CloseSubscriontionBox()
                          if(this.props.alreadySubcribedToStandered){
                            this.props.UpgradePacakage()
                          }else{

                            let user_id=this.props.user.id;
                            let totalAmount =this.props.PlanePrice * this.props.month;
                            let pacakageName = this.props.pacakageName; 
                            let totalMonth = this.props.month;
                            let Data = {
                              user_id:user_id,
                              totalAmount:totalAmount,
                              pacakageName:pacakageName,
                              totalMonth:totalMonth,
                              paymentMethod:this.props.paymentMethode
                            }
                            this.props.changeScreen(Data);
                          // this.SubscribeToPacakege()
                          }
                        }},
                      ],
                      {cancelable: false},
                    );
                  }}
                style={[styles.MainSubSection,{backgroundColor:this.props.paymentMethode.length > 2 && this.props.month > 0?'#cd2026':'gray'}]}>
                    <Text style={styles.TitleSection2}>
                      {this.props.alreadySubcribedToStandered?'Upgrade Pacakage':'Subscribe'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() =>{
                  this.props.closeBox();
                }}
                style={styles.MainCancelSection}>
                    <Text style={styles.TitleSection2}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
        </View>    
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
  Section:
  {
    alignItems:'center',
    justifyContent:'center'
  },
  BodySection:
  {
      width:wp('95%'),
    alignItems:'center',
    justifyContent:'center',
    marginTop:wp('2%'),
    backgroundColor:'#f1f1f1',
    elevation:5,
    padding:wp('5%')
  },
  MainSection:
  {
    justifyContent:'center',
    alignItems:'center',
    padding:wp('5%'),
    marginBottom: wp('2%'),
  },
  TitleSection:
  {
    fontSize:16,
    fontWeight:'bold',
    color:'#cd2026',
    
  },
  PickerSection:
  { 
    height: wp('12%'), 
    width:wp('88%'),
    borderColor:'#cd2026',
    borderWidth:1.5,
    borderRadius:3,
   },
   MainSection1:
   {
    flexDirection:'row',
    width:wp('88%'),
    height:wp('12%'),
    borderRadius:5,
    backgroundColor:'#cd2026',
    alignItems:'center',
    justifyContent:'center',
   },

   TitleSection2:
   {
    fontSize:18,
    fontWeight:'bold',
    color:'#fff',
   
   },
   MainSubSection:
   {
    marginTop:wp('15%'),
    width:wp('88%'),
    height:wp('12%'),
    borderRadius:wp('100%'),
    backgroundColor:'#cd2026',
    alignItems:'center',
    justifyContent:'center',
    elevation:5
   },
   MainCancelSection:
   {
    marginTop:wp('3%'),
    width:wp('88%'),
    height:wp('12%'),
    borderRadius:wp('100%'),
    backgroundColor:'#cd2026',
    alignItems:'center',
    justifyContent:'center',
    elevation:5
   },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    // borderWidth:1.5,
    // borderRadius:3,
    borderColor: '#cd2026',
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: '#cd2026',
    // borderWidth:1.5,
    // borderRadius:3,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});



// const mapStateToProps = state => {
//     return {
//       user: state.user.user,
//       isLoading: state.ui.isLoading,
//       InternetInfo:state.ui.InternetInfo,
//       mode:state.user.mode
//     };
//   };
//   const mapsDespathToProps =dispatch =>{
//     return{
//       onloginUser :(authDta) =>dispatch(loginUser(authDta)),
//       checkIfThereIsdata : (authDta) => dispatch(saveUserInfo(authDta))
//     }
//   }
//   export default connect(mapStateToProps,mapsDespathToProps)(OurPlansPay);