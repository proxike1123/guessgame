import React, {useState, useContext } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity} from 'react-native';

const GuessGame = () => {

    const [color, setColor] = useState('#9a9a9a');

    const [text, setText] = useState('')

    const [numberR, setNumberR] = useState(null);

    const [check, setCheck] = useState(false);

    const [start, setStart] = useState(false);

    const [max, setMax] = useState(99);

    const [min, setMin] = useState(1);

    const [guess, setGuess] = useState(null);

    const guessNumber = (max, min, result) => {
      result = Math.floor(Math.random() * (max - min));
      console.log('result: ', result, ', min: ', min, ', Tong: ', result + min);
      return result + min;
    }

    const inputConfirm = () => {
      const number = parseInt(text);
      if (isNaN(number) || number <= 0 || number > 99) {
        setCheck(false);
        setStart(false);
        alert('Wrong number')
      } else {
        setCheck(true);
        setNumberR(number);
        setGuess(guessNumber(max, min));
      }
    }

    const handleText = text => {
      setCheck(false);
      setStart(false);
      setMax(99);
      setMin(1);
      setColor('#9a9a9a');
      setText(text.replace(/[^0-9, -]/g, ''));
    }

    const handleBigger = () => {
      if (guess < numberR) {
        alert('Dont lie')
      } else {
        setMax(guess);
        setGuess(guessNumber(max, min));
      }
    };

    const handleSmaller = () => {
      if (guess > numberR) {
        alert('Dont lie'); 
      } else {
        setMin(guess);
        setGuess(guessNumber(max, min));
      }
    };

    const handleRightAnswer = () => {
      if (guess !== numberR) {
        alert('Dont lie');
      } else {
        alert('Right Answer');
        setColor('red');
      }
    }

    return (
      <TouchableWithoutFeedback onPress = {() => {
        Keyboard.dismiss();
      }}>
        <View style = {styles.container}>
          <Text style = {styles.text}>GUESS GAME</Text>
          <View style = {styles.test}>
            <TextInput 
              style = {styles.input}
              onChangeText = {text => handleText(text)}
              keyboardType = 'numeric'
              value = {text}
            />
            <Button
              title = 'Confirm'
              onPress = {inputConfirm}
              style = {styles.button}
            />
            <Text style = {styles.text}>Your number: </Text>
            {check 
            ? <View style = {styles.buttonBlock}>
                <Text style = {[styles.text, {color: color}]}>{text}</Text> 
                <TouchableOpacity
                  style = {styles.button}
                  onPress = {() => setStart(true)}
                >
                  <Text style = {styles.titleButton}>Start</Text>
                </TouchableOpacity>
            </View>
            : null}
          </View>
          {start && check
          ? <View style = {styles.gessBlock}>
              <Text style = {[styles.text, {color: color}]}>{guess}</Text>
              <View style = {{flexDirection: 'row'}}>
                <TouchableOpacity 
                  style = {styles.button}
                  onPress = {handleSmaller}
                >
                  <Text>Smaller</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style = {styles.button}
                  onPress = {handleBigger}
                >
                  <Text>Bigger</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity 
                  style = {{...styles.button, backgroundColor: 'blue'}}
                  onPress = {handleRightAnswer}
                >
                  <Text style = {{color: 'white'}}>Correct</Text>
                </TouchableOpacity>
            </View>
      : null}
        </View>
      </TouchableWithoutFeedback>
    );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  test: {
    padding: 30,
    width: 300,
    elevation: 6,
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#9a9a9a'
  },
  input: {
    height: 44,
    borderBottomWidth: 2,
    margin: 10,
    borderColor: '#9a9a9a',
    width: 60,
    textAlign: 'center',
    fontSize: 20,
  },
  button: {
    margin: 10
  },
  titleButton: {
    color: 'blue',
    fontSize: 20,
  },
  button: {
    borderWidth: 2,
    borderColor: 'blue',
    padding: 4,
    borderRadius: 20,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonBlock: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gessBlock: {
    padding: 30,
    backgroundColor: 'white',
    elevation: 6,
    margin: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default GuessGame;