//#region đây là code cũ vãi cả chưởng
// // import React, { useContext, useState } from 'react';
// // import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
// // import { Form, Select, Spin, Avatar } from 'antd';
// // import { AppContext } from '../../Context/AppProvider';
// // import { debounce } from 'lodash';
// // import { db } from '../../firebase/config';

// // function DebounceSelect({
// //   fetchOptions,
// //   debounceTimeout = 300,
 
// //   ...props
// // }) {
// //   // Search: abcddassdfasdf

// //   const [fetching, setFetching] = useState(false);
// //   const [options, setOptions] = useState([]);

// //   const debounceFetcher = React.useMemo(() => {
// //     const loadOptions = (value) => {
// //       setOptions([]);
// //       setFetching(true);

// //       fetchOptions(value).then((newOptions) => {
// //         setOptions(newOptions);
// //         setFetching(false);
// //       });
// //     };

// //     return debounce(loadOptions, debounceTimeout);
// //   }, [debounceTimeout, fetchOptions]);

// //   // React.useEffect(() => {
// //   //   return () => {
// //   //     // clear when unmount
// //   //     setOptions([]);
// //   //   };
// //   // }, []);

// //   return (  
// //     <Select
// //       labelInValue
// //       filterOption={false}
// //       onSearch={debounceFetcher}
// //       notFoundContent={fetching ? <Spin size='small' /> : null}
// //       {...props}
// //     >
// //       {options.map(opt => (
// //         <Select.Option key={opt.value} value={opt.value}  >
// //           <Avatar size='small' src={opt.photoURL}>
// //             {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
// //           </Avatar>
// //           {` ${opt.label}`}
// //         </Select.Option>
// //       ))}
// //     </Select>
// //   );
// // }

// // async function fetchUserList(search, curMembers) {
// //   return db
// //     .collection('users')
// //     .where('keywords', 'array-contains', search?.toLowerCase())
// //     .orderBy('displayName')
// //     .limit(20)
// //     .get()
// //    .then((snapshot) => {
// //       return snapshot.docs
// //         .map((doc) => ({
// //           label: doc.data().displayName,
// //           value: doc.data().uid,
// //           photoURL: doc.data().photoURL,
// //         }))
// //         .filter((opt) => !curMembers.includes(opt.value));
// //     });
// // }

// // export default function InviteMemberModal() {
// //   const {
// //     inInviteMemberVisible,
// //     setinInviteMemberVisible,
// //     selectedRoomId,
// //     selectedRoom,
// //   } = useContext(AppContext);
// //   const [value, setValue] = useState([]);
// //   const [form] = Form.useForm();

// //   const [searchText, setSearchText] = useState('');

// //   const handleOk = () => {
// //     // reset form value
// //     form.resetFields();
// //     setValue([]);

// //     // update members in current room
// //     const roomRef = db.collection('rooms').doc(selectedRoomId);

// //     roomRef.update({
// //       members: [...selectedRoom.members, ...value.map((val) => val.value)],
// //     });

// //     setIsInviteMemberVisible(false);
// //   };

// //   const handleCancel = () => {
// //     // reset form value
// //     form.resetFields();
// //     setValue([]);

// //     setIsInviteMemberVisible(false);
// //   };

// //   return (
// //     <Modal
// //         visible={inInviteMemberVisible}
// //         animationType="slide"
// //         transparent={true}
// //         onRequestClose={() => setinInviteMemberVisible(false)}
// //     >
// //         <View style={styles.modalContainer}>
// //             <View style={styles.modalContent}>
// //                 <Text style={styles.modalTitle}>Thêm thành viên</Text>

// //                 {/* Ô tìm kiếm */}
// //                 <TextInput
// //                     style={styles.searchInput}
// //                     placeholder="Tìm kiếm thành viên..."
// //                     value={searchText}
// //                     onChangeText={setSearchText}
// //                 />

