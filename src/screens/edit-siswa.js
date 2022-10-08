import React, { useEffect, useRef, useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFormik } from "formik";
import * as Yup from "yup";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { dataJK, dataKelas } from "../redux/actions/setting-actions";
import { editProfileUser, getDetailUser } from '../redux/actions/auth-actions';
import {launchImageLibrary} from 'react-native-image-picker';
import RBSheet from "react-native-raw-bottom-sheet";
import {Picker} from '@react-native-picker/picker';
import { baseUrl } from "../utils/global";
import Loader from "../components/loader";
import { customStyle } from "../utils/style";

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

const EditSiswa = ({navigation, route}) => {
    const dispatch = useDispatch();
    const {userId, idJabatan} = route.params;
    const refRBSheet = useRef();

    const {load_setting, data_kelas, data_jk} = useSelector((state) => state.settingReducer);
    const {load_auth, detail_user} = useSelector((state) => state.userReducer);

    const loadData = async() => {
        await dispatch(dataKelas());
        await dispatch(dataJK());
        await getDetailUser(userId);
    }

    useEffect(() => {
        loadData();
    }, []);

    const [showPassword, setShowPassword] = useState(true);
    const [date, setDate] = useState(new Date());
    const [foto, setFoto] = useState(null);
    const [select, setSelected] = useState("");
    const [kelasName, setKelasName] = useState("");
    const [previewImage, setPreviewImage] = useState(null);

    const changeIconPassword = () => {
        showPassword === false ? setShowPassword(true) : setShowPassword(false);
    }

    useEffect(() => {
        if(Object.keys(detail_user).length > 0){
            setDate(new Date(format(new Date(detail_user.tanggal_lahir), 'yyyy'), format(new Date(detail_user.tanggal_lahir), 'M') - 1, format(new Date(detail_user.tanggal_lahir), 'd')));
            setKelasName(detail_user.kelas[0].detail.name);
            setPreviewImage(baseUrl + detail_user.foto);
            setFieldValue('nama', detail_user.nama);
            setFieldValue('username', detail_user.username);
            setFieldValue('tanggal_lahir', detail_user.tanggal_lahir);
            setFieldValue('tempat_lahir', detail_user.tempat_lahir);
            setFieldValue('alamat', detail_user.alamat);
            setFieldValue('no_hp', detail_user.no_hp);
            setFieldValue('id_jenis_kelamin', detail_user.id_jenis_kelamin);
            setFieldValue('id_kelas', detail_user.kelas[0].id_kelas);
            setFieldValue('nama_ayah', detail_user.siswa.nama_ayah);
            setFieldValue('nama_ibu', detail_user.siswa.nama_ibu);
            setFieldValue('pekerjaan_ayah', detail_user.siswa.pekerjaan_ayah);
            setFieldValue('pekerjaan_ibu', detail_user.siswa.pekerjaan_ibu);
        }
        
    }, [detail_user]);

    const {values, setFieldValue, handleSubmit, handleReset, errors, touched} = useFormik({
        initialValues: {
            nama: '',
            username: '',
            password: '',
            tanggal_lahir: '',
            tempat_lahir: '',
            alamat: '',
            no_hp: '',
            id_jenis_kelamin: '',
            id_kelas: '',
            nama_ayah: '',
            nama_ibu: '',
            pekerjaan_ayah: '',
            pekerjaan_ibu: '',
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
            formData.append('id_jabatan', idJabatan);
            formData.append('id_jenis_kelamin', values.id_jenis_kelamin);
            formData.append('id_kelas', values.id_kelas);
            formData.append('nama_ayah', values.nama_ayah);
            formData.append('nama_ibu', values.nama_ibu);
            formData.append('pekerjaan_ayah', values.pekerjaan_ayah);
            formData.append('pekerjaan_ibu', values.pekerjaan_ibu);

            if(foto){
                formData.append('foto', {
                    uri: foto.assets[0].uri,
                    type: foto.assets[0].type,
                    name: foto.assets[0].fileName,
                });
            }
            
            dispatch(editProfileUser(userId, formData))
            .then(response => {
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
            id_kelas: Yup
                .string()
                .required("Tidak boleh kosong"),
            nama_ayah: Yup
                .string()
                .required("Tidak boleh kosong"),
            nama_ibu: Yup
                .string()
                .required("Tidak boleh kosong"),
            pekerjaan_ayah: Yup
                .string()
                .required("Tidak boleh kosong"),
            pekerjaan_ibu: Yup
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
        refRBSheet.current.open();
    }
    
    return load_auth && load_setting ? (
        <Loader/>
    ) : (
        <View style={tw`h-full bg-white`}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={tw`shadow-lg bg-white py-2 px-4 rounded-full`} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center mr-5`}>Edit Siswa</Text>
                <View></View>
            </View>

            <ScrollView style={tw`mt-8 px-4`}>
                <View style={tw`mb-4`}>
                    <Text style={tw`mb-1`}>Nama Lengkap</Text>
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
                    <Text style={tw`mb-1`}>Username</Text>
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
                    <Text style={tw`mb-1`}>Password</Text>
                    <View style={tw`flex flex-row justify-between border border-gray-300 rounded-md items-center`}>
                        <TextInput
                            value={values.password}
                            onChangeText={(event) => setFieldValue('password', event)}
                            secureTextEntry={showPassword}
                            style={tw`w-4/5 px-2`}
                        />
                        <Icon name={showPassword ? "eye-slash" : "eye"} size={15} color="#0096FF" style={tw`p-4`} onPress={changeIconPassword} />
                    </View>
                    {touched.password && errors.password &&
                        <Text style={tw`text-xs text-red-600`}>{errors.password}</Text>
                    }
                </View>

                <View style={tw`mb-4`}>
                    <Text style={tw`mb-1`}>Tempat Lahir</Text>
                    <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                        <TextInput
                            value={values.tempat_lahir}
                            onChangeText={(event) => setFieldValue('tempat_lahir', event)}s
                            style={tw`border-l border-gray-300 pl-2 w-full`}
                        />
                    </View>
                    {touched.tempat_lahir && errors.tempat_lahir &&
                        <Text style={tw`text-xs text-red-600`}>{errors.tempat_lahir}</Text>
                    }
                </View>

                <View style={tw`mb-4`}>
                    <Text style={tw`mb-1`}>Tanggal Lahir</Text>
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
                    <Text style={tw`mb-1`}>Nomor Handphone</Text>
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
                    <Text style={tw`mb-1`}>Alamat</Text>
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
                    <Text style={tw`mb-1`}>Kelas</Text>
                    <Pressable 
                        style={tw`flex flex-row justify-between border border-gray-300 rounded-md items-center`}
                        onPress={() => onSelectBottomSheet("kelas")} 
                    >
                        <Text style={tw`w-full py-4 px-2`}>{kelasName}</Text>
                    </Pressable>
                    {touched.id_kelas && errors.id_kelas &&
                        <Text style={tw`text-xs text-red-600`}>{errors.id_kelas}</Text>
                    }
                </View>

                <View style={tw`mb-4`}>
                    <Text style={tw`mb-1`}>Nama Ayah</Text>
                    <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                        <TextInput
                            value={values.nama_ayah}
                            onChangeText={(event) => setFieldValue('nama_ayah', event)}
                            style={tw`border-l border-gray-300 pl-2 w-full`}
                        />
                    </View>
                    {touched.nama_ayah && errors.nama_ayah &&
                        <Text style={tw`text-xs text-red-600`}>{errors.nama_ayah}</Text>
                    }
                </View>

                <View style={tw`mb-4`}>
                    <Text style={tw`mb-1`}>Pekerjaan Ayah</Text>
                    <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                        <TextInput
                            value={values.pekerjaan_ayah}
                            onChangeText={(event) => setFieldValue('pekerjaan_ayah', event)}
                            style={tw`border-l border-gray-300 pl-2 w-full`}
                        />
                    </View>
                    {touched.pekerjaan_ayah && errors.pekerjaan_ayah &&
                        <Text style={tw`text-xs text-red-600`}>{errors.pekerjaan_ayah}</Text>
                    }
                </View>

                <View style={tw`mb-4`}>
                    <Text style={tw`mb-1`}>Nama Ibu</Text>
                    <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                        <TextInput
                            value={values.nama_ibu}
                            onChangeText={(event) => setFieldValue('nama_ibu', event)}
                            style={tw`border-l border-gray-300 pl-2 w-full`}
                        />
                    </View>
                    {touched.nama_ibu && errors.nama_ibu &&
                        <Text style={tw`text-xs text-red-600`}>{errors.nama_ibu}</Text>
                    }
                </View>

                <View style={tw`mb-4`}>
                    <Text style={tw`mb-1`}>Pekerjaan Ibu</Text>
                    <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                        <TextInput
                            value={values.pekerjaan_ibu}
                            onChangeText={(event) => setFieldValue('pekerjaan_ibu', event)}
                            style={tw`border-l border-gray-300 pl-2 w-full`}
                        />
                    </View>
                    {touched.pekerjaan_ibu && errors.pekerjaan_ibu &&
                        <Text style={tw`text-xs text-red-600`}>{errors.pekerjaan_ibu}</Text>
                    }
                </View>

                <View style={tw`flex flex-row justify-center mt-4 mb-12`}>
                    <TouchableOpacity
                        onPress={openGallery}
                        style={[tw`w-1/2 rounded-full p-4`]}
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
                                            setKelasName(kelas.name);
                                            setFieldValue('id_kelas', kelas.id);
                                        }}
                                        style={tw`${kelas.id == values.id_kelas ? "border-blue-500" : "border-gray-400"} border rounded-lg p-4 mr-2 mb-2`}
                                        key={index}
                                     >
                                        <Text>{kelas.name}</Text>
                                    </Pressable>
                                )
                            })}
                        </View>
                    ) : (
                        null
                    )}
                </ScrollView>
            </RBSheet>

            <TouchableOpacity 
                style={ tw`bg-teal-500 p-2 rounded-md mb-4 mx-4`}
                onPress={handleSubmit}
            >
                <Text style={tw`text-white font-semibold text-center text-lg`}>Simpan</Text>
            </TouchableOpacity>
        </View>
    )
}


export default EditSiswa;