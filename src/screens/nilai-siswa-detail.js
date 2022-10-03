import React from 'react'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ActivityIndicator, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { getStudentScoreDetail } from '../redux/actions/exam-actions';
import { useEffect } from 'react';
import { useState } from 'react';

const NilaiSiswaDetail = ({navigation, route}) => {
    const {id_ujian} = route.params;
    const dispatch = useDispatch();

    const {load_exam, student_score_detail} = useSelector((state) => state.examReducer);
    const [detail, setDetail] = useState([]);

    const loadData = async() => {
        await dispatch(getStudentScoreDetail(id_ujian));
    }

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if(Object.keys(student_score_detail).length > 0){
            setDetail(student_score_detail.nilai);
        }
    }, [student_score_detail]);

    const redirectToCorrectAnswer = (id_siswa) => {
        navigation.navigate('CorrectAnswer', {
            id_ujian: id_ujian,
            id_siswa: id_siswa,
        });
    }

    return load_exam ? (
        <View style={tw`flex flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" color="#ff1402" />
            <Text style='text-center'>Loading....</Text>
        </View>
      ) : (
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between bg-white items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center text-lg mr-5`}>Nilai Siswa</Text>
                <View></View>
            </View>
            <ScrollView>
                <View style={tw` mt-4 px-4`}>
                    {detail.map((detail, index) => {
                        return (
                            <View key={index} style={tw`flex flex-row justify-between items-center border border-gray-300 p-2 rounded mb-4`}>
                                <View>
                                    <Text style={tw`text-lg text-black`}>{detail.siswa.nama}</Text>
                                    <Text>{"Nilai : "} {detail.nilai}</Text>
                                </View>
                                <TouchableOpacity onPress={() => redirectToCorrectAnswer(detail.id_siswa)}>
                                    <Text style={tw`bg-teal-500 text-white p-2 rounded`}>Koreksi</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

export default NilaiSiswaDetail