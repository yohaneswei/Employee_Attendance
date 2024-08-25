import CoPresentIcon from '@mui/icons-material/CoPresent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LockResetIcon from '@mui/icons-material/LockReset';

export const BEKaryawan = `http://localhost:8082`

export const sidebarDataKaryawan = [
    {
        title: "Absensi",
        icon: <CoPresentIcon />,
        link: "/absensi"
    },
    {
        title: "Detail Absensi",
        icon: <CalendarMonthIcon />,
        link: "/detail_absensi"
    },
    {
        title: "Ubah Password",
        icon: <LockResetIcon />,
        link: "/ubah_password"
    },
]

export const sidebarDataAdmin = [
    {
        title: "Dashboard Master",
        icon: <CoPresentIcon />,
        link: "/dashboard-master"
    },
]

export const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Format date
    const optionsDate = {
        weekday: 'long', // Nama hari
        year: 'numeric', // Tahun
        month: 'long', // Nama bulan
        day: 'numeric', // Tanggal
    };

    const formattedDate = date.toLocaleDateString('id-ID', optionsDate);

    // Format time
    const hours = date.getHours().toString().padStart(2, '0'); // Jam
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Menit
    const seconds = date.getSeconds().toString().padStart(2, '0'); // Detik

    const formattedTime = `${hours}:${minutes}:${seconds}`; // Format waktu dengan pemisah ':'

    return `${formattedDate} ${formattedTime}`;
};