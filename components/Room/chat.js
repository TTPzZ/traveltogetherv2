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

    const condition = React.useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom?.id,
    }), [selectedRoom?.id]);

    const messages = useFirestore('messages', condition);

    const handleOnSubmit = () => {
        if (inputValue.trim()) {
            adddDocument('messages', {
                text: inputValue,
                uid,
                photoURL,
                roomId: selectedRoom.id,
                displayName,
            });
            setInputValue('');
        }
    };

    return (
        <View style={styles.container}>
            {selectedRoom ? (
                <View style={styles.infoBar}>
                    <View style={styles.centeredTextContainer}>
                        <Text style={styles.infoText}>{selectedRoom.name}</Text>
                    </View>
                    <View style={styles.memberIcons}>
                        {members.slice(0, 3).map((member, index) => (
                            <Image
                                key={member.id}
                                source={{ uri: member.photoURL || defaultAvatar }}
                                style={[styles.memberAvatar, { marginLeft: index > 0 ? -10 : 0 }]}
                            />
                        ))}
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
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
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
            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập tin nhắn..."
                    value={inputValue}
                    onChangeText={setInputValue}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleOnSubmit}>
                    <Text style={styles.sendButtonText}>Gửi</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#E3F2FD', // Xanh dương nhạt nền
    },
    infoBar: {
        backgroundColor: '#BBDEFB',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 15,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    centeredTextContainer: {
        flex: 1,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0D47A1',
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
        backgroundColor: '#1976D2',
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
        marginBottom: 8,
        padding: 10,
        borderRadius: 15,
        maxWidth: '75%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    myMessage: {
        backgroundColor: '#BBDEFB',
    },
    otherMessage: {
        backgroundColor: '#E3F2FD',
    },
    messageContent: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        maxWidth: '90%',
    },
    userName: {
        fontWeight: 'bold',
        color: '#1E88E5',
        marginBottom: 4,
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
        borderColor: '#0D47A1',
        borderWidth: 1,
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        paddingVertical: 8,
        paddingHorizontal: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 15,
        borderColor: '#90CAF9',
        borderWidth: 1,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: '#FFFFFF',
        height: 40,
    },
    sendButton: {
        backgroundColor: '#0D47A1',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
