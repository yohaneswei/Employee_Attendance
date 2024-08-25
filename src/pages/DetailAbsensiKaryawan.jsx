import React, { useState } from 'react';
import { Paper, Button, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import useFetch from '../hooks/useFetch';
import { fetchAbsensiKaryawan } from '../plugins/http';
import { authToken } from '../plugins/api';

import CustomDataGrid from '../components/customDataGrid';
import DialogLayout from '../components/DialogLayout';
import { formatDate } from '../plugins/data';

const TabelDetailAbsensi = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = authToken().isa ? useParams() : authToken()
  const { isFetching, fetchedData: absensiKaryawan } = useFetch(fetchAbsensiKaryawan, [], [id]);

  const handleOpen = (path) => {
    setSelectedImage(path);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };


  const columns = [
    {
      field: 'no',
      headerName: 'No',
      flex: 0.5,
      renderCell: (params, index) => (
        <div>{params.row.index + 1}</div>
      )
    },
    {
      field: 'tanggal_absen',
      headerName: 'Tanggal Absen',
      headerAlign: 'center',
      align: 'center',
      flex: 2,
      renderCell: (params) => {
        return formatDate(params.row.tanggal_absen);
      }
    },
    {
      field: 'path',
      headerName: 'Path',
      headerAlign: 'center',
      align: 'center',
      flex: 2
    },
    {
      field: 'aksi',
      headerName: 'Aksi',
      headerAlign: 'center',
      align: 'center',
      flex: 2,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen(params.row.path)}
        >
          View Image
        </Button>
      ),
    },
  ];

  const data = absensiKaryawan.map((item, index) => ({ ...item, index }));

  return (
    <Box sx={{ height: "100%" }}>
      <Paper elevation={6} sx={{ padding: 4 }}>
        <Typography variant='h4' gutterBottom sx={{ borderBottom: "2px solid black" }}>
          Detail Absensi Karyawan
        </Typography>

        {!isFetching && <CustomDataGrid data={data} columns={columns} />}

        {selectedImage && (
          <DialogLayout open={open} handleClose={handleClose} title={"View Gambar"} maxWidth="md" fullWidth>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={`http://localhost:8082/uploads/${selectedImage}`} alt="Absensi" style={{ maxWidth: '100%', height: 'auto' }} />
            </Box>
          </DialogLayout>
        )}
      </Paper>
    </Box>
  );
};

export default TabelDetailAbsensi;
