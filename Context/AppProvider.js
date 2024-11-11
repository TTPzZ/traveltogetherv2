// import React ,{ useState }from 'react'
// import { useNavigate } from 'react-router-dom';
// import { auth } from '../firebase/config';
// import {Spin, Modal,Form} from 'antd'
// import { AuthContext } from './AuthProvider';
// import useFirestore from '../hooks/useFirestore';

// export const AppContext = React.createContext();

// export default function AppProvider({children}) {
//     const [inInviteMemberVisible,setinInviteMemberVisible]= useState(false);
//     const [selectedRoomId, setSelectedRoomId] = useState('');

//     const {user:{uid},
//     }=React.useContext(AuthContext);

//   const roomsCondition = React.useMemo(()=>{
//     return{
//       fieldName: 'members',
//       operator:'array-contains',
//       compareValue: uid
//     }
//   },[uid])

//   const rooms = useFirestore('rooms',roomsCondition);

//   const selectedRoom = React.useMemo( 
//     ()=> rooms.find((room)=> room.id === selectedRoomId)|| {},
//     [rooms, selectedRoomId]);
//     // console.log({rooms,selectedRoomId});

//   const usersCondition = React.useMemo(()=>{
//     return{
//       fieldName: 'uid',
//       operator:'in',
//       compareValue: selectedRoom.members,
//     }
//   },[selectedRoom.members,])

//   const members = useFirestore('users',usersCondition);
//   // console.log({members})

//   return (
//     <AppContext.Provider 
//         value={{
//             rooms,
//             members,
//             selectedRoom,
//             selectedRoomId,
//             setSelectedRoomId,
//             inInviteMemberVisible,
//             setinInviteMemberVisible
//             }}> 
//         {children}
//     </AppContext.Provider>
//   )
// }
 

import React, { useState, useMemo, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import useFirestore from '../hooks/useFirestore';

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [inInviteMemberVisible, setinInviteMemberVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const { user: { uid } } = useContext(AuthContext);

    // Chỉ định điều kiện cho `rooms`
    const roomsCondition = useMemo(() => {
        if (!uid) return null; // Kiểm tra uid trước khi truy vấn
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        };
    }, [uid]);

    const rooms = useFirestore('rooms', roomsCondition);

    // Lựa chọn room hiện tại
    const selectedRoom = useMemo(() => 
        rooms.find(room => room.id === selectedRoomId) || {}, 
        [rooms, selectedRoomId]
    );

    // Điều kiện `usersCondition` để lấy danh sách thành viên
    const usersCondition = useMemo(() => {
        if (!selectedRoom.members || selectedRoom.members.length === 0) return null; // Kiểm tra trước khi truy vấn
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members
        };
    }, [selectedRoom.members]);

    const members = useFirestore('users', usersCondition);

    return (
        <AppContext.Provider 
            value={{
                rooms,
                members,
                selectedRoom,
                selectedRoomId,
                setSelectedRoomId,
                inInviteMemberVisible,
                setinInviteMemberVisible
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
