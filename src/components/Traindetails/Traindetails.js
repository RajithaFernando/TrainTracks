import React from 'react';
import {Modal, View, Image, Text, Button, StyleSheet} from 'react-native';

const traindetails = props => {   
    let contetn = null;
    if (props.train){
        contetn = (
            <View>
                <Text>{props.selectedTrain}</Text>
            </View>
        )
    }
    if (props.train === null){
        status = 0;

    }
    // buttonHandller = (prevState)=>{
    //     this.setState(prevState=>{
    //        return{
    //         selectedTrain:null
    //        } 
    //     })
    // }
    return(
        <Modal 
        visible={props.train === null}
        animationType="slide"
        onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
        >
            <View>
                {/* <Image source={require('../../../img/logo.png')} style={styles.img}/> */}
                <Text>Some TExt</Text>
                <View>{contetn}</View>
                <View>
                    <Button title = '< Back' type="outline"
                  
                    />
                    <Button title = 'Location' type="outline"/>
                </View>
            </View>
        </Modal>
    )  
}


export default traindetails;