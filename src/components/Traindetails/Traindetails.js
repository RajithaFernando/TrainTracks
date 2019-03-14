import React from 'react';
import {Model, View, Image, Text, Button} from 'react-native';
const traindetails = props =>(
    <Model>
        <View>
            <Image source={require('../../../img/logo.png')} style={styles.img}/>
            <Text>{props.trainname}</Text>
            <View>
                <Button>

                </Button>
            </View>
        </View>

    </Model>
); 

export default traindetails;