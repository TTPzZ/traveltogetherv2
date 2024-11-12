// // home.js
// import React, { useEffect } from 'react';

// function Home() {
//   useEffect(() => {
//     // Thêm Google Maps script vào HTML
//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCsObo5ScqTGIfsUZpm27GjZf4-qmAu19E&callback=initMap`;
//     script.async = true;
//     window.initMap = function () {
//       new window.google.maps.Map(document.getElementById('map'), {
//         center: { lat: 10.8231, lng: 106.6297 }, // Tọa độ cho Hồ Chí Minh
//         zoom: 10,
//       });
//     };
//     document.head.appendChild(script);

//     return () => {
//       // Xóa script khi component bị tháo gỡ
//       document.head.removeChild(script);
//     };
//   }, []);

//   return (
//     <div style={{ textAlign: 'center', marginTop: '20px' }}>
//       <h1>Travel Together</h1>
//       <div
//         id="map"
//         style={{
//           position: 'relative',
//           width: '100%',
//           height: 'calc(88vh - 100px)', // Đảm bảo chiếm không gian chính xác
//           maxHeight: '600px',             // Giới hạn chiều cao nếu cần
//           border: '1px solid #ccc',
//         }}
//       ></div>
//     </div>
//   );
// }

// export default Home;
// Khối lệnh import

// Import các thư viện và module cần thiết để sử dụng trong component Home.
import React, { useEffect, useState, useContext } from 'react';
import { db } from '../../firebase/config'; // Kết nối tới cấu hình Firebase Firestore
import { AppContext } from '../../Context/AppProvider'; // Truy cập các giá trị từ AppContext
import { AuthContext } from '../../Context/AuthProvider';

