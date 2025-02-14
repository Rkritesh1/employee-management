const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const employeeRoutes = require("./routes/employeeRoutes"); // ✅ Correct Import
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

app.use(cors());
app.use(bodyParser.json());

// ✅ Use employee routes correctly
app.use("/api", employeeRoutes); // ✅ Ensure this is a router, not an object

// ✅ Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
