//101283741
//Assignment-1

const express = require('express')
const app = express()
const router = express.Router();
const fs = require('fs');

//reading JSON file, converting to string and storing into a variable
var user = [];
fs.readFile("./users.json", (err, jsonString) => {
    try{
        user = JSON.parse(jsonString);
    }catch(err) {
        throw err;
    }
})

//Gets endpoint /user?uid=? and sends json response of the given ID if found or error message if not found.
app.get('/user', (req,res) => {
    let userId = req.query.uid;
    try{
        var flag = false;
        for(var i = 0; i < user.length; i++){
            if(userId == user[i]['id']){
                flag = true;
                response = {
                    id: user[i]['id'],
                    name: user[i]['name'],
                    email: user[i]['email'],
                    address: user[i]['address']['street'] + ", " + user[i]['address']['city'] + ", "+ user[i]['address']['zipcode'],
                    phone: user[i]['phone']
                }
                break;
            }
        }
        
        if(flag == false){            
            response = {
                message: "No user found"
            }
        }
        res.send(JSON.stringify(response));
    }catch (err){
        throw err;
    }
})

//function to compare elements of array
function compareArray(a,b) {
    return ((a.username == b.username) ? 0 : ((a.username > b.username) ? 1 : -1 ));
}

//Gets the endpoint /users/all and sends all the data from users.json but sorted ascendingly by username
app.get('/users/all', (req,res) => {
    try{
        response = user.sort(compareArray);//to sort the array

    }catch(err){
        throw err;
    }
    res.send(JSON.stringify(response));
})

app.use('/', router);

app.listen(process.env.port || 8082);

console.log('Web Server is listening at port '+ (process.env.port || 8082));
