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

const TambahSoalPG = ({navigation, route}) => {
    const dispatch = useDispatch();
    const {id_ujian} = route.params;
    const [fileSoal, setFileSoal] = useState([]);
    
    const {values, setFieldValue, handleSubmit, handleReset, errors, touched} = useFormik({
        initialValues: {
            id_ujian: id_ujian,
            id_jenis_soal: 1,
            pertanyaan: '',
            pilihan_a: '',
            pilihan_b: '',
            pilihan_c: '',
            pilihan_d: '',
            jawaban: '',
        },
        onSubmit: values => {
            const formData = new FormData();
            formData.append('id_ujian', values.id_ujian);
            formData.append('id_jenis_soal', values.id_jenis_soal);
            formData.append('pertanyaan', values.pertanyaan);
            formData.append('pilihan_a', values.pilihan_a);
            formData.append('pilihan_b', values.pilihan_b);
            formData.append('pilihan_c', values.pilihan_c);
            formData.append('pilihan_d', values.pilihan_d);
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
                .required("Tidak boleh kosong!"),
            pilihan_a: Yup
                .string()
                .required("Tidak boleh kosong!"),
            pilihan_b: Yup
                .string()
                .required("Tidak boleh kosong!"),
            pilihan_c: Yup
                .string()
                .required("Tidak boleh kosong!"),
            pilihan_d: Yup
                .string()
                .required("Tidak boleh kosong!"),
            jawaban: Yup
                .string()
                .required("Tidak boleh kosong!"),
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
                <Text style={tw`text-center mr-5`}>Tambah Soal Pilihan Ganda</Text>
                <View></View>
            </View>

            <ScrollView>
                <View style={tw`px-4 mt-4`}>
                    {touched.jawaban && errors.jawaban &&
                        <Text style={tw`text-xs text-red-600 mb-4`}> Pilih jawaban yang benar</Text>
                    }

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
                    <View style={tw`mb-4`}>
                        <View style={tw`flex flex-row justify-between items-end`}>
                            <Text style={[tw`text-lg`, customStyle.w5]}>a.</Text>
                            <TextInput
                                value={values.pilihan_a}
                                onChangeText={(event) => setFieldValue('pilihan_a', event)}
                                style={[tw`border-b border-gray-400 rounded-md pb-0`, customStyle.w90]}
                            />
                            {values.jawaban == "a" ? (
                                <Icon name={'check'} size={15} color="#14b8a6" style={[tw`text-center`, customStyle.w5]} />
                            ) : (
                                <TouchableOpacity onPress={() => setFieldValue("jawaban", "a")} style={customStyle.w5}>
                                    <Icon name={'check'} size={15} color="#9e9e9e" style={tw`text-center`} />
                                </TouchableOpacity>
                            )}
                        </View>
                        {touched.pilihan_a && errors.pilihan_a &&
                            <Text style={tw`text-xs text-red-600`}>{errors.pilihan_a}</Text>
                        }
                    </View>

                    <View style={tw`mb-4`}>
                        <View style={tw`flex flex-row justify-between items-end`}>
                            <Text style={[tw`text-lg`, customStyle.w5]}>b.</Text>
                            <TextInput
                                value={values.pilihan_b}
                                onChangeText={(event) => setFieldValue('pilihan_b', event)}
                                style={[tw`border-b border-gray-400 rounded-md pb-0`, customStyle.w90]}
                            />
                            {values.jawaban == "b" ? (
                                <Icon name={'check'} size={15} color="#14b8a6" style={[tw`text-center`, customStyle.w5]} />
                            ) : (
                                <TouchableOpacity onPress={() => setFieldValue("jawaban", "b")} style={customStyle.w5}>
                                    <Icon name={'check'} size={15} color="#9e9e9e" style={tw`text-center`} />
                                </TouchableOpacity>
                            )}
                        </View>
                        {touched.pilihan_b && errors.pilihan_b &&
                            <Text style={tw`text-xs text-red-600`}>{errors.pilihan_b}</Text>
                        }
                    </View>

                    <View style={tw`mb-4`}>
                        <View style={tw`flex flex-row justify-between items-end`}>
                            <Text style={[tw`text-lg`, customStyle.w5]}>c.</Text>
                            <TextInput
                                value={values.pilihan_c}
                                onChangeText={(event) => setFieldValue('pilihan_c', event)}
                                style={[tw`border-b border-gray-400 rounded-md pb-0`, customStyle.w90]}
                            />
                            {values.jawaban == "c" ? (
                                <Icon name={'check'} size={15} color="#14b8a6" style={[tw`text-center`, customStyle.w5]} />
                            ) : (
                                <TouchableOpacity onPress={() => setFieldValue("jawaban", "c")} style={customStyle.w5}>
                                    <Icon name={'check'} size={15} color="#9e9e9e" style={tw`text-center`} />
                                </TouchableOpacity>
                            )}
                        </View>
                        {touched.pilihan_c && errors.pilihan_c &&
                            <Text style={tw`text-xs text-red-600`}>{errors.pilihan_c}</Text>
                        }
                    </View>

                    <View style={tw`mb-4`}>
                        <View style={tw`flex flex-row justify-between items-end`}>
                            <Text style={[tw`text-lg`, customStyle.w5]}>d.</Text>
                            <TextInput
                                value={values.pilihan_d}
                                onChangeText={(event) => setFieldValue('pilihan_d', event)}
                                style={[tw`border-b border-gray-400 rounded-md pb-0`, customStyle.w90]}
                            />
                            {values.jawaban == "d" ? (
                                <Icon name={'check'} size={15} color="#14b8a6" style={[tw`text-center`, customStyle.w5]} />
                            ) : (
                                <TouchableOpacity onPress={() => setFieldValue("jawaban", "d")} style={customStyle.w5}>
                                    <Icon name={'check'} size={15} color="#9e9e9e" style={tw`text-center`} />
                                </TouchableOpacity>
                            )}
                        </View>
                        {touched.pilihan_d && errors.pilihan_d &&
                            <Text style={tw`text-xs text-red-600`}>{errors.pilihan_d}</Text>
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

export default TambahSoalPG