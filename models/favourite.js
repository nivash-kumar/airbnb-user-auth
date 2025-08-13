//core modules
const fs = require('fs');
const path = require('path');
const rootDir = require("../utils/pathUtil");
// const { registerHomes } = require('module');

// data path
const favouriteDataPath = path.join(rootDir, 'data', 'favourite.json');

module.exports = class Favourite {
    
    static addToFavourite(homeId, callback) {
        Favourite.getFavourites(favourites => {
            // Check if already exists
            if (!(favourites.includes(homeId))) {
                favourites.push(homeId);
                fs.writeFile(favouriteDataPath, JSON.stringify(favourites), (error) => {
                    callback(error, false);
                });
            } else {
                console.log("Home is already marked to favourite");
                callback(null, true); // Call callback with alreadyExists = true
            }
        });
    }

    static getFavourites(callback) {
        fs.readFile(favouriteDataPath, (err, data) => {
            console.log("Favourites file read: ", err);
            if (err) {
                callback([]);
            } else {
                try {
                    const favourites =JSON.parse(data);
                    callback(Array.isArray(favourites) ? favourites : []);
                } catch (parseError) {
                    console.log("Error parsing favourites file:", parseError);
                    callback([]);
                }
            }
        });
    }
    static deleteById(delHomeId, callback){
        Favourite.getFavourites(homesIds =>{
            homesIds = homesIds.filter(homeId =>delHomeId !== homeId );
            fs.writeFile(favouriteDataPath, JSON.stringify(homesIds),callback);
        });
    }
}