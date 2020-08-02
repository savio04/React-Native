import React, {Component} from  'react'
import { View, StyleSheet } from 'react-native'
import Buttons from './Buttons'
import Display from './Display'

const Estadoinicial ={
    display: '0',
    limparDisplay: false,
    operation: null,
    valores: [0,0],
    corrente: 0,
}

export default class App extends Component{

  state = {...Estadoinicial}

  limpa = () => {
    this.setState({...Estadoinicial})
  }

  add = (n) => {
    
    const limparDisplay = this.state.display === '0' || this.state.limparDisplay
    if (n === '.' && !limparDisplay && this.state.display.includes('.')){
      return
    }
    const valorcorrente = limparDisplay ? '' : this.state.display
    const valordisplay = valorcorrente + n

    this.setState({display: valordisplay, limparDisplay: false})

    if(n !== '.'){
      const novovalor = parseFloat(valordisplay)
      const valores = [...this.state.valores]
      valores[this.state.corrente] = novovalor

      this.setState({valores: valores})
    }
  }

  setoperation = (operation) => {
    if(this.state.corrente === 0){
      this.setState({operation: operation, corrente: 1, limparDisplay: true})
    }else{
      const equals = operation === '='
      const valores = [...this.state.valores]
      try{
        valores[0] = eval(`${valores[0]} ${this.state.operation} ${valores[1]}`)
      }
      catch(e){
        valores[0] = this.state.valores[0]
      }

      valores[1] = 0
      this.setState({
        display: `${valores[0]}`,
        operation: equals ? null : operation,
        corrente: equals ? 0 : 1,
        limparDisplay: !equals,
        valores: valores
      })
    }
  }

  render(){
    return(
      <View style = {styles.container}>
        <Display valor = {this.state.display} />
        <View style = {styles.buttons}>
          <Buttons label = 'AC' triple onClick = {this.limpa} />
          <Buttons label = '/' operation onClick = {this.setoperation} />
          <Buttons label = '7' onClick = {this.add} />
          <Buttons label = '8' onClick = {this.add}/>
          <Buttons label = '9' onClick = {this.add}/>
          <Buttons label = '*' operation onClick = {this.setoperation} />
          <Buttons label = '4' onClick = {this.add}/>
          <Buttons label = '5' onClick = {this.add}/>
          <Buttons label = '6'  onClick = {this.add}/>
          <Buttons label = '-' operation onClick = {this.setoperation} />
          <Buttons label = '1' onClick = {this.add}/>
          <Buttons label = '2' onClick = {this.add}/>
          <Buttons label = '3' onClick = {this.add}/>
          <Buttons label = '+' operation onClick = {this.setoperation} />
          <Buttons label = '0' double onClick = {this.add}/>
          <Buttons label = '.' onClick = {this.add}/>
          <Buttons label = '=' operation onClick = {this.setoperation} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  buttons:{
    flexDirection:'row',
    flexWrap: 'wrap'
  }
})