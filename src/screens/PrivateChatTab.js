import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import theme from "../../assets/colors";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
// import userList from "../../assets/data/userList";
import { getuserListRef } from "../firebase/database";
import { auth } from "../../firebase";

const PrivateChatTab = ({ navigation }) => {
  const [userList, setUserList] = useState([]);

  useEffect(()=> {
    let userListRef = getuserListRef();

    userListRef.on('value', (snapshot) => {
       const list = []
       console.log(snapshot);
       snapshot.forEach((user) => {
          const newUser = {
            id : user.key,
            firstName: user.val().firstName,
            lastName: user.val().lastName,
            avatar: user.val().avatar,
            isActive: true
          }
         
          list.push(newUser);
          
          // setUserList([...userList, newUser]);
       })
      
       
       setUserList(list);
    })


  }, [])

  const renderItem = ({ item }) => {
    if(item.id !== auth.currentUser.uid){
      return (
        <TouchableOpacity style={styles.activeUserItemWrapper} onPress={() => navigation.navigate("PrivateChat", {item : item})}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} resizeMode='cover' />
          <View style={styles.firstnameWrapper}>
              <Text style={styles.firstNameText}>{item.firstName}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return null;
  };

  const renderMessages = ({ item }) => {
    return (
      
      <TouchableOpacity style={styles.messageWrapper} onPress={() => console.log("ssss")}>
        <View style={styles.avatarMessageWrapper}>
          <Image source={item.avatar} style={styles.avatarMessage} />
        </View>
        <View style={styles.contentMessageWrapper}>
            <View style={styles.leftContentMessageWrapper}>
                <Text style={styles.itemUserText}>
                    {item.firstName+" "+item.lastName}
                </Text>
                <Text style={styles.itemMessageText}>Just reached my new location mate</Text>
                
            </View>
            <View style={styles.rightContentMessageWrapper}>
                <Text style={styles.itemTimeText}>
                        14:59
                </Text>
            </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView styles={styles.container}>
      <View
        style={{
          backgroundColor: "white",
          height: "100%",
          width: "100%",
          paddingHorizontal: 13,
        }}
      >
        <Text style={styles.titleText}>Chat</Text>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchTextInput}
            placeholder="Search..."
            icon
          />
          <EvilIcons name="search" size={20} style={styles.iconSearch} />
        </View>
        <View style={styles.activeUserWrapper}>
          <Pressable style={styles.addNewWrapper}>
            <View style={styles.addNewCircleWrapper}>
                <AntDesign name="plus" size={20}/>
            </View>
            <View style={styles.addNewTextWrapper}>
                <Text style={styles.addNewText}>Add New</Text>
            </View>
          </Pressable>
          
          <View style={styles.flatlistWrapper}>
            <FlatList
              data={userList}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={styles.recentTitleWrapper}>
          <Text style={styles.recentTitleText}>Recent</Text>
        </View>
        <View style={styles.seperator} />
        
          {/* <FlatList
            
            data={userList}
            renderItem={renderMessages}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: 13,
  },
  titleText: {
    color: theme.colors.green,
    fontSize: 48,
    marginLeft: 20,
    marginTop: 13,
    fontFamily: theme.fonts.regular,
  },
  searchWrapper: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  searchTextInput: {
    width: "100%",
    alignItems: "center",
    marginHorizontal: 13,
    borderBottomColor: theme.colors.green,
    height: 50,
    padding: 12,
    borderBottomWidth: 1,
    fontSize: 20,
    fontFamily: theme.fonts.regular,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  iconSearch: {
    position: "absolute",
    right: 15,
  },
  activeUserWrapper: {
    flexDirection: "row",
    marginTop: 13,
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    paddingHorizontal: 13,
    alignSelf: "center",

    
  },
  flatlistWrapper: {
    flex: 1,
  },
  activeUserItemWrapper: {
    
    paddingHorizontal: 4,
    marginLeft: 5
  },
  activeUserList: {},
  addNewWrapper: {
    height: 50,
    width: 50,
    // flexDirection: "row",
    // alignItems: "center"
  },
  addNewCircleWrapper: {
    height: 41,
    width: 41,
    borderWidth: 1,
    borderRadius: 21.5,
    borderStyle: "dashed",
    borderColor: theme.colors.red,
    alignItems: "center",
    justifyContent: "center"
  },
  addNewText: {},
  avatar: {
    height: 43,
    width: 43,
    borderRadius: 100,
    overflow: 'hidden'
  },
  firstnameWrapper: {
    
    height: "auto",
    width: "100%",
    fontSize: 9,
    fontFamily: "#2D3F65",
    alignItems: "center"
  },
  firstNameText: {
    fontSize: 9,
    fontFamily: "Rubik-Regular",
    color: "#2D3F65"
  },
  recentTitleWrapper: {
    marginTop: 8,
    marginLeft: 20,
  },
  recentTitleText: {
    color: "2D3F65",
    fontSize: 20,
    fontFamily: theme.fonts.regular,
  },
  seperator: {
    width: "100%",
    backgroundColor: theme.colors.darkGray,
    height: 1,
    marginTop: 13,
  },
  messageWrapper: {
    width: "100%",
    marginTop: 13,
    paddingVertical: 5,
    paddingHorizontal: 13,
    flexDirection: "row",
    marginVertical: 8
    
  },
  itemNameMessage: {
    
  },
  avatarMessageWrapper: {},
  avatarMessage: {},
  contentMessageWrapper: {
    marginLeft: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1
  },
  rightContentMessageWrapper: {
    
  },    
  itemUserText:{
    color: theme.colors.black,
    fontFamily: "Rubik-Medium",
    fontSize: 13
  },
  itemTimeText:{
    color: theme.colors.lightGray,
    fontFamily: "Rubik-Regular",
    fontSize: 9,

    },
    itemMessageText:{
        color: theme.colors.lightGray,
    fontFamily: "Rubik-Regular",
    fontSize: 9
    },
    addNewTextWrapper:{
       flex: 1,
        justifyContent: "flex-end",

    },

    addNewText:{
        color: theme.colors.lightGray,
        fontFamily: "Rubik-Regular",
        fontSize: 9,
    },

});

export default PrivateChatTab;
