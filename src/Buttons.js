import React from 'react'
import { Text, TouchableHighlight, Dimensions, StyleSheet } from 'react-native'

export default (props) => {
    const Styles = [styles.buttons]

    if(props.operation){
        Styles.push(styles.operadores)
    }
    if(props.triple){
        Styles.push(styles.triple)
    }
    if(props.double){
        Styles.push(styles.double)
    }
    return(
        <TouchableHighlight onPress = {() => props.onClick(props.label)}>
            <Text style = {Styles} > {props.label} </Text>
        </TouchableHighlight>
    )
}


const styles = StyleSheet.create({
    buttons:{
        height: Dimensions.get('window').width/4,
        width: Dimensions.get('window').width/4,
        textAlign: 'center',
        fontSize: 30,
        padding: 10,
        color : 'gray'
    },
    triple:{
        width: (Dimensions.get('window').width/4)*3
    },
    double:{
        width: (Dimensions.get('window').width/4)*2
    },
    operadores:{
        backgroundColor: '#fa8231',
        color: '#fff'
    }
})