const pool = require("../config/db");

// Lihat profil pengguna
const getProfile = async (req, res) => {
  const userId = req.user.userId;

  try {
    const [rows] = await pool.execute(
      "SELECT id, name, email, age, gender FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching profile", error: err.message });
  }
};

// Perbarui profil pengguna
const updateProfile = async (req, res) => {
  const userId = req.user.userId;
  const { name, age, gender } = req.body;

  try {
    await pool.execute(
      "UPDATE users SET name = ?, age = ?, gender = ? WHERE id = ?",
      [name, age, gender, userId]
    );
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: err.message });
  }
};

module.exports = { getProfile, updateProfile };
