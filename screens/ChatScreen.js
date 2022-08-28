import { useState, useLayoutEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const onSignOut = async () => {
    signOut(auth).catch((err) => console.log(err));
  };

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log('snapshot');
      setMessages(snapshot.docs.map((doc) => ({
        _id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
      })));
    });

    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((prev) => GiftedChat.append(prev, messages));
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, 'chats'), { _id, createdAt, text, user });
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        avatar: 'https://i.pravatar.cc/300',
      }}
      showAvatarForEveryMessage={true}
    />
  )
}
