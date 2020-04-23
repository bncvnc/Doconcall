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
import {
  loginUser,
  saveUserInfo,
  UpdateUserProfile,
  SaveProfile
} from '../../store/actions/index';
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
import LinearGradient from 'react-native-linear-gradient';
import pro_imagee from '../../images/edirPro.png';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';
import { Root, Popup, } from 'popup-ui'
const options = {
  title: 'Select Avatar',
  maxWidth:800,
  maxHeight:600
};
class ProfileScreen extends React.Component {

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
   GetImage = () =>{
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState(prevState => {
          return{
            pickImage: prevState.pickImage.concat({
              key: Math.random(),
              uri:response.uri,
              source:response.data,
              filesize:response.fileSize
            })
          }
      });

      this.props.SaveProfile(this.state.pickImage);
      
      }
    });
   }
    componentDidMount = () =>{
      this.setState(prevState =>{
        
        return {
          inputs: {
            ...prevState.inputs,
            name: {
              ...prevState.inputs.name,
              value: this.props.user.name,
              valid:true,
              touched:false
            },
            phone: {
              ...prevState.inputs.phone,
              value: this.props.user.phone,
              valid:true,
              touched:false
            },
            address:{
              ...prevState.inputs.address,
              value:this.props.user.house_no,
              valid:true,
              touched:false
            }

            
          }
          
        };
        
      })
    }
    
      state={
        
        emailFocused:false,
        scrennSize:0,
        screenHeight: 0,
        pickImage:[],
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
                  minLength:3
                },
                touched:false,
                warningText:'Your Name Must Be 3 Characters Long'
          },
          phone:{
            value:'',
                valid:false,
                validationRules:{
                  minLength:11
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
    
    
      UpdateProfile = () => {
        const authDta ={
          name:this.state.inputs.name.value,
          phone:this.state.inputs.phone.value,
          address:this.state.inputs.address.value,
          id:this.props.user.id
        }
        this.props.UpdateUserProfile(authDta)
       
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

    // console.log(this.props);
    let enable = this.state.scrennSize > hp('100%');

    let phone= this.state.inputs.phone.valid;
    let name= this.state.inputs.name.valid;
    let address = this.state.inputs.address.valid;
    let LoginButton =( <View>

      </View>);
      if(this.props.isLoading) {
        LoginButton =(
          <View style={{zIndex:999999,justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'rgba(0,0,0,.6)',position:'absolute',top:0,left: 0,right: 0, bottom: 0,flex: 1}}>
          <ActivityIndicator size={'large'} color={appColor}  />
       </View>
        )
      }
    return (
      <Root >

    
      <View style={styles.conatainer}>
      
        
              <LinearGradient colors={['#a30a0f', '#e03c42', '#cd2026']} style={styles.MainSec}>
                <TouchableOpacity onPress={() =>{
                  Navigation.pop(this.props.componentId);
                }} style={styles.MainHead}>
                        
                    <Icon style={{fontSize:wp('5%'),color:'#fff'}} name="chevron-left" />
                </TouchableOpacity>
                <View style={styles.MainHead1}>
                    <Text style={{fontSize:wp('5%'),color:'#fff',fontWeight:'bold'}}>Edit Profile</Text>
                </View>
            </LinearGradient>
            {LoginButton}
            <View style={styles.MainBody}>
                <TouchableOpacity onPress={() =>{
                  this.GetImage();
                }} style={styles.MainBodySec}>
                    <View style={styles.MainBodyImg}>
                    <FastImage 
                        style={[styles.top_img,{ borderRadius:this.props.user.profile?wp('15%'):0}]} 
                        source={this.props.user.profile?{uri:'https:/admin.doconcall.pk/images/'+this.props.user.profile}:pro_imagee}
                        resizeMode={FastImage.resizeMode.cover}
                        />
                    </View>
                </TouchableOpacity>
                <View style={{width: wp('100%'),height:wp('0.3%'),backgroundColor:'#cd2026',
                marginBottom:wp('3%'),marginTop:wp('3%'),}} />
                <ScrollView scrollEnabled={enable}  showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator ={false}
                            onContentSizeChange={this.onContentSizeChange}>
                  <View>
                    <View style={styles.MainSecBody}>
                      <View style={styles.Sec}>
                          <Icon style={{fontSize:wp('6%'),color:'#cd2026'}} name="user" />
                      </View>
                      <View style={styles.MainBodyTxtt}>
                            <Text style={styles.TxtView2}>Full Name</Text>
                            <TextInput
                         style={styles.TxtView}
                          placeholderTextColor="#000"
                          onChangeText={(text) => this.onFieldTextChange(text,'name')} 
                          value={this.state.inputs.name.value}
                          placeholder={this.state.inputs.name.value}
                           />
                      </View> 
                    </View>
                  
                    <View style={styles.MainSecBody}>
                      <View style={styles.Sec}>
                          <Icon style={{fontSize:wp('6%'),color:'#cd2026'}} name="envelope-square" />
                      </View>
                      <View style={[styles.MainBodyTxtt]}>
                            <Text style={styles.TxtView2}>Email Address</Text>
                            <Text style={styles.TxtView}>{this.props.user.email}</Text>
                      </View> 
                    </View>

                    <View style={styles.MainSecBody}>
                      <View style={styles.Sec}>
                          <Icon style={{fontSize:wp('6%'),color:'#cd2026'}} name="phone-square" />
                      </View>
                      <View style={styles.MainBodyTxtt}>
                            <Text style={styles.TxtView2}>Phone Number</Text>
                            <Text style={styles.TxtView}>{this.state.inputs.phone.value}</Text>
                      </View> 
                    </View>

                    <View style={styles.MainSecBody}>
                      <View style={styles.Sec}>
                          <Icon style={{fontSize:wp('6%'),color:'#cd2026'}} name="address-book" />
                      </View>
                      <View style={styles.MainBodyTxtt}>
                            <Text style={styles.TxtView2}>Full Address</Text>
                            <Text style={styles.TxtView}>{this.state.inputs.address.value}</Text>
                      </View> 
                    </View>

                    <View style={styles.MainBodyBtn}>
                      <LinearGradient colors={['#a30a0f', '#e03c42', '#cd2026']} style={styles.MainBodyBtn1}>
                          <TouchableOpacity 
                          disabled={name && phone && address? false : true}
                          onPress={() =>{
                            this.UpdateProfile();
                          }} >
                              <Text style={styles.TxtView1}>Update Profile</Text>
                          </TouchableOpacity>
                        </LinearGradient>
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
    marginTop:wp('8%'),
    marginBottom:wp('5%')
  },
  MainBodySec:
  { 
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    marginTop:wp('2%'),
    marginBottom:wp('5%'),
    
  },
  MainBodyImg:
  {
      borderColor:'#cd2026',
      borderRadius:500,
      borderWidth:2,
  },
  top_img:
  {
      width:wp('30%'),
      height:wp('30%'),
     
  },
  MainBodyTxtt:
  {
      flexDirection:'column',
      width:wp('80%'),
      borderColor:'#a09f9f',
      marginLeft:wp('2%'),
      marginBottom:wp('5%'),
      marginTop:wp('2%'),
      borderBottomWidth:wp('0.2%')
  },
  Sec:
  {
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:wp('5%'),
    marginRight:wp('2%'),
    marginTop:wp('4%'),
    marginBottom:wp('5%'),
  },
  MainBodyTxt:
  {
    flexDirection:'row',
    backgroundColor:'#cd2026',
    width:wp('32%'),
    height:wp('10%'),
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5,
  },
  MainSecBody:
  {
    flexDirection:'row',
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
  },
  TxtView2:
  {
    fontFamily:'Roboto',
    fontSize:wp('3%'),
    color:'#a09f9f',
    fontWeight:'400'
  },
  TxtView:
  {
    fontFamily:'Roboto',
    fontSize:wp('3.5%'),
    color:'#000',
    fontWeight:'bold',
    marginBottom:wp('1.5%'),
   
  },
  MainBodyTxtIn:
  {
      alignContent:"center",
      justifyContent:'flex-start',
      alignSelf:'center',
      marginLeft:wp('3%'),
      width:wp('100%'),
  },
  MainBodyBtn:
  {
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    marginTop:wp('5%'),
    borderRadius:5,
  },
  MainBodyBtn1:
  {
    width:wp('60%'),
    height:wp('10%'),
    backgroundColor:'#cd2026',
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
  },
  TxtView1:
  {
    fontFamily:'Roboto',
    fontSize:wp('4%'),
    color:'#fff',
    fontWeight:'bold'
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
    // marginBottom:wp('1.5%'),
    marginTop:wp('-1.5%')
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
      UpdateUserProfile:(authDta) =>dispatch(UpdateUserProfile(authDta)),
      SaveProfile:(image) =>dispatch(SaveProfile(image))
    }
  }
  export default connect(mapStateToProps,mapsDespathToProps)(ProfileScreen);