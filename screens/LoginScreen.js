import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { View, Alert, Image, StyleSheet, SafeAreaView, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const backImage = require('../assets/back-image.png');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('mail@mail.com');
  const [password, setPassword] = useState('123456');

  const onHandleLogin = async () => {
    if (email !== '' && password !== '') {
      try {
        await signInWithEmailAndPassword(auth, email, password)
        console.log('Login success');
      } catch (err) {
        Alert.alert('Login error', err.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Log In</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter mail"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          textContentType="password"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Log In</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{ color: '#f57c00', fontWeight: '600', fontSize: 14 }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'orange',
    alignSelf: 'center',
    paddingBottom: 24,
  },
  input: {
    backgroundColor: '#f6f7fb',
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: '100%',
    height: 340,
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});
