import React, { useCallback, useState } from 'react'
import { Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import tw from 'twrnc';
import { customStyle } from '../utils/style';
import { useFormik } from 'formik';
import * as Yup from "yup";
import DocumentPicker from "react-native-document-picker";
import { createExamQuestions } from '../redux/actions/exam-actions';
import { useDispatch } from 'react-redux';

const TambahSoalEssay = ({navigation, route}) => {
    const dispatch = useDispatch();
    const {id_ujian} = route.params;
    const [fileSoal, setFileSoal] = useState([]);

    const {values, setFieldValue, handleSubmit, handleReset, errors, touched} = useFormik({
        initialValues: {
            id_ujian: id_ujian,
            id_jenis_soal: 2,
            pertanyaan: '',
            jawaban: '',
        },
        onSubmit: values => {
            const formData = new FormData();
            formData.append('id_ujian', values.id_ujian);
            formData.append('id_jenis_soal', values.id_jenis_soal);
            formData.append('pertanyaan', values.pertanyaan);
            formData.append('jawaban', values.jawaban);

            if(fileSoal.length > 0){
                for (let i = 0; i < fileSoal.length; i++) {
                    formData.append('file[]', {
                        uri: fileSoal[i].uri,
                        type: fileSoal[i].type,
                        name: fileSoal[i].name,
                    });
                }
            }

            dispatch(createExamQuestions(formData))
            .then(response => {
                if(response.status === "success"){
                    navigation.goBack();
                }
            })
        },
        validationSchema: Yup.object().shape({
            pertanyaan: Yup
                .string()
                .required("Tidak boleh kosong!")
        }),
    });

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

    return (
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={[customStyle.shadow, tw`py-2 px-4 rounded-full`]} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center mr-5`}>Tambah Soal Essay</Text>
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

                    <View style={tw`my-4`}>
                        <TouchableOpacity onPress={handleDocumentSelection} style={[tw`w-full bg-blue-800 p-8 rounded flex flex-col items-center`, customStyle.bgDarkBlue]}>
                            <Icon name={'folder-plus'} size={35} color="#ffffff" />
                            <Text style={tw`text-white font-bold`}>Upload file</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleSubmit} style={tw`w-full bg-teal-500 rounded p-2 mt-6`}>
                        <Text style={tw`text-white text-center`}>Tambah</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default TambahSoalEssay