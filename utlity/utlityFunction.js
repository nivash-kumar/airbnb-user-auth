function trimObjString(obj) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }

    // Create a new object to avoid mutating the original
    const trimmedObj = {};
    for (const key in obj) {
        // Check if the property belongs to the object itself (not inherited)
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            
            // Check if the value is a string and trim it
            if (typeof value === 'string') {
                trimmedObj[key] = value.trim();
            } else if (typeof value === 'object' && value !== null) {
                // Recursively handle nested objects
                trimmedObj[key] = trimObjString(value);
            } else {
                // Keep non-string values as they are
                trimmedObj[key] = value;
            }
        }
    }

    return trimmedObj;
}
function strTrim(value) {
    return typeof value === 'string' ? value.trim() : String(value || '').trim();
}

module.exports = {
    trimObjString,
    strTrim
};