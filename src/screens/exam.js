import React, { useEffect } from 'react'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Alert, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createExamResults, getExamBaseOnType } from '../redux/actions/exam-actions';
import { getProfile } from '../redux/actions/auth-actions';

const Exam = ({navigation, route}) => {
    const dispatch = useDispatch();
    const {type} = route.params;

    const {exam_base_on_type} = useSelector((state) => state.examReducer);
    const {profile} = useSelector((state) => state.userReducer);

    const loadData = async() => {
        dispatch(getExamBaseOnType(type, 'All', 'All', 'All'));
        dispatch(getProfile());
    }

    useEffect(() => {
        loadData();
    }, []);

    const createExam = (id) => {
        let data = {
            id_ujian: id,
            id_siswa: profile.id
        }

        dispatch(createExamResults(data))
        .then(response => {
            if(response.status === "success"){
                navigation.navigate('ExamWork', {
                    id_ujian: id,
                    id_siswa: profile.id,
                });
            }
        })
    }

    return (
        <View>
            <View style={tw`flex flex-row justify-between bg-white items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center text-lg mr-5`}>Soal</Text>
                <View></View>
            </View>
            <ScrollView style={tw`h-full bg-white`}>
                <View style={tw`px-4 py-8`}>
                    {exam_base_on_type.map((exam, index) => {
                        return (
                            <TouchableOpacity 
                                key={index} 
                                style={tw`flex flex-row justify-between items-center border border-gray-300 p-3 mb-4 rounded`}
                                onPress={() => {
                                    Alert.alert(
                                        `Anda akan mengerjakan soal ${exam.name}`,
                                        "Apakah anda yakin ?",
                                        [
                                            { text: "Tidak" },
                                            { text: "Ya", onPress: () => {
                                                createExam(exam.id);
                                            }}
                                        ]
                                    );
                                }}
                            >
                                <Text>{exam.name}</Text>
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