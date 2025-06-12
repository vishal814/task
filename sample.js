"use strict";
const object = {
    name: "John Doe",
    age: 30,
    gender: "male"
};
//partial,readonly,required
const customer1 = {
    name: "Jane Doe",
    age: 25
};
//readonly is immutable, you cannot change the properties of this object
//partial makes all properties optional
//required makes all properties required
function add(a, b) {
    return a + b;
}
console.log(add(5, 10)); // Output: 15
