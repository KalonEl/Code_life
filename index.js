var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require ("mongoose")

const app = express()
app.use(bodyParser.json())

app.use (bodyParser.urlencoded({
    extended: true
}))


mongoose.connect("mongodb+srv://emmanuel_oboni:Zen12cous@cluster0.dspge.mongodb.net/mydb",{ useNewUrlParser: true}, {useUnifiedTopology: true});


var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database") );
db.once('open', ()=> console.log("Connected to Database"))

app.post("/", (req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;

const data = {
    name: String,
    email: String,
    message: String
}

db.collection('data').insertOne(data, (err, collection)=>{
    if (err){
        throw err;
    }
    console.log("Record Inserted Successfully")
});
return res.redirect("sent_successfully.html");

})

app.get("/", function(req, res){
    res.sendFile(__dirname +"/index.html")
})

app.post("/", function(req, res){
    let newData  = new data  ({
name: req.body.name,
email: req.body.email,
message: req.body.message
    });
    newData.save();
})

app.listen(3000, function() {
    console.log("Server is running on port " + 3000);
});
