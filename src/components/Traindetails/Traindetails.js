import React from 'react';
import {Modal, View, Image, Text, Button, StyleSheet, Alert} from 'react-native';

const traindetails = props => {  
    
    
    let contetn = null;
    if (props.train !== null){
        contetn = (
            <View>
                <Text>{props.selectedTrain}</Text>
                <Text>UDa balannaaaa</Text>
                
            </View>
        )
    }
    if (props.train !== null){
        status = 0;

    }

    let abc = false
    // 
    // alert (props.train)
    return(
        
        <Modal 
        visible={props.train !== null}
        animationType="slide"
        
        >
            <View>
                {/* <Image source={require('../../../img/logo.png')} style={styles.img}/> */}
             
                <View>{contetn}</View>
                <View>
                    <Button title = 'Back' type="outline" color = "black" 
                            onPress = {props.buttonHandller}
                        />
                    <Button title = 'Location' type="outline"/>
                </View>
                
            </View>
        </Modal>
        
    )  
}


export default traindetails;