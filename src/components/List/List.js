import React from 'react';
import {ScrollView , View, StyleSheet} from 'react-native';

import Listitem from '../Listitem/Listitem';

const list = props => {
    const output = props.inputt.map((inp, i) =>(
        <Listitem 
            key={i} 
            search={inp} 
            pressed={() => props.select(i)}       
        />
        ));
    return <ScrollView style = {sty3.list}>{output}</ScrollView>
};

const sty3 = StyleSheet.create({
    list:{
        width: "100%"
    }
});

export default list ;
