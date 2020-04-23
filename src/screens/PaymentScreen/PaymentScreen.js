/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import jazzcash from '../../images/jazzcash.png';
import easypaisa from '../../images/easypaisa.png';
import Cheque from '../../images/Cheque.png';
import easypaisaa from '../../images/easypaisaa.png';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import validate from '../../Validate/Validate';
import {loginUser,saveUserInfo} from '../../store/actions/index';
import AsyncStorage from '@react-native-community/async-storage';
 import * as Animatable from 'react-native-animatable';
 import logo from '../../images/logo.png';
 import Icon from 'react-native-vector-icons/dist/FontAwesome';
 import DatePicker from 'react-native-datepicker'
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
  Button,
  TextInput, 
  TouchableWithoutFeedback, 
  ImageBackground, 
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Modal

} from 'react-native';
import pro_imagee from '../../images/payment.png';
import FastImage from 'react-native-fast-image';
import { Root, Popup, } from 'popup-ui'
import  { ModalContent,SlideAnimation,ModalFooter, ModalButton} from 'react-native-modals';
class PaymentScreen extends React.Component {
  componentDidMount = () =>{
    this.setState(prevState =>{
      
      return {
        inputs: {
          ...prevState.inputs,
          EasypaisaName: {
            ...prevState.inputs.EasypaisaName,
            value: this.props.user.payment_methods.EasyPaisaName,
            valid:this.props.user.payment_methods.EasyPaisaName?this.props.user.payment_methods.EasyPaisaName.length > 3 ?true:false:false,
            touched:false
          },
          EasyPaisaPhone: {
            ...prevState.inputs.EasyPaisaPhone,
            value: this.props.user.payment_methods.EasyPaisaNumber,
            valid:this.props.user.payment_methods.EasyPaisaNumber?this.props.user.payment_methods.EasyPaisaNumber.length > 10?true:false:false,
            touched:false
          },
          JazzCashName: {
            ...prevState.inputs.JazzCashName,
            value: this.props.user.payment_methods.JazzCashName,
            valid:this.props.user.payment_methods.JazzCashName?this.props.user.payment_methods.JazzCashName.length > 3 ?true:false:false,
            touched:false
          },
          JazzCashNumber: {
            ...prevState.inputs.JazzCashNumber,
            value: this.props.user.payment_methods.JazzCashNumber,
            valid:this.props.user.payment_methods.JazzCashNumber?this.props.user.payment_methods.JazzCashNumber.length > 10?true:false:false,
            touched:false
          },
          CardNumber: {
            ...prevState.inputs.CardNumber,
            value: this.props.user.payment_methods.cardnumber,
            valid:this.props.user.payment_methods.cardnumber?this.props.user.payment_methods.cardnumber.length > 15?true:false:false,
            touched:false
          },
          NameOnCard: {
            ...prevState.inputs.NameOnCard,
            value: this.props.user.payment_methods.nameoncard,
            valid:this.props.user.payment_methods.nameoncard?this.props.user.payment_methods.nameoncard.length > 3?true:false:false,
            touched:false
          },
          Expiration: {
            ...prevState.inputs.Expiration,
            value: this.props.user.payment_methods.expiration,
            valid:this.props.user.payment_methods.expiration?this.props.user.payment_methods.expiration.length > 2?true:false:false,
            touched:false
          },
          CVV: {
            ...prevState.inputs.CVV,
            value: this.props.user.payment_methods.cvv,
            valid:this.props.user.payment_methods.cvv?this.props.user.payment_methods.cvv.length > 2?true:false:false,
            touched:false
          },
        },
        editable:this.props.user.payment_methods.EasyPaisaName?this.props.user.payment_methods.EasyPaisaName.length > 3 ?true:false:false,
        jazzeditable:this.props.user.payment_methods.JazzCashName?this.props.user.payment_methods.JazzCashName.length > 3 ?true:false:false,
        creditcardeditable:this.props.user.payment_methods.cardnumber?this.props.user.payment_methods.cardnumber.length > 15 ?true:false:false,
        caneditCreditCard:this.props.user.payment_methods.cardnumber?this.props.user.payment_methods.cardnumber.length > 15 ?false:true:true,
        caneditJazzCash:this.props.user.payment_methods.JazzCashName?this.props.user.payment_methods.JazzCashName.length > 3 ?false:true:true,
        canediteasyPaisa:this.props.user.payment_methods.EasyPaisaName?this.props.user.payment_methods.EasyPaisaName.length > 3 ?false:true:true
      };
      
    })
  }

