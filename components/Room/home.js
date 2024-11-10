// home.js
import React, { useEffect } from 'react';

function Home() {
  useEffect(() => {
    // Thêm Google Maps script vào HTML
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCsObo5ScqTGIfsUZpm27GjZf4-qmAu19E&callback=initMap`;
    script.async = true;
    window.initMap = function () {
      new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 10.8231, lng: 106.6297 }, // Tọa độ cho Hồ Chí Minh
        zoom: 10,
      });
    };
    document.head.appendChild(script);

    return () => {
      // Xóa script khi component bị tháo gỡ
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Travel Together</h1>
      <div
        id="map"
        style={{
          position: 'relative',
          width: '100%',
          height: 'calc(88vh - 100px)', // Đảm bảo chiếm không gian chính xác
          maxHeight: '600px',             // Giới hạn chiều cao nếu cần
          border: '1px solid #ccc',
        }}
      ></div>
    </div>
  );
}

export default Home;