// //                 {/* Các nút "Thêm" và "Thoát" */}
// //                 <View style={styles.buttonContainer}>
// //                     <TouchableOpacity
// //                         style={[styles.modalButton, styles.addButton]}
// //                         onPress={() => {
// //                             // Thực hiện hành động thêm thành viên
// //                             console.log("Thêm thành viên:", searchText);
// //                             setSearchText(''); // Xóa text sau khi thêm
// //                             setinInviteMemberVisible(false); // Đóng modal
// //                         }}
// //                     >
// //                         <Text style={styles.buttonText}>Thêm</Text>
// //                     </TouchableOpacity>
// //                     <TouchableOpacity
// //                         style={[styles.modalButton, styles.cancelButton]}
// //                         onPress={() => {
// //                             setSearchText(''); // Xóa text khi thoát
// //                             setinInviteMemberVisible(false); // Đóng modal
// //                         }}
// //                     >
// //                         <Text style={styles.buttonText}>Thoát</Text>
// //                     </TouchableOpacity>
// //                 </View>
// //             </View>
// //         </View>

// //         <Form form={form} layout='vertical'>
// //                         <DebounceSelect
// //                           mode="multiple"
// //                           label="Tên thành viên"
// //                           value={value}
// //                           placeholder="Nhập tên thành viên"
// //                           fetchOptions={fetchUserList}
// //                           onChange={newValue=> setValue(newValue)}
// //                           style={{width:'100%'}}
// //                         />
// //         </Form>
// //     </Modal>
// // );
// // }

// // const styles = StyleSheet.create({
// // modalContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
// // },
// // modalContent: {
// //     width: '80%',
// //     padding: 20,
// //     backgroundColor: '#FFF',
// //     borderRadius: 10,
// //     alignItems: 'center',
// // },
// // modalTitle: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginBottom: 15,
// // },
// // searchInput: {
// //     width: '100%',
// //     padding: 10,
// //     borderColor: '#DDD',
// //     borderWidth: 1,
// //     borderRadius: 5,
// //     marginBottom: 20,
// // },
// // buttonContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     width: '100%',
// // },
// // modalButton: {
// //     flex: 1,
// //     paddingVertical: 10,
// //     marginHorizontal: 5,
// //     borderRadius: 5,
// //     alignItems: 'center',
// // },
// // addButton: {
// //     backgroundColor: '#4CAF50',
// // },
// // cancelButton: {
// //     backgroundColor: '#FF5252',
// // },
// // buttonText: {
// //     color: '#FFF',
// //     fontWeight: 'bold',
// // },
// // });

// import React, { useContext, useState } from 'react';
// import { View, Text, TextInput, Button , StyleSheet, TouchableOpacity } from 'react-native';
// import { Form, Select,Modal, Spin, Avatar } from 'antd';
// import { AppContext } from '../../Context/AppProvider';
// import { debounce } from 'lodash';
// import { db } from '../../firebase/config';

// function DebounceSelect({
//   fetchOptions,
//   debounceTimeout = 300,
//   ...props
// }) {
//   // Search: abcddassdfasdf

//   const [fetching, setFetching] = useState(false);
//   const [options, setOptions] = useState([]);

//   const debounceFetcher = React.useMemo(() => {
//     const loadOptions = (value) => {
//       setOptions([]);
//       setFetching(true);

//       fetchOptions(value, props.curMembers).then(newOptions => {
//         setOptions(newOptions);
//         setFetching(false);
//       });
//     };

//     return debounce(loadOptions, debounceTimeout);
//   }, [debounceTimeout, fetchOptions]);

//   // React.useEffect(() => {
//   //   return () => {
//   //     // clear when unmount
//   //     setOptions([]);
//   //   };
//   // }, []);

//   return (  
//     <Select
//       labelInValue
//       filterOption={false}
//       onSearch={debounceFetcher}
//       notFoundContent={fetching ? <Spin size='small' /> : null}
//       {...props}
//     >
//       {
//         options.map(opt=>(
//           <Select.Option key={opt.value} value={opt.value} title={opt.label}>
//             <Avatar size='small' src={opt.photoURL}>
//               {opt.photoURL ? '' :opt.label?.charAt(0)?.toUpperCase()}
//             </Avatar>
//             {`${opt.label}`}
//           </Select.Option>
//         ))
//       }
//     </Select>
//   );
// }

