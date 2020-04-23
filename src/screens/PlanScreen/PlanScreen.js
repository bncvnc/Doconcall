/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import email_icon from '../../images/newIcons/icon1.png';
import ServiceIcon from '../../images/ServiceIcon.png';
import Silver from '../../images/silver.jpg';
import Gold from '../../images/gold.jpg';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import validate from '../../Validate/Validate';
import {
  loginUser,
  saveUserInfo,
  SubscribeToPacakge
} from '../../store/actions/index';
import AsyncStorage from '@react-native-community/async-storage';
 import * as Animatable from 'react-native-animatable';
 import logo from '../../images/logo.png';
 import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { appColor, URI } from '../../components/variables/variables';
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
  Animated,
  Easing,
  Picker,
  Alert,
  Modal
} from 'react-native';
import bg1 from '../../images/bg1.jpg';
import { Root, Popup, } from 'popup-ui'
import DefaultButton from '../../components/DefaultButton/DefaultButton';
import RNPickerSelect from 'react-native-picker-select';
import OurPlansPay from '../OurPlansPay/OurPlansPay';
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
class PlanScreen extends React.Component {


    onContentSizeChange = (contentWidth, contentHeight) => {
        // Save the content height in state
        content = contentHeight + 200;
        this.setState({ screenHeight: content });
    };
    constructor(props){
        super(props);
      // AsyncStorage.setItem("ComponentId", JSON.stringify(this.props.componentId));
      Navigation.events().bindComponent(this);
      this._CheckForSubscription();
    }
    componentDidMount() {
    }

    _CheckForSubscription = () =>{
        fetch(URI +'api/Check/Subscribed/Pacakage?user_id='+this.props.user.id)
        .then((response) =>response.json())
        .then((responseData) =>{
          console.log(responseData)
          if(responseData.success){
            this.setState({
              alreadySubcribedToStandered:responseData.data.pacakageName =='standard' ?true:false,
              alreadySubcribedToPremium:responseData.data.pacakageName =='premium' ?true:false,
              ...responseData.data,
              TotalPayable:responseData.TotalPayable,
              month:2,
            })
          }
        }).catch((err) =>{
          console.log(err);
        })
    }
    
    componentWillReceiveProps(){
      AsyncStorage.setItem("ComponentId", JSON.stringify(this.props.componentId));
    
     
    }
    
