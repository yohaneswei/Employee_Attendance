module.exports = (con, express) => {
    const router = express.Router();
    const multer = require('multer');
    const path = require('path');
    const authenticateToken = require('../middlewares/authMiddleware');

    // Set up multer for file uploads
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, 'uploads')); // Path relatif dari 'upload.js'
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${Date.now()}${ext}`);
        }
    });

    const upload = multer({ storage: storage });

    router.post('/cek-absensi-harian/:id', authenticateToken, (req, res) => {
        con.query(
            'SELECT * FROM absensi WHERE id_karyawan = ? AND DATE(tanggal_absen) = CURDATE()',
            [
                req.params.id
            ],
            (err, results) => {
                if (err) {
                    console.error('Error checking file upload status:', err);
                    return res.status(500).json({ message: 'Error checking file upload status', success: false });
                }

                if (results.length > 0) {
                    return res.json({ result: true, file: results[0] });
                }

                res.json({ result: false });
            }
        );
    });

    router.post('/absensi-harian/:id', upload.single('image'), authenticateToken, (req, res) => {
        try {
            con.query(
                'INSERT INTO absensi (id_karyawan, tanggal_absen, path) VALUES (?, NOW(), ?)',
                [
                    req.params.id,
                    req.file.filename
                ],
                (err, results) => {
                    if (err) {
                        console.error('Error inserting data:', err);
                        return res.status(500).json({ message: 'Error inserting data', success: false });
                    }
                    res.json({ message: 'File berhasil diupload!', file: req.file, success: true });
                }
            );
        } catch (err) {
            console.error('Internal server error:', err);
            res.status(500).json({ message: 'Internal server error', success: false });
        }
    });

    router.post('/absensi-karyawan/:id', authenticateToken, (req, res) => {
        try {
            con.query(
                "SELECT id_absensi AS id, tanggal_absen, path FROM absensi WHERE id_karyawan=?",
                [
                    req.params.id
                ]
                , (err, results) => {
                    if (err) {
                        console.error('Error fetching data:', err);
                        return res.status(500).json({ error: 'Error fetching data' });
                    }
                    res.json({ results, success: true });
                });
        } catch (err) {
            console.error('Internal server error:', err);
            res.status(500).json({ message: 'Internal server error', success: false });
        }
    });

    return router;
};
