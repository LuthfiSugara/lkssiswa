import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Button, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import tw from 'twrnc';
import * as Yup from "yup";
import DateTimePicker from '@react-native-community/datetimepicker';
import RBSheet from "react-native-raw-bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { dataKelas, dataJK, dataJabatan } from "../redux/actions/setting-actions";
import { format } from "date-fns";
import { register } from "../redux/actions/auth-actions";
import {launchImageLibrary} from 'react-native-image-picker';

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

const TambahUser = ({navigation}) => {

    const dispatch = useDispatch();
    const refRBSheet = useRef();

    const [date, setDate] = useState(format(new Date(), 'yyyy'), format(new Date(), 'M') - 1, format(new Date(), 'd'));
    const [select, setSelected] = useState("");
    const [selectJabatan, setSelectJabatan] = useState("");
    const [selectJK, setSelectJK] = useState("");
    const [selectKelas, setSelectKelas] = useState("");
    const [jk, setJK] = useState("");
    const [jkName, setJKName] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [jabatanName, setJabatanName] = useState("");
    const [kelas, setKelas] = useState([]);
    const [kelasName, setKelasName] = useState([]);
    const [tglLahir, setTglLahir] = useState("");
    const [showDate, setShowDate] = useState(false);
    const [foto, setFoto] = useState(null);

    const {loading, data_kelas, data_jk, data_jabatan} = useSelector((state) => state.settingReducer);

    const loadData = async() => {
        await dispatch(dataKelas());
        await dispatch(dataJK());
        await dispatch(dataJabatan());
    }

    useEffect(() => {
        loadData();
    }, []);

    
    
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setTglLahir(format(new Date(currentDate), 'yyyy/MM/dd'));
        setShowDate(false);
    };

    const showDatepicker = () => {
        setShowDate(true);
    };

    const onSelectBottomSheet = (select) => {
        setSelected(select);
        refRBSheet.current.open();
    }

    const openGallery = async () => {
        const images = await launchImageLibrary(options);
        setFoto(images);
        
    }

    const selectArrKelas = (idKelas) => {
        if(kelas.includes(idKelas)){
            var filteredArray = kelas.filter(function(e) { return e !== idKelas });
            setKelas(filteredArray);
            console.log(filteredArray);
        }else{
            setKelas((arrKelas) => [...arrKelas, idKelas]);
        }
    }
    
    const checkKelas = (id) => {
        if(kelas.includes(id)){
            return true;
        }
    }

    useEffect(() => {
    }, [checkKelas, selectArrKelas]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={tw`flex flex-row justify-between items-center p-2`}>
                <Pressable style={[styles.shadow, tw`py-2 px-4 rounded-full`]} onPress={() => navigation.goBack()}>
                    <Icon name={'angle-left'} size={25} color="#000000" />
                </Pressable>
                <Text style={tw`text-center text-lg mr-5`}>Tambah User</Text>
                <View></View>
            </View>
            <ScrollView style={styles.scrollView}>
                <Formik
                    initialValues={{ 
                        nama_lengkap: '',
                        username: '',
                        password: '',
                        tanggal_lahir: '',
                        no_hp: '',
                        id_jenis_kelamin: '',
                        id_jabatan: '',
                        id_kelas: '',
                        foto: '',

                    }}
                    onSubmit={(values) => {
                        console.log(kelas);

                        const formData = new FormData();
                        formData.append('nama_lengkap', values.nama_lengkap);
                        formData.append('username', values.username);
                        formData.append('password', values.password);
                        formData.append('tanggal_lahir', format(new Date(date), 'yyyy/MM/dd'));
                        formData.append('no_hp', values.no_hp);
                        formData.append('id_jenis_kelamin', jk);
                        formData.append('id_jabatan', jabatan);
                        formData.append('id_kelas', kelas);
                        // formData.append('foto', {
                        //     uri: foto.assets[0].uri,
                        //     type: foto.assets[0].type,
                        //     name: foto.assets[0].fileName,
                        // })
                        
                        // const result = dispatch(register(formData))
                        // .then(response => {
                        //     if(response.status === "success"){
                        //         navigation.goBack();
                        //     }
                        // })
                        // .catch(err => console.log(err));
                    }}
                    validationSchema={Yup.object().shape({
                        // nama_lengkap: Yup
                        //     .string()
                        //     .required("Tidak boleh kosong!"),
                        // username: Yup
                        //     .string()
                        //     .required("Tidak boleh kosong!"),
                        // password: Yup
                        //     .string()
                        //     .min(6, "Minimal 6 karakter")
                        //     .required("Tidak boleh kosong"),
                        // no_hp: Yup
                        //     .string()
                        //     .required("Tidak boleh kosong!"),
                    })}
                >
                    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                    <View style={tw`px-4 my-10`}>
                        <View style={tw`mb-4`}>
                            <Text>Nama Lengkap</Text>
                            <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                                <Icon name={'address-book'} size={20} color="#0096FF" style={tw`px-4`} />
                                <TextInput
                                    value={values.nama_lengkap}
                                    onChangeText={handleChange('nama_lengkap')}
                                    onBlur={() => setFieldTouched('nama_lengkap')}
                                    style={tw`border-l border-gray-300 pl-2`}
                                />
                            </View>
                            {touched.nama_lengkap && errors.nama_lengkap &&
                                <Text style={tw`text-xs text-red-600`}>{errors.nama_lengkap}</Text>
                            }
                        </View>   

                        <View style={tw`mb-4`}>
                            <Text>Username</Text>
                            <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                                <Icon name={'user-cog'} size={20} color="#0096FF" style={tw`px-3`} />
                                <TextInput
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                    onBlur={() => setFieldTouched('username')}
                                    style={tw`border-l border-gray-300 pl-2`}
                                />
                            </View>
                            {touched.username && errors.username &&
                                <Text style={tw`text-xs text-red-600`}>{errors.username}</Text>
                            }
                        </View>    
                        
                        <View style={tw`mb-4`}>
                            <Text>Password</Text>
                            <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                                <Icon name={'lock'} size={20} color="#0096FF" style={tw`px-4`} />
                                <TextInput
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={() => setFieldTouched('password')}
                                    secureTextEntry
                                    style={tw`border-l border-gray-300 pl-2`}
                                />
                            </View>
                            {touched.password && errors.password &&
                                <Text style={tw`text-xs text-red-600`}>{errors.password}</Text>
                            }
                        </View>

                        <View style={tw`mb-4`}>
                            <Text>Tanggal Lahir</Text>
                            <Pressable
                                onPress={showDatepicker}
                                style={tw`flex flex-row border border-gray-300 rounded-md items-center`}
                            >
                                <Icon name={'calendar-check'} size={20} color="#0096FF" style={tw`px-4`} />
                                <Text style={tw`border-l border-gray-300 p-4`}>{tglLahir}</Text>
                            </Pressable>
                            {touched.tanggal_lahir && errors.tanggal_lahir &&
                                <Text style={tw`text-xs text-red-600`}>{errors.tanggal_lahir}</Text>
                            }
                        </View>
                        
                        <View style={tw`mb-4`}>
                            <Text>Nomor Handphone</Text>
                            <View style={tw`flex flex-row border border-gray-300 rounded-md items-center`}>
                                <Icon name={'phone'} size={20} color="#0096FF" style={tw`px-4`} />
                                <TextInput
                                    value={values.no_hp}
                                    onChangeText={handleChange('no_hp', "asdasd")}
                                    onBlur={() => setFieldTouched('no_hp')}
                                    style={tw`border-l border-gray-300 pl-2`}
                                />
                            </View>
                            {touched.no_hp && errors.no_hp &&
                                <Text style={tw`text-xs text-red-600`}>{errors.no_hp}</Text>
                            }
                        </View>

                        <View style={tw`mb-4`}>
                            <Text>Jenis Kelamin</Text>
                            <Pressable 
                                onPress={() => onSelectBottomSheet("jk")} 
                                style={tw`flex flex-row border border-gray-300 rounded-md items-center`}
                            >
                                <Icon name={'venus-mars'} size={20} color="#0096FF" style={tw`px-4`} />
                                <Text style={tw`border-l border-gray-300 p-4`}>{jkName}</Text>
                            </Pressable>
                            {touched.id_jenis_kelamin && errors.id_jenis_kelamin &&
                                <Text style={tw`text-xs text-red-600`}>{errors.id_jenis_kelamin}</Text>
                            }
                        </View>
                        
                        <View style={tw`mb-4`}>
                            <Text>Jabatan</Text>
                            <Pressable 
                                onPress={() => onSelectBottomSheet("jabatan")} 
                                style={tw`flex flex-row border border-gray-300 rounded-md items-center`}
                            >
                                <Icon name={'id-badge'} size={20} color="#0096FF" style={tw`px-4`} />
                                <Text style={tw`border-l border-gray-300 p-4`}>{jabatanName}</Text>
                            </Pressable>
                            {touched.id_jabatan && errors.id_jabatan &&
                                <Text style={tw`text-xs text-red-600`}>{errors.id_jabatan}</Text>
                            }
                        </View>
                        
                        
                        {jabatanName.toLocaleLowerCase() === "guru" ? (
                            <View style={tw`mb-4`}>
                                <Text>kelas</Text>
                                <View style={tw`flex flex-row flex-wrap`}>
                                    {data_kelas.map((kelas, index) => {
                                        return (
                                            <Pressable 
                                                key={index}
                                                onPress={() => {
                                                    selectArrKelas(kelas.id);
                                                    checkKelas(kelas.id);
                                                }}
                                                style={tw` ${checkKelas(kelas.id) ? "border-blue-500" : "border-gray-400"} border border-2 rounded-lg m-2 p-4`}>
                                                <Text>{kelas.name}</Text>
                                            </Pressable>
                                        )
                                    })}
                                </View>
                            </View>
                        )  : (
                            null
                        )}

                        <View style={tw`flex flex-row justify-center mt-4 mb-12`}>
                            <TouchableOpacity
                                onPress={openGallery}
                                style={[styles.shadowUpload, tw`w-1/3 rounded-full p-4`]}
                            >
                                <Icon name={'cloud-upload-alt'} size={50} color="#0096FF" style={tw`px-3 text-center`} />
                                <Text style={tw`text-center`}>Upload Foto</Text>
                            </TouchableOpacity>
                            {touched.foto && errors.foto &&
                                <Text style={tw`text-xs text-red-600`}>{errors.foto}</Text>
                            }
                        </View>

                        {showDate ? (
                            <DateTimePicker 
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            locale="id-ID"
                            onChange={onChangeDate}
                            />
                            ): (
                                null
                        )}

                    
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
                                    <View>
                                        <Text>Kelas</Text>
                                        {data_kelas.map((kelas, index) => {
                                            return (
                                                <Pressable 
                                                    key={index} 
                                                    style={tw`flex flex-row justify-between border border-gray-300 p-2 my-1 rounded`}
                                                    onPress={() => {
                                                        setSelectKelas("kelas-" + index);
                                                        selectArrKelas(kelas.id);
                                                        refRBSheet.current.close();
                                                    }}
                                                >
                                                    <Text>{kelas.name}</Text>
                                                    <Icon name={'check'} size={20} color={checkKelas(kelas.id) ? "#0096FF" : "#9e9e9e"} />
                                                </Pressable>
                                            )
                                        })}
                                    </View>
                                ) : select === "jk" ? (
                                    <View>
                                        {data_jk.map((jk, index) => {
                                            return (
                                                <Pressable 
                                                    key={index} 
                                                    style={tw`flex flex-row justify-between border border-gray-300 p-2 my-1 rounded`}
                                                    onPress={() => {
                                                        setSelectJK("jk-" + index),
                                                        setJK(jk.id),
                                                        setJKName(jk.name),
                                                        refRBSheet.current.close()
                                                    }}
                                                >
                                                    <Text>{jk.name}</Text>
                                                    <Icon name={'check'} size={20} color={selectJK === "jk-" + index ? "#0096FF" : "#9e9e9e"} />
                                                </Pressable>
                                            )
                                        })}
                                    </View>
                                ) : select === "jabatan" ? (
                                    <View>
                                        {data_jabatan.map((jabatan, index) => {
                                            return (
                                                <Pressable 
                                                    key={index} 
                                                    style={tw`flex flex-row justify-between border border-gray-300 p-2 my-1 rounded`}
                                                    onPress={() => {
                                                        setSelectJabatan("jabatan-" + index),
                                                        setJabatan(jabatan.id),
                                                        setJabatanName(jabatan.name),
                                                        refRBSheet.current.close()
                                                    }}
                                                >
                                                    <Text>{jabatan.name}</Text>
                                                    <Icon name={'check'} size={20} color={selectJabatan === "jabatan-" + index ? "#0096FF" : "#9e9e9e"} />
                                                </Pressable>
                                            )
                                        })}
                                    </View>
                                ) : (
                                    null
                                )}
                            </ScrollView>
                        </RBSheet>

                        {/* {values.nama_lengkap !== '' && values.username !== '' && values.password !== '' && values.no_hp !== '' && tglLahir != '' && jk != '' && jabatan != '' && foto !== null ? ( */}
                            <TouchableOpacity 
                                style={ tw`bg-blue-500 p-2 rounded-md`}
                                onPress={handleSubmit}
                                disabled={false}
                            >
                                <Text style={tw`text-white font-semibold text-center text-lg`}>Tambah User</Text>
                            </TouchableOpacity>
                        {/* ) : (
                            <Pressable 
                                style={tw`bg-gray-300 p-2 rounded-md`}
                                onPress={handleSubmit}
                                disabled={true}
                            >
                                <Text style={tw`text-gray-500 font-semibold text-center text-lg`}>Tambah User</Text>
                            </Pressable>
                        )} */}
                    </View>
                    )}
                </Formik>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    shadow: {  
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 10, height: 0},
        shadowRadius: 20,
        elevation: 10,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentContainer: {
        backgroundColor: "white",
    },
    itemContainer: {
        padding: 6,
        margin: 6,
        backgroundColor: "#eee",
    },
    shadowUpload: { 
        // borderRadius: 50,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 10, height: 0},
        shadowRadius: 20,
        elevation: 10,
        backgroundColor: 'white'
    }
});

export default TambahUser;