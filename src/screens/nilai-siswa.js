import React from 'react'
import { ActivityIndicator, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentScore } from '../redux/actions/exam-actions';
import { useEffect } from 'react';
import Loader from '../components/loader';
import NotFound from '../components/not-found';

const NilaiSiswa = ({navigation, route}) => {
    const {id_kelas, id_mapel} = route.params;
    const dispatch = useDispatch();

    const {load_exam, student_score} = useSelector((state) => state.examReducer);

    const loadData = async() => {
        await dispatch(getStudentScore(id_kelas, id_mapel));
    }

    useEffect(() => {
        loadData();
    }, []);

    return load_exam ? (
        <Loader/>
      ) : (
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between bg-white items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center mr-5`}>Pilih Ujian</Text>
                <View></View>
            </View>
            {student_score.length > 0 ? (
                <ScrollView style={tw`mt-4`}>
                        <View style={tw`px-4`}>
                            {student_score.map((score, index) => {
                                return (
                                    <TouchableOpacity 
                                        key={index}
                                        onPress={() => {
                                            navigation.navigate('NilaiSiswaDetail', {
                                                id_ujian: score.id
                                            });
                                        }}
                                        style={tw`flex flex-row justify-between items-center border border-gray-300 p-2 mb-3 rounded`}
                                    >
                                        <Text>{score.name}</Text>
                                        <Icon name={'angle-right'} size={25} color="#000000" />
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                </ScrollView>
            ) : (
                <NotFound message="Data belum tersedia"/>
            )}
        </View>
    )
}

export default NilaiSiswa