import {  database } from '../../firebase';

const getuserListRef = () => {
    return database.ref('users');
}

const addNewPrivateMessage = (chatData) => {
    database.ref('messages').child(chatData.sender).child(chatData.receiver).push().set(chatData);
    database.ref('messages').child(chatData.receiver).child(chatData.sender).push().set(chatData);
}

const getChatListsRef = (myId, yourId) => {
    return database.ref('messages/'+myId+'/'+yourId);
}

export { getuserListRef, addNewPrivateMessage, getChatListsRef }