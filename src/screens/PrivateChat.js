import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import theme from "../../assets/colors";
import { AntDesign, Feather } from "react-native-vector-icons";
import { addNewPrivateMessage, getChatListsRef } from "../firebase/database";
import { auth } from "../../firebase";

const deviceHeigth = Dimensions.get("window").height;

const PrivateChat = ({ route, navigation }) => {
  const flatlistRef = useRef(null);
  const item = route.params.item;
  const [chatData, setChatData] = useState({sender: auth.currentUser.uid, receiver: item.id, text: '', time: ''})
  const [chatDataList, setChatDataList] = useState([]);
  
  useEffect(() => {
    
    const chatListRef = getChatListsRef(auth.currentUser.uid, item.id);
    chatListRef.on('value', (snapshot) => {
      const list_tmp = [];
      snapshot.forEach(chat => {
        list_tmp.push(chat.val());
      })

      setChatDataList(list_tmp);
      scrollToEnd();
    })

    
  }, [])
  
  const renderMessageList = ({item}) => {

    if(item.sender === auth.currentUser.uid){
      return(
        <View style={styles.myMessageWrapper}>
        <View style={styles.myMessageTextWrapper}>
          <Text style={styles.myMessageText}>
            { item.text }
          </Text>
        </View>
        <Text style={styles.myTimeSentText}>10 seconds ago</Text>
      </View>
      )
    }else{
      return(
        <View style={styles.yourMessageWrapper} >
        <View style={styles.yourMessageTextWrapper}>
          <Text style={styles.yourMessageText}>
          { item.text }
          </Text>
        </View>
        <Text style={styles.timeSentText}>10 seconds ago</Text>
      </View>
      )
    }
    // return <View />
  }
  
  const scrollToEnd = () => {
    if(flatlistRef !== null){
      const auto_scroll_timer = setTimeout(() => {
        try {
          flatlistRef.current.scrollToEnd()
        } catch (error) {
          
        }

        clearTimeout(auto_scroll_timer);
      }, 500)
    }
  }

  return (
    <View styles={styles.container}>
      <View
        style={{
          backgroundColor: "white",
          height: "100%",
          width: "100%",
        }}
      >
        <View style={styles.messageWrapper}>
          <View style={styles.avatarMessageWrapper}>
            <Image
              source={{ uri : item.avatar }}
              style={styles.avatarMessage}
            />
          </View>
          <View style={styles.headerWrapper}>
            <View style={styles.leftheaderWrapper}>
              <Text style={styles.itemUserText}>{ item.firstName+' '+item.lastName }</Text>
              <Text style={styles.itemactivingTimeText}>Online now</Text>
            </View>
            <View style={styles.rightheaderWrapper}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign
                  name="close"
                  size={30}
                  style={styles.closeIcon}
                  color={theme.colors.lightGray}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.seperatorLine} />
        <View style={styles.chatFormWrapper}>
          <TextInput
            style={styles.textInput}
            num={10}
            placeholder="Type your message..."
            value={chatData.text}
            onChangeText={text => setChatData({...chatData, text: text})}
          />
          <TouchableOpacity style={styles.iconSendWrapper} onPress={() => {
            addNewPrivateMessage(chatData);
            setChatData({...chatData, text: ""})
            scrollToEnd();
          }}>
            <Feather name="send" size={30} color={theme.colors.lightGray} />
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.contentMessageWrapper}
          data={chatDataList}
          renderItem={renderMessageList}
          keyExtractor={item => item.id}
          ref={flatlistRef}
          showsVerticalScrollIndicator={false}
        />
        
        <View style={styles.iconSendWrapper}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },

  messageWrapper: {
    width: "100%",
    marginTop: 13,
    paddingVertical: 5,
    paddingHorizontal: 13,
    flexDirection: "row",
    marginVertical: 8,
  },
  itemNameMessage: {},
  avatarMessageWrapper: {
    marginLeft: 10
  },
  avatarMessage: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  headerWrapper: {
    marginLeft: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  rightheaderWrapper: {},
  itemUserText: {
    color: theme.colors.black,
    fontFamily: "Rubik-Medium",
    fontSize: 13,
  },
  itemactivingTimeText: {
    color: theme.colors.green,
    fontFamily: "Rubik-Regular",
    fontSize: 9,
  },
  seperatorLine: {
    backgroundColor: theme.colors.green,
    width: "90%",
    height: 1,
    alignSelf: "center",
  },
  chatFormWrapper: {
    width: "100%",
    height: 76,
    backgroundColor: "#F3F3F3",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  textInput: {
    width: "85%",
    padding: 10,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    fontFamily: "Rubik-Regular",
  },
  iconSendWrapper: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
  },
  contentMessageWrapper: {
    width: "90%",
    height: "100%",
    marginBottom: 80,
    alignSelf: "center",
    marginTop: 13,
  },

  yourMessageTextWrapper: {
    backgroundColor: theme.colors.green,
    width: "80%",
    height: 41,
    justifyContent: "center",
    padding: 10,
  },

  yourMessageText: {
    fontFamily: "Rubik-Regular",
    fontSize: 10,
    color: theme.colors.lightGray,
  },
  timeSentText: {
    alignSelf: "flex-end",
    marginRight: "20%",
    marginVertical: 7,
    fontFamily: "Rubik-Regular",
    fontSize: 8,
    color: theme.colors.lightGray,
  },

  myMessageTextWrapper: {
    backgroundColor: theme.colors.tranparentGreen,
    width: "80%",
    height: 41,
    justifyContent: "center",
    right: 0,
    borderRadius: 5,
    padding: 10,
    marginLeft: "20%",
  },
  myMessageText: {
    fontFamily: "Rubik-Regular",
    fontSize: 10,
    color: theme.colors.lightGray,
  },
  myTimeSentText: {
    alignSelf: "flex-end",
    marginVertical: 7,
    fontFamily: "Rubik-Regular",
    fontSize: 8,
    color: theme.colors.lightGray,
  },
});

export default PrivateChat;
