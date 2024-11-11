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


// home.js
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config'; // Import Firestore configuration

function Home() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Thêm Google Maps script vào HTML
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCsObo5ScqTGIfsUZpm27GjZf4-qmAu19E&callback=initMap`;
    script.async = true;
    window.initMap = function () {
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 10.8231, lng: 106.6297 }, // Tọa độ mặc định Hồ Chí Minh
        zoom: 10,
      });
      setMap(mapInstance);
    };
    document.head.appendChild(script);

    // Lấy vị trí hiện tại của người dùng
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => console.error("Error fetching user location:", error),
      { enableHighAccuracy: true }
    );

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (userLocation && map) {
      // Cập nhật vị trí của người dùng lên Firestore
      db.collection('locations').doc('yourUserId').set({
        location: userLocation,
        timestamp: new Date(),
      });

      // Hiển thị marker của người dùng trên bản đồ
      const userMarker = new window.google.maps.Marker({
        position: userLocation,
        map: map,
        title: "My Location",
      });
      setMarkers((prevMarkers) => [...prevMarkers, userMarker]);
      map.setCenter(userLocation);
    }
  }, [userLocation, map]);

  // Theo dõi và cập nhật vị trí của các thành viên khác trong nhóm
  useEffect(() => {
    const unsubscribe = db.collection('locations').onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data.location && doc.id !== 'yourUserId') {
          const memberMarker = new window.google.maps.Marker({
            position: data.location,
            map: map,
            title: `Member ${doc.id}`,
          });
          setMarkers((prevMarkers) => [...prevMarkers, memberMarker]);
        }
      });
    });

    return () => unsubscribe();
  }, [map]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Travel Together</h1>
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
    </div>
  );
}

export default Home;
