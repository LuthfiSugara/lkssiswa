import React, { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from "react-redux";
import { addNewMapel, dataMataPelajaran, editMataPelajaran } from "../redux/actions/setting-actions";

const ListMapel = ({navigation}) => {
    const dispatch = useDispatch();
    const [modalAddMapel, setModalAddMapel] = useState(false);
    const [tambahMapel, setTambahMapel] = useState("");
    const [modalEditMapel, setModalEditMapel] = useState(false);
    const [ubahMapel, setUbahMapel] = useState("");
    const [idMapel, setIdMapel] = useState("");

    const {loading, data_mapel} = useSelector((state) => state.settingReducer);

    const loadData = async() => {
        await dispatch(dataMataPelajaran());
    }

    useEffect(() => {
        loadData();
    }, []);

    const hideAddModalMapel = () => {
        setModalAddMapel(false);
    }

    const addMapel = () => {
        const formData = new FormData();
        formData.append('nama', tambahMapel);

        dispatch(addNewMapel(formData))
        .then(response => {
            if(response.status === "success"){
              loadData();
              setModalAddMapel(false);
              setTambahMapel("");
            }
        })
    }

    const hideEditModalMapel = () => {
        setModalEditMapel(false);
    }

    const editMapel = () => {
        const formData = new FormData();
        formData.append('nama', ubahMapel);
        console.log(formData + idMapel)
        dispatch(editMataPelajaran(formData, idMapel))
        .then(response => {
            if(response.status === "success"){
              loadData();
              setModalEditMapel(false);
              setUbahMapel("");
              setIdMapel("");
            }
        })
    }

    console.log("mapel : ", data_mapel);
    return (
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center text-lg mr-5`}>Daftar Mata Pelajaran</Text>
                <Pressable 
                    onPress={() => setModalAddMapel(true)}
                    style={tw`py-2 px-4`}
                >
                    <Icon name={'plus'} size={25} color="#2196f3" />
                </Pressable>
            </View>

            <ScrollView style={tw`px-4 mt-4`}>
                {data_mapel.map((mapel, index) => {
                return (
                    <View 
                        onPress={() => navigation.navigate('ListKelas')}
                        style={tw`flex flex-row justify-between bg-gray-100 p-4 mb-4 rounded-lg items-center`}
                        key={index}
                    >
                        <View style={tw`flex flex-row items-center`}>
                            <Text style={tw`text-lg text-black ml-2`}>{mapel.name}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            setModalEditMapel(true);
                            setUbahMapel(mapel.name);
                            setIdMapel(mapel.id);
                        }}
                        >
                            <Icon name={'edit'} size={25} color="#2196f3" />
                        </TouchableOpacity>
                    </View>
                )
                })}
            </ScrollView>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalAddMapel}
              onRequestClose={() => {
                setModalAddMapel(false);
              }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={tw`text-xl font-bold mb-4`}>Tambah Mata Pelajaran</Text>
                        <View style={tw`w-full mb-4`}>
                        <TextInput
                            onChangeText={(event => setTambahMapel(event))}
                            value={tambahMapel}
                            style={tw`w-full border border-gray-400 rounded-lg px-4`}
                        />
                        {tambahMapel === "" ? (
                            <Text style={tw`text-red-500`}>Tidak boleh kosong</Text>
                        ) : null}
                        </View>

                        <View style={tw`flex flex-row`}>
                            <Pressable 
                                onPress={hideAddModalMapel}
                                style={tw`bg-gray-500 p-2 w-2/5 rounded-lg mr-1`}
                            >
                                <Text style={tw`text-white text-center text-lg`}>Batal</Text>
                            </Pressable>
                            <Pressable
                                onPress={addMapel}
                                style={tw`bg-blue-500 p-2 w-2/5 rounded-lg ml-1`}
                            >
                                <Text style={tw`text-white text-center text-lg`}>Simpan</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalEditMapel}
              onRequestClose={() => {
                setModalEditMapel(false);
              }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={tw`text-xl font-bold mb-4`}>Ubah Mata Pelajaran</Text>
                        <View style={tw`w-full mb-4`}>
                        <TextInput
                            onChangeText={(event => setUbahMapel(event))}
                            value={ubahMapel}
                            style={tw`w-full border border-gray-400 rounded-lg px-4`}
                        />
                        {ubahMapel === "" ? (
                            <Text style={tw`text-red-500`}>Tidak boleh kosong</Text>
                        ) : null}
                        </View>

                        <View style={tw`flex flex-row`}>
                            <Pressable 
                                onPress={hideEditModalMapel}
                                style={tw`bg-gray-500 p-2 w-2/5 rounded-lg mr-1`}
                            >
                                <Text style={tw`text-white text-center text-lg`}>Batal</Text>
                            </Pressable>
                            <Pressable
                                onPress={editMapel}
                                style={tw`bg-blue-500 p-2 w-2/5 rounded-lg ml-1`}
                            >
                                <Text style={tw`text-white text-center text-lg`}>Simpan</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: '100%'
    }
  });

export default ListMapel;