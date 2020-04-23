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
import {
    loginUser,
    saveUserInfo,
    GetSubscribedPacakages
} from '../../store/actions/index';
import AsyncStorage from '@react-native-community/async-storage';
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
  FlatList

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
class SubscriptionScreen extends React.Component {
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
    
    componentDidMount =() =>{
     
        this.props.GetSubscribedPacakages()
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
                  visible:false,
                  title:{
                    text:text,
                    alignment:'center'
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
      
  render() {
    let LoginButton =( <View>

        </View>);
        if(this.props.isLoading) {
          LoginButton =(
            <View style={{zIndex:999999,justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'rgba(0,0,0,.6)',position:'absolute',top:0,left: 0,right: 0, bottom: 0,flex: 1}}>
            <ActivityIndicator size={'large'} color={appColor}  />
         </View>
          )
        }
    
    let enable = this.state.scrennSize > hp('100%');
    return (

      <View style={styles.conatainer}>
          <LinearGradient colors={[appColor, '#e03c42','#a30a0f']} style={styles.MainSec}>
              <TouchableOpacity onPress={() =>{
                  Navigation.pop(this.props.componentId);
              }} style={styles.MainHead}>
                  <Icon style={{fontSize:wp('5%'),color:'#fff'}} name="chevron-left" />
              </TouchableOpacity>
              <View style={styles.MainHead1}>
                  <Text style={{fontSize:wp('5%'),color:'#fff',fontWeight:'bold'}}>Subscription</Text>
              </View>
          </LinearGradient>
              {LoginButton}
          <View style={styles.MainBody}>

          <FlatList
        data={this.props.SubscribedChallenges}
        renderItem={({ item }) => {
            console.log(item)
            return(
              <React.Fragment>
             <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'auto',backgroundColor:'red',marginHorizontal:wp('3%'),borderRadius:wp('1%'),padding:wp('1%')}}>
               <Text style={{fontSize:wp('3.5'),color:'white',fontWeight:'bold'}}>
                 {'This is a '}  
                {item.pacakageName == 'premium'?'Gold':'Silver'}
                {' Pacakage'}
               </Text>
             </View>
                <View style={styles.MainBodySec}>
            <View style={{justifyContent:'center',alignItems:'center',marginLeft:wp('2%')}}>
              <View style={styles.MainBodyBox}></View>
            </View>
            <View style={styles.BoxView}>
              <View style={styles.BoxTxt}>
                  <Text style={styles.TxtView}>Paid {item.paymentPaid}</Text>
              </View>
            </View>
            <View style={{width:wp('0.3%'),height:wp('8%'),backgroundColor:'#000',marginTop:wp('5%')}} />
            <View style={{flexDirection:'row', width:wp('45%'),justifyContent:'center',alignItems:'center'}}>
              <View style={styles.SecTo}>
                <Text style={styles.SecToTxt}>{moment(item.pacakageStartDate).format("MMM Do")  }</Text>
              </View>
              <View style={styles.nextTxt}>
                <View style={{width:wp('3%'),height:wp('0.3%'),backgroundColor:'#000',marginTop:wp('5%')}} />
              </View>
              <View style={styles.SecTo}>
                <Text style={styles.SecToTxt}>{moment(item.expiryDate).format("MMM Do")  }</Text>
              </View>
            </View>
            <View style={[styles.BoxTxtView,{backgroundColor:item.pacakageStatus?'green':'#cd2026'}]}>
                <Text style={styles.TxtView11}>{item.pacakageStatus?'SUB':'EXP'}</Text>
            </View>
        </View>
           
        </React.Fragment>
            )
        }}
        keyExtractor={item => item.id}
      />



          </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
   conatainer: {
    flex: 1,
    backgroundColor:'#F7F7F7'
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
    flex:.9,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  MainBody:
  {
    // flexDirection:'column',
    marginTop:wp('3%'),
    marginBottom:wp('5%'),
    // alignContent:'center',
    // alignItems:'center',
    // justifyContent:'center'
  },
  MainBodySec:
  {
    flexDirection:'row',
    // width:wp('85%'),
    height:wp('18%'),
    backgroundColor:'#fff',
    elevation:5,
    marginBottom:wp('3%'),
    borderRadius:3,
    // marginLeft:wp('-7%')

  },
  MainBodyBox:
  {
    width:wp('3%'),
    height:wp('12%'),
    backgroundColor:appColor,
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
    elevation:5
  },
  BoxView:
  {
    flexDirection:'column',
    width:'20%',
    marginRight:wp('4%'),
    marginLeft:wp('1.5%'),
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
  },
  BoxTxt:
  {
  
    marginLeft:wp('2%'),
  
  },
 
  TxtView:
  {
    fontFamily:'Roboto',
    fontSize:wp('3.5%'),
    fontWeight:'bold',
    
  },
  TxtView1:
  {
    fontFamily:'Roboto',
    fontSize:wp('3.5%'),
    fontWeight:'bold',
  },
  SecTo:
  {
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:wp('3%')
  },
  SecToTxt:
  {
    fontFamily:'Roboto',
    fontSize:wp('4%'),
    fontWeight:'bold',
    color:'#cd2026',
  },
  nextTxt:
  {
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:wp('5%'),
    marginTop:wp('-4%')
  },
  BoxTxtView:
  {
    width:wp('15%'),
    height:wp('18%'),
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:wp('6%'),
    backgroundColor:'#cd2026',
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
  },
  TxtView11:
  {
    fontFamily:'Roboto',
    fontSize:wp('3.8%'),
    fontWeight:'bold',
    color:'#fff',
    textAlign:'center'
  },
});



const mapStateToProps = state => {
    return {
      user: state.user.user,
      isLoading: state.ui.isLoading,
      InternetInfo:state.ui.InternetInfo,
      mode:state.user.mode,
      SubscribedChallenges:state.user.SubscribedChallenges
    };
  };
  const mapsDespathToProps =dispatch =>{
    return{
      onloginUser :(authDta) =>dispatch(loginUser(authDta)),
      checkIfThereIsdata : (authDta) => dispatch(saveUserInfo(authDta)),
      GetSubscribedPacakages:()=>dispatch(GetSubscribedPacakages())
    }
  }
  export default connect(mapStateToProps,mapsDespathToProps)(SubscriptionScreen);