import React from 'react';
import {Text, View, StyleSheet,TouchableOpacity} from 'react-native'
const listitem =(props)=>(
    <TouchableOpacity onPress = {props.pressed}>
        <View style={sty.list} >
            <Text>{props.itemname}</Text>
        </View>
    </TouchableOpacity>
);
const sty = StyleSheet.create({
    list:{
        width:'100%',
        padding:10,
        backgroundColor:'#eee',
        // margin:5,
        marginLeft:10,
        marginRight:10,
        marginTop:5,
    }
});
export default listitem;