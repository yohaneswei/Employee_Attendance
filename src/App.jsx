import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/LoginView';
import HomeLayout from './components/HomeLayout';
import KaryawanView from './pages/KaryawanView';
import KaryawanMasterView from './pages/KaryawanMasterView';

import { sidebarDataKaryawan, sidebarDataAdmin } from './plugins/data'
import DetailAbsensiKaryawan from './pages/DetailAbsensiKaryawan';
import { authToken } from './plugins/api';
import UbahPasswordView from './pages/UbahPasswordView';

function App() {
  const isLogin = sessionStorage.getItem('token');
  const isAdmin = authToken() && authToken().isa

  return (
    <>
      <Router>
        <Routes>
          {!isLogin ?
            <>
              {/* jika user masih belum memiliki token */}
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
            :
            isAdmin ?
              <>
                {/* jika user yang login adalah karyawan master */}
                <Route element={<HomeLayout sidebarData={sidebarDataAdmin} />}>
                  <Route path="/dashboard-master" element={<KaryawanMasterView />} />
                  <Route path="/detail_absensi/:id" element={<DetailAbsensiKaryawan />} />
                  <Route path="*" element={<Navigate to="/dashboard-master" replace />} />
                </Route>
              </>
              :
              <>
                {/* jika user yang login adalah karyawan */}
                <Route element={<HomeLayout sidebarData={sidebarDataKaryawan} />}>
                  <Route path="/absensi" element={<KaryawanView />} />
                  <Route path="/detail_absensi" element={<DetailAbsensiKaryawan />} />
                  <Route path="/ubah_password" element={<UbahPasswordView />} />
                  <Route path="*" element={<Navigate to="/absensi" replace />} />
                </Route>
              </>
          }
        </Routes>
      </Router>
    </>
  )
}

export default App
