import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// engga dipake lagi
const CustomTable = ({ headersName, headersKey, datas, customRender = {}, renderActions, showNumber = true, showActions = true }) => {
    return (
        <TableContainer component={Paper} elevation={3}>
            <Table>
                <TableHead>
                    <TableRow>
                        {showNumber &&
                            <TableCell>No</TableCell>
                        }

                        {headersName.map((header) => (
                            <TableCell align="center" key={header}>{header}</TableCell>
                        ))}

                        {showActions &&
                            <TableCell align="center">Aksi</TableCell>
                        }
                    </TableRow>
                </TableHead>

                <TableBody>
                    {datas.map((data, index) => (
                        <TableRow key={data.id || index}>
                            {
                                showNumber &&
                                <TableCell>{index + 1}</TableCell>
                            }

                            {headersKey.map((headerKey) => (
                                <TableCell align="center" key={headerKey}>
                                    {customRender[headerKey]
                                        ? customRender[headerKey](data[headerKey])
                                        : data[headerKey]}
                                </TableCell>
                            ))
                            }

                            {
                                showActions &&
                                <TableCell align="center">
                                    {renderActions(data)}
                                </TableCell>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomTable;