// async function fetchUserList(search, curMembers) {
//   return db
//     .collection('users')
//     .where('keywords', 'array-contains', search)
//     .orderBy('displayName')
//     .limit(20)
//     .get()
//    .then(snapshot => {
//       return snapshot.docs.map(doc => ({ 
//          label: doc.data().displayName,
//           value: doc.data().uid,
//           photoURL: doc.data().photoURL
//         }))
//         .filter((opt) => !curMembers.includes(opt.value));
//     });
// }

// export default function InviteMemberModal() {
//   const {
//     inInviteMemberVisible,
//     setinInviteMemberVisible,
//     selectedRoomId,
//     selectedRoom,
//   } = useContext(AppContext);
//   const [value, setValue] = useState([]);
//   const [form] = Form.useForm();

//   // const [searchText, setSearchText] = useState('');

//   const handleOk = () => {
//     // reset form value
//     form.resetFields();
//     // setValue([]);

//     // // update members in current room
//     const roomRef = db.collection('rooms').doc(selectedRoomId);

//     roomRef.update({
//       members: [...selectedRoom.members, ...value.map((val) => val.value)],
//     });

//     setinInviteMemberVisible(false);
//   };

//   const handleCancel = () => {
//     // reset form value
//     form.resetFields();
//     // setValue([]);

//     setinInviteMemberVisible(false);
//   };
// console.log({value});
//   return (
//     <div>
//       <Modal
//         visible={inInviteMemberVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setinInviteMemberVisible(false)}
//         onOk={handleOk}
//         onCancel={handleCancel}
//     >
//       //#region chỗ này là view nhưng mà để sau hãng dùng
//         {/* <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//                 <Text style={styles.modalTitle}>Thêm thành viên</Text>

                
//                 <TextInput
//                     style={styles.searchInput}
//                     placeholder="Tìm kiếm thành viên..."
//                     value={searchText}
//                     onChangeText={setSearchText}
//                 />


//                 <View style={styles.buttonContainer}>
//                     <TouchableOpacity
//                         style={[styles.modalButton, styles.addButton]}
//                         onPress={() => {
//                             // Thực hiện hành động thêm thành viên
//                             console.log("Thêm thành viên:", searchText);
//                             setSearchText(''); // Xóa text sau khi thêm
//                             setinInviteMemberVisible(false); // Đóng modal
//                         }}
//                     >
//                         <Text style={styles.buttonText}>Thêm</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={[styles.modalButton, styles.cancelButton]}
//                         onPress={() => {
//                             setSearchText(''); // Xóa text khi thoát
//                             setinInviteMemberVisible(false); // Đóng modal
//                         }}
//                     >
//                         <Text style={styles.buttonText}>Thoát</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View> */}
// //#endregion
//         <Form form={form} layout='vertical'>
//           <DebounceSelect
//               mode="multiple"
//               label="Tên thành viên"            
//               value={value}            
//               placeholder="Nhập tên thành viên"           
//               fetchOptions={fetchUserList}            
//               onChange={newValue=> setValue(newValue)}
//              style={{width:'100%'}} 
//              curMembers={selectedRoom.members}            
//             />                                      
//         </Form>
//     </Modal>
//     </div>
    
// );
// }

// // const styles = StyleSheet.create({
// // modalContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
// // },
// // modalContent: {
// //     width: '80%',
// //     padding: 20,
// //     backgroundColor: '#FFF',
// //     borderRadius: 10,
// //     alignItems: 'center',
// // },
// // modalTitle: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginBottom: 15,
// // },
// // searchInput: {
// //     width: '100%',
// //     padding: 10,
// //     borderColor: '#DDD',
// //     borderWidth: 1,
// //     borderRadius: 5,
// //     marginBottom: 20,
// // },
// // buttonContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     width: '100%',
// // },
// // modalButton: {
// //     flex: 1,
// //     paddingVertical: 10,
// //     marginHorizontal: 5,
// //     borderRadius: 5,
// //     alignItems: 'center',
// // },
// // addButton: {
// //     backgroundColor: '#4CAF50',
// // },
// // cancelButton: {
// //     backgroundColor: '#FF5252',
// // },
// // buttonText: {
// //     color: '#FFF',
// //     fontWeight: 'bold',
// // },
// // });



