import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

import useFetch from '../hooks/useFetch';
import { fetchKaryawan, handleAddKaryawan, handleUpdateKaryawan } from '../plugins/http';
import Alert from '../components/Alert';
import CustomDataGrid from '../components/customDataGrid';
import DialogFormLayout from '../components/DialogLayout';

const KaryawanMasterView = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const { isFetching, fetchedData: employees, setFetchedData: setEmployees } = useFetch(fetchKaryawan, []);

    const [selectedEmployee, setSelectedEmployee] = useState()

    const navigate = useNavigate();

    const handleAddDialog = () => {
        setIsEdit(false);
        setSelectedEmployee({ id: null, nama: '', alamat: '', no_telp: '', isPresent: false, status: 1 });
        setOpenDialog(true);
    };

    const handleEditDialog = (employee) => {
        setIsEdit(true);
        setSelectedEmployee(employee);
        setOpenDialog(true);
    };

    const handleViewAbsence = (id) => {
        navigate(`/detail_absensi/${id}`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'nama', headerName: 'Nama', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'alamat', headerName: 'Alamat', headerAlign: 'center', align: 'center', flex: 2 },
        { field: 'no_telp', headerName: 'No Telp', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'absensi_harian', headerName: 'Absensi Harian', headerAlign: 'center', align: 'center', flex: 1.5, renderCell: (params) => params.value ? "Sudah" : "Belum" },
        { field: 'status', headerName: 'Status', headerAlign: 'center', align: 'center', flex: 1, renderCell: (params) => params.value ? "Aktif" : "Tidak Aktif" },
        {
            field: 'aksi',
            headerName: 'Aksi',
            headerAlign: 'center',
            align: 'center',
            flex: 2.5,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditDialog(params.row)}
                        sx={{ mr: 1 }}
                    >
                        Ubah
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleViewAbsence(params.row.id)}
                    >
                        Absensi
                    </Button>
                </>
            ),
        },
    ];

    return (
        <Box sx={{ height: '100%' }}>
            <Paper elevation={6} sx={{ padding: 4 }}>
                <Typography variant='h4' gutterBottom sx={{ textAlign: 'center', borderBottom: "1px solid black", mb: "50px" }}>
                    Management Karyawan
                </Typography>

                <Button
                    variant="contained"
                    color="success"
                    startIcon={<AddIcon />}
                    onClick={handleAddDialog}
                    sx={{ marginBottom: 2 }}
                >
                    Tambah Employee
                </Button>

                {!isFetching && <CustomDataGrid data={employees} columns={columns} />}

                <DialogFormKaryawan open={openDialog} handleClose={setOpenDialog} isEdit={isEdit} formData={selectedEmployee} updateData={setEmployees} nama={"Karyawan"} />
            </Paper>
        </Box>
    );
};

const DialogFormKaryawan = ({ open, handleClose, isEdit, formData, updateData, nama }) => {
    const [currentEmployee, setCurrentEmployee] = useState(formData);

    useEffect(() => {
        setCurrentEmployee(formData);
    }, [formData]);

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!isEdit) {
            const data = {
                nama: currentEmployee.nama,
                alamat: currentEmployee.alamat,
                no_telp: currentEmployee.no_telp,
                isPresent: 0,
                status: 1
            }

            handleAdd(data)
        } else {
            const data = {
                id: currentEmployee.id,
                nama: currentEmployee.nama,
                alamat: currentEmployee.alamat,
                no_telp: currentEmployee.no_telp,
                status: currentEmployee.status
            }

            handleUpdate(data)
        }
        handleClose(false);
    };

    const handleAdd = async (karyawan) => {
        const { nama, alamat, no_telp } = karyawan

        const { message, success, id } = await handleAddKaryawan({
            nama: nama,
            alamat: alamat,
            no_telp: no_telp
        });

        if (success) {
            Alert('success', message)
            updateData(prevEmployee => [...prevEmployee, { ...karyawan, id: id }]);
        } else {
            Alert('error', message)
        }
    }

    const handleUpdate = async (karyawan) => {
        const { nama, alamat, no_telp, status } = karyawan

        const { message, success } = await handleUpdateKaryawan({
            id: currentEmployee.id,
            nama: nama,
            alamat: alamat,
            no_telp: no_telp,
            status: status
        });

        if (success) {
            Alert('success', message)
            // updateData(employees.map(emp => emp.id === currentEmployee.id ? currentEmployee : emp));
        } else {
            Alert('error', message)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCurrentEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <DialogFormLayout
            open={open}
            handleClose={handleClose}
            actionComponent={
                <Button type='submit'>
                    {isEdit ? 'Simpan' : 'Tambah'}
                </Button>
            }
            title={isEdit ? `Edit ${nama}` : `Tambah ${nama}`}
            onSubmit={handleSubmit}
        >
            {currentEmployee &&
                <>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="nama"
                        label={`Nama ${nama}`}
                        type="text"
                        fullWidth
                        value={currentEmployee.nama}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="alamat"
                        label={`Alamat ${nama}`}
                        type="text"
                        fullWidth
                        value={currentEmployee.alamat}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="no_telp"
                        label={`Nomor Telepon ${nama}`}
                        type="number"
                        fullWidth
                        value={currentEmployee.no_telp}
                        onChange={handleChange}
                        required
                    />
                    {
                        isEdit &&
                        <FormControl component="fieldset" margin="dense">
                            <FormLabel component="legend">Status</FormLabel>
                            <RadioGroup
                                row
                                name="status"
                                value={currentEmployee.status.toString()} // Convert status to string for RadioGroup
                                onChange={handleChange}
                            >
                                <FormControlLabel
                                    value="1" // Use the same value type as currentEmployee.status
                                    control={<Radio />}
                                    label="Aktif"
                                />
                                <FormControlLabel
                                    value="0" // Use the same value type as currentEmployee.status
                                    control={<Radio />}
                                    label="Tidak Aktif"
                                />
                            </RadioGroup>
                        </FormControl>
                    }
                </>
            }
        </DialogFormLayout>
    );
};
export default KaryawanMasterView;
