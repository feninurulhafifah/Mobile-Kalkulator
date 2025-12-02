import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { tambah, kurang, kali, bagi } from '../mathFunctions';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousNumber, setPreviousNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // Fungsi untuk format angka dengan pemisah ribuan
  const formatNumber = (num) => {
    if (num === null || num === undefined || num === '') return '0';
    
    // Convert to string and handle decimal
    const numStr = String(num);
    const parts = numStr.split('.');
    
    // Format integer part with thousand separators
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    return parts.join(','); // Use comma for decimal separator (Indonesian format)
  };

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      // Remove formatting for calculation, then add new digit
      const cleanDisplay = display.replace(/\./g, '').replace(',', '.');
      const newDisplay = cleanDisplay === '0' ? String(num) : cleanDisplay + num;
      setDisplay(formatNumber(newDisplay));
    }
  };

  const inputOperation = (nextOperation) => {
    // Clean display for calculation
    const cleanDisplay = display.replace(/\./g, '').replace(',', '.');
    const inputValue = parseFloat(cleanDisplay);

    if (previousNumber === null) {
      setPreviousNumber(inputValue);
    } else if (operation) {
      const currentValue = previousNumber || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(formatNumber(newValue));
      setPreviousNumber(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstOperand, secondOperand, operation) => {
    try {
      switch (operation) {
        case '+':
          return tambah(firstOperand, secondOperand);
        case '-':
          return kurang(firstOperand, secondOperand);
        case '*':
          return kali(firstOperand, secondOperand);
        case '/':
          return bagi(firstOperand, secondOperand);
        default:
          return secondOperand;
      }
    } catch (error) {
      Alert.alert('Error', error.message);
      return 0;
    }
  };

  const performCalculation = () => {
    // Clean display for calculation
    const cleanDisplay = display.replace(/\./g, '').replace(',', '.');
    const inputValue = parseFloat(cleanDisplay);

    if (previousNumber !== null && operation) {
      const newValue = calculate(previousNumber, inputValue, operation);
      setDisplay(formatNumber(newValue));
      setPreviousNumber(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousNumber(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.display} testID="display">
          {display}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {/* Row 1: AC, +/-, %, ÷ */}
        <View style={styles.row}>
          <TouchableOpacity 
            style={[styles.button, styles.functionButton]} 
            onPress={clear}
            testID="clear-button"
          >
            <Text style={styles.functionButtonText}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.functionButton]} 
            onPress={() => {}}
            testID="plus-minus-button"
          >
            <Text style={styles.functionButtonText}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.functionButton]} 
            onPress={() => {}}
            testID="percent-button"
          >
            <Text style={styles.functionButtonText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.operatorButton]} 
            onPress={() => inputOperation('/')}
            testID="divide-button"
          >
            <Text style={styles.operatorButtonText}>÷</Text>
          </TouchableOpacity>
        </View>

        {/* Row 2: 7, 8, 9, × */}
        <View style={styles.row}>
          <TouchableOpacity 
            style={[styles.button, styles.numberButton]} 
            onPress={() => inputNumber(7)}
            testID="number-7"
          >
            <Text style={styles.numberButtonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.numberButton]} 
            onPress={() => inputNumber(8)}
            testID="number-8"
          >
            <Text style={styles.numberButtonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.numberButton]} 
            onPress={() => inputNumber(9)}
            testID="number-9"
          >
            <Text style={styles.numberButtonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.operatorButton]} 
            onPress={() => inputOperation('*')}
            testID="multiply-button"
          >
            <Text style={styles.operatorButtonText}>×</Text>
          </TouchableOpacity>
        </View>

        {/* Row 3: 4, 5, 6, - */}
        <View style={styles.row}>
          <TouchableOpacity 
            style={[styles.button, styles.numberButton]} 
            onPress={() => inputNumber(4)}
            testID="number-4"
          >
            <Text style={styles.numberButtonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.numberButton]} 
            onPress={() => inputNumber(5)}
            testID="number-5"
          >
            <Text style={styles.numberButtonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.numberButton]} 
            onPress={() => inputNumber(6)}
            testID="number-6"
          >
            <Text style={styles.numberButtonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.operatorButton]} 
            onPress={() => inputOperation('-')}
            testID="subtract-button"
          >
            <Text style={styles.operatorButtonText}>−</Text>
          </TouchableOpacity>
        </View>

        {/* Row 4: 1, 2, 3, + */}
        <View style={styles.row}>
          <TouchableOpacity 
            style={[styles.button, styles.numberButton]} 
            onPress={() => inputNumber(1)}
            testID="number-1"
          >
            <Text style={styles.numberButtonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.numberButton]} 
            onPress={() => inputNumber(2)}
            testID="number-2"
          >
            <Text style={styles.numberButtonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.numberButton]} 
            onPress={() => inputNumber(3)}
            testID="number-3"
          >
            <Text style={styles.numberButtonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.operatorButton]} 
            onPress={() => inputOperation('+')}
            testID="add-button"
          >
            <Text style={styles.operatorButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Row 5: 0, ., = */}
        <View style={styles.row}>
          <TouchableOpacity 
            style={[styles.button, styles.numberButton, styles.zeroButton]} 
            onPress={() => inputNumber(0)}
            testID="number-0"
          >
            <Text style={[styles.numberButtonText, styles.zeroButtonText]}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.numberButton]} 
            onPress={() => inputNumber('.')}
            testID="decimal-button"
          >
            <Text style={styles.numberButtonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.operatorButton]} 
            onPress={performCalculation}
            testID="equals-button"
          >
            <Text style={styles.operatorButtonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between', // Distribusi ruang yang lebih baik
  },
  displayContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 25,
    height: 140, // Tambah tinggi lagi untuk ruang yang lebih nyaman
  },
  display: {
    fontSize: 40,
    color: '#fff',
    fontWeight: '200',
    textAlign: 'right',
  },
  buttonContainer: {
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingBottom: 30,
    paddingTop: 15, // Tambah padding untuk spacing yang lebih nyaman
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8, // Kurangi jarak antar row untuk lebih compact
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  // Tombol angka (abu-abu gelap)
  numberButton: {
    backgroundColor: '#333333',
  },
  numberButtonText: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: '400',
  },
  // Tombol fungsi (abu-abu terang)
  functionButton: {
    backgroundColor: '#a6a6a6',
  },
  functionButtonText: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '500',
  },
  // Tombol operator (orange)
  operatorButton: {
    backgroundColor: '#ff9500',
  },
  operatorButtonText: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: '400',
  },
  // Tombol 0 (lebih lebar)
  zeroButton: {
    width: 150,
    borderRadius: 35,
  },
  zeroButtonText: {
    textAlign: 'center', // Rata tengah untuk angka 0
  },
});

export default Calculator;
