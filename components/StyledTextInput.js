import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet
} from 'react-native';
import StyledText from './StyledText';

const StyledTextInput = ({ label, value, placeholder, onChange, autoCapitalize, style }) => {
  return (
    <View style={style}>
      {label && <StyledText style={styles.label}>{label}</StyledText>}

      <TextInput
        style={styles.input}
        onChangeText={text => onChange(text)}
        value={value}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize || 'sentences'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: 'gray',
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    height: 50,
    padding: 5,
  },
})

export default StyledTextInput;