// // import React, { useContext, useState } from 'react';
// // import { View, Text, TextInput, Button , StyleSheet, TouchableOpacity } from 'react-native';
// // import { Form, Select,Modal, Spin, Avatar } from 'antd';
// // import { AppContext } from '../../Context/AppProvider';
// // import { debounce } from 'lodash';
// // import { db } from '../../firebase/config';

// // function DebounceSelect({
// //   fetchOptions,
// //   debounceTimeout = 300,
// //   ...props
// // }) {


// //   const [fetching, setFetching] = useState(false);
// //   const [options, setOptions] = useState([]);

// //   const debounceFetcher = React.useMemo(() => {
// //     const loadOptions = (value) => {
// //       setOptions([]);
// //       setFetching(true);

// //       fetchOptions(value).then(newOptions => {
// //         setOptions(newOptions);
// //         setFetching(false);
// //       });
// //     };

// //     return debounce(loadOptions, debounceTimeout);
// //   }, [debounceTimeout, fetchOptions]);

// //   return (  
// //     <Select
// //       labelInValue
// //       filterOption={false}
// //       onSearch={debounceFetcher}
// //       notFoundContent={fetching ? <Spin size='small' /> : null}
// //       {...props}
// //     >
// //       {
// //         options.map(opt=>(
// //           <Select.Option key={opt.value} value={opt.value} title={opt.label}>
// //             <Avatar size='small' src={opt.photoURL}>
// //               {opt.photoURL ? '' :opt.label?.charAt(0)?.toUpperCase()}
// //             </Avatar>
// //             {`${opt.label}`}
// //           </Select.Option>
// //         ))
// //       }
// //     </Select>
// //   );
// // }

// // async function fetchUserList(search) {
// //   return db
// //     .collection('users')
// //     .where('keywords', 'array-contains', search)
// //     .orderBy('displayName')
// //     .limit(20)
// //     .get()
// //    .then(snapshot => {
// //       return snapshot.docs.map(doc => ({ 
// //          label: doc.data().displayName,
// //           value: doc.data().uid,
// //           photoURL: doc.data().photoURL
// //         }))
// //     });
// // }

// // export default function InviteMemberModal() {
// //   const {
// //     inInviteMemberVisible,
// //     setinInviteMemberVisible,
// //     selectedRoomId,
// //     selectedRoom,
// //   } = useContext(AppContext);
// //   const [value, setValue] = useState([]);
// //   const [form] = Form.useForm();


// //   const handleOk = () => {

// //     setinInviteMemberVisible(false);
// //   };

// //   const handleCancel = () => {

// //     setinInviteMemberVisible(false);
// //   };
// // console.log({value});
// //   return (
// //     <div>
// //       <Modal
// //         visible={inInviteMemberVisible}
// //         animationType="slide"
// //         transparent={true}
// //         onRequestClose={() => setinInviteMemberVisible(false)}
// //         onOk={handleOk}
// //         onCancel={handleCancel}
// //     >

// //         <Form form={form} layout='vertical'>
// //           <DebounceSelect
// //               mode="multiple"
// //               label="Tên thành viên"            
// //               value={value}            
// //               placeholder="Nhập tên thành viên"           
// //               fetchOptions={fetchUserList}            
// //               onChange={newValue=> setValue(newValue)}
// //              style={{width:'100%'}}             
// //             />                                      
// //         </Form>
// //     </Modal>
// //     </div>
    
// // );
// // }
//#endregion
//#region khúc này là gần xong rồi sửa lại giao diện

// import React, { useContext, useState, useEffect, useCallback } from 'react';
// import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
// import { AppContext } from '../../Context/AppProvider';
// import { db } from '../../firebase/config';

