import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';

import { auth } from '../../firebase/config';
import { AuthContext } from '../../Context/AuthProvider';

export default function Profile() {
    const {
        user: { displayName, photoURL, email },
    } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={styles.profileImageContainer}>
                {photoURL ? (
                    <Image source={{ uri: photoURL }} style={styles.profileImage} />
                ) : (
                    <View style={styles.placeholder}>
                        <Text style={styles.placeholderText}>{displayName?.charAt(0)?.toUpperCase()}</Text>
                    </View>
                )}
            </View>

            <Text style={styles.username}>{displayName}</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoText}>{email}</Text>

                <Text style={styles.infoLabel}>Số điện thoại:</Text>
                <Text style={styles.infoText}>0123456789</Text>

                <Text style={styles.infoLabel}>Địa chỉ:</Text>
                <Text style={styles.infoText}>Biên Hòa, Đồng Nai</Text>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={() => auth.signOut()}>
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F3F4F6',
    },
    profileImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E0E0E0',
        marginBottom: 15,
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#90A4AE',
    },
    placeholderText: {
        fontSize: 40,
        color: '#FFFFFF',
    },
    username: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    infoContainer: {
        alignItems: 'flex-start',
        width: '80%',
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    infoLabel: {
        fontSize: 14,
        color: '#607D8B',
        fontWeight: '600',
        marginTop: 10,
    },
    infoText: {
        fontSize: 16,
        color: '#455A64',
        marginBottom: 5,
    },
    logoutButton: {
        backgroundColor: '#FF5252',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        shadowColor: '#FF5252',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
    },
});
