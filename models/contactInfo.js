//Core Path
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const { trimObjString } = require("../utlity/utlityFunction");

//Data Path
const ContactInfoDataPath = path.join(rootDir, "data","contactInfo.json");

module.exports = class ContactInfo {
    constructor(name, phone, message, email){
        const info = {name, phone, message, email };
        const trimmedInfo = trimObjString(info);

        this.name = trimmedInfo.name;
        this.phone = trimmedInfo.phone;
        this.message = trimmedInfo.message;
        this.email = trimmedInfo.email;
    }
    save(){
        ContactInfo.fetchAll(contacters =>{
            contacters.push(this);
            fs.writeFile(ContactInfoDataPath, JSON.stringify(contacters), error =>{
                if(error) {
                    console.log("Contact Data not saved!", error);
                } else {
                    console.log("Contact Data saved successfully!");
                }
            });
        });
    }
    
    static fetchAll(callback) {
        fs.readFile(ContactInfoDataPath, (err, data) => {
            callback(!err ? JSON.parse(data) : []);
        });
    }
}