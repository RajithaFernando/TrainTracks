import React from 'react';
import {View, StyleSheet} from 'react-native';

import Listitem from '../List/List';

const list = props => {
    const output = props.inputt.map((inp, i) =>(
        <Listitem 
            key={i} 
            search={inp} 
            pressed={() => props.delt(i)}       
        />
        ));
    return <View style = {sty3.list}>{output}</View>
};

const sty3 = StyleSheet.create({
    list:{
        width: "100%"
    }
});

export default list ;
