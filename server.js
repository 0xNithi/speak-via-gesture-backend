const express = require("express");
const { spawn } = require("child_process");
const multer = require("multer");
const uuid = require("uuid").v4;
const port = 3000;

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        const filename = uuid() + "." + originalname.split(".")[1];
        cb(null, filename);
    },
});

const upload = multer({ storage });

app.use(express.static("public"));

app.post("/upload", upload.single("video"), (req, res) => {
    console.log(req.file);
    return res.json({ status: "OK" });
});

app.listen(port, () => console.log(`App is listening on port ${port}`));