// Định nghĩa component Home
function Home() {
  const { selectedRoom } = useContext(AppContext); // Lấy thông tin room đã chọn từ context

  const {
    user: { displayName, photoURL, uid },
  } = useContext(AuthContext); // Lấy thông tin user hiện tại từ context

  const [map, setMap] = useState(null); // Trạng thái lưu trữ instance bản đồ
  const [markers, setMarkers] = useState([]); // Trạng thái lưu trữ các marker trên bản đồ
  const [userLocation, setUserLocation] = useState(null); // Trạng thái lưu vị trí hiện tại của người dùng

  // useEffect để tải Google Maps API và thiết lập bản đồ
  useEffect(() => {
    // Nếu chưa chọn room thì không tải bản đồ
    if (!selectedRoom?.id) {
      setMap(null); // Xóa instance của bản đồ khi chưa có room được chọn
      return; // Thoát khỏi useEffect nếu chưa chọn room
    }

    // Tạo một script để tải Google Maps API và thiết lập callback initMap
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCsObo5ScqTGIfsUZpm27GjZf4-qmAu19E&callback=initMap`; // Đảm bảo có key hợp lệ
    script.async = true;

    // Hàm khởi tạo bản đồ và thiết lập center ban đầu
    window.initMap = function () {
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 10.8231, lng: 106.6297 }, // Tọa độ mặc định tại Hồ Chí Minh
        zoom: 10, // Thiết lập mức độ thu phóng
      });
      setMap(mapInstance); // Lưu instance của bản đồ vào state
    };

    document.head.appendChild(script); // Thêm script vào document để tải API

    // Lấy vị trí hiện tại của người dùng
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude }); // Cập nhật state vị trí của người dùng
      },
      (error) => console.error("Error fetching user location:", error),
      { enableHighAccuracy: true } // Cài đặt độ chính xác cao cho việc định vị
    );

    // Xóa script khỏi document khi component unmount
    return () => {
      document.head.removeChild(script);
    };
  }, [selectedRoom?.id]); // useEffect sẽ chạy lại khi selectedRoom?.id thay đổi

  // // useEffect để cập nhật vị trí người dùng lên Firestore và hiển thị marker
  // useEffect(() => {
  //   if (userLocation && map && selectedRoom?.id) {
  //     // Cập nhật vị trí của người dùng lên Firestore
  //     db.collection('locations').doc(uid).set({
  //       uid,
  //       photoURL,
  //       roomId: selectedRoom.id,
  //       displayName,
  //       location: userLocation,
  //       timestamp: new Date(),
  //     });

  //     // Tạo một marker cho vị trí của người dùng và thêm vào bản đồ
  //     const userMarker = new window.google.maps.Marker({
  //       position: userLocation,
  //       map: map,
  //       title: "My Location",
  //       icon: {
  //         url: photoURL, // URL ảnh đại diện
  //         scaledSize: new window.google.maps.Size(40, 40), // Kích thước ảnh
  //         origin: new window.google.maps.Point(0, 0), // Điểm gốc của ảnh
  //         anchor: new window.google.maps.Point(20, 20), // Vị trí neo của ảnh trên bản đồ
  //       },
  //     });
  //     setMarkers((prevMarkers) => [...prevMarkers, userMarker]); // Lưu trữ marker vào state
  //     map.setCenter(userLocation); // Đặt center bản đồ về vị trí người dùng
  //   }
  // }, [userLocation, map, selectedRoom?.id]); // useEffect sẽ chạy lại khi userLocation, map hoặc selectedRoom?.id thay đổi



  useEffect(() => {
    if (userLocation && map && selectedRoom?.id) {
      // Cập nhật vị trí của người dùng lên Firestore
      db.collection('locations').doc(uid).set({
        uid,
        photoURL,
        roomId: selectedRoom.id,
        displayName,
        location: userLocation,
        timestamp: new Date(),
      });
  
      // Tạo một marker cho vị trí của người dùng và thêm vào bản đồ
      const userMarker = new window.google.maps.Marker({
        position: userLocation,
        map: map,
        title: "My Location",
        icon: {
          url: photoURL, // Sử dụng trực tiếp URL ảnh mà không cần qua canvas
          scaledSize: new window.google.maps.Size(40, 40), // Đảm bảo kích thước ảnh vừa phải
        },
      });
  
      // Tạo một InfoWindow để hiển thị tên người dùng
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="text-align: center; font-weight: bold;">
                    ${displayName}
                  </div>`, // Nội dung chứa tên người dùng
      });
  
      // Mở InfoWindow ngay lập tức bên dưới marker
      infoWindow.open(map, userMarker);
  
      setMarkers((prevMarkers) => [...prevMarkers, userMarker]); // Lưu trữ marker vào state
      map.setCenter(userLocation); // Đặt center bản đồ về vị trí người dùng
    }
  }, [userLocation, map, selectedRoom?.id]);
  
  useEffect(() => {
    if (map && selectedRoom?.id) {
      // Lắng nghe các thay đổi của vị trí trong room
      const unsubscribe = db
        .collection('locations')
        .where('roomId', '==', selectedRoom.id) // Lọc các tài liệu có roomId trùng với room được chọn
        .onSnapshot((snapshot) => {
          // Xóa tất cả các marker cũ khi có thay đổi
          markers.forEach((marker) => marker.setMap(null));
          setMarkers([]); // Đặt lại state markers thành mảng rỗng
  
          // Tạo các marker mới cho mỗi tài liệu trong snapshot
          const newMarkers = snapshot.docs.map((doc) => {
            const data = doc.data();
            if (data.location && doc.id !== uid) { // Chỉ hiển thị các thành viên khác
              const memberMarker = new window.google.maps.Marker({
                position: data.location,
                map: map,
                title: data.displayName || `Member ${doc.id}`,
                icon: {
                  url: data.photoURL || 'defaultIconURL', // Sử dụng ảnh đại diện nếu có, hoặc biểu tượng mặc định
                  scaledSize: new window.google.maps.Size(40, 40),
                },
              });
  
              // Tạo một InfoWindow cho mỗi marker của thành viên
              const infoWindow = new window.google.maps.InfoWindow({
                content: `<div style="text-align: center; font-weight: bold;">
                            ${data.displayName || 'Unknown User'}
                          </div>`, // Nội dung chứa tên của thành viên
              });
  
              // Liên kết InfoWindow với marker và hiển thị ngay lập tức
              infoWindow.open(map, memberMarker);
  
              return memberMarker;
            }
            return null;
          }).filter(Boolean); // Loại bỏ các marker null
  
          // Cập nhật lại state với các markers mới
          setMarkers(newMarkers);
        });
  
      // Hủy lắng nghe khi component unmount hoặc khi selectedRoom?.id thay đổi
      return () => unsubscribe();
    }
  }, [map, selectedRoom?.id]);
  
  // Trả về giao diện của component
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Travel Together</h1>
      {!selectedRoom?.id ? (
        <p>Hãy chọn room trước</p> // Thông báo hiển thị khi chưa có room được chọn
      ) : (
        <div
          id="map"
          style={{
            position: 'relative',
            width: '100%',
            height: 'calc(88vh - 100px)',
            maxHeight: '600px',
            border: '1px solid #ccc',
          }}
        ></div>
      )}
    </div>
  );
}

export default Home;
