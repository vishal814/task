interface Person {
  name: string;  
    age: number;
    gender:string;
    id?: number; // Optional property
}
const object: Person = {
  name: "John Doe",
  age: 30,
 gender:"male"
};

interface customer {
    name: string;
    age: number;
}
//partial,readonly,required
const customer1: Readonly<customer> = {
    name: "Jane Doe",
    age: 25
};
//readonly is immutable, you cannot change the properties of this object
//partial makes all properties optional
//required makes all properties required

function add(a: number, b: number): number {
    return a + b;
}
console.log(add(5, 10)); // Output: 15

