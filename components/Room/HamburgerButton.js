import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native';
import useFirestore from '../../hooks/useFirestore';
import { AuthContext } from '../../Context/AuthProvider';
import { AppContext } from '../../Context/AppProvider';
import { adddDocument } from '../../firebase/services';

export default function HamburgerButton() {
  const { rooms, setinInviteMemberVisible, selectedRoomId, setSelectedRoomId } = React.useContext(AppContext);
  const { user: { uid } } = React.useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGroupsListOpen, setIsGroupsListOpen] = useState(false);
  const [isAddGroupModalVisible, setIsAddGroupModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [email, setEmail] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);

  const pan = useRef({ x: 10, y: 10 }).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        pan.x += gestureState.dx;
        pan.y += gestureState.dy;
      },
      onPanResponderRelease: () => {
        pan.x = Math.max(0, pan.x);
        pan.y = Math.max(0, pan.y);
      },
    })
  ).current;

  const handleInvite = () => {
    console.log(`Invite sent to: ${email}`);
    setShowInviteModal(false);
  };

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setIsGroupsListOpen(false);
    }
  }

  function toggleGroupsList() {
    setIsGroupsListOpen(!isGroupsListOpen);
  }

  function openAddGroupModal() {
    setIsAddGroupModalVisible(true);
  }

  function closeModals() {
    setIsAddGroupModalVisible(false);
    setGroupName('');
  }

  function AddRoomsModals() {
    adddDocument('rooms', { name: [groupName], members: [uid] });
    closeModals();
  }

  return (
    <TouchableWithoutFeedback onPress={() => isMenuOpen && setIsMenuOpen(false)}>
      <View
        {...panResponder.panHandlers}
        style={[
          styles.container,
          { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
        ]}
      >
        <TouchableOpacity style={styles.hamburgerButton} onPress={toggleGroupsList}>
          <Text style={styles.buttonText}>☰</Text>
        </TouchableOpacity>

        {isGroupsListOpen && (
          <View style={styles.subMenu}>
            <Text style={styles.subMenuTitle}>Danh sách nhóm</Text>
            {rooms.map(room => (
              <TouchableOpacity
                key={room.id}
                onPress={() => setSelectedRoomId(room.id)}
                style={[
                  styles.roomItem,
                  selectedRoomId === room.id && styles.selectedRoom,
                ]}
              >
                <Text style={styles.roomText}>{room.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={openAddGroupModal}>
              <Text style={styles.addButtonText}>Thêm nhóm</Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal
          transparent={true}
          animationType="slide"
          visible={isAddGroupModalVisible}
          onRequestClose={closeModals}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Thêm nhóm</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập tên nhóm"
                value={groupName}
                onChangeText={setGroupName}
              />
              <TouchableOpacity style={styles.submitButton} onPress={AddRoomsModals}>
                <Text style={styles.submitButtonText}>Xác nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={closeModals}>
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          visible={showInviteModal}
          onRequestClose={() => setShowInviteModal(false)}
        >
          <View style={styles.inviteModal}>
            <Text>Nhập email người bạn muốn mời:</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              style={styles.input}
            />
            <Button title="Gửi lời mời" onPress={handleInvite} />
            <Button title="Hủy" onPress={() => setShowInviteModal(false)} />
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
    padding: 10,
  },
  hamburgerButton: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    backgroundColor: '#3498db',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  subMenu: {
    marginTop: 10,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  subMenuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2980b9',
    marginBottom: 10,
  },
  roomItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f5',
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
  },
  selectedRoom: {
    backgroundColor: '#3498db',
  },
  roomText: {
    fontSize: 16,
    color: '#34495e',
  },
  addButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#2ecc71',
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3498db',
  },
  input: {
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ecf0f1',
  },
  submitButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inviteModal: {
    padding: 20,
  },
});