// // Debounce function to control input frequency
// const debounce = (func, delay) => {
//     let timeout;
//     return (...args) => {
//         if (timeout) clearTimeout(timeout);
//         timeout = setTimeout(() => func(...args), delay);
//     };
// };

// // Fetching user list based on search input
// // Lấy danh sách người dùng từ Firestore và loại bỏ các thành viên hiện tại
// async function fetchUserList(search, curMembers = []) {
//   try {
//       const snapshot = await db
//           .collection('users')
//           .where('keywords', 'array-contains', search.toLowerCase())
//           .orderBy('displayName')
//           .limit(20)
//           .get();

//       // Lọc người dùng dựa trên curMembers
//       return snapshot.docs
//           .map(doc => ({
//               label: doc.data().displayName,
//               value: doc.data().uid,
//               photoURL: doc.data().photoURL,
//           }))
//           .filter(opt => !curMembers.includes(opt.value)); // Chỉ lấy người dùng chưa có trong curMembers
//   } catch (error) {
//       console.error("Lỗi khi lấy danh sách người dùng:", error);
//       return [];
//   }
// }


// // Invite Member Modal component
// export default function InviteMemberModal() {
//     const { inInviteMemberVisible, setinInviteMemberVisible, selectedRoomId, selectedRoom } = useContext(AppContext);
//     const [searchText, setSearchText] = useState('');
//     const [members, setMembers] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

//     // Debounced function to search users
//     const handleSearch = useCallback(
//         debounce(async (text) => {
//             setIsLoading(true);
//             const users = await fetchUserList(text, selectedRoom.members);
//             setMembers(users);
//             setIsLoading(false);
//         }, 300),
//         []
//     );

//     useEffect(() => {
//         if (searchText) {
//             handleSearch(searchText);
//         } else {
//             setMembers([]);
//         }
//     }, [searchText]);

//     // Handle adding selected member to the room
//     const handleAddMember = async (member) => {
//         try {
//             const roomRef = db.collection('rooms').doc(selectedRoomId);
//             await roomRef.update({
//                 members: [...selectedRoom.members, member.value],
//             });
//             setinInviteMemberVisible(false);
//         } catch (error) {
//             console.error("Error adding member:", error);
//         }
//     };

//     return (
//         <Modal
//             visible={inInviteMemberVisible}
//             animationType="slide"
//             transparent={true}
//             onRequestClose={() => setinInviteMemberVisible(false)}
//         >
//             <View style={styles.modalContainer}>
//                 <View style={styles.modalContent}>
//                     <Text style={styles.modalTitle}>Thêm thành viên</Text>

//                     {/* Search Input */}
//                     <TextInput
//                         style={styles.searchInput}
//                         placeholder="Tìm kiếm thành viên..."
//                         value={searchText}
//                         onChangeText={setSearchText}
//                     />

//                     {/* Loading Indicator */}
//                     {isLoading && <Text style={styles.loadingText}>Đang tìm kiếm...</Text>}

//                     {/* Members List */}
//                     <FlatList
//                         data={members}
//                         keyExtractor={(item) => item.value}
//                         renderItem={({ item }) => (
//                             <TouchableOpacity style={styles.memberItem} onPress={() => handleAddMember(item)}>
//                                 <Image
//                                     source={{ uri: item.photoURL || defaultAvatar }}
//                                     style={styles.avatar}
//                                 />
//                                 <Text style={styles.memberName}>{item.label}</Text>
//                             </TouchableOpacity>
//                         )}
//                     />

//                     {/* Buttons */}
//                     <View style={styles.buttonContainer}>
//                         <TouchableOpacity
//                             style={[styles.modalButton, styles.cancelButton]}
//                             onPress={() => setinInviteMemberVisible(false)}
//                         >
//                             <Text style={styles.buttonText}>Thoát</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         </Modal>
//     );
// }

// // Default avatar in case the user does not have one
// const defaultAvatar = 'https://via.placeholder.com/40/CCCCCC/FFFFFF?text=U';