    state = {
        screenHeight: 0,
        visible:false,
        date:new Date(),
        editable:true,
        canediteasyPaisa:true,
        caneditJazzCash:true,
        caneditCreditCard:true,
        jazzeditable:true,
        isLoading:false,
        jazzVisible:false,
        creditCard:false,
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
          EasypaisaName:{
                value:'',
                valid:false,
                validationRules:{
                  minLength:3
                },
                touched:false,
                warningText:'Your Name Must Be 3 Characters Long'
          },
          EasyPaisaPhone:{
            value:'',
                valid:false,
                validationRules:{
                  minLength:11
                },
                touched:false,
                warningText:'Your Phone Number Must Be 11 Characters Long'
          },
           JazzCashName:{
                value:'',
                valid:false,
                validationRules:{
                  minLength:3
                },
                touched:false,
                warningText:'Your Name Must Be 3 Characters Long'
          },
          JazzCashNumber:{
            value:'',
                valid:false,
                validationRules:{
                  minLength:11
                },
                touched:false,
                warningText:'Your Phone Number Must Be 11 Characters Long'
          },
          CardNumber:{
            value:'',
            valid:false,
            validationRules:{
              minLength:16
            },
            touched:false,
            warningText:'Your Name Must Be 3 Characters Long'
          },
          NameOnCard:{
            value:'',
                valid:false,
                validationRules:{
                  minLength:3
                },
                touched:false,
                warningText:'Your Phone Number Must Be 11 Characters Long'
          },
       Expiration:{
                value:'',
                valid:false,
                validationRules:{
                  minLength:3
                },
                touched:false,
                warningText:'Your Name Must Be 3 Characters Long'
          },
          CVV:{
            value:'',
                valid:false,
                validationRules:{
                  minLength:3
                },
                touched:false,
                warningText:'Your Phone Number Must Be 11 Characters Long'
          },
          address:{
            value:'',
            valid:false,
            validationRules:{
              minLength:3
            },
            touched:false,
            warningText:'Your house name must be at least 3 characters long'
          }
        }
    };
  

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

AddJazzCashCredential = () =>{
  this.setState({
    jazzVisible:false,
    isLoading:true
  })
  fetch(URI +'api/Save/Jazzcash/credentials',{
    method:'POST',
    headers:{
      Accept:'application/json',
      'Content-Type':'application/json',
    },
    body:JSON.stringify({
      'id':this.props.user.id,
      'JazzCashName':this.state.inputs.JazzCashName.value,
      'JazzCashNumber': this.state.inputs.JazzCashNumber.value
    })
  }).then((response) => response.json())
  .then((responseData) =>{
      console.log(responseData);
        this.setState({
          jazzVisible:false,
          isLoading:false
        })
        let userData = {
          ...responseData.data
        };
        let appState = {
          isLoggedIn: true,
          user: userData,
          payment_added:responseData.data.payment_added?true:false,
        };

        AsyncStorage.setItem("appState", JSON.stringify(appState));
  
        this.props.saveUserInfo(appState);
  }).catch((err) =>{
    this.setState({
      jazzVisible:false,
      isLoading:false
    })
      console.log(err);
  })
}

