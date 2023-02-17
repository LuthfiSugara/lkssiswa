import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { customStyle } from '../utils/style';
import { useDispatch, useSelector } from "react-redux";
import { dataKelas, dataMapel } from '../redux/actions/setting-actions';
import {Picker} from '@react-native-picker/picker';
import { getProfile, getTeacherById } from '../redux/actions/auth-actions';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { createExam } from '../redux/actions/exam-actions';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import Loader from '../components/loader';

const Soal = ({navigation, route}) => {
    const dispatch = useDispatch();

    const {id_soal} = route.params;
    const [soalName, setSoalName] = useState("");
    const [step, setStep] = useState(1);

    const {load_setting, data_mapel, data_kelas} = useSelector((state) => state.settingReducer);
    const {load_auth, teacher_by_id, profile} = useSelector((state) => state.userReducer);

    const [idMapel, setIdMapel] = useState("");
    const [idKelas, setIdKelas] = useState("");
    const [idGuru, setIdGuru] = useState("");
    const [dateFrom, setDateFrom] = useState(new Date(format(new Date(), 'yyyy'), format(new Date(), 'M') - 1, format(new Date(), 'd')));
    const [dateTo, setDateTo] = useState(new Date(format(new Date(), 'yyyy'), format(new Date(), 'M') - 1, format(new Date(), 'd')));
    const [timeFrom, setTimeFrom] = useState(new Date());
    const [timeTo, setTimeTo] = useState(new Date());
    
    const loadData = async() => {
        await dispatch(dataMapel());
        await dispatch(dataKelas());
        await dispatch(getProfile());
    }

    const loadTeacher = async() => {
        await dispatch(getTeacherById(idKelas, idMapel));
    }

    useEffect(() => {
        if(id_soal == 1){
            setSoalName("Ulangan");
        }else if(id_soal == 2){
            setSoalName("Latihan");
        }else if(id_soal == 3){
            setSoalName("Tugas");
        }else{
            setSoalName("Kuis");
        }

        loadData();
        loadTeacher();
    }, []);

    useEffect(() => {
        if(idMapel != "" && idKelas != ""){
            loadTeacher();
        }
    }, [idMapel, idKelas]);

    const {values, setFieldValue, handleSubmit, handleReset, errors, touched} = useFormik({
        initialValues: {
            name: '',
            id_jenis_ujian: id_soal,
            id_mapel: idMapel,
            id_kelas: idKelas,
            id_guru: idGuru,
            from: '',
            time_from: '',
            to: '',
            time_to: '',
        },
        onSubmit: values => {
            values.from = format(new Date(dateFrom), 'yyyy-MM-dd') + ' ' + format(new Date(timeFrom), 'HH:mm:ss');
            values.to = format(new Date(dateTo), 'yyyy-MM-dd') + ' ' + format(new Date(timeTo), 'HH:mm:ss');
            
            dispatch(createExam(values))
            .then(response => {
                if(response.status === "success"){
                    navigation.replace('TambahSoal',
                        response.data
                    );
                }
            })
        },
        validationSchema: Yup.object().shape({
            name: Yup
                .string()
                .required("Tidak boleh kosong!"),
            id_jenis_ujian: Yup
                .string()
                .required("Tidak boleh kosong!"),
            id_mapel: Yup
                .string()
                .required("Tidak boleh kosong!"),
            id_kelas: Yup
                .string()
                .required("Tidak boleh kosong!"),
            id_guru: Yup
                .string()
                .required("Tidak boleh kosong!"),
            from: Yup
                .string()
                .required("Tidak boleh kosong!"),
            time_from: Yup
                .string()
                .required("Tidak boleh kosong!"),
            to: Yup
                .string()
                .required("Tidak boleh kosong!"),
            time_to: Yup
                .string()
                .required("Tidak boleh kosong!"),
        }),
    });

    useEffect(() => {
        if(data_mapel.length > 0){
            setIdMapel(data_mapel[0].id);
            setFieldValue('id_mapel', data_mapel[0].id);
        }

        if(data_kelas.length > 0){
            setIdKelas(data_kelas[0].id);
            setFieldValue('id_kelas', data_kelas[0].id);
        }

        // if(teacher_by_id.length > 0){
        //     setIdGuru(teacher_by_id[0].id_user);
        //     setFieldValue('id_guru', teacher_by_id[0].id_user);
        // }
    }, [data_mapel, data_kelas, 
        // teacher_by_id
    ]);

    useEffect(() => {
        if(teacher_by_id.length > 0){
            setIdGuru(teacher_by_id[0].id_user);
            setFieldValue('id_guru', teacher_by_id[0].id_user);
        }
    }, [teacher_by_id]);

    const onChangeDateFrom = (event, selectedDate) => {
        setDateFrom(selectedDate);
        setFieldValue('from', format(new Date(selectedDate), 'yyyy/MM/dd'));
    };

    const onChangeDateTo = (event, selectedDate) => {
        setDateTo(selectedDate);
        setFieldValue('to', format(new Date(selectedDate), 'yyyy/MM/dd'));
    };

    const onChangeTimeFrom = (event, selectedTime) => {
        setTimeFrom(selectedTime);
        setFieldValue('time_from', format(new Date(selectedTime), 'HH:mm:ss'));
    };

    const onChangeTimeTo = (event, selectedTime) => {
        setTimeTo(selectedTime);
        setFieldValue('time_to', format(new Date(selectedTime), 'HH:mm:ss'));
    };

    const showMode = (currentMode, name) => {
        if(name == 'from'){
            DateTimePickerAndroid.open({
                value: dateFrom,
                onChange: onChangeDateFrom,
                mode: currentMode,
                is24Hour: true,
            });
        }else if(name == 'time-from'){
            DateTimePickerAndroid.open({
                value: timeFrom,
                onChange: onChangeTimeFrom,
                mode: currentMode,
                is24Hour: true,
            });
        }else if(name == 'time-to'){
            DateTimePickerAndroid.open({
                value: timeTo,
                onChange: onChangeTimeTo,
                mode: currentMode,
                is24Hour: true,
            });
        }else{
            DateTimePickerAndroid.open({
                value: dateTo,
                onChange: onChangeDateTo,
                mode: currentMode,
                is24Hour: true,
            });
        }
    };

    const showPicker = (mode, name) => {
        showMode(mode, name);
    };

    return load_setting && load_auth ? (
        <Loader/>
    ) : (
        <View style={tw`bg-white h-full`}>
            <View style={tw`flex flex-row justify-between bg-white items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center mr-5`}>{soalName}</Text>
                <View></View>
            </View>

            <ScrollView style={tw`p-4 bg-white`}>
                {step === 1 ? (
                    <View style={tw`flex flex-row flex-wrap justify-center`}>
                        {profile.id_jabatan != 3 ? (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ListSoal', {type: id_soal})} 
                                style={[tw`w-full flex flex-row justify-between p-3 m-2 border border-gray-300 rounded`]}
                            >
                                <Text style={tw`text-black`}>Daftar Soal</Text>
                                <Icon name={'angle-right'} size={20} color="#000000" />
                            </TouchableOpacity>
                        ) : null}

                        {profile.id_jabatan != 3 ? (
                            <TouchableOpacity
                                onPress={() => setStep(2)} 
                                style={[tw`w-full flex flex-row justify-between p-3 m-2 border border-gray-300 rounded`]}
                            >
                                <Text style={tw`text-black`}>Tambah Soal</Text>
                                <Icon name={'angle-right'} size={20} color="#000000" />
                            </TouchableOpacity>
                        ) : null}
                        
                        {profile.id_jabatan == 3 ? (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Exam', {
                                    type: id_soal,
                                    soalName: soalName
                                })} 
                                style={[tw`w-full flex flex-row justify-between p-3 m-2 border border-gray-300 rounded`]}
                            >
                                <Text style={tw`text-black`}>Soal {soalName}</Text>
                                <Icon name={'angle-right'} size={20} color="#000000" />
                            </TouchableOpacity>
                        ) : null}
                    </View>
                ) : (
                    <View style={tw`px-4 my-8`}>
                        <View style={tw`mb-4`}>
                            <Text style={tw`mb-1`}>Ujian</Text>
                            <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                                <TextInput
                                    value={values.name}
                                    onChangeText={(event) => setFieldValue('name', event)}
                                    style={tw`border-l border-gray-300 pl-2 w-full`}
                                />
                            </View>
                            {touched.name && errors.name &&
                                <Text style={tw`text-xs text-red-600`}>{errors.name}</Text>
                            }
                        </View>

                        <View style={tw`mb-4`}>
                            <Text style={tw`mb-1`}>Waktu ujian dimulai</Text>
                            
                            <TouchableOpacity onPress={() => showPicker("date", "from")} style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                                <Text style={tw`px-2 py-4`}>{values.from ? format(new Date(dateFrom), 'dd/MM/yyyy') : "Tanggal"}</Text>
                            </TouchableOpacity>
                            {touched.from && errors.from &&
                                <Text style={tw`text-xs text-red-600`}>{errors.from}</Text>
                            }
                            
                            <TouchableOpacity onPress={() => showPicker("time", "time-from")} style={tw`flex flex-row border border-gray-300 rounded-md items-center mt-2`}>
                                <Text style={tw`px-2 py-4`}>{values.time_from ? format(new Date(timeFrom), 'HH:mm') : "Jam"}</Text>
                            </TouchableOpacity>
                            {touched.time_from && errors.time_from &&
                                <Text style={tw`text-xs text-red-600`}>{errors.time_from}</Text>
                            }
                        </View>

                        <View style={tw`mb-4`}>
                            <Text style={tw`mb-1`}>Waktu Ujian Berakhir</Text>
                            <TouchableOpacity onPress={() => showPicker("date", "to")} style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                                <Text style={tw`px-2 py-4`}>{values.to ? format(new Date(dateTo), 'dd/MM/yyyy') : "Tanggal"}</Text>
                            </TouchableOpacity>
                            {touched.to && errors.to &&
                                <Text style={tw`text-xs text-red-600`}>{errors.to}</Text>
                            }

                            <TouchableOpacity onPress={() => showPicker("time", "time-to")} style={tw`flex flex-row border border-gray-300 rounded-md items-center mt-2`}>
                                <Text style={tw`px-2 py-4`}>{values.time_to ? format(new Date(timeTo), 'HH:mm') : "Jam"}</Text>
                            </TouchableOpacity>
                            {touched.time_to && errors.time_to &&
                                <Text style={tw`text-xs text-red-600`}>{errors.time_to}</Text>
                            }
                        </View>

                        <View style={tw`mb-4`}>
                            <Text style={tw`mb-1`}>Pilih Mata Pelajaran</Text>
                            <Picker
                                style={tw`shadow bg-white`}
                                selectedValue={values.id_mapel}
                                onValueChange={(itemValue, itemIndex) => {
                                    setFieldValue('id_mapel', itemValue)
                                    setIdMapel(itemValue);

                                }
                                }>
                                    {data_mapel.map((mapel, index) => {
                                        return (
                                            <Picker.Item label={mapel.name} value={mapel.id} key={index} />
                                        )
                                    })}
                            </Picker>
                        </View>
                        
                        <View style={tw`mb-4`}>
                            <Text style={tw`mb-1`}>Pilih Kelas</Text>
                            <Picker
                                style={tw`shadow bg-white`}
                                selectedValue={values.id_kelas}
                                onValueChange={(itemValue, itemIndex) =>{
                                    setFieldValue('id_kelas', itemValue)
                                    setIdKelas(itemValue);
                                }
                                }>
                                    {data_kelas.map((kelas, index) => {
                                        return (
                                            <Picker.Item label={kelas.name} value={kelas.id} key={index} />
                                        )
                                    })}
                            </Picker>
                        </View>
                        
                        {teacher_by_id.length > 0 ? (
                            <View style={tw`mb-4`}>
                                <Text style={tw`mb-1`}>Pilih Guru</Text>
                                <Picker
                                    style={tw`shadow bg-white`}
                                    selectedValue={values.id_guru}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setFieldValue('id_guru', itemValue)
                                        setIdGuru(itemValue);
                                    }
                                    }>
                                        {teacher_by_id.map((guru, index) => {
                                            return (
                                                <Picker.Item label={guru.user.nama} value={guru.id_user} key={index} />
                                            )
                                        })}
                                </Picker>
                            </View>
                        ) : (
                            null
                        )}

                        {teacher_by_id.length < 1 || idKelas == "" || idMapel == "" ? (
                            <TouchableOpacity style={tw`bg-gray-500 py-2 rounded-lg mt-4`}>
                                <Text style={tw`text-white text-center`}>Lanjut</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => {
                                Alert.alert(
                                    "Buat Ujian",
                                    "Apakah anda yakin ?",
                                    [
                                        { text: "Tidak" },
                                        { text: "Ya", onPress: () => {
                                            handleSubmit();
                                        }}
                                    ]
                                );
                            }} style={tw`bg-teal-500 py-2 rounded-lg mt-4`}>
                                <Text style={tw`text-white text-center`}>Buat Ujian</Text>
                            </TouchableOpacity>
                        )} 
                    </View>
                )}
                
            </ScrollView>
        </View>
    )
}

export default Soal