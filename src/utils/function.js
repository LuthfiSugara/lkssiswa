import { PermissionsAndroid, Alert } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob';


export const checkPermission = async (fileUrl) => {
    
    if (Platform.OS === 'ios') {
        downloadFile(fileUrl);
    } else {
        try {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Storage Permission Required',
                message:
                'Application needs access to your storage to download File',
            }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                downloadFile(fileUrl);
                console.log('Storage Permission Granted.');
            } else {
                Alert.alert('Error','Storage Permission Not Granted');
            }
        } catch (err) {
            console.log("++++"+err);
        }
    }
};

export const downloadFile = (fileUrl) => {
    let date = new Date();
    
    let FILE_URL = fileUrl;    
    
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
    fileCache: true,
    addAndroidDownloads: {
        path:
        RootDir+
        '/Download/file_' + 
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        file_ext,
        description: 'downloading file...',
        notification: true,
        
        useDownloadManager: true,
    },
    };
    config(options)
    .fetch('GET', FILE_URL)
    .then(res => {
        // console.log('res -> ', JSON.stringify(res));
        Alert.alert('Download materi', 'Download Berhasil.');
    });
};

const getFileExtention = (fileUrl) => {
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
};

export const isImage = (image) => {
    let arrImage = image.split(".");
    let status = false;
    if(arrImage[1] == "jpeg" || arrImage[1] == "jpg" || arrImage[1] == "png"){
        status = true;
    }
    return status;
}