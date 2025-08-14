const { trimObjString, strTrim } = require('./utlityFunction');

// Test the utility functions
console.log('=== Testing Utility Functions ===\n');

// Test 1: Basic object with string values
const testObj1 = {
    name: '   Nivash Singh  ',
    email: '  Nivash@example.com  ',
    age: 25,
    city: '  Patna  ',
    isActive: true
};

console.log('Original object:', testObj1);
const trimmed1 = trimObjString(testObj1);
console.log('Trimmed object (new):', trimmed1);
console.log('Original unchanged:', testObj1);
console.log('---\n');

// Test 2: Nested object
const testObj2 = {
    user: {
        name: '   Amit singh       ',
        address: {
            street: '  123 Main St   ',
            city: '  Pune  '
        }
    },
    settings: {
        theme: '  dark  ',
        notifications: true
    }
};

console.log('Original nested object:', JSON.stringify(testObj2, null, 2));
const trimmed2 = trimObjString(testObj2);
console.log('Trimmed nested object:', JSON.stringify(trimmed2, null, 2));
console.log('---\n');


// Test 4: Safe trim function
console.log('Safe trim tests:');
console.log('strTrim("   hello   "):', strTrim('   hello   '));
console.log('strTrim(123):', strTrim(123));
console.log('strTrim(null):', strTrim(null));
console.log('strTrim(undefined):', strTrim(undefined));
console.log('---\n');

// Test 5: Edge cases
console.log('Edge cases:');
console.log('trimObjString(null):', trimObjString(null));
console.log('trimObjString(undefined):', trimObjString(undefined));
console.log('trimObjString("string"):', trimObjString("string"));
console.log('trimObjString(123):', trimObjString(123));