AddCreditCardCredential =() =>{
  this.setState({
    creditCard:false,
    isLoading:true
  })
  fetch(URI +'api/Save/CreditCard/credentials',{
    method:'POST',
    headers:{
      Accept:'application/json',
      'Content-Type':'application/json',
    },
    body:JSON.stringify({
      'id':this.props.user.id,
      'CardNumber':this.state.inputs.CardNumber.value,
      'NameOnCard': this.state.inputs.NameOnCard.value,
      'CVV': this.state.inputs.CVV.value,
      'Expiration': this.state.inputs.Expiration.value,
    })
  }).then((response) => response.json())
  .then((responseData) =>{
      console.log(responseData);
        this.setState({
          creditCard:false,
          isLoading:false
        })
        let userData = {
          ...responseData.data
        };
        let appState = {
          isLoggedIn: true,
          user: userData,
          payment_added:responseData.data.payment_added?true:false,
        };

        AsyncStorage.setItem("appState", JSON.stringify(appState));
  
        this.props.saveUserInfo(appState);
  }).catch((err) =>{
    this.setState({
      creditCard:false,
      isLoading:false
    })
      console.log(err);
  })
}
AddEasyPaisaCredential = () =>{
  this.setState({
    visible:false,
    isLoading:true
  })
  fetch(URI +'api/Save/Easypaisa/credentials',{
    method:'POST',
    headers:{
      Accept:'application/json',
      'Content-Type':'application/json',
    },
    body:JSON.stringify({
      'id':this.props.user.id,
      'EasyPaisaName':this.state.inputs.EasypaisaName.value,
      'EasyPaisaPhone': this.state.inputs.EasyPaisaPhone.value
    })
  }).then((response) => response.json())
  .then((responseData) =>{
      console.log(responseData);
        this.setState({
          visible:false,
          isLoading:false
        })
        let userData = {
          ...responseData.data
        };
        let appState = {
          isLoggedIn: true,
          user: userData,
          payment_added:responseData.data.payment_added?true:false,
        };

        AsyncStorage.setItem("appState", JSON.stringify(appState));
  
        this.props.saveUserInfo(appState);
  }).catch((err) =>{
    this.setState({
      visible:false,
      isLoading:false
    })
      console.log(err);
  })
}
OnFieldTextChangeOfNumber = (text,field) => {
  let connectedValue = {};

    //  let checkZero = text.replace(/^0+(?=\d)/,'');
      // let number = text.replace(/[^0-9]/g, '');

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
    onContentSizeChange = (contentWidth, contentHeight) => {
        // Save the content height in state
        content = contentHeight + 200;
        this.setState({ screenHeight: content });
    };
    onContentSizeChange = (screenWidth,screenHeight) =>{
      this.setState({
        scrennSize:screenHeight
      })
    };
  render() {
  
    let enable = this.state.scrennSize > hp('20%');
    let LoginButton =( <View>

      </View>);
      if(this.state.isLoading) {
        LoginButton =(
          <View style={{zIndex:999999,justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'rgba(0,0,0,.6)',position:'absolute',top:0,left: 0,right: 0, bottom: 0,flex: 1}}>
          <ActivityIndicator size={'large'} color={appColor}  />
       </View>
        )
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
                    <Text style={{fontSize:wp('5%'),color:'#fff',fontWeight:'bold'}}>Payment Gateway</Text>
                </View>
            </View>
            {LoginButton}
            <View style={styles.MainBody}>
                <View style={styles.MainBodySec}>
                    <View style={styles.MainBodyImg}>
                        <FastImage style={styles.top_img} source={pro_imagee} />
                    </View>
                </View>
                <ScrollView scrollEnabled={enable}  showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator ={false}
                        onContentSizeChange={this.onContentSizeChange}>
                        <View>          
                        <View style={styles.Section}>
                          <View style={styles.SectionHeading}>
                              <Text style={styles.SectionHeadingTxt}>Select Your payment Method</Text>
                          </View>
                          <View style={{width: wp('20%'),height:wp('0.5%'),backgroundColor:appColor,marginBottom:wp('1.5%'),}} />
                          <View style={{width: wp('5%'),height:wp('0.5%'),backgroundColor:appColor,marginBottom:wp('5%')}} />
                          <TouchableOpacity   onPress={() => {
                                this.setState({ visible: true });
                                }}
                          style={styles.SectionBody}>
                              <View style={styles.SectionBodyIcon}>
                                  <Image style={styles.SectionBodyIconView} source={easypaisa}/>
                              </View>
                              <View style={styles.SectionBodyTxt}>
                                  <Text style={styles.SectionBodyTxtView}>EasyPaisa</Text>
                              </View> 
                          </TouchableOpacity>
                          {/* Easy Paisa Account */}
                          <Modal
                                visible={this.state.visible}
                                onRequestClose={() =>{
                                  this.setState({
                                    visible:false
                                  })
                                }}
                                // transparent={true}
                                style={{backgroundColor:'transparent'}}
                                >

                                <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'auto'}}> 
                                <View style={styles.body_view}>
                                    <View style={styles.body_icon}>
                                            <Image style={styles.body_icon_view} source={easypaisaa} />
                                            <Text style={styles.body_txt_view}>Easypaisa Account</Text>
                                    </View>
                                </View>
                                <View style={{felx:1,flexDirection:'column',marginTop:wp('4%')}}>
                                    <Text style={styles.body_txt_view11}>Account Title</Text>
                                        <View style={styles.body_content}>
                                            <View style={{flex:4,alignContent:'center',justifyContent:'center',}}>
                                                <TextInput 
                                                editable={this.state.editable?false:true}
                                                style={styles.body_txt_view1} 
                                                onChangeText={(text) => this.onFieldTextChange(text,'EasypaisaName')} 
                                                value={this.state.inputs.EasypaisaName.value}
                                                placeholder="Enter your Account Title"

                                                ></TextInput>
                                            </View>
                                        </View>
                                </View>
                                <View style={{felx:1,flexDirection:'column'}}>
                                    <Text style={styles.body_txt_view11}>Account Number</Text>
                                        <View style={styles.body_content}>
                                            <View style={{flex:4,alignContent:'center',justifyContent:'center',}}>
                                                <TextInput 
                                                editable={this.state.editable?false:true}
                                                style={styles.body_txt_view1}
                                                maxLength={11}
                                                value={this.state.inputs.EasyPaisaPhone.value}
                                                onChangeText={(text) => {
                                                 let checked= text.replace(/[^0-9]/g, '');
                                                  this.OnFieldTextChangeOfNumber(checked,'EasyPaisaPhone')
                                                }} 
                                                placeholder="Enter your Account Number"

                                                 >

                                                 </TextInput>
                                            </View>
                                        </View>
                                </View>
                                <View style={{felx:1,flexDirection:'column',marginTop:wp('15%')}}>
                                    <TouchableOpacity 
                                    disabled={this.state.inputs.EasyPaisaPhone.valid && this.state.inputs.EasypaisaName.valid ? false:true}
                                    onPress={() =>{
                                      this.AddEasyPaisaCredential()
                                    }} style={[styles.body_txt_view111,{backgroundColor:this.state.inputs.EasyPaisaPhone.valid && this.state.inputs.EasypaisaName.valid ? 'green':'gray'}]}>
                                      <Text style={styles.body_txt_btn}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{felx:1,flexDirection:'column',marginTop:wp('10%')}}>
                                    <TouchableOpacity onPress={() =>{
                                      this.setState({
                                        visible:false
                                      })
                                    }} style={styles.body_txt_view111}>
                                      <Text style={styles.body_txt_btn}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>

                                </View>
                                
                              </Modal>

                              {/* JazzCash Account */}
                              <Modal
                                visible={this.state.jazzVisible}
                                onRequestClose={() =>{
                                  this.setState({
                                    jazzVisible:false
                                  })
                                }}
                                // transparent={true}
                                style={{backgroundColor:'transparent'}}
                                >

                                <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'auto'}}> 
                                <View style={styles.body_view}>
                                    <View style={styles.body_icon}>
                                            <Image style={styles.body_icon_view} source={easypaisaa} />
                                            <Text style={styles.body_txt_view}>JazzCash Account</Text>
                                    </View>
                                </View>
                                <View style={{felx:1,flexDirection:'column',marginTop:wp('4%')}}>
                                    <Text style={styles.body_txt_view11}>Account Title</Text>
                                        <View style={styles.body_content}>
                                            <View style={{flex:4,alignContent:'center',justifyContent:'center',}}>
                                                <TextInput 
                                                editable={this.state.jazzeditable?false:true}
                                                style={styles.body_txt_view1} 
                                                onChangeText={(text) => this.onFieldTextChange(text,'JazzCashName')} 
                                                value={this.state.inputs.JazzCashName.value}
                                                placeholder="Enter your Account Title"

                                                ></TextInput>
                                            </View>
                                        </View>
                                </View>
                                <View style={{felx:1,flexDirection:'column'}}>
                                    <Text style={styles.body_txt_view11}>Account Number</Text>
                                        <View style={styles.body_content}>
                                            <View style={{flex:4,alignContent:'center',justifyContent:'center',}}>
                                                <TextInput 
                                                editable={this.state.jazzeditable?false:true}
                                                style={styles.body_txt_view1}
                                                maxLength={11}
                                                value={this.state.inputs.JazzCashNumber.value}
                                                onChangeText={(text) => {
                                                 let checked= text.replace(/[^0-9]/g, '');
                                                  this.OnFieldTextChangeOfNumber(checked,'JazzCashNumber')
                                                }} 
                                                placeholder="Enter your Account Number"

                                                 >

                                                 </TextInput>
                                            </View>
                                        </View>
                                </View>
                                <View style={{felx:1,flexDirection:'column',marginTop:wp('15%')}}>
                                    <TouchableOpacity 
                                    disabled={this.state.inputs.JazzCashName.valid && this.state.inputs.JazzCashNumber.valid ? false:true}
                                    onPress={() =>{
                                      this.AddJazzCashCredential()
                                    }} style={[styles.body_txt_view111,{backgroundColor:this.state.inputs.JazzCashNumber.valid && this.state.inputs.JazzCashName.valid ? 'green':'gray'}]}>
                                      <Text style={styles.body_txt_btn}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{felx:1,flexDirection:'column',marginTop:wp('10%')}}>
                                    <TouchableOpacity onPress={() =>{
                                      this.setState({
                                        jazzVisible:false
                                      })
                                    }} style={styles.body_txt_view111}>
                                      <Text style={styles.body_txt_btn}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>

                                </View>
                                
                              </Modal>

                              {/* Pay by Credit Cart */}

                              <Modal
                                visible={this.state.creditCard}
                                onRequestClose={() =>{
                                  this.setState({
                                    creditCard:false
                                  })
                                }}
                                // transparent={true}
                                style={{backgroundColor:'transparent'}}
                                >
