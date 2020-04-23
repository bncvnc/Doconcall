
import React, {Fragment} from 'react';
import email_icon from '../../images/newIcons/icon1.png';
import contact from '../../images/contact.png';
import emailpage from '../../images/emailpage.png';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import validate from '../../Validate/Validate';
import {loginUser,saveUserInfo} from '../../store/actions/index';
import AsyncStorage from '@react-native-community/async-storage';
 import * as Animatable from 'react-native-animatable';
 import reffered from '../../images/reffered.png';
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
  Button,
  FlatList,

} from 'react-native';
import pro_imagee from '../../images/edirPro.png';
import FastImage from 'react-native-fast-image';
class ReferredScreen extends React.Component {
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
      this._GetReferedFriends();
    }
    
    
    componentWillReceiveProps(){
      AsyncStorage.setItem("ComponentId", JSON.stringify(this.props.componentId));
    
     
    }
    
      state={
        
        emailFocused:false,
        scrennSize:0,
        emailBlured:false,
        passwordFocused:false,
        referedFreinds:[],
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

    _GetReferedFriends = () =>{
      fetch(URI+'api/ShowRefereFriendsList?user_id='+this.props.user.id)
      .then((response) => response.json())
      .then((responseData) =>{
          console.log(responseData);
          if(responseData.success) {
            this.setState({
              referedFreinds:responseData.data,
              ReferLimit:responseData.ReferLimit
            })
          }
      }).catch((err) =>{
        console.log(err);
      })
    }

    _RefereFrind = () =>{
      fetch(URI +'api/Refer/Friends',{
        method:"POST",
        headers: {
            Accept:'application/json',
            'Content-Type':'application/json',
            },
            body:JSON.stringify({
                "user_id":this.props.user.id,
                "email":this.state.inputs.email.value
            }),
      }).then((response) =>response.json())
      .then((responseData) =>{
        console.log(responseData);
        if(responseData.success){
          alert('Succesfully Refered Your Friend');
          this._GetReferedFriends();
        }
      }).catch((err) =>{
        console.log(err);
      }) 
    }
      
  render() {

      console.log(this.state.referedFreinds);
    let enable = this.state.scrennSize > hp('100%');
    return (
      <View style={styles.conatainer}>
       
        <ScrollView scrollEnabled={enable}  showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator ={false}
        onContentSizeChange={this.onContentSizeChange}>
            <View style={styles.MainSec}>
                <TouchableOpacity onPress={() =>{
                  Navigation.pop(this.props.componentId);
                }} style={styles.MainHead}>
                        
                    <Icon style={{fontSize:wp('5%'),color:'#000'}} name="chevron-left" />
                </TouchableOpacity>
                <View style={styles.MainHead1}>
                    <Text style={{fontSize:wp('5%'),color:'#000',fontWeight:'bold'}}>Refer a friend</Text>
                </View>
            </View>
            <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:wp('15%')}}>
                <ImageBackground style={styles.MainBody} source={reffered} />
                <View style={styles.bodySec}>
                    <View style={[styles.bodySecc,{borderColor:this.state.inputs.email.valid?'#fff':'red',borderWidth:1}]}>
                        <Icon style={styles.ImagEmail}  name="envelope" />
                        <TextInput
                         style={styles.txtbodyyt} 
                         placeholder="Enter Email Address" 
                         autoCapitalize="none" 
                         value={this.state.inputs.email.value} 
                         onChangeText={(text) => this.onFieldTextChange(text,'email')} 
                         />
                        
                    </View>
                    <TouchableOpacity onPress={() =>{
                      if(this.state.referedFreinds.length - 1 >= this.state.ReferLimit ){
                        alert('you have already used refered friend quota which is '+this.state.ReferLimit)
                        return;
                      }
                      this._RefereFrind();
                    }} disabled={this.state.inputs.email.valid?false:true} style={styles.BtnBox}>
                        <Text style={styles.BtnView}>Submit</Text>
                    </TouchableOpacity>
                   
                    <View style={{width: wp('20%'),height:wp('0.5%'),backgroundColor:appColor,marginBottom:wp('2%'),marginTop:wp('4%'),}} />
                    <View style={{width: wp('5%'),height:wp('0.5%'),backgroundColor:appColor,marginBottom:wp('3%')}} />
                    
                    <Text style={styles.txtbody1} >
                        - Share your code with your friends and get bonus point.
                        we want to make sure you have the best customer experience possible. 
                        To maintain high levels of great customer service, we keep updating our 
                        service and policies to make sure they benefit you.
                    </Text>
                    <View style={{width: wp('50%'),height:wp('0.5%'),backgroundColor:appColor,marginBottom:wp('2%'),marginTop:wp('8%'),}} />
                </View>
                <View>
                  <Text style={{fontSize:wp('3.5%'),color:'#cd2026',fontWeight:'bold'}}>
                    Refered List
                  </Text>
                </View>
                <FlatList
                    data={this.state.referedFreinds}
                    renderItem={({item}) =>{
                      return(
                       <View style={{padding:wp('1%')}}>
                        <Text style={{fontSize:wp('3.5%')}}>
                            {item.email}
                          </Text>
                       </View>
                      )
                    }}
                    
                    />
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
    flex:1,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  MainBody:
  { 
    width:wp('80%'),
    height:wp('42%'),
    resizeMode:'contain',
    marginBottom:wp('2%')
  },
  bodySec:
  {
      
      alignContent:'center',
      alignItems:'center',
      justifyContent:'center',
      padding:25
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
    
  },
  bodySecc:
  {
      flexDirection:'row',
      width:wp('90%'),
      height:wp('13%'),
      marginBottom:wp('2%'),
      marginTop:wp('5%'),
      backgroundColor:'#fff',
      alignContent:'center',
      alignItems:'center',
      justifyContent:'center',
      borderTopLeftRadius:10,
      borderBottomRightRadius:10,
      borderTopRightRadius:2,
      borderBottomLeftRadius:2,
      elevation:5
     
  },

  txtbodyyt:
  {
      flex:0.9,
      fontFamily:'Roboto',
      fontSize:wp('4.5%'),
      textAlign:'justify',
      color:'#000000',   
  },
  ImagEmail:
    {
        flex:0.2,
        fontSize:wp('8%'),
        color:'#cd2026',
        marginLeft:wp('5%')
    },
    BtnBox:
    {
        backgroundColor:'green',
        width:wp('50%'),
        height:wp('10%'),
        borderRadius:4,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:wp('2%'),
        elevation:5
    },
    BtnView:
    {   
        fontFamily:'Roboto',
        fontSize:wp('4%'),
        color:'#fff',
        fontWeight:'bold',
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
  export default connect(mapStateToProps,mapsDespathToProps)(ReferredScreen);