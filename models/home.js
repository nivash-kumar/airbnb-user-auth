//core modules
const fs = require('fs');
const path = require('path');
const rootDir = require("../utils/pathUtil");
const Favourite = require('./favourite');

// data path
const homeDataPath = path.join(rootDir, 'data', 'homes.json');

module.exports = class Home {
    constructor(houseName, ownerName, price, city, address, rating, photoUrl, contactNumber) {
        this.houseName = houseName;
        this.ownerName = ownerName;
        this.price = price;
        this.city = city;
        this.rating = rating;
        this.photoUrl = photoUrl;
        this.address = address;
        this.contactNumber = contactNumber;
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