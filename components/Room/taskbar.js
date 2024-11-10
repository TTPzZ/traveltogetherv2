import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Taskbar = ({ setCurrentTask }) => {
    return (
        <View style={styles.taskbar}>
            <TouchableOpacity onPress={() => setCurrentTask('Chat')} style={styles.task}>
                <Text>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentTask('Home')} style={styles.task}>
                <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentTask('Profile')} style={styles.task}>
                <Text>Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    taskbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    task: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
});

export default Taskbar;
