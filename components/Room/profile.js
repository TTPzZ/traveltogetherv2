import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase/config';
import { AuthContext } from '../../Context/AuthProvider';

export default function Profile() {
    const {
        user: { displayName, photoURL, email },
    } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Thông tin cá nhân</Text>
            </View>

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
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Email:</Text>
                    <Text style={styles.infoText}>{email}</Text>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Số điện thoại:</Text>
                    <Text style={styles.infoText}>0123456789</Text>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Địa chỉ:</Text>
                    <Text style={styles.infoText}>Biên Hòa, Đồng Nai</Text>
                </View>
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
        backgroundColor: '#E3F2FD', // Màu nền xanh dương nhạt
        paddingTop: 20,
    },
    header: {
        width: '95%', // Chiều rộng tiêu đề ngắn hơn một chút
        paddingVertical: 10,
        backgroundColor: '#64B5F6', // Màu nền tiêu đề
        borderRadius: 15, // Bo tròn góc
        alignItems: 'center', // Căn giữa nội dung trong tiêu đề
        justifyContent: 'center',
        marginBottom: 15, // Giảm khoảng cách phía dưới tiêu đề
        marginTop:-10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF', // Màu chữ
        textAlign: 'center',
    },
    profileImageContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BBDEFB', // Nền khung ảnh đại diện xanh dương nhạt
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
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
        backgroundColor: '#90CAF9', // Màu nền của khung ảnh đại diện khi không có ảnh
    },
    placeholderText: {
        fontSize: 50,
        color: '#FFFFFF',
    },
    username: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1565C0', // Tông xanh dương đậm hơn cho tên người dùng
        marginBottom: 20,
    },
    infoContainer: {
        alignItems: 'flex-start',
        width: '90%',
        marginBottom: 30,
        backgroundColor: '#FFFFFF', // Nền trắng cho thông tin cá nhân
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
    },
    infoItem: {
        marginBottom: 15,
    },
    infoLabel: {
        fontSize: 16,
        color: '#42A5F5', // Màu nhấn xanh dương cho nhãn thông tin
        fontWeight: '600',
    },
    infoText: {
        fontSize: 18,
        color: '#1976D2', // Màu xanh đậm hơn cho nội dung thông tin
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: '#FF5252', // Màu đỏ cho nút đăng xuất
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        shadowColor: '#FF5252',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        marginBottom: 20,
    },
    logoutText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
});
