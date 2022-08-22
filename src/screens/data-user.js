import React, { useEffect } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from '../redux/actions/auth-actions';
import { useIsFocused } from "@react-navigation/native";
import { baseUrl } from "../utils/global";


const DataUser = ({navigation }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const {loading, list_user} = useSelector((state) => state.userReducer);

    const loadData = async() => {
        await dispatch(getAllUser());
    }

    useEffect(() => {
        loadData();
    }, []);

    const redirectToDetail = (id) => {
        navigation.navigate('ProfileUser', {
            userId: id
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={tw`flex flex-row justify-between items-center p-2`}>
                    <Pressable style={[styles.shadow, tw`py-2 px-4 rounded-full`]} onPress={() => navigation.goBack()}>
                        <Icon name={'angle-left'} size={25} color="#000000" />
                    </Pressable>
                    <Text style={tw`text-center text-lg mr-5`}>Data User</Text>
                    <Pressable style={[styles.shadow, tw`py-2 px-4 rounded`]} onPress={() => navigation.navigate('TambahUser')}>
                        <Icon name={'user-plus'} size={20} color="#000000" />
                    </Pressable>
                </View>

                <View style={tw`my-8`}>
                    {list_user.map((user, index) => {
                        return (
                            <Pressable 
                                onPress={() => redirectToDetail(user.id)} 
                                style={tw`flex flex-row justify-between pr-4 items-center rounded-lg m-4 shadow`} key={index}
                            >
                                <View style={tw`flex flex-row items-center`}>
                                    <Image 
                                        style={styles.imageProfile}
                                        source={{uri: baseUrl + user.foto}}
                                    />
                                    <View style={tw`ml-2`}>
                                        <Text style={tw`text-xl text-black font-bold`}>{user.nama_lengkap}</Text>
                                        <Text style={tw`text-lg font-semibold`}>{user.username}</Text>
                                    </View>
                                </View>
                                <Icon name={'angle-right'} size={25} color="#000000" />
                            </Pressable>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%'
    },
    shadow: {  
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 10, height: 0},
      shadowRadius: 20,
      elevation: 10,
      backgroundColor: 'white'
    },
    imageProfile: {
        width: 80,
        height: 80,
        backgroundColor: 'gray',
        borderRadius: 10,
    }
});

export default DataUser;