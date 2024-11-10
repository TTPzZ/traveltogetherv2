// import React, { useState } from 'react';
// import { View } from 'react-native';
// import Taskbar from './taskbar'; // Giả sử bạn đã tạo file Taskbar.js
// import Home from './home';
// import Chat from './chat';
// import Profile from './profile';
// import HamburgerButton from './HamburgerButton';

// const Room = () => {
//     const [activeTask, setActiveTask] = useState('home');

//     const renderTask = () => {
//         switch (activeTask) {
//             case 'chat':
//                 return <Chat />;
//             case 'profile':
//                 return <Profile />;
//             case 'home':
//             default:
//                 return <Home />;
//         }
//     };

//     return (
//         <View style={{ flex: 1 }}>
//             {renderTask()}
//             <Taskbar setActiveTask={setActiveTask} />
//         </View>
//     );
// };

// export default Room;

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Taskbar from './taskbar'; // Giả sử bạn đã tạo file Taskbar.js
import Home from './home';
import Chat from './chat';
import Profile from './profile';
import HamburgerButton from './HamburgerButton';

const Room = () => {
    const [currentTask, setCurrentTask] = useState('Home'); // Trạng thái mặc định là Home

    const renderCurrentTask = () => {
        switch (currentTask) {
            case 'Chat':
                return <Chat />;
            case 'Profile':
                return <Profile />;
            default:
                return <Home />;
        }
    };

    return (
        <View style={styles.container}>
            <HamburgerButton />
            {renderCurrentTask()}
            <Taskbar setCurrentTask={setCurrentTask} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default Room;
