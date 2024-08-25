import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Upload from '../components/Upload';
import { fetchCekAbsensiHarianKaryawan } from '../plugins/http';
import useFetch from '../hooks/useFetch';

const KaryawanView = () => {
    const { isFetching, fetchedData: cekAbsensi } = useFetch(fetchCekAbsensiHarianKaryawan, []);

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <Box sx={{ height: '100%' }}>
            <Paper elevation={6} sx={{ padding: 4 }}>
                <Typography variant='h4' gutterBottom sx={{ textAlign: 'center', borderBottom: "1px solid black", mb: "50px" }}>
                    Absensi Karyawan
                </Typography>
                <Typography variant='h6' gutterBottom>
                    Tanggal: {formattedDate}
                </Typography>
                {
                    !isFetching && (
                        cekAbsensi.result ?
                            <Box sx={{ textAlign: 'center' }}>Anda sudah melakukan absensi hari ini</Box>
                            :
                            <Upload ButtonName="Absen" ButtonColor="primary" />
                    )
                }
            </Paper>
        </Box>
    )
};

export default KaryawanView;