<ScrollView>


                                <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'auto'}}> 
                                <View style={styles.body_view}>
                                    <View style={styles.body_icon}>
                                            <Image style={styles.body_icon_view} source={easypaisaa} />
                                            <Text style={styles.body_txt_view}>Credit/Debit Card </Text>
                                    </View>
                                </View>
                                <View style={{felx:1,flexDirection:'column',marginTop:wp('4%')}}>
                                    <Text style={styles.body_txt_view11}>Card Number</Text>
                                        <View style={styles.body_content}>
                                            <View style={{flex:4,alignContent:'center',justifyContent:'center',}}>
                                                <TextInput 
                                                editable={this.state.creditcardeditable?false:true}
                                                style={styles.body_txt_view1} 
                                                onChangeText={(text) => {
                                                  let checked= text.replace(/[^0-9]/g, '');
                                                  this.onFieldTextChange(checked,'CardNumber')
                                                }} 
                                                maxLength={16}
                                                value={this.state.inputs.CardNumber.value}
                                                placeholder="Card Number"

                                                ></TextInput>
                                            </View>
                                        </View>
                                </View>
                                <View style={{felx:1,flexDirection:'column'}}>
                                    <Text style={styles.body_txt_view11}>Name on Card</Text>
                                        <View style={styles.body_content}>
                                            <View style={{flex:4,alignContent:'center',justifyContent:'center',}}>
                                                <TextInput 
                                                editable={this.state.creditcardeditable?false:true}
                                                style={styles.body_txt_view1}
                                                value={this.state.inputs.NameOnCard.value}
                                                onChangeText={(text) => {
                                                //  let checked= text.replace(/[^0-9]/g, '');
                                                  this.OnFieldTextChangeOfNumber(text,'NameOnCard')
                                                }} 
                                                placeholder="Name on card"

                                                 >

                                                 </TextInput>
                                            </View>
                                        </View>
                                </View>
                                <TouchableOpacity    onPress={()=> this.DatePicker.onPressDate()}
                                style={{felx:1,flexDirection:'column'}}>
                                <Text style={styles.body_txt_view11}>Expiration(MM/YY)</Text>
                                        <View style={styles.body_content}>
                                            <View style={{flex:4,alignContent:'center',justifyContent:'center',}}>
                                                <TextInput 
                                                editable={this.state.creditcardeditable?false:true}
                                                editable={false}
                                                style={styles.body_txt_view1}
                                                maxLength={11}
                                                value={this.state.inputs.Expiration.value}
                                                onChangeText={(text) => {
                                                //  let checked= text.replace(/[^0-9]/g, '');
                                                  this.OnFieldTextChangeOfNumber(text,'Expiration')
                                                }} 
                                                placeholder="Expiration(MM/YY)"

                                                 >

                                                 </TextInput>
                                            </View>
                                        </View>
                                </TouchableOpacity>

                                <View style={{felx:1,flexDirection:'column'}}>
                                    <Text style={styles.body_txt_view11}>CVV</Text>
                                        <View style={styles.body_content}>
                                            <View style={{flex:4,alignContent:'center',justifyContent:'center',}}>
                                                <TextInput 
                                                editable={this.state.creditcardeditable?false:true}
                                                style={styles.body_txt_view1}
                                                maxLength={3}
                                                value={this.state.inputs.CVV.value}
                                                onChangeText={(text) => {
                                                 let checked= text.replace(/[^0-9]/g, '');
                                                  this.OnFieldTextChangeOfNumber(checked,'CVV')
                                                }} 
                                                placeholder="CVV"

                                                 >

                                                 </TextInput>
                                            </View>
                                        </View>
                                </View>
                                <View style={{felx:1,flexDirection:'column',marginTop:wp('6%')}}>
                                    <TouchableOpacity 
                                    disabled={this.state.inputs.CardNumber.valid && this.state.inputs.NameOnCard.valid && this.state.inputs.Expiration.valid && this.state.inputs.CVV.valid && this.state.creditcardeditable && this.state.caneditCreditCard ? false:true}
                                    onPress={() =>{
                                      this.AddCreditCardCredential()
                                    }} style={[styles.body_txt_view111,{backgroundColor:this.state.inputs.CardNumber.valid && this.state.inputs.NameOnCard.valid && this.state.inputs.Expiration.valid && this.state.inputs.CVV.valid && this.state.creditcardeditable && this.state.caneditCreditCard ?  'green':'gray'}]}>
                                      <Text style={styles.body_txt_btn}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{felx:1,flexDirection:'column',marginTop:wp('6%')}}>
                                    <TouchableOpacity onPress={() =>{
                                      this.setState({
                                        creditCard:false
                                      })
                                    }} style={styles.body_txt_view111}>
                                      <Text style={styles.body_txt_btn}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:0}}>
