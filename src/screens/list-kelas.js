import React, { useState } from "react";
import { Pressable, ScrollView, Text, View, Alert, Modal, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from "react-redux";
import { dataKelas, editKelas, tambahKelas } from "../redux/actions/setting-actions";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import Loader from "../components/loader";

const ListKelas = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [modalAddClass, setModalAddClass] = useState(false);
  const [modalEditClass, setModalEditClass] = useState(false);
  const [tambahNamakelas, setTambahNamakelas] = useState("");
  const [ubahNamakelas, setUbahNamakelas] = useState("");
  const [idkelas, setIdKelas] = useState("");

  const {load_setting, data_kelas} = useSelector((state) => state.settingReducer);

  const loadData = async() => {
      await dispatch(dataKelas());
  }

  useEffect(() => {
      loadData();
  }, [isFocused]);

  const hideAddClassModal = () => {
    setModalAddClass(false);
  }

  const hideEditClassModal = () => {
    setModalEditClass(false);
  }

  const tambahKelasBaru = async() => {
    const formData = new FormData();
    formData.append('nama', tambahNamakelas);
    await dispatch(tambahKelas(formData))
    .then(response => {
      if(response.status === "success"){
        loadData();
        setModalAddClass(false);
        setTambahNamakelas("");
      }
    })
  }

  const editNamaKelas = async() => {
    const formData = new FormData();
    formData.append('nama', ubahNamakelas);
    await dispatch(editKelas(formData, idkelas))
    .then(response => {
      if(response.status === "success"){
        loadData();
        setModalEditClass(false);
        setTambahNamakelas("");
        setIdKelas("");
      }
    })
  }

  return load_setting ? (
    <Loader/>
  ) : (
      <View style={tw`bg-white h-full`}>
          <View style={tw`flex flex-row justify-between items-center p-2`}>
              <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                  <Icon name={'angle-left'} size={25} color="#000000" />
              </Pressable>
              <Text style={tw`text-center mr-5`}>Daftar Kelas</Text>
              <Pressable 
                onPress={() => setModalAddClass(true)}
                style={tw`py-2 px-4`}
              >
                <Icon name={'plus-square'} size={25} color="#000000" />
              </Pressable>
          </View>
          <ScrollView style={tw`px-4 mt-4`}>
            {data_kelas.map((kelas, index) => {
              return (
                <View 
                    onPress={() => navigation.navigate('ListKelas')}
                    style={tw`flex flex-row justify-between bg-gray-100 p-4 mb-4 rounded-lg items-center`}
                    key={index}
                >
                    <View style={tw`flex flex-row items-center`}>
                        <Text style={tw`text-black ml-2`}>{kelas.name}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        setModalEditClass(true);
                        setUbahNamakelas(kelas.name);
                        setIdKelas(kelas.id);
                      }}
                    >
                        <Icon name={'edit'} size={15} color="#14b8a6" />
                    </TouchableOpacity>
                </View>
              )
            })}
          </ScrollView>

          <Modal
              animationType="slide"
              transparent={true}
              visible={modalAddClass}
              onRequestClose={() => {
                setModalAddClass(false);
              }}
          >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={tw`text-xl font-bold mb-4`}>Tambah Nama Kelas</Text>
                    <View style={tw`w-full mb-4`}>
                      <TextInput
                        onChangeText={(event => setTambahNamakelas(event))}
                        value={tambahNamakelas}
                        style={tw`w-full border border-gray-400 rounded-lg px-4`}
                      />
                      {tambahNamakelas === "" ? (
                        <Text style={tw`text-red-500`}>Tidak boleh kosong</Text>
                      ) : null}
                    </View>

                    <View style={tw`flex flex-row`}>
                      <Pressable 
                        onPress={hideAddClassModal}
                        style={tw`bg-gray-500 p-2 w-2/5 rounded-lg mr-1`}
                      >
                        <Text style={tw`text-white text-center text-lg`}>Batal</Text>
                      </Pressable>
                      <Pressable
                        onPress={tambahKelasBaru}
                        style={tw`bg-teal-500 p-2 w-2/5 rounded-lg ml-1`}
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
              visible={modalEditClass}
              onRequestClose={() => {
                setModalEditClass(false);
              }}
          >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={tw`text-xl font-bold mb-4`}>Ubah Nama Kelas</Text>
                    <View style={tw`w-full mb-4`}>
                      <TextInput
                        onChangeText={(event => setUbahNamakelas(event))}
                        value={ubahNamakelas}
                        style={tw`w-full border border-gray-400 rounded-lg px-4`}
                      />
                      {ubahNamakelas === "" ? (
                        <Text style={tw`text-red-500`}>Tidak boleh kosong</Text>
                      ) : null}
                    </View>

                    <View style={tw`flex flex-row`}>
                      <Pressable 
                        onPress={hideEditClassModal}
                        style={tw`bg-gray-500 p-2 w-2/5 rounded-lg mr-1`}
                      >
                        <Text style={tw`text-white text-center text-lg`}>Batal</Text>
                      </Pressable>
                      <Pressable 
                        onPress={editNamaKelas}
                        style={tw`bg-teal-500 p-2 w-2/5 rounded-lg ml-1`}
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
  

export default ListKelas;