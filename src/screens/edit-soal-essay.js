import React, { useCallback, useEffect, useState } from 'react'
import tw from "twrnc";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { customStyle } from '../utils/style';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFileExam, getDetailQuestion, updateExamQuestion } from '../redux/actions/exam-actions';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { isImage } from '../utils/function';
import { baseUrl } from '../utils/global';
import DocumentPicker from "react-native-document-picker";
import Loader from '../components/loader';

const EditSoalEssay = ({navigation, route}) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const {id} = route.params;

    const [fileSoal, setFileSoal] = useState([]);
    const [loadPage, setLoadPage] = useState(false);
    const [detail, setDetail] = useState([]);

    const {load_exam, detail_question} = useSelector((state) => state.examReducer);

    const loadData = async() => {
        await dispatch(getDetailQuestion(id));
    }

    useEffect(() => {
        loadData();
    }, []);

    const {values, setFieldValue, handleSubmit, handleReset, errors, touched} = useFormik({
        initialValues: {
            pertanyaan: '',
        },
        onSubmit: values => {
            const formData = new FormData();
            formData.append('pertanyaan', values.pertanyaan);

            if(fileSoal.length > 0){
                for (let i = 0; i < fileSoal.length; i++) {
                    formData.append('file[]', {
                        uri: fileSoal[i].uri,
                        type: fileSoal[i].type,
                        name: fileSoal[i].name,
                    });
                }
            }

            dispatch(updateExamQuestion(formData, id))
            .then(response => {
                if(response.status === "success"){
                    navigation.goBack();
                }
            })
        },
        validationSchema: Yup.object().shape({
            pertanyaan: Yup
                .string()
                .required("Tidak boleh kosong!"),
        }),
    });

    useEffect(() => {
        if(detail_question.length > 0){
            setFieldValue('pertanyaan', detail_question[0].pertanyaan);
            setDetail(detail_question[0].detail);
        }
    }, [detail_question]);

    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pickMultiple({
                presentationStyle: 'fullScreen',
                type: [DocumentPicker.types.allFiles],
                allowMultiSelection: true,
            });
            setFileSoal(response);
        } catch (err) {
            console.log(err);
        }
    }, []);

    const deleteFile = async(id) => {
        dispatch(deleteFileExam(id))
        .then(response => {
            if(response.status === "success"){
                loadData();
            }
        })
    }

    return load_exam ? (
        <Loader/>
    ) : (
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={[customStyle.shadow, tw`py-2 px-4 rounded-full`]} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center mr-5`}>Edit Soal</Text>
                <View></View>
            </View>

            <ScrollView>
                <View style={tw`px-4 mt-4`}>
                    <View style={tw`mb-4`}>
                        <Text style={tw``}>Pertanyaan</Text>
                        <View style={tw`flex flex-row border-b border-gray-300 rounded-md items-center`}>
                            <TextInput
                                value={values.pertanyaan}
                                onChangeText={(event) => setFieldValue('pertanyaan', event)}
                                style={tw`pb-0 w-full`}
                            />
                        </View>
                        {touched.pertanyaan && errors.pertanyaan &&
                            <Text style={tw`text-xs text-red-600`}>{errors.pertanyaan}</Text>
                        }
                    </View>

                    <ScrollView horizontal={true}>
                        <View style={tw`flex flex-row justify-start mb-2 mt-4 w-full h-30`}>
                            {detail.map((detail, index) => {
                                return (
                                    isImage(detail.name) ? (
                                        <View key={index} style={tw`px-2`}>
                                            <TouchableOpacity 
                                                style={tw`flex flex-row justify-end mb-2`}
                                                onPress={() => {
                                                    Alert.alert(
                                                        "Hapus file",
                                                        "Apakah anda yakin ?",
                                                        [
                                                            { text: "Tidak" },
                                                            { text: "Ya", onPress: () => {
                                                                deleteFile(detail.id)
                                                            }}
                                                        ]
                                                    );
                                                }}
                                            >
                                                <Text style={[tw`text-end px-2 py-1 rounded-full`, customStyle.shadow]}>X</Text>
                                            </TouchableOpacity>
                                            <Image
                                                style={[customStyle.aspectSquare, tw`rounded w-1/3`]}
                                                source={{
                                                    uri: baseUrl + detail.name,
                                                }}
                                            />
                                        </View>
                                    ) : (
                                        <View key={index} style={tw`px-2`}>
                                            <TouchableOpacity 
                                                style={tw`flex flex-row justify-end mb-2`}
                                                onPress={() => {
                                                    Alert.alert(
                                                        "Hapus file",
                                                        "Apakah anda yakin ?",
                                                        [
                                                            { text: "Tidak" },
                                                            { text: "Ya", onPress: () => {
                                                                deleteFile(detail.id)
                                                            }}
                                                        ]
                                                    );
                                                }}
                                            >
                                                <Text style={[tw`text-end px-2 py-1 rounded-full`, customStyle.shadow]}>X</Text>
                                            </TouchableOpacity>
                                            <Image
                                                style={[customStyle.aspectSquare, tw`rounded w-1/3`]}
                                                source={require('../assets/images/file.jpg')}
                                            />
                                        </View>
                                    )
                                )
                            })}
                        </View>
                    </ScrollView>

                    <View style={tw`my-4`}>
                        <TouchableOpacity onPress={handleDocumentSelection} style={[tw`w-full bg-blue-800 p-8 rounded flex flex-col items-center`, customStyle.bgDarkBlue]}>
                            <Icon name={'folder-plus'} size={35} color="#ffffff" />
                            <Text style={tw`text-white font-bold`}>Upload file</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
            <View style={tw`m-6`}>
                <TouchableOpacity onPress={() =>{
                    handleSubmit();
                    setLoadPage(true);
                }} style={tw`w-full bg-teal-500 rounded p-2 mt-6`}>
                    <Text style={tw`text-white text-center`}>Simpan</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditSoalEssay;