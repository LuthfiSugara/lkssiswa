import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from "react-redux";
import { dataKelas, dataMapel } from '../redux/actions/setting-actions';
import { getTeacherById } from '../redux/actions/auth-actions';
import {Picker} from '@react-native-picker/picker';
import { getMateri } from '../redux/actions/materi-actions';
import { customStyle } from '../utils/style';
import Loader from '../components/loader';
import NotFound from '../components/not-found';

const ListMateri = ({navigation}) => {
    const dispatch = useDispatch();

    const {load_setting, data_mapel, data_kelas} = useSelector((state) => state.settingReducer);
    const {load_auth, teacher_by_id} = useSelector((state) => state.userReducer);
    const {materi} = useSelector((state) => state.materiReducer);

    const [step, setStep] = useState(1);
    const [idMapel, setIdMapel] = useState("");
    const [idKelas, setIdKelas] = useState("");
    const [idGuru, setIdGuru] = useState("");
    const [mapelName, setMapelName] = useState("");
    const [kelasName, setKelasName] = useState("");
    const [teacherName, setTeacherName] = useState("");

    const loadData = async() => {
        await dispatch(dataMapel());
        await dispatch(dataKelas());
    }
    
    useEffect(() => {
        loadData();
        
    }, []);

    useEffect(() => {
        if(data_mapel.length > 0){
            setIdMapel(data_mapel[0].id);
            setMapelName(data_mapel[0].name);
        }

        if(data_kelas.length > 0){
            setIdKelas(data_kelas[0].id);
            setKelasName(data_kelas[0].name);
        }
    }, [data_kelas, data_mapel])

    useEffect(() => {
        // if(data_mapel.length > 0){
        //     setIdMapel(data_mapel[0].id);
        //     setMapelName(data_mapel[0].name);
        // }

        // if(data_kelas.length > 0){
        //     setIdKelas(data_kelas[0].id);
        //     setKelasName(data_kelas[0].name);
        // }

        if(teacher_by_id.length > 0){
            setIdGuru(teacher_by_id[0].id_user);
            setTeacherName(teacher_by_id[0].user.nama);
        }
    }, [
        // data_kelas, 
        // data_mapel, 
        teacher_by_id]);
    
    const loadTeacher = async() => {
        await dispatch(getTeacherById(idKelas, idMapel));
    }
    useEffect(() => {
        if(idMapel != "" && idKelas != ""){
            loadTeacher();
        }
    }, [idMapel, idKelas]);

    const loadMateri = async() => {
        await dispatch(getMateri(idMapel, idKelas, idGuru));
        setStep(2);
    }

    const redirectToDetailMateri = (id, index) => {
        navigation.navigate('DetailMateri', {
            id: id,
            mapel_name: mapelName,
            schedule: "pertemuan ke " + (index + 1)
        });
    }

    return load_setting && load_auth ? (
        <Loader />
    ) : (
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={tw`py-2 px-4 rounded-full shadow bg-white`} onPress={() => { step === 1 ? navigation.goBack() : setStep(1)}}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center mr-5`}>{step === 1 ? "Materi" : mapelName}</Text>
                <View></View>
            </View>
            {step == 1 ? (
                <View style={tw`px-4 mt-8`}>
                    <View style={tw`mb-4`}>
                        <Text style={tw`mb-1`}>Pilih Mata Pelajaran</Text>
                        <Picker
                            style={tw`shadow bg-white`}
                            selectedValue={idMapel}
                            onValueChange={(itemValue, itemIndex) => {
                                setIdMapel(itemValue)
                                setMapelName(data_mapel[itemIndex].name)
                            }
                            }>
                                {data_mapel.map((mapel, index) => {
                                    return (
                                        <Picker.Item label={mapel.name} value={mapel.id} key={index} />
                                    )
                                })}
                        </Picker>
                    </View>
                    
                    {data_kelas.length > 0 ? (
                        <View style={tw`mb-4`}>
                            <Text style={tw`mb-1`}>Pilih Kelas</Text>
                            <Picker
                                style={tw`shadow bg-white`}
                                selectedValue={idKelas}
                                onValueChange={(itemValue, itemIndex) =>{
                                    setIdKelas(itemValue)
                                    setKelasName(data_kelas[itemIndex].name);
                                }}>
                                    {data_kelas.map((kelas, index) => {
                                        return (
                                            <Picker.Item label={kelas.name} value={kelas.id} key={index} />
                                        )
                                    })}
                            </Picker>
                        </View>
                    ) : (
                        null
                    )}
                    
                        <View style={tw`mb-4`}>
                            <Text style={tw`mb-1`}>Pilih Guru</Text>

                        {teacher_by_id.length > 0 ? (
                            <Picker
                                style={tw`shadow bg-white`}
                                selectedValue={idGuru}
                                onValueChange={(itemValue, itemIndex) =>{
                                    setIdGuru(itemValue);
                                    setTeacherName(teacher_by_id[itemIndex].user.nama);
                                }}>
                                    {teacher_by_id.map((guru, index) => {
                                        return (
                                            <Picker.Item label={guru.user.nama} value={guru.id_user} key={index} />
                                        )
                                    })}
                            </Picker>
                        ) : (
                            <Text style={tw`border border-gray-300 text-teal-500 p-2 rounded-lg`}>Tidak ditemukan guru yang mengajar {mapelName} di {kelasName}</Text>
                        )}
                        </View>

                    {teacher_by_id.length > 0 && idKelas != "" && idMapel != "" ? (
                        <TouchableOpacity onPress={() => loadMateri()} style={tw`bg-teal-500 py-2 rounded-lg mt-4`}>
                            <Text style={tw`text-white text-center text-lg`}>Lanjut</Text>
                        </TouchableOpacity>
                    ) : (
                        null
                    )}            

                </View>
            ) : (
                materi.length > 0 ? (
                    <ScrollView style={tw`mb-12`}>
                        <View style={tw`px-4 mt-4`}>
                            <Text style={tw`text-sm`}>Kelas : {kelasName}</Text>
                            <Text style={tw`text-sm mb-4`}>Guru : {teacherName}</Text>
                                {materi.map((materi, index) => {
                                    return (
                                        <TouchableOpacity onPress={() => redirectToDetailMateri(materi.id, index)} key={index} style={tw`flex flex-row justify-between items-center border border-gray-700 p-3 rounded mb-4`}>
                                            <Text>{materi.judul}</Text>
                                            <Icon name={'arrow-right'} size={25} color="#000000" />
                                        </TouchableOpacity>
                                    )
                                })}
                        </View>
                    </ScrollView>
                ) : (
                    <NotFound message="Materi Belum Tersedia :(" />
                )
            )}
        </View>
    )
}

export default ListMateri