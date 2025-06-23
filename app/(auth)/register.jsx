import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { login, register } from '../../api/authService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [connecting, setConnecting] = useState(false)

  const router = useRouter();

  const handleRegister = async () => {
    
    if (username && email && password) {
      try {
        setConnecting(true)
        await register({username, email, password})
        await login({email, password})
        setConnecting(false)
        router.replace('/dashboard')
      } catch (error) {
        let message;

        if (error.response && error.response.data) {
          message = error.response.data
        } else {
          message = 'An unknown error occurred'
        }

        Alert.alert('Error', message);
        setConnecting(false)
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  const goToLogin = () => {
    router.replace('(auth)');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Create your account</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            autoCapitalize="none"
            editable={!connecting}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!connecting}
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
            editable={!connecting}
          />
        </View>

        {!connecting ? (<>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineButton} onPress={goToLogin}>
            <Text style={styles.outlineButtonText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </>) : <ActivityIndicator size="large" color="#397FF5" /> }
      </View>
    </View>
  );
};

export default Register;

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
