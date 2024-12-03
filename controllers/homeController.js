const pool = require("../config/db");

// Controller untuk halaman Home
const getHomePage = async (req, res) => {
  const userId = req.user.userId; // ID user dari token JWT

  try {
    // Ambil data pengguna dari database
    const [rows] = await pool.execute("SELECT name FROM users WHERE id = ?", [
      userId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    // Contoh data tambahan untuk Home Page
    const homeData = {
      greeting: `Hi, ${user.name}`,
      surveyInfo: {
        date: new Date().toLocaleDateString("id-ID"),
        time: new Date().toLocaleTimeString("id-ID"),
        message: "Apakah kamu mengalami insomnia?",
      },
    };

    res.json({ homeData });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching home data", error: err.message });
  }
};

module.exports = { getHomePage };
