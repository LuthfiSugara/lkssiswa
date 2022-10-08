import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { getDetailUser } from '../redux/actions/auth-actions';
import { baseUrl } from "../utils/global";
import tw from "twrnc";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useIsFocused } from "@react-navigation/native";

import { format } from "date-fns";
import Loader from "../components/loader";
import { customStyle } from "../utils/style";


const ProfileUser = ({navigation, route}) => {
    const dispatch = useDispatch();
    const { userId, idJabatan } = route.params;
    const isFocused = useIsFocused();

    const {load_auth, detail_user} = useSelector((state) => state.userReducer);

    const loadData = async() => {
        await dispatch(getDetailUser(userId));
    }

    useEffect(() => {
        loadData();
    }, [isFocused]);

    const redirectToEditUser = () => {
        if(idJabatan == 1){
            navigation.navigate('EditAdmin', {
                userId: userId,
                idJabatan: idJabatan
            });
        }else if(idJabatan == 2){
            navigation.navigate('EditGuru', {
                userId: userId,
                idJabatan: idJabatan
            });
        }else if(idJabatan == 3){
            navigation.navigate('EditSiswa', {
                userId: userId,
                idJabatan: idJabatan
            });
        }
    }
    
    return load_auth ? (
        <Loader/>
      ) : (
        <View style={styles.container}>
            <ScrollView>
                <View style={tw`flex flex-row justify-between items-center p-2`}>
                    <Pressable style={[styles.shadow, tw`py-2 px-4 rounded-full`]} onPress={() => navigation.goBack()}>
                        <Icon name={'angle-left'} size={25} color="#000000" />
                    </Pressable>
                    <Text style={tw`text-center mr-5`}>Profile User</Text>
                    <View></View>
                </View>

                <View style={tw`flex flex-row justify-center p-4`}>
                    <Image
                        style={[customStyle.aspectSquare, tw`w-20 h-30 rounded-lg`]}
                        source={{
                            uri: baseUrl + detail_user?.foto,
                        }}
                    />
                </View>
                <View style={tw`p-4`}>
                    <Text style={tw`text-2xl font-bold text-black text-center`}>{detail_user.nama}</Text>
                    <View style={tw`flex flex-row justify-center mt-2 text-gray-400`}>
                        <TouchableOpacity
                        onPress={redirectToEditUser}
                            style={tw`flex flex-row justify-between bg-teal-500 p-2 px-4 rounded-lg`}
                         >
                            <Text style={tw`text-sm font-semibold text-white mr-4`}>Edit Profile</Text>
                            <Icon name={'angle-right'} size={20} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                    <View style={tw`flex flex-row justify-around mt-10`}>
                        <View>
                            <Text style={tw`text-sm font-bold`}>Jabatan</Text>
                            <Text style={tw`text-sm font-bold text-black text-center`}>{detail_user?.jabatan?.name}</Text>
                        </View>
                        <View>
                            <Text style={tw`text-sm font-bold`}>Jenis Kelamin</Text>
                            <Text style={tw`text-sm font-bold text-black text-center`}>{detail_user?.jenis_kelamin?.name}</Text>
                        </View>
                        {/* {detail_user?.jabatan?.name === "Siswa" ? (
                            <View>
                                <Text style={tw`text-sm font-bold`}>Kelas</Text>
                                <Text style={tw`text-sm font-bold text-black text-center`}>{detail_user.kelas.map((detail, index) => {
                                    return (
                                        detail.detail.name
                                    )
                                })}</Text>
                            </View>
                        ) : (
                            null
                        )} */}
                    </View>
                    <View style={tw`bg-teal-100 p-4 rounded-lg mt-8`}>
                        <View style={tw`flex flex-row justify-between border-b border-gray-400 py-2`}>
                            <Text style={tw`font-bold`}>Username</Text>
                            <Text style={tw`text-black font-bold`}>{detail_user?.username}
                            </Text>
                        </View>
                        <View style={tw`flex flex-row justify-between border-b border-gray-400 py-2`}>
                            <Text style={tw`font-bold`}>Nomor Handphone</Text>
                            <Text style={tw`text-black font-bold`}>{detail_user.no_hp}</Text>
                        </View>
                        <View style={tw`flex flex-row justify-between border-b border-gray-400 py-2`}>
                            <Text style={tw`font-bold`}>Tanggal Lahir</Text>
                            {!detail_user.tanggal_lahir ? (
                                <Text>loading</Text>
                            ) : (
                                <Text style={tw`text-black font-bold`}>{format(new Date(detail_user.tanggal_lahir), 'dd/MM/yyyy')}</Text>
                            )}
                        </View>
                        <View style={tw`flex flex-row justify-between border-b border-gray-400 py-2`}>
                            <Text style={tw`font-bold`}>Tempat Lahir</Text>
                            <Text style={tw`text-black font-bold`}>{detail_user.tempat_lahir}</Text>
                        </View>
                        <View style={tw`flex flex-row justify-between border-b border-gray-400 py-2`}>
                            <Text style={tw`font-bold`}>Alamat</Text>
                            <Text style={tw`text-black font-bold`}>{detail_user.alamat}</Text>
                        </View>
                        {detail_user.id_jabatan == 2 && 
                            <View>
                                <View style={tw`flex flex-row justify-between border-b border-gray-400 py-2`}>
                                    <Text style={tw`font-bold`}>Pendidikan Terakhir</Text>
                                    <Text style={tw`text-black font-bold`}>{detail_user.pendidikan.pendidikan_terakhir}</Text>
                                </View>
                                <View style={tw`flex flex-row justify-between border-b border-gray-400 py-2`}>
                                    <Text style={tw`font-bold`}>Mengajar</Text>
                                    <Text style={tw`text-black font-bold`}>{detail_user.mapel.name}</Text>
                                </View>
                                <View style={tw`flex flex-row justify-between border-b border-gray-400 py-2`}>
                                    <Text style={tw`font-bold`}>Kelas</Text>
                                    <View>
                                        {detail_user.kelas.map((kelas, index) => {
                                            return (
                                                <Text style={tw`text-black font-bold mb-2`} key={index}>{kelas.detail.name}</Text>
                                            )
                                        })}
                                    </View>
                                </View>
                            </View>
                        }
                        
                        {detail_user.id_jabatan == 3 && 
                            <View>
                                <View style={tw`flex flex-row justify-between border-b border-gray-400 py-2`}>
                                    <Text style={tw`font-bold`}>Kelas</Text>
                                    <View>
                                        {detail_user.kelas.map((kelas, index) => {
                                            return (
                                                <Text style={tw`text-black font-bold mb-2`} key={index}>{kelas.detail.name}</Text>
                                            )
                                        })}
                                    </View>
                                </View>
                                <View style={tw`flex flex-row justify-between border-b border-gray-400 py-2`}>
                                    <Text style={tw`font-bold`}>Nama Ayah</Text>
                                    <Text style={tw`text-black font-bold`}>{detail_user.siswa.nama_ayah}</Text>
                                </View>
                                <View style={tw`flex flex-row justify-between border-b border-gray-400 py-2`}>
                                    <Text style={tw`font-bold`}>Pekerjaan Ayah</Text>
                                    <Text style={tw`text-black font-bold`}>{detail_user.siswa.pekerjaan_ayah}</Text>
                                </View>
                                <View style={tw`flex flex-row justify-between border-b border-gray-400 py-2`}>
                                    <Text style={tw`font-bold`}>Nama Ibu</Text>
                                    <Text style={tw`text-black font-bold`}>{detail_user.siswa.nama_ibu}</Text>
                                </View>
                                <View style={tw`flex flex-row justify-between border-b border-gray-400 py-2`}>
                                    <Text style={tw`font-bold`}>Pekerjaan Ibu</Text>
                                    <Text style={tw`text-black font-bold`}>{detail_user.siswa.pekerjaan_ibu}</Text>
                                </View>
                            </View>
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      height: "100%"
    },
    customImage: {
        resizeMode: "cover",
    },
    shadow: {  
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 10, height: 0},
        shadowRadius: 20,
        elevation: 10,
        backgroundColor: 'white'
    }
  });
  

export default ProfileUser;