import { useState, createContext, useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons';

import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import { auth } from './config/firebase';
import colors from './colors';

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
};

const onSignOut = async () => {
  signOut(auth).catch((err) => console.log(err));
};

const ChatStack = () => {
  return (
    <Stack.Navigator defaultScreenOptions={ChatScreen}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{
        headerRight: () => (
          <TouchableOpacity onPress={onSignOut} style={{ marginRight: 10 }}>
            <AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
          </TouchableOpacity>
        ),
      }} />
    </Stack.Navigator>
  )
};

const AuthStack = () => {
  return (
    <Stack.Navigator defaultScreenOptions={LoginScreen} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
};

const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      (authenticatedUser) ? setUser(authenticatedUser) : setUser(null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  )

  return (
    <NavigationContainer>
      {(user) ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider >
  )
}
