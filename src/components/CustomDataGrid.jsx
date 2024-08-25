import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

const CustomDataGrid = ({ data, columns }, ...props) => {
    return (
        <Box sx={{ width: '100%', overflow: "auto" }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                sx={{
                    '& .MuiDataGrid-cell:focus': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-columnHeader:focus': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-columnHeader:has([data-field="actions"]) .MuiDataGrid-columnHeaderTitle': {
                        display: 'none', // Hides the column menu for actions column
                    },
                }}
                pageSizeOptions={[5]}
                disableColumnResize
                disableRowSelectionOnClick
                disableSelectionOnClick
                autoHeight
                {...props}
            />
        </Box>
    )
}

export default CustomDataGrid
