import React, { useEffect, useRef, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFormik } from "formik";
import * as Yup from "yup";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { dataJK, dataKelas, dataMapel, getClassByTeacherId } from "../redux/actions/setting-actions";
import {launchImageLibrary} from 'react-native-image-picker';
import { editProfileUser, getDetailUser, register } from "../redux/actions/auth-actions";
import RBSheet from "react-native-raw-bottom-sheet";
import {Picker} from '@react-native-picker/picker';
import { useIsFocused } from "@react-navigation/native";
import { customStyle } from "../utils/style";
import Loader from "../components/loader";
import { baseUrl } from "../utils/global";

const options = {
    title: "Select Image",
    type: 'library',
    options: {
        mediaType: 'photo',
        maxWidth: 200,
        maxHeight: 200,
        includeBase64: false,
        selectionLimit: 1,
    }
}

const EditGuru = ({navigation, route}) => {
    const dispatch = useDispatch();
    const {idJabatan, userId} = route.params;
    const refRBSheet = useRef();
    const isFocused = useIsFocused();

    const [showPassword, setShowPassword] = useState(true);
    const [foto, setFoto] = useState(null);
    const [select, setSelected] = useState("");
    const [previewImage, setPreviewImage] = useState(null);

    const loadData = async () => {
        await dispatch(dataJK());
        await dispatch(dataMapel());
        await dispatch(dataKelas());
        await dispatch(getDetailUser(userId));
        await dispatch(getClassByTeacherId(userId));
    }

    useEffect(() => {
        loadData();
    }, [isFocused]);
    
    const {load_setting, data_jk, data_mapel, data_kelas, class_by_teacher_id} = useSelector((state) => state.settingReducer);
    const {load_auth, detail_user} = useSelector((state) => state.userReducer);

    const [date, setDate] = useState(new Date());
    const [selectMapelName, setSelectMapelName] = useState("");
    const [arrKelas, setArrKelas] = useState([]);
    const [selectArrKelasName, setSelectArrKelasName] = useState([]);

    useEffect(() => {
        if(Object.keys(class_by_teacher_id).length > 0){
            if(class_by_teacher_id.kelas.length > 0 && class_by_teacher_id.name.length > 0){
                setArrKelas(class_by_teacher_id.kelas);
                setSelectArrKelasName(class_by_teacher_id.name);
            }
        }
    }, [class_by_teacher_id]);

    useEffect(() => {
        if(Object.keys(detail_user).length > 0){
            setDate(new Date(format(new Date(detail_user?.tanggal_lahir), 'yyyy'), format(new Date(detail_user?.tanggal_lahir), 'M') - 1, format(new Date(detail_user?.tanggal_lahir), 'd')));
            setSelectMapelName(detail_user.mapel.name);
            setFieldValue('pendidikan_terakhir', detail_user.pendidikan.pendidikan_terakhir);
            setPreviewImage(baseUrl + detail_user.foto);
        }
    }, [detail_user]);
        
    const changeIconPassword = () => {
        showPassword === false ? setShowPassword(true) : setShowPassword(false);
    }

    const {values, setFieldValue, handleSubmit, handleReset, errors, touched, isValid} = useFormik({
        initialValues: {
            nama: detail_user.nama,
            username: detail_user.username,
            password: '',
            tanggal_lahir: detail_user.tanggal_lahir,
            tempat_lahir: detail_user.tempat_lahir,
            alamat: detail_user.alamat,
            no_hp: detail_user.no_hp,
            id_jenis_kelamin: detail_user.id_jenis_kelamin,
            pendidikan_terakhir: '',
            id_kelas: arrKelas,
            id_mapel: detail_user.id_mapel,
        },
        onSubmit: values => {
            const formData = new FormData();
            formData.append('nama', values.nama);
            formData.append('username', values.username);
            if(values.password != ''){
                formData.append('password', values.password);
            }
            formData.append('tanggal_lahir', values.tanggal_lahir);
            formData.append('tempat_lahir', values.tempat_lahir);
            formData.append('no_hp', values.no_hp);
            formData.append('alamat', values.alamat);
            formData.append('id_jenis_kelamin', values.id_jenis_kelamin);
            formData.append('pendidikan_terakhir', values.pendidikan_terakhir);
            if(arrKelas && arrKelas.length > 0){
                formData.append('id_kelas', arrKelas);
            }
            formData.append('id_mapel', values.id_mapel);
            if(foto){
                formData.append('foto', {
                    uri: foto.assets[0].uri,
                    type: foto.assets[0].type,
                    name: foto.assets[0].fileName,
                });
            }
            
            dispatch(editProfileUser(userId, formData))
            .then(response => {
                console.log("res : ", response);
                if(response.status === "success"){
                    navigation.goBack();
                }
            })
            .catch(err => console.log(err));
        },
        validationSchema: Yup.object().shape({
            nama: Yup
                .string()
                .required("Tidak boleh kosong!"),
            username: Yup
                .string()
                .required("Tidak boleh kosong!"),
            password: Yup
                .string()
                .min(6, "Minimal 6 karakter"),
            tanggal_lahir: Yup
                .string()
                .required("Tidak boleh kosong"),
            tempat_lahir: Yup
                .string()
                .required("Tidak boleh kosong"),
            no_hp: Yup
                .string()
                .required("Tidak boleh kosong"),
            alamat: Yup
                .string()
                .required("Tidak boleh kosong"),
            id_jenis_kelamin: Yup
                .string()
                .required("Tidak boleh kosong"),
            pendidikan_terakhir: Yup
                .string()
                .required("Tidak boleh kosong"),
            id_mapel: Yup
                .string()
                .required("Tidak boleh kosong"),
        }),
    });

    const onChange = (event, selectedDate) => {
        setDate(selectedDate);
        setFieldValue('tanggal_lahir', format(new Date(selectedDate), 'yyyy/MM/dd'));
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
            maximumDate: new Date(format(new Date(), 'yyyy'), format(new Date(), 'M') - 1, format(new Date(), 'd'))
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const openGallery = async () => {
        const images = await launchImageLibrary(options);
        if(!images.didCancel){
            setFoto(images);
            setPreviewImage(images.assets[0].uri);
        }
    }

    const onSelectBottomSheet = (select) => {
        setSelected(select);
        console.log("select : ", select);
        refRBSheet.current.open();
    }

    const selectArrKelas = (idKelas, name) => {
        if(arrKelas.includes(idKelas)){
            var filteredArray = arrKelas.filter(function(e) { return e !== idKelas });
            setArrKelas(filteredArray);
            var filteredKelasName = selectArrKelasName.filter(function(e) { return e !== name });
            setSelectArrKelasName(filteredKelasName);
            console.log("kelas : ", filteredArray);
        }else{
            setArrKelas((arr) => [...arr, idKelas]);
            setSelectArrKelasName((arrName) => [...arrName, name]);
        }
    }
    
    const checkKelas = (id) => {
        if(arrKelas.includes(id)){
            return true;
        }
    }
    
    return load_auth && load_setting ? (
        <Loader/>
    ) : (
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center text-lg mr-5`}>Edit Guru</Text>
                <View></View>
            </View>

            <ScrollView style={tw`mt-8 px-4`}>
                <View style={tw`mb-4`}>
                    <Text>Nama Lengkap</Text>
                    <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                        <TextInput
                            value={values.nama}
                            onChangeText={(event) => setFieldValue('nama', event)}
                            style={tw`border-l border-gray-300 pl-2 w-full`}
                        />
                    </View>
                    {touched.nama && errors.nama &&
                        <Text style={tw`text-xs text-red-600`}>{errors.nama}</Text>
                    }
                </View>

                <View style={tw`mb-4`}>
                    <Text>Username</Text>
                    <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                        <TextInput
                            value={values.username}
                            onChangeText={(event) => setFieldValue('username', event)}s
                            style={tw`border-l border-gray-300 pl-2 w-full`}
                        />
                    </View>
                    {touched.username && errors.username &&
                        <Text style={tw`text-xs text-red-600`}>{errors.username}</Text>
                    }
                </View>

                <View style={tw`mb-4`}>
                    <Text>Password</Text>
                    <View style={tw`flex flex-row justify-between border border-gray-300 rounded-md items-center`}>
                        <TextInput
                            value={values.password}
                            onChangeText={(event) => setFieldValue('password', event)}
                            secureTextEntry={showPassword}
                            style={[tw`px-2`, customStyle.w80]}
                        />
                        <View style={[styles.w10, tw`border-l border-gray-300 h-full`]}>
                            <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="#0096FF" style={tw`px-2 py-4`} onPress={changeIconPassword} />
                        </View>
                    </View>
                    {touched.password && errors.password &&
                        <Text style={tw`text-xs text-red-600`}>{errors.password}</Text>
                    }
                </View>

                <View style={tw`mb-4`}>
                    <Text>Tempat Lahir</Text>
                    <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                        <TextInput
                            value={values.tempat_lahir}
                            onChangeText={(event) => setFieldValue('tempat_lahir', event)}
                            style={tw`border-l border-gray-300 pl-2 w-full`}
                        />
                    </View>
                    {touched.tempat_lahir && errors.tempat_lahir &&
                        <Text style={tw`text-xs text-red-600`}>{errors.tempat_lahir}</Text>
                    }
                </View>

                <View style={tw`mb-4`}>
                    <Text>Tanggal Lahir</Text>
                    <Pressable
                        onPress={showDatepicker}
                        style={tw`flex flex-row border border-gray-300 rounded-md items-center`}
                    >
                        <Text style={tw`border-l border-gray-300 p-4`}>{values.tanggal_lahir ? format(new Date(date), 'dd/MM/yyyy') : ""}</Text>
                    </Pressable>
                    {touched.tanggal_lahir && errors.tanggal_lahir &&
                        <Text style={tw`text-xs text-red-600`}>{errors.tanggal_lahir}</Text>
                    }
                </View>

                <View style={tw`mb-4`}>
                    <Text>Nomor Handphone</Text>
                    <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                        <TextInput
                            value={values.no_hp}
                            onChangeText={(event) => setFieldValue('no_hp', event)}
                            style={tw`border-l border-gray-300 pl-2 w-full`}
                        />
                    </View>
                    {touched.no_hp && errors.no_hp &&
                        <Text style={tw`text-xs text-red-600`}>{errors.no_hp}</Text>
                    }
                </View>

                <View style={tw`mb-4`}>
                    <Text>Alamat</Text>
                    <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                        <TextInput
                            value={values.alamat}
                            onChangeText={(event) => setFieldValue('alamat', event)}
                            style={tw`border-l border-gray-300 pl-2 w-full`}
                        />
                    </View>
                    {touched.alamat && errors.alamat &&
                        <Text style={tw`text-xs text-red-600`}>{errors.alamat}</Text>
                    }
                </View>

                <View style={tw`mb-4`}>
                    <Text style={tw`mb-1`}>Jenis Kelamin</Text>
                    <Picker
                        selectedValue={values.id_jenis_kelamin}
                        onValueChange={(itemValue, itemIndex) =>
                            setFieldValue('id_jenis_kelamin', itemValue)
                        }>
                            {data_jk.map((jk, index) => {
                                return (
                                    <Picker.Item label={jk.name} value={jk.id} key={index} />
                                )
                            })}
                    </Picker>

                    {touched.id_jenis_kelamin && errors.id_jenis_kelamin &&
                        <Text style={tw`text-xs text-red-600`}>{errors.id_jenis_kelamin}</Text>
                    }
                </View>

                <View style={tw`mb-4`}>
                    <Text style={tw`mb-1`}>Pendidikan Terakhir</Text>
                    <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                        <TextInput
                            value={values.pendidikan_terakhir}
                            onChangeText={(event) => setFieldValue('pendidikan_terakhir', event)}
                            style={tw`border-l border-gray-300 pl-2 w-full`}
                        />
                    </View>
                    {touched.pendidikan_terakhir && errors.pendidikan_terakhir &&
                        <Text style={tw`text-xs text-red-600`}>{errors.pendidikan_terakhir}</Text>
                    }
                </View>

                <View style={tw`mb-4`}>
                    <Text>Kelas</Text>
                    <Pressable 
                        style={tw`flex flex-row justify-between border border-gray-300 rounded-md items-center`}
                        onPress={() => onSelectBottomSheet("kelas")} 
                    >
                        <Text
                            style={tw`w-4/5 px-2`}
                        >{selectArrKelasName && selectArrKelasName.length > 2 ? selectArrKelasName.toString() + '...' : selectArrKelasName}</Text>
                        <View style={[styles.w10, tw`h-full`]}>
                            <Icon name="angle-down" size={20} color="#9e9e9e" style={tw`p-4`} />
                        </View>
                    </Pressable>
                    {arrKelas && arrKelas.length < 1 ? (
                        <Text style={tw`text-xs text-red-600`}>Tidak boleh kosong</Text>
                    ) : (
                        null
                    )}
                </View>

                <View style={tw`mb-4`}>
                    <Text>Mata Pelajaran</Text>
                    <Pressable 
                        style={tw`flex flex-row justify-between border border-gray-300 rounded-md items-center`}
                        onPress={() => onSelectBottomSheet("mapel")} 
                    >
                        <Text style={tw`w-4/5 px-2`}>{selectMapelName}</Text>
                        <View style={[styles.w10, tw`h-full`]}>
                            <Icon name="angle-down" size={20} color="#9e9e9e" style={tw`p-4`} />
                        </View>
                    </Pressable>
                    {touched.id_mapel && errors.id_mapel &&
                        <Text style={tw`text-xs text-red-600`}>{errors.id_mapel}</Text>
                    }
                </View>

                <View style={tw`flex flex-row justify-center mt-4 mb-12`}>
                    <TouchableOpacity
                        onPress={openGallery}
                        style={tw`rounded-full p-4`}
                    >
                        <View style={tw`w-full flex flex-row justify-center`}>
                            <Image
                                style={[tw`w-3/4 h-32 rounded-lg`, customStyle.aspectSquare]}
                                source={{
                                    uri: previewImage,
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={500}
                customStyles={{
                    container: {
                        borderTopRightRadius: 25,
                        borderTopLeftRadius: 25,
                    },
                    wrapper: {
                        backgroundColor: "transparent",
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <ScrollView style={tw`p-4`}>
                    {select === "kelas" ? (
                        <View style={tw`flex flex-row flex-wrap `}>
                            {data_kelas.map((kelas, index) => {
                                return (
                                    <Pressable
                                        onPress={() => {
                                            selectArrKelas(kelas.id, kelas.name);
                                        }}
                                        style={tw`${checkKelas(kelas.id) ? "border-blue-500" : "border-gray-400"} border rounded-lg p-4 mr-2 mb-2`}
                                        key={index}
                                     >
                                        <Text>{kelas.name}</Text>
                                    </Pressable>
                                )
                            })}
                        </View>
                    ) : select === "mapel" ? (
                        <View style={tw`flex flex-row flex-wrap `}>
                            {data_mapel.map((mapel, index) => {
                                return (
                                    <Pressable
                                        onPress={() => {
                                            setFieldValue('id_mapel', mapel.id);
                                            setSelectMapelName(mapel.name);
                                        }}
                                        style={tw`${mapel.id === values.id_mapel ? "border-blue-500" : "border-gray-400"} border rounded-lg p-4 mr-2 mb-2`}
                                        key={index}
                                     >
                                        <Text>{mapel.name}</Text>
                                    </Pressable>
                                )
                            })}
                        </View>
                    ) : (
                        null
                    )}
                </ScrollView>
            </RBSheet>

            {isValid && arrKelas && arrKelas.length > 0 ? (
                <TouchableOpacity 
                    style={ tw`bg-teal-500 p-2 rounded-md mb-4 mx-4`}
                    onPress={handleSubmit}
                >
                    <Text style={tw`text-white font-semibold text-center text-lg`}>Simpan</Text>
                </TouchableOpacity>
            ) : (
                <Pressable style={ tw`bg-gray-500 p-2 rounded-md mb-4 mx-4`}>
                    <Text style={tw`text-white font-semibold text-center text-lg`}>Simpan</Text>
                </Pressable>
            )}
            
        </View>
    )
}

const styles = StyleSheet.create({
    w10: {
        width: '10%'
    },
    dropdown: {
        height: 50,
        width: '88%',
        borderRadius: 4,
        paddingHorizontal: 8,
    },
    shadowUpload: { 
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 10, height: 0},
        shadowRadius: 20,
        elevation: 10,
        backgroundColor: 'white'
    }
});


export default EditGuru;