<DatePicker
        style={{}}
        date={this.state.date}
        // showTime={{ use12Hours: true, format: "HH:mm a" }}
        ref={ref =>{this.DatePicker = ref}}
        mode="date"
        
        format="MM-YY"
        hideText={true}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        androidMode='spinner'
        minuteInterval={10}
        customStyles={{
          dateIcon: {
            display:'none'
          },
          dateInput: {
            borderWidth:0,
            color:'black'
          },
          dateText:{
            //fontSize:wp('4%'),
            fontSize:wp('5.5%'),color:'black',fontWeight:'600'
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {
          this.setState((prevState) =>{
            return {
              inputs: {
                ...prevState.inputs,
                Expiration: {
                  ...prevState.inputs.name,
                  value:date,
                  valid:true,
                  touched:false
                }
              
            }
          }
          })
        }}
      />
                                </View>
                                </View>
                                </ScrollView>
                              </Modal>
                          <TouchableOpacity
                          onPress={() =>{
                            this.setState({
                              jazzVisible:true
                            })
                          }}
                          style={styles.SectionBody}>
                              <View style={styles.SectionBodyIcon}>
                                  <Image style={styles.SectionBodyIconView} source={jazzcash}/>
                              </View>
                              <View style={styles.SectionBodyTxt}>
                                  <Text style={styles.SectionBodyTxtView}>Jazz Cash</Text>
                              </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                          onPress={() =>{
                            this.setState({
                              creditCard:true
                            })
                          }}
                          style={styles.SectionBody}>
                              <View style={styles.SectionBodyIcon}>
                                  <Image style={styles.SectionBodyIconView} source={Cheque}/>
                              </View>
                              <View style={styles.SectionBodyTxt}>
                                  <Text style={styles.SectionBodyTxtView}>Bank Cheque</Text>
                              </View>
                          </TouchableOpacity>
                          <View style={{width: wp('30%'),height:wp('0.5%'),backgroundColor:appColor,marginBottom:wp('2%'),marginTop:wp('5%')}} />
                        </View>
                        </View>
                </ScrollView> 
            </View>
        
      </View>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
   conatainer: {
    flex: 1,
    backgroundColor:'#e8e8e8'
  },
  MainSec:
  {
    flexDirection:'row',
    width:wp('100%'),
    height:Platform.OS==='ios'? wp('25%'):wp('15%'),
    alignContent:'center',
    alignItems:'center',
    backgroundColor:appColor,
    
  },
  MainHead:
  {
    marginLeft:wp('3%'),
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
    flexDirection:'column',
    
  },
  MainBodySec:
  { 
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
  
    marginBottom:wp('5%'),
    
  },
  MainBodyImg:
  {
    width:wp('100%'),
    padding:20,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    
  },
  top_img:
  {
      width:wp('60%'),
      height:wp('50%'),
      resizeMode:'contain'
  },
  Section:
  {
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:wp('2%'),
  },
  SectionHeading:
  {
    flexDirection:'column',
    marginBottom:wp('5%')
  },
  SectionHeadingTxt:
  {
    fontFamily:'Roboto',
    fontSize:wp('4.5%'),
    fontWeight:'bold'
  },
  SectionBody:
  {
    flexDirection:'row',
    backgroundColor:'#fff',
    width:wp('80%'),
    height:wp('12%'),
    borderRadius:5,
    elevation:5,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:wp('3%'),
  },
  SectionBodyIcon:
  {
    flex:0.3
  },
  SectionBodyIconView:
  {
    width:wp('8%'),
    height:wp('8%'),
    marginLeft:wp('4%')
  },
  SectionBodyTxt:
  {
    flex:0.9
  },
  SectionBodyTxtView:
  {
    fontFamily:'Roboto',
    fontSize:wp('4%'),
    fontWeight:'bold'
  },
  body_view:
  {
      alignItems:'center',
      alignContent:'center',
      justifyContent:'center',
      height:wp('10%'),
      marginTop:wp('5%')
  },
  body_head:
  {
      textAlign:'center',
      alignContent:'center',
      justifyContent:'center',
  },
  body_icon:
  {    
      flexDirection:'row',
      alignItems:'center',
      alignContent:'center',
      justifyContent:'center',
  },
  body_content:
  {
      height:wp('12%'),
      width:wp('90%'),
      borderColor:'#eaf0f5',
      borderWidth:2,
      marginLeft:wp('2%'),
      marginRight:wp('2%'),
      marginTop:wp('1%'),
      alignContent:'center',
      justifyContent:'center',
  },
  body_icon_view:
  {
      width:wp('15%'),
      height:wp('15%'),
      resizeMode:'contain',
  },
  body_txt_view:
  {
      fontSize:hp('3%'),
      marginLeft:wp('2%'),  
      

  },
  body_txt_view11:
  {
      fontSize:hp('2.4%'),
      padding:15,
      marginTop:wp('2%')
  },
  body_txt_view1:
  {
      fontSize:hp('2.2%'),
      padding:12,
      color:'#000000',
  },
  body_txt_view111:
  {
      backgroundColor:'green',
      borderColor:'green',
      width:wp('90%'),
      borderRadius:5,
      height:wp('12%'),
      textAlign:'center',
      alignContent:'center',
      justifyContent:'center',
  },
  body_arrow_view:
  {
      color:'green',
      fontSize:hp('2.5%')
  },
  body_txt_btn:
  {
      textAlign: 'center',
      fontSize:hp('3.5%'),
      color:'#fff',
      fontWeight:'bold'

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
      saveUserInfo : (authDta) => dispatch(saveUserInfo(authDta))
    }
  }
  export default connect(mapStateToProps,mapsDespathToProps)(PaymentScreen);