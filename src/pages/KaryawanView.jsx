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

    const now = new Date();

    const getOpenHour = () => {
        const start = new Date();

        start.setHours(8, 0, 0);

        return start;
    }

    const getCloseHour = () => {
        const end = new Date();

        end.setHours(17, 0, 0);

        return end;
    }

    const handleTimeAbsent = () => {
        return now >= getOpenHour() && now <= getCloseHour();
    };

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
                    handleTimeAbsent() ?
                        !isFetching && (
                            cekAbsensi.result ?
                                <Box sx={{ textAlign: 'center' }}>Anda sudah melakukan absensi hari ini.</Box>
                                :
                                <Upload ButtonName="Absen" ButtonColor="primary" />
                        )
                        :
                        <Box sx={{ textAlign: 'center' }}>
                            Absensi Hari ini{" "}
                            {now < getOpenHour() ?
                                "belum dibuka."
                                :
                                now > getCloseHour() ?
                                    "sudah ditutup."
                                    :
                                    "belum tersedia."
                            }
                        </Box>
                }
            </Paper>{console.log(currentDate === now ? true : false)}
        </Box>
    )
};

export default KaryawanView;
