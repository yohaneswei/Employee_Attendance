import { apiKaryawan, authToken, getToken } from "./api";

// GET AS POST ALIAS FETCHING DATA
export async function fetchKaryawan() {
  const res = await apiKaryawan.post('/detail-karyawan', {
    token: getToken
  })

  return res.data.results;
}

export async function fetchAbsensiKaryawan(id) {
  const res = await apiKaryawan.post(`/absensi-karyawan/${id}`, {
    token: getToken
  })
  const resData = res.data;

  return resData.results;
}

export async function fetchCekAbsensiHarianKaryawan() {
  const res = await apiKaryawan.post(`/cek-absensi-harian/${authToken().id}`, {
    token: getToken
  })

  return res.data;
}

//POST
export async function handleLoginUser(username, password) {
  const res = await apiKaryawan.post('/login', {
    username: username,
    password: password
  })

  return res.data
}

export async function handleAddKaryawan(karyawan) {
  const { nama, alamat, no_telp } = karyawan

  const res = await apiKaryawan.post('/add-karyawan', {
    nama: nama,
    alamat: alamat,
    no_telp: no_telp,
    token: getToken
  })

  return res.data
}

export async function handleAbsensiHarian(file) {
  const formData = new FormData();

  formData.append('image', file);
  formData.append('token', getToken);

  const res = await apiKaryawan.post(`/absensi-harian/${authToken().id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
}

//PUT
export async function handleUpdateKaryawan(karyawan) {
  const { id, nama, alamat, no_telp, status } = karyawan

  const res = await apiKaryawan.put(`/update-karyawan/${id}`, {
    nama: nama,
    alamat: alamat,
    no_telp: no_telp,
    status: status,
    token: getToken
  })

  return res.data
}

export async function handleChangePassword({ password, newPassword, confirmPassword }) {
  const res = await apiKaryawan.put(`/change-password/${authToken().id}`, {
    password,
    newPassword,
    confirmPassword,
    token: getToken
  })

  return res.data;
}