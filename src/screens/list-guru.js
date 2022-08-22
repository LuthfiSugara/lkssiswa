import React from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux'
import { getAllGuru } from '../redux/actions/auth-actions';
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from 'react';
import { baseUrl } from '../utils/global';

const ListGuru = ({navigation}) => {

  const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const {loading, list_guru} = useSelector((state) => state.userReducer);

    const loadData = async() => {
        await dispatch(getAllGuru());
    }

    useEffect(() => {
        loadData();
    }, [isFocused]);

    const redirectToDetail = (id, idJabatan) => {
      navigation.navigate('ProfileUser', {
          userId: id,
          idJabatan: idJabatan
      })
    }

    console.log("guru : ", list_guru);
  return (
    <View style={tw`h-full bg-white`}>
        <View style={tw`flex flex-row justify-between items-center p-2`}>
            <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                <Icon name={'angle-left'} size={25} color="#000000" />
            </Pressable>
            <Text style={tw`text-center text-lg mr-5`}>Guru</Text>
            <Pressable 
                onPress={() => navigation.navigate('TambahGuru', {
                    'idJabatan' : 2,
                })}
                style={tw`py-2 px-4`}
            >
                <Icon name={'plus'} size={25} color="#2196f3" />
            </Pressable>
        </View>

        <ScrollView>
            {list_guru.map((user, index) => {
                return (
                    <Pressable 
                      onPress={() => redirectToDetail(user.id, user.id_jabatan)} 
                      style={tw`flex flex-row justify-between pr-4 items-center rounded-lg m-4 shadow`} key={index}
                    >
                        <View style={tw`flex flex-row items-center`}>
                            <View style={tw`mr-2`}>
                                <Image 
                                    style={tw`w-20 h-20 rounded-lg`}
                                    source={{uri: baseUrl + user.foto}}
                                />
                            </View>
                            <View style={tw`ml-2`}>
                                <Text style={tw`text-xl text-black font-bold`}>{user.nama}</Text>
                                <Text style={tw`text-lg font-semibold`}>{user.username}</Text>
                            </View>
                        </View>
                        <Icon name={'angle-right'} size={25} color="#000000" />
                    </Pressable>
                )
            })}
        </ScrollView>
    </View>
  )
}

export default ListGuru