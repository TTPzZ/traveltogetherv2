import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { adddDocument } from '../../firebase/services';
import useFirestore from '../../hooks/useFirestore';

const defaultAvatar = 'https://via.placeholder.com/40/CCCCCC/FFFFFF?text=U';

export default function Chat() {
    const {
        user: { displayName, photoURL, uid },
    } = useContext(AuthContext);

    const { setinInviteMemberVisible, selectedRoom, members } = useContext(AppContext);

    const [inputValue, setInputValue] = useState('');

    // Điều kiện để lấy dữ liệu từ Firestore theo `roomId`
    const condition = React.useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom?.id,
    }), [selectedRoom?.id]);

    // Lấy danh sách tin nhắn từ Firestore
    const messages = useFirestore('messages', condition);

    // Gửi tin nhắn mới
    const handleOnSubmit = () => {
        if (inputValue.trim()) {
            adddDocument('messages', {
                text: inputValue,
                uid,
                photoURL,
                roomId: selectedRoom.id,
                displayName,
            });
            setInputValue(''); // Reset ô nhập sau khi gửi
        }
    };

    return (
        <View style={styles.container}>
            {selectedRoom ? (
                <View style={styles.infoBar}>
                    <Text style={styles.infoText}>{selectedRoom.name}</Text>
                    <View style={styles.memberIcons}>
                        {members.slice(0, 3).map((member, index) => (
                            <Image
                                key={member.id}
                                source={{ uri: member.photoURL || defaultAvatar }}
                                style={[styles.memberAvatar, { marginLeft: index > 0 ? -10 : 0 }]}
                            />
                        ))}
                        {/* Nút thêm thành viên */}
                        <TouchableOpacity
                            style={styles.addMemberButton}
                            onPress={() => setinInviteMemberVisible(true)}
                        >
                            <Text style={styles.addMemberText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <Text style={styles.infoText}>Chọn phòng để bắt đầu chat</Text>
            )}

            {/* Hiển thị danh sách tin nhắn */}
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id} // Sử dụng `item.id` làm `key`
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.messageItem,
                            item.displayName === displayName ? styles.myMessage : styles.otherMessage,
                            { alignSelf: item.displayName === displayName ? 'flex-end' : 'flex-start' },
                        ]}
                    >
                        <Image source={{ uri: item.photoURL }} style={styles.avatar} />
                        <View style={styles.messageContent}>
                            <Text style={styles.userName}>{item.displayName}</Text>
                            <Text>{item.text}</Text>
                            <Text style={styles.timestamp}>{new Date(item.createdAt?.toDate()).toLocaleTimeString()}</Text>
                        </View>
                    </View>
                )}
                style={styles.messageList}
            />

            {/* Ô nhập tin nhắn */}
            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập tin nhắn..."
                    value={inputValue}
                    onChangeText={setInputValue}
                />
                <Button title="Gửi" onPress={handleOnSubmit} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#E8F5E9',
    },
    infoBar: {
        backgroundColor: '#C8E6C9',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
    },
    infoText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E7D32',
    },
    memberIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    memberAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: '#FFF',
        borderWidth: 2,
    },
    addMemberButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#2E7D32',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -10,
        borderWidth: 2,
        borderColor: '#FFF',
    },
    addMemberText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    messageList: {
        flex: 1,
        marginBottom: 10,
    },
    messageItem: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },
    myMessage: {
        backgroundColor: '#A5D6A7',
    },
    otherMessage: {
        backgroundColor: '#FFCDD2',
    },
    messageContent: {
        padding: 10,
        borderRadius: 10,
        maxWidth: '90%',
    },
    userName: {
        fontWeight: 'bold',
        color: '#1B5E20',
    },
    timestamp: {
        fontSize: 10,
        color: '#666',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderColor: '#BDBDBD',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        backgroundColor: '#FFF',
    },
});