      state={
        AnimateSubscriptionBox: new Animated.Value(0),
        viewState:true,
        alreadySubcribedToStandered:false,
        emailFocused:false,
        screenHeight: 0,
        showModalVisible:false,
        PlanePrice:0,
        paymentMethode:'',
        pacakageName:'',
        month:0,
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

    OpenSubscriptionBox=(price,pacakageName)=>{
      this.setState({
        PlanePrice:price,
        pacakageName:pacakageName,
        showModalVisible:true
      })
      // Animated.spring(this.state.AnimateSubscriptionBox, {
      //   toValue : hp('88%'),
      //   timing : 3000,
      //   easing: Easing.bounce,
      // }).start(()=>{
  
      //   this.setState({
      //     viewState : false,
      //     showWheretoSearch:false,
      //     focuse:true
      //   })
      // });

    }
    CloseSubscriontionBox=()=>{
      this.setState({
        viewState:true
      })
        Animated.spring(this.state.AnimateSubscriptionBox, {
          toValue : 0,
          timing : 5000,
          easing: Easing.back,
        }).start(()=>{
          
          this.setState({
            viewState: true,
            showWheretoSearch:true,
            focuse:false
          })
        }
        );
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
      changeScreen = (screen,text,extraPropos) =>{
        AsyncStorage.setItem("screen", JSON.stringify(screen));
          Navigation.push(this.props.componentId, {
            component: {
              name: screen,
              passProps: {
                  ...extraPropos
              },
              options: {
                topBar: {
                  background: {
                    color: '#cd2026'
                  },
                  visible:true,
                  title:{
                    text:'Subscribe',
                    alignment:'center',
                    color:'white'
                  }
                },
                sideMenu: {
                  left: {
                      visible: false,
                      enabled: false
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

    SubscribeToPacakege = () =>{
      let user_id=this.props.user.id;
      let totalAmount =this.state.PlanePrice * this.state.month;
      let pacakageName = this.state.pacakageName; 
      let totalMonth = this.state.month;
      let Data = {
        user_id:user_id,
        totalAmount:totalAmount,
        pacakageName:pacakageName,
        totalMonth:totalMonth,
        paymentMethod:this.state.paymentMethode
      }
      this.props.SubscribeToPacakge(Data);
    }
    UpgradePacakage = () =>{
      fetch(URI +'api/upgradePackage',{
        method:"POST",
        headers: {
            Accept:'application/json',
            'Content-Type':'application/json',
            },
            body:JSON.stringify({
                "userId":this.props.user.id
            }),
      }).then((response) =>response.json())
      .then((responseData) =>{
        if(responseData.success){
          alert('Succesfully Upgradeed Your Pacakage')
        }
      }).catch((err) =>{
        console.log(err);
      }) 
    }
      
  render() {
    console.log(this.state);
    let LoginButton =( <View>

      </View>);
      if(this.props.isLoading) {
        LoginButton =(
          <View style={{zIndex:999999,justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'rgba(0,0,0,.6)',position:'absolute',top:0,left: 0,right: 0, bottom: 0,flex: 1}}>
          <ActivityIndicator size={'large'} color={appColor}  />
       </View>
        )
      }
    let enable = this.state.scrennSize > hp('50%');
    const SectionAnimationStyle = {
      height : this.state.AnimateSubscriptionBox,
    }
    return (
      <Root>

      
      <View style={styles.conatainer}>
            <View style={styles.MainSec}>
                <TouchableOpacity onPress={() =>{
                    Navigation.pop(this.props.componentId)
                }} style={styles.MainHead}>
                    <Icon style={{fontSize:wp('5%'),color:'#fff'}} name="chevron-left" />
                </TouchableOpacity>
                <View style={styles.MainHead1}>
                    <Text style={{fontSize:wp('5%'),color:'#fff',fontWeight:'bold'}}>Our Plans</Text>
                </View>
            </View>
            {LoginButton}
              <ScrollView scrollEnabled={enable}  showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator ={false}
                    onContentSizeChange={this.onContentSizeChange}>
                      
                <View style={styles.MainSection}>
                    <View style={styles.SectionBody}>
                        <View style={styles.SectionBodyImg}>
                            <Image style={styles.SectionImg} source={Silver} />   
                        </View>
                        <View style={styles.SectionBodyTxt}>
                            <View style={styles.SectionBodyTxtView}>
                                <View style={{flexDirection:'row'}}>
                                    <Icon style={styles.IconBody} name="angle-right" />    
                                    <Text style={styles.NextBodyTxt}  >covers upto 3 house members</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Icon style={styles.IconBody} name="angle-right" />    
                                    <Text style={styles.NextBodyTxt}>Upto 3 daily visits</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Icon style={styles.IconBody} name="angle-right" />    
                                    <Text style={styles.NextBodyTxt}>24 hours 7 days a week service</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Icon style={styles.IconBody} name="angle-right" />    
                                    <Text style={styles.NextBodyTxt}>Doctor  and Nurse visit</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Icon style={styles.IconBody} name="angle-right" />    
                                    <Text style={styles.NextBodyTxt}>Free Ambulance in Emergency</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Icon style={styles.IconBody} name="angle-right" />    
                                    <Text style={styles.NextBodyTxt}>Monthly Renewal</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.BtnSec}>
                            <TouchableOpacity onPress={() =>{
                              if(this.state.alreadySubcribedToPremium){
                                alert('You are already subscribed to a premimum pacakage which is still active.If you wants to downgrade to silver pacakage please contact admin')
                                return;
                              }
                              if(this.state.alreadySubcribedToStandered){
                                alert('You are already subscribed to a silver pacakage which is still active.If you wants to upgrade your pacakge please get gold one')
                                return;
                              }
                              this.OpenSubscriptionBox(400,'standard')
                            }} style={styles.BtnSeTxt}>
                                    <Text style={styles.NextBodyTxtt}>Choose Plan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.SectionBody}>
                        <View style={styles.SectionBodyImg}>
                            <Image style={styles.SectionImg} source={Gold} />   
                        </View>
                        <View style={styles.SectionBodyTxt}>
                            <View style={styles.SectionBodyTxtView}>
                                <View style={{flexDirection:'row'}}>
                                    <Icon style={styles.IconBody} name="angle-right" />    
                                    <Text style={styles.NextBodyTxt}>Covers up to 7 house members</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Icon style={styles.IconBody} name="angle-right" />    
                                    <Text style={styles.NextBodyTxt}>Home Driver, Gardner, Butler and Maid covered</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Icon style={styles.IconBody} name="angle-right" />    
                                    <Text style={styles.NextBodyTxt}>Upto 3 daily visits</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Icon style={styles.IconBody} name="angle-right" />    
                                    <Text style={styles.NextBodyTxt}>24 hours 7 days a week service</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Icon style={styles.IconBody} name="angle-right" />    
                                    <Text style={styles.NextBodyTxt}>Doctor  and Nurse visit</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Icon style={styles.IconBody} name="angle-right" />    
                                    <Text style={styles.NextBodyTxt}>Free Ambulance in Emergency</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Icon style={styles.IconBody} name="angle-right" />    
                                    <Text style={styles.NextBodyTxt}>Monthly Renewal</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.BtnSec}>
                            <TouchableOpacity onPress={() =>{

if(this.state.alreadySubcribedToPremium){
  alert('You are already subscribed to a premimum pacakage which is still active.')
  return;
}
                               this.OpenSubscriptionBox(900,'premium');
                            }} style={styles.BtnSeTxtt}>
                                    <Text style={styles.NextBodyTxtt}>{this.state.alreadySubcribedToStandered?'Upgrade Plane':'Choose Plan'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>   
                <Modal
                visible={this.state.showModalVisible}
                onRequestClose={() =>{
                  this.setState({
                    showModalVisible:false
                  })
                }}
                transparent={false}
                >     

                <OurPlansPay
                alreadySubcribedToStandered={this.state.alreadySubcribedToStandered}
                PlanePrice={this.state.PlanePrice}
                paymentMethode={this.state.paymentMethode}
                month={this.state.month}
                TotalPayable={this.state.TotalPayable}
                setMoneths ={(Month) =>{
                  this.setState({month: Month})
                }}
                setPaymenTMethcode ={(Month) =>{
                  this.setState({paymentMethode: Month})
                }}
                UpgradePacakage={() =>{
                  this.UpgradePacakage()
                }}
                changeScreen={(Data) =>{
                  this.setState({
                    showModalVisible:false
                  })
                  this.changeScreen('doconcall.EmoneyRequest','Payment',Data);
                }}
                closeBox={() =>{
                  this.setState({
                    showModalVisible:false
                  })
                }}
                pacakageName={this.state.pacakageName}
                user={this.props.user}
                />

                </Modal>
               
            </ScrollView>
       
                
      </View>

      </Root>
    );
  }
}

const styles = StyleSheet.create({
   conatainer: {
    flex: 1,
    backgroundColor:'#f0f0f0',
    zIndex:0
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
    // marginLeft:wp('3%'),
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
  MainSection:
  {
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    marginTop:wp('5%'),
    marginBottom:wp('5%')
  },
  SectionBody:
  {
      width:wp('90%'),
      backgroundColor:'#fff',
      borderRadius:5,
      elevation:5,
      marginBottom:wp('5%')

  },
  SectionBodyImg:
  {
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    
  },
  SectionImg:
  {
    width:wp('90%'),
    height:wp('60%'),
    resizeMode:'stretch',
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
  },
  SectionBodyTxt:
  {
    alignContent:'flex-start',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    marginLeft:wp('10%')
  },
  SectionBodyTxtView:
  {
      flexDirection:'column',
      marginTop:wp('5%')
  },
  IconBody:
  {
      fontSize:wp('5%'),
      color:'#cd2026',
      marginRight: wp('2%'),
    },
  NextBodyTxt:
  {
    fontFamily:'Roboto',
    fontSize:wp('4%'),
    fontWeight:'bold',
    textTransform:'capitalize',
    color:'#000'
  },
  BtnSec:
  {
    
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    marginTop:wp('5%'),
    marginBottom:wp('4%')
  },
  BtnSeTxt:
  {
    backgroundColor:'#cd2026',
    width:wp('50%'),
    height:wp('10%'),
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5,
    elevation:4
  },
  BtnSeTxtt:
  {
    backgroundColor:'#51a6ff',
    width:wp('50%'),
    height:wp('10%'),
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5,
    elevation:4
  },
  NextBodyTxtt:
  {
    fontFamily:'Roboto',
    fontSize:wp('4.2%'),
    fontWeight:'bold',
    color:'#fff'
  },
  bottomViewOuter:{
    position:'absolute',
    bottom:0,
    zIndex:19121,

  },
  ShowPaymentMethodsOuterView:{
    flex:0,
    // justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    // alignSelf:'auto'

  },
  PaymentPlanMonths:{
    flex:1,
    // justifyContent:Platform.OS==='android'?'flex-start':'center',
    // alignContent:'center',
    // alignItems:'center',
  },
  PaymentPlanPrice:{
    flex:.5,
    justifyContent:Platform.OS==='android'?'flex-start':'center',
    alignContent:'center',
    alignItems:'center',
  },
  SubmitButtonPaymentPlan:{
    flex:0
  },
  CloseButton:{
    flex:0
  },
  PaymentPayableHeader:{
    fontSize:wp('4%'),
    fontWeight:'bold',
    color:appColor,
    padding:wp('2.5%')
  }

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
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
      checkIfThereIsdata : (authDta) => dispatch(saveUserInfo(authDta)),
      SubscribeToPacakge:(subscriptionData)=>dispatch(SubscribeToPacakge(subscriptionData))
    }
  }
  export default connect(mapStateToProps,mapsDespathToProps)(PlanScreen);