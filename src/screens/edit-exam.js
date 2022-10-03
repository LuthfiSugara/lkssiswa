import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { customStyle } from '../utils/style';
import { useDispatch, useSelector } from "react-redux";
import { dataKelas, dataMapel } from '../redux/actions/setting-actions';
import {Picker} from '@react-native-picker/picker';
import { getTeacherById } from '../redux/actions/auth-actions';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { createExam, getDetailExam, updateExam } from '../redux/actions/exam-actions';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { format } from "date-fns";

const EditExam = ({navigation, route}) => {
    const dispatch = useDispatch();

    const {id} = route.params;
    const [soalName, setSoalName] = useState("");

    const {loading, data_mapel, data_kelas} = useSelector((state) => state.settingReducer);
    const {teacher_by_id} = useSelector((state) => state.userReducer);
    const {load_exam, detail_exam} = useSelector((state) => state.examReducer);
    
    const loadData = async() => {
        await dispatch(getDetailExam(id));
        await dispatch(dataMapel());
        await dispatch(dataKelas());
    }

    useEffect(() => {
        loadData();
        loadTeacher();
    }, []);

    const [idMapel, setIdMapel] = useState(data_mapel.length > 0 ? data_mapel[0].id : "");
    const [idKelas, setIdKelas] = useState(data_kelas.length > 0 ? data_kelas[0].id : "");
    const [idGuru, setIdGuru] = useState(teacher_by_id.length > 0 ? teacher_by_id[0].id_user : "");
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    const [timeFrom, setTimeFrom] = useState(new Date());
    const [timeTo, setTimeTo] = useState(new Date());

    const loadTeacher = async() => {
        await dispatch(getTeacherById(idKelas, idMapel));
    }
    useEffect(() => {
        if(idMapel != "" && idKelas != ""){
            loadTeacher();
        }
        if(Object.keys(detail_exam).length > 0){
            setDateFrom(new Date(format(new Date(detail_exam.from), 'yyyy'), format(new Date(detail_exam.from), 'M') - 1, format(new Date(detail_exam.from), 'd')));
            setDateTo(new Date(format(new Date(), 'yyyy'), format(new Date(), 'M') - 1, format(new Date(), 'd')));
        }
    }, [idMapel, idKelas]);

    useEffect(() => {
        if(teacher_by_id.length > 0){
            setIdGuru(teacher_by_id[0].id_user);
        }
    }, [teacher_by_id]);

    useEffect(() => {
        if(Object.keys(detail_exam).length > 0){
            setDateFrom(new Date(format(new Date(detail_exam.from), 'yyyy'), format(new Date(detail_exam.from), 'M') - 1, format(new Date(detail_exam.from), 'd')));
            setDateTo(new Date(format(new Date(), 'yyyy'), format(new Date(), 'M') - 1, format(new Date(), 'd')));
            setTimeFrom(new Date(detail_exam.from));
            setTimeTo(new Date(detail_exam.to));
        }
    }, [detail_exam]);

    const {values, setFieldValue, handleSubmit, handleReset, errors, touched} = useFormik({
        initialValues: {
            name: detail_exam.name,
            id_mapel: detail_exam.id_mapel,
            id_kelas: detail_exam.id_mapel,
            id_guru: detail_exam.id_guru,
            from: detail_exam.from,
            time_from: detail_exam.from,
            to: detail_exam.to,
            time_to: detail_exam.to,
        },
        onSubmit: values => {
            values.from = format(new Date(dateFrom), 'yyyy-MM-dd') + ' ' + format(new Date(timeFrom), 'HH:mm:ss');
            values.to = format(new Date(dateTo), 'yyyy-MM-dd') + ' ' + format(new Date(timeTo), 'HH:mm:ss');
            console.log("values : ", values);

            dispatch(updateExam(values, id))
            .then(response => {
                if(response.status === "success"){
                    navigation.goBack();
                }
            })
        },
        validationSchema: Yup.object().shape({
            name: Yup
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
        values.name = detail_exam.name;
        values.id_mapel = detail_exam.id_mapel;
        values.id_kelas = detail_exam.id_mapel;
        values.id_guru = detail_exam.id_guru;
    }, [detail_exam]);

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
        setFieldValue('time_from', format(new Date(selectedTime), 'HH =mm:ss'));
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

    return load_exam ? (
        <View style={tw`flex flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" color="#ff1402" />
            <Text style='text-center'>Loading....</Text>
        </View>
      ) :  (
        <View style={tw`bg-white h-full`}>
            <View style={tw`flex flex-row justify-between bg-white items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center text-lg mr-5`}>Edit Ujian {soalName}</Text>
                <View></View>
            </View>

            <ScrollView style={tw`p-4 bg-white`}>
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
                            <Text style={tw`px-2 py-4`}>{dateFrom ? format(new Date(dateFrom), 'dd/MM/yyyy') : "Tanggal"}</Text>
                        </TouchableOpacity>
                        {touched.from && errors.from &&
                            <Text style={tw`text-xs text-red-600`}>{errors.from}</Text>
                        }
                        
                        <TouchableOpacity onPress={() => showPicker("time", "time-from")} style={tw`flex flex-row border border-gray-300 rounded-md items-center mt-2`}>
                            <Text style={tw`px-2 py-4`}>{timeFrom ? format(new Date(timeFrom), 'HH:mm') : "Jam"}</Text>
                        </TouchableOpacity>
                        {touched.time_from && errors.time_from &&
                            <Text style={tw`text-xs text-red-600`}>{errors.time_from}</Text>
                        }
                    </View>

                    <View style={tw`mb-4`}>
                        <Text style={tw`mb-1`}>Waktu Ujian Berakhir</Text>
                        <TouchableOpacity onPress={() => showPicker("date", "to")} style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                            <Text style={tw`px-2 py-4`}>{dateTo ? format(new Date(dateTo), 'dd/MM/yyyy') : "Tanggal"}</Text>
                        </TouchableOpacity>
                        {touched.to && errors.to &&
                            <Text style={tw`text-xs text-red-600`}>{errors.to}</Text>
                        }

                        <TouchableOpacity onPress={() => showPicker("time", "time-to")} style={tw`flex flex-row border border-gray-300 rounded-md items-center mt-2`}>
                            <Text style={tw`px-2 py-4`}>{timeTo ? format(new Date(timeTo), 'HH:mm') : "Jam"}</Text>
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
                            onValueChange={(itemValue, itemIndex) =>
                                setFieldValue('id_mapel', itemValue)
                            }>
                                {data_mapel.map((mapel, index) => {
                                    return (
                                        <Picker.Item label={mapel.name} value={mapel.id} key={index} />
                                    )
                                })}
                        </Picker>
                    </View>
                    {touched.id_mapel && errors.id_mapel &&
                        <Text style={tw`text-xs text-red-600`}>{errors.id_mapel}</Text>
                    }
                    
                    <View style={tw`mb-4`}>
                        <Text style={tw`mb-1`}>Pilih Kelas</Text>
                        <Picker
                            style={tw`shadow bg-white`}
                            selectedValue={values.id_kelas}
                            onValueChange={(itemValue, itemIndex) =>
                                setFieldValue('id_kelas', itemValue)
                            }>
                                {data_kelas.map((kelas, index) => {
                                    return (
                                        <Picker.Item label={kelas.name} value={kelas.id} key={index} />
                                    )
                                })}
                        </Picker>
                    </View>
                    {touched.id_kelas && errors.id_kelas &&
                        <Text style={tw`text-xs text-red-600`}>{errors.id_kelas}</Text>
                    }
                    
                    {teacher_by_id.length > 0 ? (
                        <View style={tw`mb-4`}>
                            <Text style={tw`mb-1`}>Pilih Guru</Text>
                            <Picker
                                style={tw`shadow bg-white`}
                                selectedValue={values.id_guru}
                                onValueChange={(itemValue, itemIndex) =>
                                    setFieldValue('id_guru', itemValue)
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
                    {touched.id_guru && errors.id_guru &&
                        <Text style={tw`text-xs text-red-600`}>{errors.id_guru}</Text>
                    }

                    {teacher_by_id.length < 1 || idKelas == "" || idMapel == "" ? (
                        <TouchableOpacity style={tw`bg-gray-500 py-2 rounded-lg mt-4`}>
                            <Text style={tw`text-white text-center text-lg`}>Lanjut</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => {
                            Alert.alert(
                                "Ubah Ujian",
                                "Apakah anda yakin ?",
                                [
                                    { text: "Tidak" },
                                    { text: "Ya", onPress: () => {
                                        handleSubmit();
                                    }}
                                ]
                            );
                        }} style={tw`bg-blue-500 py-2 rounded-lg mt-4`}>
                            <Text style={tw`text-white text-center text-lg`}>Simpan</Text>
                        </TouchableOpacity>
                    )} 
                </View>
                
            </ScrollView>
        </View>
    )
}

export default EditExam