
import Icon from 'react-native-vector-icons/MaterialIcons';
import {hideAlerts} from '../../store/actions/index';
import Cross from 'react-native-vector-icons/MaterialIcons'
import React, { Fragment } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  TouchableHighlight,
  Alert,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';


class AlertSuccess extends React.Component {

  state = {
    modalVisible: false,
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    // if(this.props.showModal){
    //   setTimeout(()=> { this.props.HideAlert(); }, 5000);
    // }

    return (

      

      <View style={styles.conatainer}>

        <View style={styles.view_modal_parent}>
          <Modal


            transparent={true}
            visible={this.props.showModal}
          >
            <View style={styles.view_modal}>

        <View style={styles.view_parent}>
                <View style={styles.view_green_top}>
                    <View style={styles.view_text_title}>
                        <Text style={styles.text_title_green}>
                            {/* Success */}
                    </Text>
                    </View>
                        <TouchableOpacity onPress={() => {
                    this.props.HideAlert();
                    // this.setModalVisible(!this.state.modalVisible);

                  }}
                            style={styles.croxx}>
                            <Cross name="cancel" size={wp('7%')} color="#000000" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.view_icon}>
                        <Icon name="check-circle" size={wp('10%')} color="green" />
                    </View>
                    <View style={styles.view_text_bottom}>
                        <Text style={styles.text_bottom}>{this.props.responseData}</Text></View>
                </View>
            </View>
          </Modal>

          {/* <TouchableHighlight
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text>Show Modal</Text>
          </TouchableHighlight> */}
        </View>


        


      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',


  },
  view_parent:
  {
      flex: 0,
      // marginTop:wp('30%'),
      width: wp('86%'),
      padding: wp('2%'),
      marginHorizontal: wp('7%'),
      paddingBottom: wp('5%'),
      marginTop: wp('20%'),
      backgroundColor: '#ffffff',
      // borderTopLeftRadius:wp('3%%'),
      // borderTopRightRadius:wp('10%'),
      borderRadius: wp('2%'),
      justifyContent: 'center',
      alignItems: 'center',
  },
  view_cross:
  {
      flexDirection: 'row',
      width: '100%',
      // paddingRight: wp('4%'),
      // paddingTop: wp('4%'),
      backgroundColor: '#ffffff',
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
  },
  view_text_title: {
      flex:1,
      marginLeft:wp('5%'),
      flexDirection:'row',
      justifyContent: 'flex-start',
      alignItems: 'center',

  },
  text_title:
  {
      fontSize: wp('4%'),
      color:'red',
      fontFamily: 'Roboto-Medium',
      textAlign: 'center',

  },
  text_title_green:
  {
      fontSize: wp('4%'),
      color:'green',
      fontFamily: 'Roboto-Medium',
      textAlign: 'center',

  },
  view_image:
  {
      justifyContent: 'center',
      alignItems: 'center',
  },
  croxx:
  {
      flex:1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      width: '100%',
  },
  text_bottom:
  {
      textAlign: 'center',
      fontFamily:'Roboto-Medium',
      fontSize: wp('3.7%')
  },
  view_icon:
  {
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      marginTop: wp('4%'),
  },
  view_green_top:
  {
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      width: '100%',

  },
  view_close:
  {
      flex: 1,
      flexDirection: 'row',
      height: '100%',
      justifyContent: 'flex-end',
      marginRight: wp('7%'),
      alignItems: 'center',
  },
  view_text_bottom:
  {
    paddingLeft:wp('2%'),
    paddingRight:wp('2%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom:wp('5%'),
    marginTop: wp('4%')

  },
  view_modal:
  {
    height: '100%',
    width: '100%',
    backgroundColor:'rgba(0,0,0,.4)',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  view_modal_parent:
  {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }

});
const mapsDispatchToProps = (dispatch) =>{

  return{
      HideAlert:()=>(dispatch(hideAlerts()))
  }
}
const mapsStateToProps = (state) =>{
    return{
        showModal:state.ui.showSuccess,
        responseData:state.ui.responseData
    }
}

export default connect(mapsStateToProps,mapsDispatchToProps) (AlertSuccess);
