const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyparser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const Fname = req.body.firstName;
    const Lname = req.body.lastName;
    const Email = req.body.email;

    const data = {
        members: [{
            email_address: Email,
            status: "subscribed",
            merge_fields: {
                FNAME: Fname,
                LNAME: Lname,
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/5d63e456ae";

    const options = {
        method: "POST",
        auth: "saurabh1:b825e6c9193fcd81669c7b9335c43e9a-us20"
    };

    const request = https.request(url, options, function (response) {

        if(response.statusCode === 200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else
        {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.get("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("server is started");
});

//b825e6c9193fcd81669c7b9335c43e9a-us20

//5d63e456ae