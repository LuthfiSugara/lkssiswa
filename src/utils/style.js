import React from 'react';
import { StyleSheet } from 'react-native';

export const customStyle = StyleSheet.create({
    bgDefault: {
        backgroundColor: '#0d9488',
    },
    bgDarkBlue: {
        backgroundColor: '#1B2430',
    },
    fixedBottom: {
        position:'absolute',
        bottom:0,
        alignSelf:'flex-end',
        width: '100%'
    },
    w5: {
        width: '5%'
    },
    w10: {
        width: '10%'
    },
    w15: {
        width: '15%'
    },
    w20: {
        width: '20%'
    },
    w45: {
        width: '45%'
    },
    w60: {
        width: '60%'
    },
    w70: {
        width: '70%'
    },
    w75: {
        width: '75%'
    },
    w80: {
        width: '80%'
    },
    w85: {
        width: '85%'
    },
    w90: {
        width: '90%'
    },
    w100: {
        width: '100%'
    },
    h100: {
        height: '100%'
    },
    h50: {
        height: '50%'
    },
    shadow: {  
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 10, height: 0},
        shadowRadius: 20,
        elevation: 10,
        backgroundColor: 'white'
    },
    aspectSquare: {
        resizeMode: 'contain',
        flex: 1,
        aspectRatio: 1/1,
    },
    paddingVertocal0: {
        paddingVertical: 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%'
    }
});