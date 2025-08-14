//core modules
const fs = require('fs');
const path = require('path');
const rootDir = require("../utils/pathUtil");
const Favourite = require('./favourite');

//local functions
const { trimObjString } = require("../utlity/utlityFunction");

// data path
const homeDataPath = path.join(rootDir, 'data', 'homes.json');

module.exports = class Home {
    constructor(houseName, ownerName, price, city, address, rating, photoUrl, contactNumber) {
        // Create an object with all the input values
        const homeData = {
            houseName,
            ownerName,
            price,
            city,
            address,
            rating,
            photoUrl,
            contactNumber
        };

        // Use utility function to trim all string values
        const trimmedData = trimObjString(homeData);

        // Assign trimmed values to instance properties
        this.houseName = trimmedData.houseName;
        this.ownerName = trimmedData.ownerName;
        this.price = trimmedData.price;
        this.city = trimmedData.city;
        this.rating = trimmedData.rating;
        this.photoUrl = trimmedData.photoUrl;
        this.address = trimmedData.address;
        this.contactNumber = trimmedData.contactNumber;
    }
    
    save() {
        Home.fetchAll(registeredHomes =>{
            if(this.id){//this for editing homes
                registeredHomes = registeredHomes.map(home =>{
                    if(home.id === this.id){
                        return this;
                    }
                    return home;
                });
            }else{//else
                this.id = Math.random().toString();
                registeredHomes.push(this);
            }
            fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), error => {
                console.log("File writing Consoledated", error);
            });
        });

    }

    static fetchAll(callback) {
        // const homeDataPath = path.join(rootDir, "data", 'homes.json');
        fs.readFile(homeDataPath, (err, data) => {
            // console.log("File read: ", err);
            callback(!err ? JSON.parse(data) : []);
        });
    };
    static findById(homeId, callback){
        this.fetchAll(homes =>{
            const homeFound = homes.find(home => home.id === homeId);
            callback(homeFound);
        })
    }
    static deleteById(homeId, callback){
        this.fetchAll(homes =>{
            homes = homes.filter(home =>home.id !== homeId);
            fs.writeFile(homeDataPath, JSON.stringify(homes), error =>{
                Favourite.deleteById(homeId, callback);
            });
        });
    }
}