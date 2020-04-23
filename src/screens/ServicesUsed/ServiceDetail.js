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
import moment from 'moment';
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
class ServiceDetail extends React.Component {

  
    state = {
        screenHeight: 0,
    }
    onContentSizeChange = (contentWidth, contentHeight) => {
        // Save the content height in state
        content = contentHeight + 200;
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

    console.log(this.props)    
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
                    <Text style={{fontSize:wp('5%'),color:'#fff',fontWeight:'bold'}}>Service Detail</Text>
                </View>
            </View>
            <ScrollView scrollEnabled={enable}  showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator ={false}
                    onContentSizeChange={this.onContentSizeChange}>
               

                    <View style={{alignContent:'center',alignItems:'center',justifyContent:'center',marginTop:wp('2%')}}> 
                        <View style={styles.BoxSec}>
                            <View style={styles.boxIcon}>
                                <View style={{flexDirection:'column',marginBottom:wp('2.5%'),width:'100%'}}>
                                    <View style={{flexDirection:'column',marginBottom:wp('2.5%')}}>
                                    <Text style={styles.TextView}>Doctor's Name</Text>
                                    <Text style={styles.TextView1}>{this.props.useInfo.doctor}</Text>
                                    </View>
                                    <View style={{width:wp('15%'),height:wp('0.2%'),backgroundColor:'#cd2026'}} />
                                    <View style={{flexDirection:'column',marginTop:wp('2.5%')}}>
                                    <Text style={styles.TextView}>Patient's Name</Text>
                                    <Text style={styles.TextView1}>{this.props.user.name}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.boxIcon1}>
                                <View style={{width:wp('0.2%'),height:wp('10%'),backgroundColor:'#cd2026'}} />
                            </View>
                            <View style={styles.boxIcon2}>
                                <Icon style={{fontSize:wp('5%'),color:'#cd2026',marginBottom:wp('3%'),}} name="calendar" />
                                <Text style={styles.TextView1}>{moment(this.props.useInfo.created_at).format("h:mm:ss a")}</Text>
                                <Text style={styles.TextView}>{moment(this.props.useInfo.created_at).format("MMM Do")}</Text>
                            </View>
                        </View> 
                        <View style={styles.BoxSec1}>
                            <Text style={styles.TextView1}>
                                    Lorem Ipsum is simply dummy
                            </Text> 
                            <View style={{width:wp('12%'),height:wp('0.2%'),backgroundColor:'#cd2026',marginTop:wp('3%'),marginBottom:wp('3%')}} />
                            <Text style={styles.TextView11}>
                            - Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </Text> 
                            <Text style={styles.TextView11}>
                            - Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </Text> 
                            <Text style={styles.TextView11}>
                            - Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </Text> 
                            <Text style={styles.TextView11}>
                            - Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </Text> 
                        </View> 
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
      resizeMode:'contain',
      width:wp('100%'),
      height:wp('50%')
    
  },
  MainBodySec:
  {
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    marginTop:wp('5%')
  },
  MainBodyImg:
  {
    width:wp('40%'),
    height:wp('40%')
  },
  MainBodyNext:
  { 
    width:wp('100%'),
    height:wp('9%'),
    backgroundColor:'rgba(205,32,38,0.3)',
    
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
  },
  MainBodyNext1:
  { 
    width:wp('100%'),
    height:wp('7%'),
    backgroundColor:'rgba(205,32,38,1)',
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
  },
  MainBodyTxt:
  {
      fontFamily:'Roboto',
      fontSize:wp('4%'),
      color:'#fff',
      fontWeight:'bold'
  },
  BoxSec:
  {
    flexDirection:'row',
    backgroundColor:'#fff',
    borderRadius:5,
    width:wp('95%'),
    marginTop:wp('5%'),
    elevation:4,
    marginBottom:wp('5%'),
  },
  BoxSec1:
  {
    flexDirection:'column',
    backgroundColor:'#fff',
    borderRadius:5,
    width:wp('95%'),
    marginTop:wp('1.5%'),
    elevation:4,
    padding:15,
    marginBottom:wp('5%'),
    textAlign:'justify'
  },
  boxIcon:
  {
    flexDirection:'row',
    width:wp('45%'),
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:wp('2.5%'),
    marginTop:wp('3%'),
  },
  boxIcon1:
  {

    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:wp('4%')
  },
  boxIcon2:
  {
    flexDirection:'column',
    width:wp('45%'),
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:wp('2.5%')
  },
  TextView:
  {
    fontSize:wp('3%'),
    marginBottom:wp('1%'),
    color:'#a09f9f'
  },
  TextView1:
  {
    fontSize:wp('3.5%'),
    fontWeight:'bold',
  },
  TextView11:
  {
    fontSize:wp('3.5%'),
    fontWeight:'600',
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
  export default connect(mapStateToProps,mapsDespathToProps)(ServiceDetail);