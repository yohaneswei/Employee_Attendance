module.exports = (con, express, authenticateToken) => {
    const router = express.Router();
    const bcrypt = require('bcrypt');

    router.post('/detail-karyawan', authenticateToken, (req, res) => {
        try {
            con.query(`
                SELECT
                    k.id_karyawan AS id,
                    k.nama,
                    k.alamat,
                    k.no_telp,
                    CASE
                        WHEN 
                            a.id_karyawan IS NOT NULL 
                        THEN 
                            true
                        ELSE
                            false
                        END 
                    AS  absensi_harian,
                    k.status
                FROM
                    karyawan k
                LEFT JOIN
                    absensi a
                ON
                    k.id_karyawan = a.id_karyawan
                AND 
                    DATE(a.tanggal_absen) = CURDATE()
                WHERE 
                    k.is_admin = 0
                ORDER BY 
                    k.id_karyawan`
                , (err, results) => {
                    if (err) {
                        console.error('Error fetching data:', err);
                        return res.json({ error: 'Error fetching data' });
                    }
                    res.json({ results, success: true });
                });
        } catch (err) {
            console.error('Internal server error:', err);
            res.status(500).json({ message: 'Internal server error', success: false });
        }
    });

    router.post('/add-karyawan', authenticateToken, async (req, res) => {
        try {
            con.query(
                "SELECT * FROM karyawan WHERE username = ?",
                [
                    req.body.nama
                ],
                function (err, result) {
                    if (err) {
                        console.error('Error fetching data:', err);
                        return res.json({ message: 'Error fetching data', success: false });
                    }

                    if (result[0]) {
                        return res.json({ message: 'Username tidak boleh sama!', success: false });
                    }

                    try {
                        con.query(
                            'INSERT INTO karyawan (username, password, nama, alamat, no_telp) VALUES (?, ?, ?, ?, ?)',
                            [
                                req.body.nama,
                                (bcrypt.hashSync(req.body.nama, 10)),
                                req.body.nama,
                                req.body.alamat,
                                req.body.no_telp
                            ],
                            (err, results) => {
                                if (err) {
                                    console.error('Error inserting data:', err);
                                    return res.json({ message: 'Error inserting data', success: false });
                                }
                                res.json({ message: 'Karyawan berhasil ditambahkan!', success: true });
                            }
                        );
                    } catch (err) {
                        console.error('Error hashing password:', err);
                        res.json({ message: 'Internal server error', success: false });

                    }
                }
            )
        } catch (err) {
            console.error('Internal server error:', err);
            res.status(500).json({ message: 'Internal server error', success: false });
        }
    });

    router.put('/update-karyawan/:id', authenticateToken, (req, res) => {
        try {
            con.query(
                "SELECT * FROM karyawan WHERE id_karyawan = ?",
                [
                    req.params.id
                ],
                function (err, result) {
                    if (err) {
                        console.error('Error fetching data:', err);
                        return res.json({ message: 'Error fetching data', success: false });
                    }

                    if (!result[0]) {
                        return res.json({ message: 'Karyawan tidak ditemukan', success: false });
                    }

                    // Update the karyawan data except username and password
                    con.query(
                        'UPDATE karyawan SET nama = ?, alamat = ?, no_telp = ?, status = ? WHERE id_karyawan = ?',
                        [
                            req.body.nama,
                            req.body.alamat,
                            req.body.no_telp,
                            req.body.status,
                            req.params.id
                        ],
                        function (err, results) {
                            if (err) {
                                console.error('Error updating data:', err);
                                return res.json({ message: 'Error updating data', success: false });
                            }

                            res.json({ message: 'Karyawan berhasil diupdate', success: true });
                        }
                    );
                }
            );
        } catch (err) {
            console.error('Internal server error:', err);
            res.status(500).json({ message: 'Internal server error', success: false });
        }
    });


    return router;
};