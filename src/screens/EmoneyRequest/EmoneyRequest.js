
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';
import {
    Platform,
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Image,
    Button,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from  'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {uiStartLoading,uiStopLoading,SubscribeToPacakge} from '../../store/actions/index';
import { URI } from '../../components/variables/variables';
import { Root, Popup, } from 'popup-ui'
class EmoneyRequest extends Component {

   
    constructor(props){
        super(props);
        this.state={
            amount:this.props.totalAmount,
            pickImage:{},
            source:'',
            fileSize:0,
            billingId:'',
            BankName:''
        }
        
    }
    componentDidMount () {
        // this.setState({
        //     amount:this.props.totalAmount
        // })
    }
    SendRequestToCustomer = () =>{
        this.props.dispatch(uiStartLoading());

        let user_id=this.props.user.id;
        // let totalAmount =this.state.PlanePrice * this.state.month;
        // let pacakageName = this.state.pacakageName; 
        // let totalMonth = this.state.month;
        let Data = {
            user_id:user_id,
            totalAmount:this.props.totalAmount,
            pacakageName:this.props.pacakageName,
            totalMonth:this.props.totalMonth,
            paymentMethod:this.props.paymentMethod,
            image:this.state.pickImage,
            amount:this.state.amount,
            filesize:this.state.fileSize,
            source:this.state.source,
            user_id:this.props.user.id,
            biilingId:'this.state.billingId',
            bankName:'this.state.BankName',
            componentId:this.props.componentId
        }
        this.props.dispatch(SubscribeToPacakge(Data));
        // fetch(URI + 'api/CreateWalletRequest', {
        //     method:'POST',
        //     headers: {
        //     Accept:'application/json',
        //     'Content-Type':'application/json',
        //     },
        //     body:JSON.stringify({
        //       "image":this.state.pickImage,
        //       "amount":this.state.amount,
        //       'filesize':this.state.fileSize,
        //       'source':this.state.source,
        //       'user_id':this.props.user.id,
        //       'biilingId':this.state.billingId,
        //       'bankName':this.state.BankName

        //     }),
        //     })
        //     .then((response) => response.json())
        //     .then((responseData) => {
        //       console.log(responseData);
        //       this.props.dispatch(uiStopLoading())
        //     "POST Response",
        //     "Response Body -> "+JSON.stringify(responseData)
        //     // if(responseData.data.verified)
        //     // {
        //     //   alert('Hellow');
        //     // }
        //       if (responseData.success) {
                
        //         Navigation.popToRoot(this.props.componentId);
        //         alert('Successfully created your request');
        //       } else if(!responseData.success) {
        
        //       }
          
        //     }).catch((err)=>{
        //         this.props.dispatch(uiStopLoading())
        //       console.log(err);
        //     })
        //     .done();
    }
    pickImageHandler = () =>{
        ImagePicker.showImagePicker({
            title:'Please Pick An Image',
            maxWidth:800,
            maxHeight:600,
            allowsEditing:true
        }, res => {
    
            if(res.didCancel)
            {
                console.log('User Canceled')
            } else if(res.error)
            {
                console.log('Error', res.error)
            }else {
                this.setState(prevState => {
                    return{
                      pickImage:{
                        key: Math.random(),
                        uri:res.uri,
                        source:res.data,
                        filesize:res.fileSize
                      },
                      source:res.data,
                      fileSize:res.fileSize
                    }
                })
                // this.props.SaveProfile(this.state.pickImage);
                // this.props.onImageSelect({uri:res.uri,base64:res.data});
            }
        });
    }
    render() {
        console.log(this.state);
        let PlaceHOlder = this.props.totalAmount.toString();
        let Loader = ( <View>

            </View>);
              if(this.props.isLoading)
              {
                Loader = (
                    <View style={{zIndex:999999,justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'rgba(0,0,0,.6)',position:'absolute',top:0,left: 0,right: 0, bottom: 0,flex: 1}}>
                    <ActivityIndicator size={'large'} color={'#e2e2e2'}  />
                 </View>)
              }
        return (
            <Root>
            <View style={styles.container}>
      {Loader}
      <KeyboardAwareScrollView>
      <ScrollView >
      <View style={styles.mainSection}>     
          {/* <View style={{flexDirection:'column',alignContent:'flex-start',justifyContent:'flex-start'}}>
            <View style={{alignContent:'flex-start',justifyContent:'flex-start',marginBottom:wp('3%')}}>
                   <Text style={styles.txt_view}>You can transfer your payment to our bank account:</Text>
            </View>
            <View style={{alignContent:'flex-start',justifyContent:'flex-start',marginBottom:wp('1%')}}>
                   <Text style={styles.txt_vieww}>MCB IBAN:</Text>
            </View>  
            <View style={{alignContent:'flex-start',justifyContent:'flex-start',marginBottom:wp('1%')}}>
                   <Text style={styles.txt_view}>PK98MUCB1163975251017530</Text>
            </View>
            
            <View style={{alignContent:'flex-start',justifyContent:'flex-start',marginBottom:wp('1%')}}>
                   <Text style={styles.txt_vieww}>Account Title:</Text>
            </View>  
            <View style={{alignContent:'flex-start',justifyContent:'flex-start',marginBottom:wp('1%')}}>
                   <Text style={styles.txt_view}>Uncle Fixer Pvt LTD</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <View style={{flexDirection:'column'}}>
                  <View style={{alignContent:'flex-start',justifyContent:'flex-start',marginBottom:wp('1%')}}>
                          <Text style={styles.txt_vieww}>MCB Account Number:</Text>
                  </View>  
                  <View style={{alignContent:'flex-start',justifyContent:'flex-start',marginBottom:wp('1%')}}>
                          <Text style={styles.txt_view}>1163975251017530</Text>
                  </View>
              </View>
              <View style={{flexDirection:'column',marginLeft:wp('8%')}}>
                  <View style={{alignContent:'flex-start',justifyContent:'flex-start',marginBottom:wp('1%')}}>
                          <Text style={styles.txt_vieww}>UBL Account Number:</Text>
                  </View>  
                  <View style={{alignContent:'flex-start',justifyContent:'flex-start',marginBottom:wp('1%')}}>
                          <Text style={styles.txt_view}>264046299</Text>
                  </View>
              </View>
            </View>
            
            <View style={{flexDirection:'row'}}>
              <View style={{flexDirection:'column'}}>
                  <View style={{alignContent:'flex-start',justifyContent:'flex-start',marginBottom:wp('1%')}}>
                          <Text style={styles.txt_vieww}>MCB Branch Code:</Text>
                  </View>  
                  <View style={{alignContent:'flex-start',justifyContent:'flex-start',marginBottom:wp('1%')}}>
                          <Text style={styles.txt_view}>0181</Text>
                  </View>
              </View>
              <View style={{flexDirection:'column',marginLeft:wp('14%')}}>
                  <View style={{alignContent:'flex-start',justifyContent:'flex-start',marginBottom:wp('1%')}}>
                      <Text style={styles.txt_vieww}>UBL Branch Code:</Text>
                  </View>  
                  <View style={{alignContent:'flex-start',justifyContent:'flex-start',marginBottom:wp('1%')}}>
                          <Text style={styles.txt_view}>0328</Text>
                  </View>
              </View>
            </View>
            
            <View style={{flexDirection:'row'}}>
              <View style={{flexDirection:'column'}}>                    
                  <View style={{alignContent:'flex-start',justifyContent:'flex-start',marginBottom:wp('1%')}}>
                          <Text style={styles.txt_vieww}>Bank:</Text>
                  </View>  
                  <View style={{alignContent:'flex-start',justifyContent:'flex-start',marginBottom:wp('1%')}}>
                          <Text style={styles.txt_view}>MCB Bank Limited</Text>
                  </View>
              </View>
              <View style={{flexDirection:'column',marginLeft:wp('15%')}}>
                  <View style={{alignContent:'flex-start',justifyContent:'flex-start',marginBottom:wp('1%')}}>
                          <Text style={styles.txt_vieww}>Bank:</Text>
                  </View>  
                  <View style={{alignContent:'flex-start',justifyContent:'flex-start',marginBottom:wp('1%')}}>
                          <Text style={styles.txt_view}>UBL Bank Limited</Text>
                  </View> 
              </View>
            </View>


            <View style={{alignContent:'flex-start',justifyContent:'flex-start',marginTop:wp('5%'),marginBottom:wp('2%')}}>
                   <Text style={styles.txt_views}>
                       Please submit the completed transaction slip using the form below.
                       We'll review and update your wallet balance accordingly
                   </Text>
            </View>
            
          </View> */}
          <View style={{width:wp('80%'),height:wp('0.1%'),backgroundColor:'#000'}} />
          <View style={{flexDirection:'column',alignContent:'center',alignItems:'center',marginTop:wp('5%')}}>
          {this.state.pickImage.source?
              <View style={{width:wp('50%'),height:wp('30%')}}>

              <ImageBackground
                 source={{
                 uri:this.state.pickImage.uri
                 }} 
                 resizeMode={"contain"}
                style={styles.icon}
              >
                  <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
                  <Icons 
                  name="ios-close-circle-outline" 
                  size={wp('10%')} 
                  style={{color:'red'}}
                    onPress={() =>{
                        this.setState({
                            pickImage:{}
                        })
                    }}
                  />
                  </View>
              </ImageBackground>
              </View>  :  <TouchableOpacity onPress={() =>{
                  this.pickImageHandler();
              }} style={styles.IconSec}><Icon style={styles.icon} name='camera'  /></TouchableOpacity>    }
     
           
          <TouchableOpacity onPress={()=>{
              this.pickImageHandler();
          }}  style={[styles.txtSec]}>
              <Text style={styles.txtline}>Upload cheque slip </Text>
          </TouchableOpacity>
          </View> 
          {/* <View style={[styles.newSec,]}>
              <TextInput
               placeholderTextColor={'black'}
               style={{fontSize:wp('4%'),width:'100%'}}
               value={this.state.BankName}
               onChangeText={(text)=>{
                   this.setState({
                       BankName: text,
                   });
               }}
               placeholder={'Enter Bank Name'}
              />
          </View> */}
          <View style={[styles.newSec,{marginTop:wp('3%')}]}>
              <TextInput
              placeholderTextColor={'black'}
              editable={false}
              style={{fontSize:wp('4%'),width:'100%'}}
              value={this.state.amount}
              keyboardType={'numeric'}
              onChangeText={(text)=>{
                  this.setState({
                      amount: text.replace(/[^0-9]/g, ''),
                  });
              }}
              placeholder={PlaceHOlder}
              />
          </View>
       
          {/* <View style={[styles.newSec,{marginTop:wp('3%')}]}>
              <TextInput
               placeholderTextColor={'black'}
               style={{fontSize:wp('4%'),width:'100%'}}
               value={this.state.billingId}
               onChangeText={(text)=>{
                   this.setState({
                       billingId: text,
                   });
               }}
               placeholder={'Enter Bank Voucher Number'}
              />
          </View> */}
         
          <TouchableOpacity disabled={this.state.pickImage.source?false:true} onPress={()=>{
              this.SendRequestToCustomer();
          }}  style={[styles.btnSec,{backgroundColor:this.state.pickImage.source?'#cd2026':'gray'}]}>
              <Text style={styles.btnTxt}>Done</Text>
          </TouchableOpacity>
      </View>    
      </ScrollView>
      </KeyboardAwareScrollView>
  </View> 
  </Root>
    );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent:'center',
        alignItems:'center',
        // marginTop: Platform.OS === 'ios' ? 40 : 1,
        backgroundColor: '#fff',
    },
    mainSection: {
        backgroundColor:'#F7F7F7',
        // width:wp('90%'),
        height:'auto',
        // height:hp('75%'),
        alignContent:'center',
        alignItems:'center',
        padding:wp('5%'),
        marginTop:wp('2%'),
        borderRadius:wp('0.5%'),
        marginLeft:wp('2.5%'),
        marginRight:wp('2.5%'),
        elevation: 5
    },
    txt_view:
    {
        
        color:'#434444',
        fontSize:wp('3.5%')
    },
    txt_vieww:
    {

        color:'#545454',
        fontSize:wp('3.5%'),
        fontWeight:'bold'
    },
    txt_views:
    {

        color:'#434444',
        fontSize:wp('3.5%')
    },
    icon: {
        flex:1,
        alignContent:'center',
        alignItems:'center',
        color:'#cd2026',
        fontSize:wp('15%')
    },
    IconSec:{
        width:wp('20%'),
        height:wp('20%'),
        marginLeft:wp('4%')
    },
    txtSec:{
        width:wp('50%'),
        marginTop:wp('1%'),
        backgroundColor:'#f0f0f0',
        padding:wp('3%'),
        borderRadius:wp('2%')
    },
    txtline:{
        
        color:'black',
        textAlign:'center'
    },
    newSec:{
        flexDirection:'row',
        width:wp('80%'),
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#5ba505',
        padding:wp('1%'),
        borderRadius:wp('1%'),
        marginTop:wp('12%')
    },
    TotalAmount:{

        color:'black'
    },

    totalNum:{
        
        color:'black',
        marginLeft:wp('38%')
    },
   
    btnSec:{
        width:wp('80%'),
        backgroundColor:'#5ba505',
        padding:wp('3%'),
        borderRadius:wp('1%'),
        marginTop:wp('15%'),
    },
    btnTxt:{
        
        color:'#fff',
        fontSize:wp('5%'),
        textAlign:'center'
    }


});
const mapsStateToProps = state =>{
    return{
        user:state.user.user,
        isLoading:state.ui.isLoading
    }
}
export default connect(mapsStateToProps,null) (EmoneyRequest)