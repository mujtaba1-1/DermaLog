import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { login } from '../../api/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    
    if (email && password) {
      try {
        await login({email, password})
        router.push('/dashboard')
      } catch (error) {
        Alert.alert('Error', 'Incorrect email or password')
      }
    } else {
      Alert.alert('Error', 'Please enter both email and password');
    }
  };

  const handleSignup = () => {
    router.replace('/register'); 
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Eczema Assistant</Text>
        <Text style={styles.subtitle}>Your personal tool for managing eczema</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.outlineButton} onPress={handleSignup}>
          <Text style={styles.outlineButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#5C7AEA',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#888',
    fontSize: 14,
  },
  form: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: '#555',
  },
  input: {
    width: '100%',
    padding: 12,
    borderColor: '#eee',
    borderWidth: 2,
    borderRadius: 12,
    fontSize: 14,
    backgroundColor: '#f8f9fa',
  },
  button: {
    backgroundColor: '#5C7AEA',
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  outlineButton: {
    borderColor: '#5C7AEA',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#5C7AEA',
    fontWeight: '600',
    fontSize: 16,
  },
});
