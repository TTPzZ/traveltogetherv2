// home.js
import React, { useEffect, useState, useContext } from 'react';
import { db } from '../../firebase/config';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import NameImage from '../../assets/Image/Name.png';

function Home() {
  const { selectedRoom } = useContext(AppContext);
  const {
    user: { displayName, photoURL, uid },
  } = useContext(AuthContext);

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (!selectedRoom?.id) {
      setMap(null);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCsObo5ScqTGIfsUZpm27GjZf4-qmAu19E&callback=initMap`;
    script.async = true;

    window.initMap = function () {
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 10.8231, lng: 106.6297 },
        zoom: 10,
      });
      setMap(mapInstance);
    };

    document.head.appendChild(script);

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
  }, [selectedRoom?.id]);

  useEffect(() => {
    if (userLocation && map && selectedRoom?.id) {
      db.collection('locations').doc(uid).set({
        uid,
        photoURL,
        roomId: selectedRoom.id,
        displayName,
        location: userLocation,
        timestamp: new Date(),
      });

      const userMarker = new window.google.maps.Marker({
        position: userLocation,
        map: map,
        title: "My Location",
        icon: {
          url: photoURL,
          scaledSize: new window.google.maps.Size(40, 40),
        },
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="text-align: center; font-weight: bold;">
                    ${displayName}
                  </div>`,
      });

      infoWindow.open(map, userMarker);

      setMarkers((prevMarkers) => [...prevMarkers, userMarker]);
      map.setCenter(userLocation);
    }
  }, [userLocation, map, selectedRoom?.id]);

  useEffect(() => {
    if (map && selectedRoom?.id) {
      const unsubscribe = db
        .collection('locations')
        .where('roomId', '==', selectedRoom.id)
        .onSnapshot((snapshot) => {
          markers.forEach((marker) => marker.setMap(null));
          setMarkers([]);

          const newMarkers = snapshot.docs.map((doc) => {
            const data = doc.data();
            if (data.location && doc.id !== uid) {
              const memberMarker = new window.google.maps.Marker({
                position: data.location,
                map: map,
                title: data.displayName || `Member ${doc.id}`,
                icon: {
                  url: data.photoURL || 'defaultIconURL',
                  scaledSize: new window.google.maps.Size(40, 40),
                },
              });

              const infoWindow = new window.google.maps.InfoWindow({
                content: `<div style="text-align: center; font-weight: bold;">
                            ${data.displayName || 'Unknown User'}
                          </div>`,
              });

              infoWindow.open(map, memberMarker);

              return memberMarker;
            }
            return null;
          }).filter(Boolean);

          setMarkers(newMarkers);
        });

      return () => unsubscribe();
    }
  }, [map, selectedRoom?.id]);

  return (
    <div style={styles.container}>
      <img style={styles.imgName} src="assets/Image/Name.png" alt="Travel Together" />

      {!selectedRoom?.id ? (
        <div style={styles.notificationContainer}>
          <p style={styles.notificationText}>Hãy chọn room trước</p>
        </div>
      ) : (
        <div id="map" style={styles.mapContainer}></div>
      )}
    </div>
  );
}

export default Home;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#E0F7FA',
  },
  imgName:{
    width: '80%',
    height: 'auto',
    marginLeft: 'auto',
    marginTop:'10px',
  },
  notificationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '100%',
    margin: '0 auto',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  notificationText: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  mapContainer: {
    position: 'relative',
    width: '100%',
    height: 'calc(100vh - 150px)',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
};
