// Taskbar.js
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../../assets/Image/Logo1.png'; // Importing the custom image

const Taskbar = ({ setCurrentTask }) => {
    const [selectedTask, setSelectedTask] = useState('Home'); // Default selected task

    const handleTaskPress = (taskName) => {
        setSelectedTask(taskName);
        setCurrentTask(taskName);
    };

    return (
        <View style={styles.taskbar}>
            {/* Chat Button */}
            <TouchableOpacity
                onPress={() => handleTaskPress('Chat')}
                style={[
                    styles.task,
                    selectedTask === 'Chat' && styles.selectedTask, // Apply highlight if selected
                ]}
            >
                <Ionicons name="chatbubbles-outline" size={24} color="#fff" />
                <Text style={styles.taskText}>Chat</Text>
            </TouchableOpacity>

            {/* Home Button with Logo */}
            <TouchableOpacity
                onPress={() => handleTaskPress('Home')}
                style={[
                    styles.homeButton,
                    selectedTask === 'Home' && styles.selectedHomeButton, // Apply highlight if selected
                ]}
            >
                <Image source={Logo} style={styles.logoIcon} />
            </TouchableOpacity>

            {/* Profile Button */}
            <TouchableOpacity
                onPress={() => handleTaskPress('Profile')}
                style={[
                    styles.task,
                    selectedTask === 'Profile' && styles.selectedTask, // Apply highlight if selected
                ]}
            >
                <Ionicons name="person-outline" size={24} color="#fff" />
                <Text style={styles.taskText}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    taskbar: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Spread items evenly across the taskbar
        alignItems: 'center', // Center items vertically
        paddingVertical: 10, // Adjust padding for taskbar height
        paddingHorizontal: 20, // Space on the sides of the taskbar
        backgroundColor: '#3498db',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
    },
    task: {
        width: 50,
        height: 50,
        borderRadius: 25, // Make the button circular
        backgroundColor: '#2980b9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedTask: {
        backgroundColor: '#5DADE2', // Brighter color for selected task
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    homeButton: {
        width: 60,
        height: 60,
        borderRadius: 30, // Circular shape for the Home button
        backgroundColor: '#2980b9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedHomeButton: {
        backgroundColor: '#5DADE2', // Brighter color for selected Home button
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    logoIcon: {
        width: '100%',
        height: '100%',
        borderRadius: 30, // Match the button's circular shape
        resizeMode: 'cover', // Ensure the logo fills the button completely
    },
    taskText: {
        marginTop: 3,
        fontSize: 10,
        color: '#fff',
        fontWeight: '600',
    },
});

export default Taskbar;
