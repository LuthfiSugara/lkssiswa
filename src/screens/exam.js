import React, { useEffect, useState } from 'react'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Alert, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createExamResults, createLocationExam, getExamBaseOnType } from '../redux/actions/exam-actions';
import { getProfile } from '../redux/actions/auth-actions';
import Loader from '../components/loader';
import { format } from 'date-fns';
import { getLocation } from 'react-native-weather-api';

const Exam = ({navigation, route}) => {
    const dispatch = useDispatch();
    const {type, soalName} = route.params;
    const [location, setLocation] = useState(1);

    const {load_exam, exam_base_on_type} = useSelector((state) => state.examReducer);
    const {load_auth, profile} = useSelector((state) => state.userReducer);
    console.log('id location : ', location);
    const loadData = async() => {
        dispatch(getExamBaseOnType(type, 'All', 'All', 'All'));
        dispatch(getProfile());
    }

    useEffect(() => {
        loadData();
        getLocation().then((tmpLocation) => {
            
            if(tmpLocation != undefined){
                // // Kampus
                if(tmpLocation.coords.latitude > 3.491555 && tmpLocation.coords.latitude < 3.495596 && tmpLocation.coords.longitude > 98.586125 && tmpLocation.coords.longitude < 98.589296){
    
                // // Sekolah
                // if(tmpLocation.coords.latitude > 3.664971 && tmpLocation.coords.latitude < 3.665520 && tmpLocation.coords.longitude > 98.796432 && tmpLocation.coords.longitude < 98.797081){
    
                // Lokasi Saat Ini
                // if(tmpLocation.coords.latitude == 3,57920 && tmpLocation.coords.longitude == 98,70035){
                    setLocation(2);
                }else{
                    setLocation(1);
                }
            }
            
        });
    }, []);

    const createExam = async(id) => {
        let data = {
            id_ujian: id,
            id_siswa: profile.id
        }

        let dataLocation = {
            id_ujian: id,
            id_siswa: profile.id,
            id_location: location,
        }

        const createExam = await dispatch(createExamResults(data));
        const createLocation = await dispatch(createLocationExam(dataLocation));
        
        // .then(response => {
        if(createExam.status === "success" && createLocation.status === "success"){
            navigation.navigate('ExamWork', {
                id_ujian: id,
                id_siswa: profile.id,
                id_location: createLocation.data.id
            });
        }
        // })
    }

    return load_exam && load_auth ? (
        <Loader/>
    ) : (
        <View>
            <View style={tw`flex flex-row justify-between bg-white items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center mr-5`}>Soal {soalName}</Text>
                <View></View>
            </View>
            <ScrollView style={tw`h-full bg-white`}>
                <View style={tw`px-4 pt-8 pb-12`}>
                    {exam_base_on_type.map((exam, index) => {
                        return (
                            <TouchableOpacity 
                                key={index} 
                                style={tw`flex flex-row justify-between items-center border border-gray-300 p-3 mb-4 rounded`}
                                onPress={() => {
                                    exam.can_start ? (
                                        Alert.alert(
                                            `Anda akan mengerjakan soal ${exam.name}`,
                                            "Apakah anda yakin ?",
                                            [
                                                { text: "Tidak" },
                                                { text: "Ya", onPress: () => {
                                                    createExam(exam.id);
                                                }}
                                            ]
                                        )
                                    ) : (
                                        Alert.alert(
                                            `Ujian ${exam.name} telah berakhir`,
                                            "Anda tidak dapat mengerjakan soal ini lagi",
                                        )
                                    )
                                }}
                            >
                                <View>
                                    <Text>{exam.name}</Text>
                                    <Text>Mapel : {exam.mapel.name}</Text>
                                    <Text>Kelas : {exam.kelas.name}</Text>
                                    <Text>Mulai : {format(new Date(exam.from), 'dd/MM/yyyy HH:mm:ss')}</Text>
                                    <Text>Sampai : {format(new Date(exam.to), 'dd/MM/yyyy HH:mm:ss')}</Text>
                                </View>
                                <Icon name={'angle-right'} size={25} color="#000000" />
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

export default Exam