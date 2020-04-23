import React, {Fragment} from 'react';
// import image from '../../images/newIcons/unclefixer-logo.png'; 
import email_icon from '../../images/newIcons/icon1.png';
import pass_icon from '../../images/icon2.png';
import name_icon from '../../images/newIcons/icon3.png';
import id_cnic from '../../images/id.png';
import Ficons from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import logo from '../../images/logo.png';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {registerCustomer,getCountrysData,SearchCountry} from '../../store/actions/index';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import validate from '../../Validate/Validate';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AlertSuccess from '../../components/alertBoxs/successAlert';
import AlertError from '../../components/alertBoxs/errorAlert';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Image,
  Text,
  ActivityIndicator,
  Modal,
  FlatList
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DefaultButton from '../../components/DefaultButton/DefaultButton';
import { appColor } from '../../components/variables/variables';
import { Root, Popup, } from 'popup-ui'
 class RegisterScreen extends React.Component {

  constructor(props)
  {
    super(props)

    // this.checkIt();
  }
  componentWillReceiveProps(){
    AsyncStorage.setItem("ComponentId", JSON.stringify(this.props.componentId));
  }
 

    state={
        screenHeight:0,
        isLoggedIn: false,
        user: {},
        states:[],
        numCode:'+92',
        pickerSelection: 'Select A Category',
        pickerDisplayed: false,
        pickText:false,
        checkCode:false,
        pickerSelection1: 'Country',
        pickerDisplayed1: false,
        pickText1:false,
        pickerSelection2: 'City / Town',
        pickerDisplayed2: false,
        pickText2:false,
        country_id:0,
        // country:this.props.country[0],
        nameFocused:false,
        nameBlured:false,
        passwordFocused:false,
        passwordBlured:false,
        confiormPasswordBlured:false,
        confiormPasswordFocused:false,
        emailFocused:false,
        emailBlured:false,
        numberFocused:false,
        numberBlured:false,
        breadwinnerBlured:false,
        CNICFocused:false,
        CNICBlured:false,
        breadwinnerFocused:false,
        houser_noFocused:false,
        houser_noBlured:false,
        isLoading: true,
        search: '' ,
        hearAboutUs:'',
        franchiseCode:'',
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
                  minLength:4
                },
                touched:false,
                warningText:'Your Name Must Be 4 Characters Long'
          },
          breadwinner:{
            value:'Test User',
                valid:false,
                validationRules:{
                  minLength:4
                },
                touched:false,
                warningText:'Your breadwinner Name Must Be 4 Characters Long'
          },
          houser_no:{
            value:'',
                valid:false,
                validationRules:{
                  minLength:2
                },
                touched:false,
                warningText:'Please Provide A Valid House No'
          },
          CNIC:{
            value:'',
                valid:false,
                validationRules:{
                    minLength:13
                },
                touched:false,
                warningText:'Please Provide A Valid CNIC'
          },
          confiormPassword:{
            value:'',
                valid:false,
                validationRules:{
                  equalTo:'password'
                },
                touched:false,
                warningText:'Your Password Does Not Match'
          },
          myNumber:{
              value:'',
              valid:false,
              validationRules:{
                minLength:9
              },
              touched:false,
              warningText:'Please Enter Numbers Only And Minimum numbers must be 9'
          },
        }
    }

    componentWillUpdate() {
      // this.setState({
      //   dataSource:this.props.country[0]
      // })

    //   this.arrayholder = this.props.country[0];
    }


    SearchFilterFunction(text) {
      //passing the inserted text in textinput
      const newData = this.arrayholder.filter(function(item) {
        //applying filter for the inserted text in search bar
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        dataSource: newData,
        search:text,
      });
    }
    
    togglePicker1(d) {
      this.setState({
        pickerDisplayed1: !this.state.pickerDisplayed1,
      });
    }
    togglePicker2(d) {
      this.setState({
        pickerDisplayed2: !this.state.pickerDisplayed2,
      });
    }
    setPickerValue(newValue, selection,text) {
      let c = selection;

      this.setState({
        [c]: newValue,
        [text]:true,
        pickerDisplayed:false,
        pickerDisplayed1:false,
        pickerDisplayed2:false
      });
      // this.togglePicker();
    }
    checkIt= () =>{
        var idToTest = '11145-1234567-1',
            myRegExp = new RegExp(/\d{5}-\d{7}-\d/);

            if(myRegExp.test(idToTest)) {
                //if true
                alert('asdasdas');
            }
            else {
                //if false
                alert('false');

            }
    }
    
      onFieldTextChange = (text,field) => {

       
        let connectedValue = {};
        if (this.state.inputs[field].validationRules.equalTo) {
          const equalControl = this.state.inputs[field].validationRules.equalTo;
          const equalValue = this.state.inputs[equalControl].value;
          connectedValue = {
            ...connectedValue,
            equalTo: equalValue
          };
        }
        if (field === "password") {
          connectedValue = {
            ...connectedValue,
            equalTo: text
          };
        }
        this.setState(prevState =>{
          
          return {
            inputs: {
              ...prevState.inputs,
              confiormPassword: {
                ...prevState.inputs.confiormPassword,
                valid:
                  field === "password"
                    ? validate(
                        prevState.inputs.confiormPassword.value,
                        prevState.inputs.confiormPassword.validationRules,
                        connectedValue
                      )
                    : prevState.inputs.confiormPassword.valid
              },
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
    
      getMyValue = async () => {
        try {
          const value = await AsyncStorage.getItem('appState')

        } catch(e) {
          // read error

        }
      

      
      }
    
      onContentSizeChange = (contentWidth, contentHeight) => {
        // Save the content height in state
        let content = contentHeight + 150;
        this.setState({ screenHeight: content });
      };
    
        show = () =>{
          let token  = this.props.user.auth_token;

          fetch(URI + 'api/users/list/check?token='+token).then((response) => response.json()).then((responseData) => {

          }).catch(err => {
            console.log(err);
          })
        }
    
        RegisterUser= (pass,emai,name,number) => {
           let authdata={
                password:pass,
                email:emai,
                name:name,
                myNumber:this.state.numCode+this.state.inputs.myNumber.value,
                house_no:this.state.inputs.houser_no.value,
                CNIC:this.state.inputs.CNIC.value,
                breadwinner:this.state.inputs.breadwinner.value
            }
            this.props.onRegisterUser(authdata,this.props.componentId);
            //console.log(authdata);
          };
    
          
    
    
    changeScreen = (screen) =>{
      Navigation.pop(this.props.componentId);
    }
    getCityAndNumberCode = (name) =>{
      fetch(URI +'api/get/country/code?state='+name)
      .then((response)=>response.json())
      .then((responseData)=>{

        this.setState({
          states:responseData.states,
          country_id:responseData.states[0].country_id,
          numCode:'+'+responseData.country_code,
          checkCode:true,
        })
      })
    }
    SearchCIteis = (name) =>{
      fetch(URI +'api/get/country/code/search?state='+name+'&id='+this.state.country_id)
      .then((response)=>response.json())
      .then((responseData)=>{
    
        this.setState(prevState=>{
          return{
            states:responseData.data,
          }
        })
      })
    }
    onChanged(text){ 
       let checkZero = text.replace(/^0+(?=\d)/,'');
      let number = checkZero.replace(/[^0-9]/g, '');
      //console.log(number);
      let connectedValue = {};
        this.setState( prevState =>{
          return {
            inputs: {
              ...prevState.inputs,
              myNumber: {
                ...prevState.inputs.myNumber,
                value: number,
                valid: validate(
                  text,
                  prevState.inputs.myNumber.validationRules,
                  connectedValue
                ),
                touched:true
                
              }
              
            }
            
          };
        });
        }

        search= (text) =>{
          this.setState({
            SearchValue:text,
            country: this.state.country.filter(word => word.startsWith(text))
          })
         

        }
     
     render()
    
    {
    //   console.log(this.state.inputs.CNIC);
      // if(this.props.country[0].length > 1)
      // {
      //   this.changeValue();
      // }
    let email= this.state.inputs.email.valid;
    let password= this.state.inputs.password.valid;
    let confiormPassword = this.state.inputs.confiormPassword.valid;
    let myNumber = this.state.inputs.myNumber.valid;
    let CNIC= this.state.inputs.CNIC.valid;
    let houser_no = this.state.inputs.houser_no.valid;
    // let breadwinner = this.state.inputs.breadwinner.valid;
    let LoginButton =(<View>

    </View>);
 if(this.props.isLoading) {
        LoginButton =(
          <View style={{zIndex:999999,justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'rgba(0,0,0,.6)',position:'absolute',top:0,left: 0,right: 0, bottom: 0,flex: 1}}>
          <ActivityIndicator size={'large'} color={appColor}  />
       </View>
        )
      }

let enable = this.state.screenHeight + 100 > hp('100%');
        return(
          <Root>

    
            <View style={styles.conatainer}>
              {LoginButton}
              
            <KeyboardAwareScrollView >
            
                <ScrollView
                 scrollEnabled={enable}
                 showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator ={false}
                    onContentSizeChange={this.onContentSizeChange}
                >
<View style={styles.logo_Sec}>
                   <Image style={styles.logo} source={logo} />
              </View>

<View>
            <AlertSuccess />
            </View>
            <View>
            <AlertError />
            </View>


                <View 
                style={{height:wp('0.5%'),width:wp('100%'),
                backgroundColor:'rgba(204, 204, 204, .6)'}}>
                </View>
{/* 
                <View style={{justifyContent:'center',
                alignItems:'center',
                marginTop:wp('1%'),
                marginBottom:wp('1%'),
                height:wp('10%'),
                width:wp('100%'),
                alignContent:'center'}}>
                    <Text
                    style={{color:'#F40009',fontSize:wp('7%'),
                    fontFamily:'Raleway-Bold'}}
                    >
                        Signup
                    </Text>
                </View> */}

                <View 
                style={{height:wp('0.5%'),width:wp('100%'),paddingLeft:wp('2%'),paddingTop:wp('4%')}}>
                </View>


                <View
                style={{paddingLeft:wp('5%'),paddingRight:wp('5%'),
                marginTop:wp('5%')}}
                
                >

                <View

               style={[styles.textInputOuterView,
                   this.state.nameFocused && this.state.nameBlured && !this.state.inputs.name.valid ?styles.invalid:styles.isvalid]}
               >

               <View style={{width: wp('15%'),
                alignItems: 'flex-start',
                alignContent: 'center',
                paddingLeft:15}}>
     
                  <Icon style={{fontSize:wp('7%'),paddingLeft:wp('0.3%'),color:appColor}} name="user" />

            </View>


                <View style={{width:wp('100%')}}>
                        <TextInput
                        placeholder="Your Name"
                        placeholderTextColor={'#a0a0a0'}
                        returnKeyType="next"
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        autoFocus={true}
                        blurOnSubmit={false}
                        value={this.state.inputs.name.value} 
                        onFocus={()=>this.setState({
                          nameFocused:true
                         
                        })}
                        onBlur={()=>this.setState({
                          nameBlured:true
                        })}
                        onChangeText={(text) => this.onFieldTextChange(text,'name')} 
                        style={styles.TextInputStyle}
                        >
                        </TextInput>
                    
                </View>

                </View>
                <Text 
      style={[styles.warrnings,this.state.nameFocused && this.state.nameBlured && !this.state.inputs.name.valid ?styles.show:styles.disapair]}
      >{this.state.inputs.name.warningText}</Text>

                </View>


                <View style={{paddingLeft:wp('5%'),paddingRight:wp('5%'),
                marginTop:wp('5%')}}> 


                <View
                style={[styles.textInputOuterView,this.state.emailFocused && this.state.emailBlured && !this.state.inputs.email.valid ?styles.invalid:styles.isvalid]}>


                <View style={{width: wp('15%'),
                alignItems: 'flex-start',
                alignContent: 'center',
                paddingLeft:15}}>
     
                  <Icon style={{fontSize:wp('7%'), color:appColor}} name="envelope-square" />

                </View>

                <View style={{width:wp('100%'),
                alignItems:'flex-start'}}>
                        <TextInput
                        placeholderTextColor={'#a0a0a0'}
                        ref={(input) => { this.secondTextInput = input; }}
                        returnKeyType="next"
                        onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                        blurOnSubmit={false}
                        placeholder="Enter Email" 
                        onFocus={()=>this.setState({
                          emailFocused:true
                         
                        })}
                        onBlur={()=>this.setState({
                          emailBlured:true
                        })}
                        value={this.state.inputs.email.value} 
                        autoCapitalize="none" 
                        keyboardType={'email-address'}
                        onChangeText={(text) => this.onFieldTextChange(text,'email')} 
                        style={styles.TextInputStyle}>
                        
                        </TextInput>
                    
                </View>
                

               </View>
               <Text 
      style={[styles.warrnings,this.state.emailFocused && this.state.emailBlured 
        && !this.state.inputs.email.valid ?styles.show:styles.disapair]}
      >{this.state.inputs.email.warningText}</Text>                 

                </View>
                <View
                style={{paddingLeft:wp('5%'),paddingRight:wp('5%'),
                marginTop:wp('5%')}}
                
                >

                <View

               style={[styles.textInputOuterView,this.state.passwordFocused && this.state.passwordBlured && !this.state.inputs.password.valid ?styles.invalid:styles.isvalid]}
               >

               <View style={{width: wp('15%'),
                alignItems: 'flex-start',
                alignContent: 'center',
                paddingLeft:15}}>
     
                  <Icon style={{fontSize:wp('7%'),paddingLeft:wp('0.3%'), color:appColor}} name="lock" />

            </View>


                <View style={{width:wp('100%')}}>
                        <TextInput
                        placeholder="Password"
                        ref={(input) => { this.thirdTextInput = input; }}
                        returnKeyType="next"
                        onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                        blurOnSubmit={false}
                        placeholderTextColor={'#a0a0a0'}
                        value={this.state.inputs.password.value} 
                        onFocus={()=>this.setState({
                          passwordFocused:true
                         
                        })}
                        onBlur={()=>this.setState({
                          passwordBlured:true
                        })}
                        onChangeText={(text) => this.onFieldTextChange(text,'password')} 
                        style={styles.TextInputStyle}
                        secureTextEntry={true}
                        />
                            
                        
                    
                </View>

                </View>
                <Text 
      style={[styles.warrnings,this.state.passwordFocused && this.state.passwordBlured && !this.state.inputs.password.valid ?styles.show:styles.disapair]}
      >{this.state.inputs.password.warningText}</Text>

                </View>
                <View
                style={{paddingLeft:wp('5%'),paddingRight:wp('5%'),
                marginTop:wp('5%')}}
                
                >

                <View

               style={[styles.textInputOuterView,this.state.confiormPasswordFocused 
                && this.state.confiormPasswordBlured && !this.state.inputs.confiormPassword.valid ?styles.invalid:styles.isvalid]}
               >

               <View style={{width: wp('15%'),
                alignItems: 'flex-start',
                alignContent: 'center',
                paddingLeft:15}}>
     
                <Icon style={{fontSize:wp('7%'), paddingLeft:wp('0.3%'),color:appColor}} name="lock" />

            </View>


                <View style={{width:wp('100%')}}>
                        <TextInput
                        placeholder="Confirm Password"
                        ref={(input) => { this.fourthTextInput = input; }}
                        returnKeyType="next"
                        onSubmitEditing={() => { this.sixethTextInput.focus(); }}
                        blurOnSubmit={false}
                        placeholderTextColor={'#a0a0a0'}
                        onFocus={()=>this.setState({
                          confiormPasswordFocused:true
                         
                        })}
                        onBlur={()=>this.setState({
                          confiormPasswordBlured:true
                        })}
                        value={this.state.inputs.confiormPassword.value} 
                        onChangeText={(text) => this.onFieldTextChange(text,'confiormPassword')}  
                        secureTextEntry={true}
                        style={styles.TextInputStyle}
                        >
                        </TextInput>
                    
                </View>

                </View>
                <Text 
      style={[styles.warrnings,this.state.confiormPasswordFocused && this.state.confiormPasswordBlured && !this.state.inputs.confiormPassword.valid ?styles.show:styles.disapair]}
      >{this.state.inputs.confiormPassword.warningText}</Text>

                </View>
                <View
                style={{paddingLeft:wp('5%'),paddingRight:wp('5%'),
                marginTop:wp('5%')}}
                
                >

                <View

               style={[styles.textInputOuterView,this.state.confiormPasswordFocused 
                && this.state.confiormPasswordBlured && !this.state.inputs.confiormPassword.valid ?styles.invalid:styles.isvalid]}
               >

               <View style={{width: wp('15%'),
                alignItems: 'flex-start',
                alignContent: 'center',
                paddingLeft:15}}>
     
                <Image 
                style={{height:wp('6%'),width:wp('6%'),
                alignContent:'center',
                justifyContent:'center',
                alignItems:'center'}}
                source={id_cnic}
                />


            </View>


                <View style={{width:wp('100%')}}>
                        <TextInput
                        placeholder="CNIC"
                        ref={(input) => { this.sixethTextInput = input; }}
                        returnKeyType="next"
                        onSubmitEditing={() => { this.seventhTextInput.focus(); }}
                        blurOnSubmit={false}
                        placeholderTextColor={'#a0a0a0'}
                        onFocus={()=>this.setState({
                            CNICFocused:true
                         
                        })}
                        onBlur={()=>this.setState({
                            CNICBlured:true
                        })}
                        value={this.state.inputs.CNIC.value} 
                        onChangeText={(text) => {
                            // let checkZero = text.replace(/^0+(?=\d)/,'');
                            let number = text.replace(/[^0-9]/g, '');
                            this.onFieldTextChange(number,'CNIC')
                        }}  
                        style={styles.TextInputStyle}
                        maxLength={13}
                        >
                        </TextInput>
                    
                </View>

                </View>
                <Text 
      style={[styles.warrnings,this.state.CNICFocused && this.state.CNICBlured && !this.state.inputs.CNIC.valid ?styles.show:styles.disapair]}
      >{this.state.inputs.CNIC.warningText}</Text>

                </View>
                <View
                style={{paddingLeft:wp('5%'),paddingRight:wp('5%'),
                marginTop:wp('5%')}}
                
                >

                <View

               style={[styles.textInputOuterView,this.state.confiormPasswordFocused 
                && this.state.confiormPasswordBlured && !this.state.inputs.confiormPassword.valid ?styles.invalid:styles.isvalid]}
               >

               <View style={{width: wp('15%'),
                alignItems: 'flex-start',
                alignContent: 'center',
                paddingLeft:15}}>
     
             <Icon style={{fontSize:wp('7%'),paddingLeft:wp('0.3%'),color:appColor}} name="home" />

            </View>


                <View style={{width:wp('100%')}}>
                        <TextInput
                        placeholder="House No:"
                        ref={(input) => { this.seventhTextInput = input; }}
                        returnKeyType="next"
                        // onSubmitEditing={() => { this.seventhTextInput.focus(); }}
                        blurOnSubmit={false}
                        placeholderTextColor={'#a0a0a0'}
                        onFocus={()=>this.setState({
                            houser_noFocused:true
                         
                        })}
                        onBlur={()=>this.setState({
                            houser_noBlured:true
                        })}
                        value={this.state.inputs.houser_no.value} 
                        onChangeText={(text) => this.onFieldTextChange(text,'houser_no')}  
                        style={styles.TextInputStyle}
                        
                        >
                        </TextInput>
                    
                </View>

                </View>
                <Text 
      style={[styles.warrnings,this.state.houser_noFocused && this.state.houser_noBlured && !this.state.inputs.houser_no.valid ?styles.show:styles.disapair]}
      >{this.state.inputs.houser_no.warningText}</Text>

                </View>






          <View
                style={{paddingLeft:wp('5%'),paddingRight:wp('5%'),marginTop:wp('5%'),opacity:1}}>

                <View

               style={[styles.textInputOuterView,this.state.numberBlured && this.state.numberFocused && !this.state.inputs.myNumber.valid ?styles.invalid:styles.isvalid]}
               >
                 
               <View style={{width: wp('15%'),
                alignItems: 'flex-start',
                alignContent: 'center',
                paddingLeft:15}}>
     
                {/* <Image 
                style={{height:wp('10%'),width:wp('7%'),
                alignContent:'center',
                justifyContent:'center',
                alignItems:'center'}}
                source={pass_icon}
                /> */}
                <Text style={{fontSize:wp('3.8%'),paddingTop:wp('0.2%'),
                alignContent:'center',
                justifyContent:'center',
                alignItems:'center'}}>
                  {this.state.numCode}
                </Text>

            </View>


                <View style={{width:wp('100%')}}>
                        <TextInput
                        placeholder="Your Phone Number"
                        placeholderTextColor={'#a0a0a0'}
                        onFocus={()=>this.setState({
                          numberFocused:true
                         
                        })}
                        onBlur={()=>this.setState({
                          numberBlured:true
                        })}
                        value={this.state.inputs.myNumber.value} 
                        onChangeText={(text) => this.onChanged(text,'myNumber')}  
                        style={styles.TextInputStyle}
                        maxLength={11}
                        />
                    
                </View>

                </View>
                <Text 
      style={[styles.warrnings,this.state.numberBlured && this.state.numberFocused && !this.state.inputs.myNumber.valid ?styles.show:styles.disapair]}
      >{this.state.inputs.myNumber.warningText}</Text>

                </View>








                <TouchableOpacity disabled={email && password && confiormPassword && CNIC && houser_no && this.state.inputs.myNumber.valid  ? false : true} onPress={() =>  this.RegisterUser(this.state.inputs.password.value,this.state.inputs.email.value,this.state.inputs.name.value,this.state.inputs.myNumber.value,this.state.hearAboutUs)} style={{padding:wp('5%')} }>
    <View style={[styles.login_btn,{backgroundColor:email && password && confiormPassword  && CNIC && houser_no && this.state.inputs.myNumber.valid  ? appColor : appColor,fontWeight: 'bold', borderRadius:50,elevation:3
      ,fontSize: wp('4.1%'),}]}>
                    <Text
                    style={{color:'#fff',
                    fontSize:wp('4.5%'),
                    fontFamily:'Raleway-Bold'}}
                    >

                        CREATE A FREE ACCOUNT
                    </Text>
                
            </View>
            </TouchableOpacity>

        <DefaultButton
        onPress={()=> {Navigation.pop(this.props.componentId)}}
        // disabled={email && password ? false : true}
        innerText={<React.Fragment>
           <Text
                style={{color: '#969696',
                fontFamily: 'Raleway-Light',
                fontSize: wp('3.7%'),
                paddingLeft:wp('5%'),}}>

            Already Registered.<Text>{" "}</Text>
                </Text>
                <Text
                style={{color: appColor,
                fontFamily: 'Raleway-Bold',
                fontSize: wp('4.2%'),
                textAlign:'center'}}>

                      Login
                </Text>
        </React.Fragment>}
       />   


                <View>
            </View>
            <View>
              
            </View>

                          

               

                </ScrollView>
                
                </KeyboardAwareScrollView>

            </View>

            </Root>
        )  
    }
}

const styles = StyleSheet.create({

    conatainer:
    {
        flex:1,
        backgroundColor:'#f4f6fa'
        

    },
    logo_Sec:
    {
        alignContent:'center',
        alignItems:'center',
        marginTop:wp('5%')
    },
    logo:
    {
        width:wp('35%'),
        height:wp('35%'),
        marginBottom:wp('2%')
    },
    image_styles:
    {
     justifyContent:'center',
      alignContent:'center',
      alignItems:'center'
    },

    input_Text:

    {

        justifyContent:'center',
        height:wp('10%'),
        width:wp('90%'),
        fontSize:wp('10%'),
        fontFamily:'regular'
        

        },

        forgot:
        {
            flexDirection:'row',
            height:wp('5%'),
            width:wp('100%'),
            fontSize:wp('7%'),
            marginTop:wp('3%'),
            justifyContent:'flex-end',
            alignContent:'flex-end'
        
        },
        login_btn:
        {

            alignContent:'center',
            alignItems:'center',
            height:wp('14%'),
            width:wp('90%'),
            justifyContent:'center',
            backgroundColor:'#F40009',
            fontFamily:'bold',
        },

        or:
        {
            justifyContent:'center',
            alignContent:'center',
            alignItems:'center',
            // height:wp('7%'),
            // width:wp('7%'),
            paddingTop:wp('1%'),
            paddingBottom:wp('1%'),
            paddingLeft:wp('1.7%'),
            paddingRight:wp('1.7%'),
            backgroundColor:'#333',
            borderRadius:wp('3.4%')
        },
        signup:
        {
            justifyContent:'center',
            alignItems:'center',
            height:wp('14%'),
            flexDirection:'row'
        },
        signupmargin:
        {

            alignContent:'center',
            alignItems:'center',
            height:wp('14%'),
            width:wp('90%'),
            justifyContent:'center',
            backgroundColor:appColor,
            marginTop:wp('3%')

        },
        parent_or:
        {
            flexDirection:'row',
            height:wp('10%'),
            marginTop:wp('3%'),
            width:wp('100%'),
            justifyContent:'center',
            alignContent:'center',
            alignItems:'center'
        },
        place_icon:
        {
            flexDirection:'row',
            justifyContent:'center',
            alignContent:'center',
            alignItems:'center'
        },
        invalid:{
            borderBottomColor:'#8b0000',
        },
        isvalid:{
          borderBottomColor:'rgba(204, 204, 204, .7)',
        },
        disapair:{
          height:0,
          opacity:0
        },
        show:{
          opacity:100,
          //marginBottom:wp('1%')
        },
        warrnings:{
            fontSize:wp('3%'),
            color:'#8b0000',
            fontFamily:'Arial',
            textAlign:'center'
            
          },
          textInputOuterView:{
               
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
            },
            text_country_city:
            {
              
              fontFamily: 'Raleway-Regular',
              // paddingBottom: wp('3%'),
              // paddingTop: wp('3%'),
              paddingLeft: wp('2%'),
              justifyContent:'center',
              paddingRight: wp('5%'),
              color:'#333',
              fontSize: wp('5%'),
              // justifyContent: 'center',
              // alignContent: 'center',
              // alignItems: 'center',
          
            },
          center:{
            justifyContent:"center",
            alignSelf:'auto',
            alignItems:'center',
            alignContent:'center'
          },
          country_city: {
            flexDirection: 'row',
            alignItems:'center',
            width:wp('90%'),
        },

  ImageStyle: {
    //padding: wp('2%'),
    //margin: wp('2%'),
    //height: wp('3%'),
    // /width: wp('3%'),
   // resizeMode: 'stretch',
    //alignItems: 'center',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    alignSelf:'auto',
    paddingRight:wp('3%')
  },
  view_text_arrow:
  {
    flex:4,
    justifyContent:'center'
  },
  view_icon_arrow:
  {
     flex:0.4,
    justifyContent:'center'
  },
  category_text: {
    flex: 1,
    fontFamily: 'Raleway-Regular',
    paddingBottom: wp('3%'),
    color:'#333',
    paddingTop: wp('1.7%'),
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    fontSize: wp('5%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  communication1: {
    height: wp('15%'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'center',
    justifyContent: 'center',
    paddingLeft:wp('4%'),
    width: '100%',
    backgroundColor: '#fff',
  },
  SectionStyle: {
    width:'100%',
    marginTop: wp('4%'),
    marginLeft: wp('5%'),
    marginRight: wp('5%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: wp('0.2%'),
    borderColor: appColor,
    height: wp('15%'),
  },
    closeModal:{
      position:'absolute',
      top:10,
      right:10,
    },
    TextInputStyle:{
      fontSize:wp('4%'),
    // paddingTop:wp('2%'),
    height:wp('14%'),
    marginTop:wp('1%'),
    marginBottom:wp('1%'),
    width:'70%',
    fontFamily:'Raleway-Light'
    },
    view_no_task:
    {
        height: wp('40%'),
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('100%')
    },
    text_no_tasks:
    {
        fontFamily: 'Raleway-Bold',
        fontSize: wp('7%'),
        color: '#333'
    },
})
const mapStateToProps = (state) =>{
  return{
    isLoading:state.ui.isLoading,
    InternetInfo:state.ui.InternetInfo
  }
}
  const mapsDespathToProps =dispatch =>{
    return{
      onRegisterUser :(authDta,componentId) =>dispatch(registerCustomer(authDta,componentId)),
      getCountrt:()=>dispatch(getCountrysData()),
      search:(text)=>dispatch(SearchCountry(text)),
      
    }
  }
  export default connect(mapStateToProps,mapsDespathToProps) (RegisterScreen);