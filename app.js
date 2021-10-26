const express = require("express");
const multer = require("multer");


var imgval;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public/img");
  },
  filename: (req, file, cb) => {
    const uni = Date.now() + "~" + Math.round(Math.random() * 1000);
    imgval = "TK" + "~" + uni + ".png";
    cb(null, imgval);
  },
  
}
);

const upload = multer({ storage: storage });
const app = express();
app.set('view engine','ejs');
app.use(express.static('./public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/view", upload.single("img"), (req, res, next) => {
    var data = {
        photo: imgval
    };
  res.render('next',{Data : data});
  console.log(data.photo);
});

app.listen(3000 || 5000);