// const styles = StyleSheet.create({
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalContent: {
//         width: '80%',
//         padding: 20,
//         backgroundColor: '#FFF',
//         borderRadius: 10,
//         alignItems: 'center',
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 15,
//     },
//     searchInput: {
//         width: '100%',
//         padding: 10,
//         borderColor: '#DDD',
//         borderWidth: 1,
//         borderRadius: 5,
//         marginBottom: 20,
//     },
//     loadingText: {
//         fontSize: 16,
//         color: '#666',
//         marginBottom: 10,
//     },
//     memberItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#DDD',
//     },
//     avatar: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         marginRight: 10,
//     },
//     memberName: {
//         fontSize: 16,
//         color: '#333',
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '100%',
//         marginTop: 10,
//     },
//     modalButton: {
//         flex: 1,
//         paddingVertical: 10,
//         marginHorizontal: 5,
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     cancelButton: {
//         backgroundColor: '#FF5252',
//     },
//     buttonText: {
//         color: '#FFF',
//         fontWeight: 'bold',
//     },
// });

//#endregion

import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { AppContext } from '../../Context/AppProvider';
import { db } from '../../firebase/config';

// Debounce function to control input frequency
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

// Fetching user list based on search input and removing already added members
async function fetchUserList(search, curMembers = []) {
  try {
      const snapshot = await db
          .collection('users')
          .where('keywords', 'array-contains', search.toLowerCase()) // Chuyển từ khóa thành chữ thường
          .orderBy('displayName')
          .limit(20)
          .get();

      return snapshot.docs
          .map((doc) => ({
              label: doc.data().displayName,
              value: doc.data().uid,
              photoURL: doc.data().photoURL,
          }))
          .filter(opt => !curMembers.includes(opt.value)); // Lọc thành viên đã thêm
  } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
      return [];
  }
}



// Invite Member Modal component
export default function InviteMemberModal() {
    const { inInviteMemberVisible, setinInviteMemberVisible, selectedRoomId, selectedRoom } = useContext(AppContext);
    const [searchText, setSearchText] = useState('');
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Debounced function to search users
    const handleSearch = useCallback(
        debounce(async (text) => {
            setIsLoading(true);
            const users = await fetchUserList(text, selectedRoom.members);
            setMembers(users);
            setIsLoading(false);
        }, 300),
        [selectedRoom.members]
    );

    useEffect(() => {
        if (searchText) {
            handleSearch(searchText);
        } else {
            setMembers([]);
        }
    }, [searchText]);

    // Handle adding selected member to the room
    const handleAddMember = async (member) => {
        try {
            const roomRef = db.collection('rooms').doc(selectedRoomId);
            await roomRef.update({
                members: [...selectedRoom.members, member.value],
            });
            setinInviteMemberVisible(false);
            setSearchText(''); // Reset search text
        } catch (error) {
            console.error("Error adding member:", error);
        }
    };

    return (
        <Modal
            visible={inInviteMemberVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setinInviteMemberVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Thêm thành viên</Text>

                    {/* Search Input */}
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm kiếm thành viên..."
                        value={searchText}
                        onChangeText={setSearchText}
                    />

                    {/* Loading Indicator */}
                    {isLoading && <Text style={styles.loadingText}>Đang tìm kiếm...</Text>}

                    {/* Members List */}
                    <FlatList
                        data={members}
                        keyExtractor={(item) => item.value}
                        renderItem={({ item }) => (
                            <View style={styles.memberItem}>
                                <Image
                                    source={{ uri: item.photoURL || defaultAvatar }}
                                    style={styles.avatar}
                                />
                                <Text style={styles.memberName}>{item.label}</Text>
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={() => handleAddMember(item)}
                                >
                                    <Text style={styles.addButtonText}>Thêm</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />

                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.cancelButton]}
                            onPress={() => setinInviteMemberVisible(false)}
                        >
                            <Text style={styles.buttonText}>Thoát</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

// Default avatar in case the user does not have one
const defaultAvatar = 'https://via.placeholder.com/40/CCCCCC/FFFFFF?text=U';

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    searchInput: {
        width: '100%',
        padding: 10,
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    memberItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    memberName: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#FF5252',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});
