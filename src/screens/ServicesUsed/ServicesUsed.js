import React, {Fragment} from 'react';
import email_icon from '../../images/newIcons/icon1.png';
import ServiceIcon from '../../images/ServiceIcon.png';
import emailpage from '../../images/emailpage.png';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import validate from '../../Validate/Validate';
import {loginUser,saveUserInfo,GetServicesUsed} from '../../store/actions/index';
import AsyncStorage from '@react-native-community/async-storage';
 import * as Animatable from 'react-native-animatable';
 import logo from '../../images/logo.png';
 import Icon from 'react-native-vector-icons/dist/FontAwesome';
 import moment from 'moment';
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
class ServicesUsed extends React.Component {

  componentDidMount () {
    this.props.GetServicesUsed();
  }
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
                useInfo:text
              },
              options: {
                topBar: {
                  visible:false,
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

    GetServiceDetails = (id) =>{
     let PassData = this.props.ServicesUsed.filter((data) =>{
        return data.id == id
      })
      console.log(PassData[0]);
      this.changeScreen('doconcall.ServiceDetail',PassData[0])
    }
      
  render() {

    console.log(this.props.ServicesUsed);
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
                    <Text style={{fontSize:wp('5%'),color:'#fff',fontWeight:'bold'}}>Service Used</Text>
                </View>
            </View>
            <ScrollView scrollEnabled={enable}  showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator ={false}
                    onContentSizeChange={this.onContentSizeChange}>
                <ImageBackground style={styles.MainBody} source={bg1}>
                    <View style={styles.MainBodySec}>
                        <Image style={styles.MainBodyImg} source={ServiceIcon} />
                    </View>
                </ImageBackground> 
                <View style={styles.MainBodyNext}>
                    <View style={styles.MainBodyNext1}>
                        <Text style={styles.MainBodyTxt}>Appointment History</Text>
                    </View>    
                </View>  
           
              <View style={{marginTop:wp('3%'),marginBottom:wp('3%')}}>     
    
              <FlatList
              data={this.props.ServicesUsed}
              renderItem={({item,index}) =>{
                console.log(item);
                return(

<TouchableOpacity 
onPress={() =>{
  this.GetServiceDetails(item.id)
}}
style={{alignContent:'center',alignItems:'center',justifyContent:'center',marginTop:wp('5%')}}> 
  <View style={styles.BoxSec}>
      <View style={styles.boxIcon}>
        <View style={{flexDirection:'column',width:'100%'}}>
          <View style={{flexDirection:'column',marginBottom:wp('2.5%')}}>
            <Text style={styles.TextView}>Doctor's Name</Text>
            <Text style={styles.TextView1}>{item.doctor}</Text>
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
          <Text style={styles.TextView1}>{moment(item.created_at).format("h:mm:ss a")}</Text>
          <Text style={styles.TextView}>{moment(item.created_at).format("MMM Do")}</Text>
        </View>
  </View>
</TouchableOpacity>           

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
    height:wp('30%'),
    elevation:4,
    marginBottom:wp('2%'),

  },
 
  boxIcon:
  {
    flexDirection:'row',
    width:wp('45%'),
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:wp('2.5%')
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
    fontWeight:'bold'
  },
});



const mapStateToProps = state => {
    return {
      user: state.user.user,
      isLoading: state.ui.isLoading,
      InternetInfo:state.ui.InternetInfo,
      mode:state.user.mode,
      ServicesUsed:state.user.ServicesUsed
    };
  };
  const mapsDespathToProps =dispatch =>{
    return{
      onloginUser :(authDta) =>dispatch(loginUser(authDta)),
      checkIfThereIsdata : (authDta) => dispatch(saveUserInfo(authDta)),
      GetServicesUsed:() =>dispatch(GetServicesUsed())
    }
  }
  export default connect(mapStateToProps,mapsDespathToProps)(ServicesUsed);