import React from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux'
import { getAllGuru } from '../redux/actions/auth-actions';
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from 'react';
import { baseUrl } from '../utils/global';
import NotFound from '../components/not-found';
import Loader from '../components/loader';

const ListGuru = ({navigation}) => {

  const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const {load_auth, list_guru} = useSelector((state) => state.userReducer);

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

    return load_auth ? (
        <Loader />
    ) : (
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center mr-5`}>Guru</Text>
                <Pressable 
                    onPress={() => navigation.navigate('TambahGuru', {
                        'idJabatan' : 2,
                    })}
                    style={tw`py-2 px-4`}
                >
                    <Icon name={'plus-square'} size={25} color="#000000" />
                </Pressable>
            </View>
            
            {list_guru.length > 0 ? (
                <ScrollView style={tw`bg-white`}>
                    {list_guru.map((user, index) => {
                        return (
                            <Pressable 
                                onPress={() => redirectToDetail(user.id, user.id_jabatan)} 
                                style={tw`flex flex-row justify-between pr-4 items-center rounded-lg m-4`} key={index}
                            >
                                <View style={tw`flex flex-row items-center`}>
                                    <View style={tw`mr-2`}>
                                        <Image 
                                            style={tw`w-20 h-20 rounded-lg`}
                                            source={{uri: baseUrl + user.foto}}
                                        />
                                    </View>
                                    <View style={tw`ml-2`}>
                                        <Text style={tw`text-lg text-black font-bold`}>{user.nama}</Text>
                                        <Text style={tw`text-xs font-semibold`}>{user.mapel.name}</Text>
                                    </View>
                                </View>
                                <Icon name={'angle-right'} size={25} color="#000000" solid />
                            </Pressable>
                        )
                    })}
                </ScrollView>
            ) : (
                <NotFound message="Data Guru Belum Ada :(" />
            )}
            
        </View>
    )
}

export default ListGuru