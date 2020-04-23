
import check from '../../assets/check.png';
import credit from '../../assets/credit.png';
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
    Picker,
    Button,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import { Root, Popup } from 'popup-ui';
import { PushScreen } from '../../components/PushScreen/PushScreen';
export default  class SubScribeViewPage extends Component {
    
    state = {
        screenHeight: 0,
        month:0
    }   
    onContentSizeChange = (contentHeight) => {
        // Save the content height in state
       let content = contentHeight + 100;
        this.setState({ screenHeight: content });
    };

     


        constructor(props){
            super(props);
          Navigation.events().bindComponent(this);
        }

    render() {
        let Data =[
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
        ]
        if(this.props.pacakageName == 'lite'){
            Data =[
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
            ]
        }
      
        let PriceTotal =this.state.month * this.props.amount ;
        // console.log(this.props);

        let enable = this.state.screenHeight + 100 > hp('100%');
        return (
            <View style={styles.container}>

                <ScrollView scrollEnabled={enable}  showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator ={false}
                    onContentSizeChange={this.onContentSizeChange}>
                <View style={{alignContent:'center', justifyContent:'center', alignItems:'center',marginTop:35}}>
                    <View style={styles.mainSection}>     
                        <View style={{flexDirection:'column',alignContent:'flex-start',justifyContent:'flex-start',marginTop:15}}>
                            <View style={{alignContent:'center',justifyContent:'center',marginBottom:15}}>
                                    <Text style={styles.txt_view}>Select Your Months</Text>
                            </View>
                        </View>
                        <View style={{width:wp('94%'),height:wp('0.2%'),backgroundColor:'#dbdbdb',marginTop:10}} />
                        <View style={{flex:0,flexDirection:'column', width:wp('80%'),backgroundColor:'#000'}} />
                           
                            {/* <TouchableOpacity  style={styles.btnSec} 
                           > */}
                                <RNPickerSelect
                                        onValueChange={(value) => {
                                        this.setState({month: value})
                                        }}
                                        placeholder={{
                                        label: 'Please Select Months',
                                        value: 0,
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
                                                borderTopColor: 'gray',
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
                                        items={Data}
                                    />
                                
                            {/* </TouchableOpacity> */}
                            <View  style={styles.btnSec}>
                            <View style={{flex:5,alignContent:'center',justifyContent:'center',height:50}}>
                                    <Text style={styles.body_txt_view}>Total Amount</Text>  
                                </View>
                                <View style={{flex:4,alignContent:'center',justifyContent:'center',}}>
                                    <Text style={styles.body_txt_view1}>{PriceTotal}</Text>
                                </View>
                            </View>
                            <TouchableOpacity 
                            disabled={PriceTotal == 0 ?true:false}
                            onPress={() =>{
                                let ExtraData = {
                                    pacakageName:this.props.pacakageName,
                                    amount:PriceTotal,
                                    month:this.state.month
                                  }
                                  PushScreen(this.props.componentId,'navigation.playground.EwalletScreen','Payment Gateway',ExtraData)
                            }}  style={[styles.btnSec]}
                            >
                                <View style={{width:350,alignContent:'center',justifyContent:'center',alignItems:'center',height:50,backgroundColor:PriceTotal == 0 ?'gray':'green'}}>
                                    <Text style={styles.body_txt_view11}>Subscirbe</Text>    
                                </View>
                               
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>{
                                Navigation.pop(this.props.componentId); 
                            }}  style={styles.btnSec}
                            >
                                <View style={{width:350,alignContent:'center',justifyContent:'center',alignItems:'center',height:50,backgroundColor:'red'}}>
                                    <Text style={styles.body_txt_view11}>Cancel</Text>  
                                </View>
                               
                            </TouchableOpacity>
                    </View>    
                </View>      
                </ScrollView>
        
            </View> 
    );
    }
};

const styles = StyleSheet.create({
                container: {
                flex: 1,
                backgroundColor: '#fff',
                zIndex:0
            },
            topbar:
            {
              flexDirection:'row',
              backgroundColor:'#5ba505',
              width:500,
              height:Platform.OS === 'ios' ? 120 : 60,
              alignItems:'center',
              
            },
            IconView:
            {
              flex:0.4,
              marginLeft:20,
              marginTop:Platform.OS === 'ios' ? 40 : 0,
            },
            IconViewStyle:
            {
              fontSize:26,
              color:'#fff'
            },
            TopTxtView:
            {
              alignContent:'center',
              justifyContent:'center',
              alignItems:'center',
              marginTop:Platform.OS === 'ios' ? 40 : 0,
            },
            TxtViewStyle:
            {
              fontSize:22,
              color:'#fff',
              fontWeight:'bold'
            },
            mainSection: {
                backgroundColor:'#F7F7F7',
                width:390,
                alignContent:'center',
                justifyContent:'center',
                alignItems:'center',
                padding:10,
                marginTop:5,
                borderRadius:5,
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.25,
                shadowRadius: 7.84,
                marginTop:Platform.OS === 'ios' ? 50 : 5,
                marginBottom:Platform.OS === 'ios' ? 16 : 18,
            },
            picker: {
                width: 300,
                
              },
              pickerItem: {
                color: '#fff',
                backgroundColor:'#5ba505'
               
             
              },
            txt_view:
            {
                color:'#434444',
                fontSize:22,
                fontWeight:'bold'
            },
            txt_vieww:
            {
               
                color:'#545454',
                fontSize:15,
                fontWeight:'bold'
            },
            txt_views:
            {
               
                color:'#434444',
                fontSize:15
            },
            icon: {
                flex:1,
                alignContent:'center',
                alignItems:'center',
                color:'#5ba505',
                fontSize:15
            },
            IconSec:{
                width:100,
                height:100,
                marginLeft:8
            },
            txtSec:{
                width:200,
                marginTop:5,
                backgroundColor:'#f0f0f0',
                padding:10,
                borderRadius:15,
            },
            txtline:{
        
                color:'black',
                textAlign:'center'
            },
            TotalAmount:{
    
                color:'black'
            },

            totalNum:{
                color:'black',
                marginLeft:15
            },
           
            btnSec:{
                flexDirection:'row',
                width:350,
                height:50,
                backgroundColor:'#fcfcfc',
                borderRadius:6,
                marginTop:15,
                elevation:5,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.25,
                shadowRadius: 8.84,
                marginBottom:15,
          
            },
          
            body_icon_view:
            {
                width:45,
                height:45,
                resizeMode:'contain',
             
            },
            body_txt_view:
            {
                marginLeft:15,
                fontSize:Platform.OS === 'ios' ? 16 : 17,
                fontWeight:'bold'
               
            },
            body_txt_view11:
            {
         
                fontSize:Platform.OS === 'ios' ? 20 : 18,
                fontWeight:'bold',
                color:'#fff'
               
            },
            body_txt_view1:
            {
                fontSize:Platform.OS === 'ios' ? 22 : 23,
                fontWeight:'bold',
                color:'#5ba505'
               
            },



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