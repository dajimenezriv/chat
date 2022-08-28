import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import colors from '../colors';

const cat = require('../assets/cat.png');

export default function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome name="search" size={24} color={colors.gray} style={{ marginLeft: 15 }} />
      ),
      headerRight: () => {
        <Image
          source={{ uri: cat }}
          style={{
            width: 40,
            height: 40,
            marginRight: 15,
          }}
        />
      }
    })
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat')}
        style={styles.chatButton}
      >
        <Entypo name="chat" size={24} color={colors.lightGray} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#fff'
  },
  chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  },
});
