// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// import Login from './components/Login'; // Sửa ở đây

// import{Route, Switch, BrowserRouter} from 'react-router-dom';
// import Room from './components/Room';

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Switch>
//         {/* <Route Component={Login} path="/login"/>
//         <Route Component={Room} path="/room"/> */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/room" element={<Room />} />
//       </Switch>
//     </BrowserRouter>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import Login from './components/Login';
import Room from './components/Room';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { NativeRouter, Route, Switch } from 'react-router-native';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import InviteMemberModal from './components/Modals/InviteModal';

export default function App() {
  return (
    <BrowserRouter>
    {/* // <NativeRouter> */}
    <AuthProvider>
      <AppProvider>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/room" element={<Room />} />
        {/* Redirect from "/" to "/login" or add a default component */}
        {/* <Route path="/" element={<Navigate to="/room" />} /> */}
      </Routes>
      <InviteMemberModal/>
      </AppProvider>
    </AuthProvider>
    {/* </NativeRouter> */}
    </BrowserRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
