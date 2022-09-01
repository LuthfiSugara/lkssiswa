import React from 'react';
import { StyleSheet } from 'react-native';

export const customStyle = StyleSheet.create({
    bgDarkBlue: {
        backgroundColor: '#1B2430',
    },
    fixedBottom: {
        position:'absolute',
        bottom:0,
        alignSelf:'flex-end',
        width: '100%'
    },
    h50: {
        height: '50%'
    },
    h100: {
        height: '100%'
    }
});