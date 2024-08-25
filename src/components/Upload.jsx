import { Box, Button, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ClearIcon from '@mui/icons-material/Clear';
import { handleAbsensiHarian } from '../plugins/http';
import Alert from './Alert';

const Upload = ({ ButtonName, ButtonColor }) => {
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState('Tidak ada file yang dipilih');
    const fileInputRef = useRef(null);

    const handleFileUpload = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
            setFileName(files[0].name);
            setImage(URL.createObjectURL(files[0]));
        }
    };

    const clearImage = () => {
        setImage(null);
        setFileName('Tidak ada file yang dipilih');
        fileInputRef.current.reset;
    };

    const handleSubmit = async () => {
        const { message, success } = await handleAbsensiHarian(file)

        if (success) {
            Alert('success', message)
            window.location.reload()
            clearImage()
        } else {
            Alert('error', message)
        }
    }

    return (
        <>
            <center>
                <div style={{ marginTop: "20px", marginBottom: "20px" }} onClick={() => fileInputRef.current.click()}>
                    <input type="file" accept="image/*" hidden onChange={handleFileUpload} ref={fileInputRef} />
                    {image ? (
                        <img src={image} alt={fileName} style={{ maxWidth: '60%', height: 'auto', border: "1px solid black" }} />
                    ) : (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '2px dashed #1475cf',
                            padding: '20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            height: '200px'
                        }}>
                            <CloudUploadIcon sx={{ fontSize: 80, color: '#1475cf' }} />
                            <Typography variant='body1' color='#1475cf'>Pilih File untuk Diunggah</Typography>
                        </Box>
                    )}
                </div>
            </center>

            <Box className='uploaded-row' sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#e9f0ff', padding: '10px', borderRadius: '5px', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <InsertDriveFileIcon sx={{ marginRight: '10px' }} />
                    <Typography variant='body2'>{fileName}</Typography>
                </Box>
                <ClearIcon
                    sx={{
                        cursor: image ? 'pointer' : 'not-allowed',
                        color: image ? '#E53935' : '#B0BEC5'
                    }}
                    onClick={image ? clearImage : undefined}
                />
            </Box>

            <Button type="submit" variant="contained" color={ButtonColor} sx={{ mt: 2 }} disabled={!image} onClick={handleSubmit}>
                {ButtonName}
            </Button>
        </>
    )
}

export default Upload;
