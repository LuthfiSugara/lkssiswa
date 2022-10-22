import React, { useEffect, useRef, useState } from 'react'
import { Alert, Dimensions, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from "react-redux";
import { deleteExam, getExamBaseOnType } from '../redux/actions/exam-actions';
import { customStyle } from '../utils/style';
import RBSheet from "react-native-raw-bottom-sheet";
import { dataKelas, dataMapel } from '../redux/actions/setting-actions';
import { getAllGuru, getProfile } from '../redux/actions/auth-actions';
import {Picker} from '@react-native-picker/picker';
import Loader from '../components/loader';
import NotFound from '../components/not-found';
import { useIsFocused } from "@react-navigation/native";

const ListSoal = ({navigation, route}) => {
    const dispatch = useDispatch();
    const {type} = route.params;
    const refRBSheet = useRef();
    const isFocused = useIsFocused();

    const [soalName, setSoalName] = useState("");
    const [idMapel, setIdMapel] = useState("All");
    const [idKelas, setIdKelas] = useState("All");
    const [idGuru, setIdGuru] = useState("All");

    const {load_exam, exam_base_on_type} = useSelector((state) => state.examReducer);
    const {load_setting, data_mapel, data_kelas} = useSelector((state) => state.settingReducer);
    const {load_auth, list_guru, profile} = useSelector((state) => state.userReducer);

    const loadData = async() => {
        await dispatch(getProfile());
        await dispatch(dataMapel());
        await dispatch(dataKelas());
        await dispatch(getAllGuru());
    }

    const loadExam = async() => {
        await dispatch(getExamBaseOnType(type, idMapel, idKelas, idGuru));
    }

    useEffect(() => {
        if(type == 1){
            setSoalName("Ulangan");
        }else if(type == 2){
            setSoalName("Latihan");
        }else if(type == 3){
            setSoalName("Tugas");
        }else{
            setSoalName("Kuis");
        }

        loadData();
        loadExam();
    }, [isFocused]);

    const openFilter = () => {
        refRBSheet.current.open();
    }

    const reset = () => {
        setIdMapel("All");
        setIdKelas("All");
        setIdGuru("All");
        dispatch(getExamBaseOnType(type, "All", "All", "All"));
        refRBSheet.current.close();
    }

    const filter = () => {
        dispatch(getExamBaseOnType(type, idMapel, idKelas, idGuru));
        refRBSheet.current.close();
    }

    const removeExam = (id) => {
        dispatch(deleteExam(id))
        .then(response => {
            if(response.status === "success"){
                loadExam();
            }
        })
        .catch(err => console.log(err));
    }

    return load_exam && load_setting && load_auth ? (
        <Loader/>
    ) : (
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between bg-white items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center mr-5`}>{soalName}</Text>
                <TouchableOpacity onPress={openFilter} style={tw` px-2`}>
                    <Icon name={'filter'} size={20} color="#000000" />
                </TouchableOpacity>
            </View>

            {exam_base_on_type.length > 0 ? (
                <ScrollView style={tw`h-full p-4 bg-white`}>
                    <View style={tw`flex flex-row flex-wrap justify-center`}>
                            {exam_base_on_type.map((exam, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => navigation.navigate('TambahSoal', {id: exam.id, id_jenis_ujian: exam.id_jenis_ujian})} 
                                        delayLongPress={500}
                                        onLongPress={() => Alert.alert(
                                            "Ujian akan dihapus",
                                            "Apakah anda yakin ?",
                                            [
                                                { text: "Tidak" },
                                                { text: "Ya", onPress: () => {
                                                    removeExam(exam.id)
                                                }}
                                            ]
                                        )}
                                        style={tw`w-full flex flex-row items-center justify-between bg-white rounded my-2 border border-gray-300 p-2`}
                                    >
                                        <View style={tw``}>
                                            <Text style={[tw`font-semibold text-black`, ]}>{exam.name}</Text>
                                            <Text style={[tw`font-semibold text-black`, ]}>Mapel : {exam.mapel.name}</Text>
                                            <Text style={[tw`font-semibold text-black`, ]}>Kelas : {exam.kelas.name}</Text>
                                        </View>
                                        {profile.id_jabatan != 3 ? (
                                            <TouchableOpacity onPress={() => {
                                                navigation.navigate('EditExam', {
                                                    id: exam.id
                                                });
                                            }}>
                                                <Text style={tw`bg-teal-500 text-white py-1 px-4 rounded`}>Edit</Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <Icon name={'angle-right'} size={25} color="#000000" />
                                        )}
                                    </TouchableOpacity>
                                )
                            })}
                    </View>
                </ScrollView>
            ) : (
                <NotFound message="Data Belum Tersedia" />
            )}
            
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={500}
                customStyles={{
                    container: {
                        borderTopRightRadius: 25,
                        borderTopLeftRadius: 25,
                    },
                    wrapper: {
                        backgroundColor: "transparent",
                    },
                    draggableIcon: {
                        backgroundColor: "#9e9e9e"
                    }
                }}
            >
                <ScrollView style={tw``}>
                    <View style={tw`mt-4 mb-4 border-b border-gray-300 mx-4`}>
                        <Text style={tw``}>Mata Pelajaran</Text>
                        <Picker
                            selectedValue={idMapel}
                            onValueChange={(itemValue, itemIndex) =>
                                setIdMapel(itemValue)
                            }>
                                <Picker.Item label="All" value="All" key={-1} />
                                {data_mapel.map((mapel, index) => {
                                    return (
                                        <Picker.Item label={mapel.name} value={mapel.id} key={index} />
                                    )
                                })}
                        </Picker>
                    </View>
                    <View style={tw`mb-4 border-b border-gray-300 mx-4`}>
                        <Text style={tw``}>Kelas</Text>
                        <Picker
                            selectedValue={idKelas}
                            onValueChange={(itemValue, itemIndex) =>
                                setIdKelas(itemValue)
                            }>
                                <Picker.Item label="All" value="All" key={-1} />
                                {data_kelas.map((kelas, index) => {
                                    return (
                                        <Picker.Item label={kelas.name} value={kelas.id} key={index} />
                                    )
                                })}
                        </Picker>
                    </View>
                    <View style={tw`mb-4 border-b border-gray-300 mx-4`}>
                        <Text style={tw``}>Guru</Text>
                        <Picker
                            selectedValue={idGuru}
                            onValueChange={(itemValue, itemIndex) =>
                                setIdGuru(itemValue)
                            }>
                                <Picker.Item label="All" value="All" key={-1} />
                                {list_guru.map((guru, index) => {
                                    return (
                                        <Picker.Item label={guru.nama} value={guru.id} key={index} />
                                    )
                                })}
                        </Picker>
                    </View>
                </ScrollView>
                <View style={tw`flex flex-row justify-between mb-4`}>
                    <TouchableOpacity onPress={reset} style={tw`w-1/2 p-2`}>
                        <Text style={tw`text-white text-center bg-gray-400 p-2 rounded w-full`}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={filter} style={tw`w-1/2 p-2`}>
                        <Text style={tw`text-white text-center bg-teal-500 p-2 rounded w-full`}>Filter</Text>
                    </TouchableOpacity>
                </View>
            </RBSheet>
        </View>
    )
}

export default ListSoal