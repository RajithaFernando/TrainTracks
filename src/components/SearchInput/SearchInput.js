import React, {Component} from 'react';
import {TextInput, View, StyleSheet, Button} from 'react-native';


class SearchInput extends Component {
    state = {
        search:'',
    }
    searchHandler = val =>{
        this.setState({
        search:val
        });
    }
    
    inputHandler = ()=>{
        if (this.state.search.trim()===""){
        return
        }
        
        this.props.onPlaceAdded(this.state.search)
        
    }

    render(){
        return(
            <View style= {sty2.inputContainer}>
                <TextInput 
                    style={sty2.searchbox}
                    value={this.state.search} 
                    onChangeText={this.searchHandler}
                    placeholder="Some Note"
                />
                <Button 
                    style={sty2.button}
                    onPress={this.inputHandler }
                    title='Search'
                />
            </View>
        )
    }

}


const sty2 = StyleSheet.create({
    inputContainer: {
        // flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      },
    searchbox:{
        width:300, 
        borderColor:"black", 
        borderWidth:1

    },
    button:{
        padding:20,
    },
})

export default SearchInput;
