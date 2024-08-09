require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5500;
const router = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

main().
then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
}
const corsOption = {
    credentials:true,
    origin:process.env.REACT_APP_API_URL,
};

// app.use(router);

app.use(cors(corsOption));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json({ limit: '8mb' }));
// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
