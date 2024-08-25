module.exports = (con, express, authenticateToken) => {
    const router = express.Router();
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');

    //generate jwt
    function generateAccessToken(payload) {
        return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "3d" });
    }

    router.get('/', (req, res) => {
        res.json({ message: "tes" })
    })

    router.post('/login', (req, res) => {
        try {
            con.query(
                "SELECT * FROM karyawan WHERE username = ?",
                [
                    req.body.username
                ],
                async function (err, result) {
                    if (err) {
                        console.error('Error fetching data:', err);
                        return res.json({ message: 'Error fetching data', success: false });
                    }

                    if (!result[0]) {
                        return res.json({ message: 'Username atau Password salah', success: false });
                    }

                    const karyawan = result[0];

                    const isMatch = await bcrypt.compare(req.body.password, karyawan.password);

                    if (isMatch) {
                        const token = generateAccessToken({
                            id: karyawan.id_karyawan,
                            isa: karyawan.is_admin,
                            username: karyawan.username
                        })

                        res.json({ token, message: "Login Berhasil!", success: true });
                    } else {
                        return res.json({ message: 'Username atau Password salah', success: false });
                    }
                }
            )
        } catch (err) {
            console.error('Internal server error:', err);
            res.status(500).json({ message: 'Internal server error', success: false });
        }
    })

    router.post('/change-password/:id', authenticateToken, async (req, res) => {
        const { password, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.json({ message: 'Password Baru dan Konfirmasi Password tidak sama', success: false });
        }

        try {
            con.query(
                'SELECT password FROM karyawan WHERE id_karyawan = ?',
                [
                    req.params.id
                ],
                async (err, results) => {
                    if (err) {
                        console.error('Error fetching user:', err);
                        return res.status(500).json({ message: 'Error fetching user', success: false });
                    }

                    if (results.length === 0) {
                        return res.json({ message: 'User tidak ditemukan!', success: false });
                    }

                    const isMatch = await bcrypt.compare(password, results[0].password);
                    if (!isMatch) {
                        return res.json({ message: 'Password lama tidak cocok', success: false });
                    }

                    con.query(
                        'UPDATE karyawan SET password = ? WHERE id_karyawan = ?',
                        [
                            (bcrypt.hashSync(req.body.newPassword, 10)),
                            req.params.id
                        ],
                        function (err, results) {
                            if (err) {
                                console.error('Error updating password:', err);
                                return res.status(500).json({ message: 'Error updating password' });
                            }

                            res.json({ message: 'Password berhasil diubah', success: true });
                        });
                });
        } catch (err) {
            console.error('Internal server error:', err);
            res.status(500).json({ message: 'Internal server error', success: false });
        }
    });

    return router;
};