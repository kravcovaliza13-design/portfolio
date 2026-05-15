// =========================
// 1. Змінні та типи даних
// =========================

const str = "Hello";
const num = 42;
const bool = true;
const empty = null;
let undef;
const sym = Symbol("id");
const big = 123n;

console.log(typeof str);
console.log(typeof num);
console.log(typeof bool);
console.log(typeof empty);
console.log(typeof undef);
console.log(typeof sym);
console.log(typeof big);

// Перетворення типів
console.log(String(123));
console.log(Number("123"));
console.log(Boolean(0));

// template literals
const name = "Олена";
const age = 20;
const university = "КПІ";

console.log(`Студент: ${name}, вік: ${age}, університет: ${university}`);

// == vs ===
console.log(5 == "5");
console.log(5 === "5");
console.log(null == undefined);


// =========================
// 2. Умови
// =========================

function getGrade(score) {
    if (typeof score !== "number" || score < 0 || score > 100) {
        return "невалідний бал";
    }

    if (score <= 59) return "незадовільно";
    if (score <= 74) return "задовільно";
    if (score <= 89) return "добре";
    return "відмінно";
}

console.log(getGrade(85));

function getSeasonUA(month) {
    switch (month) {
        case 12:
        case 1:
        case 2:
            return "зима";
        case 3:
        case 4:
        case 5:
            return "весна";
        case 6:
        case 7:
        case 8:
            return "літо";
        case 9:
        case 10:
        case 11:
            return "осінь";
        default:
            return "невалідний місяць";
    }
}

console.log(getSeasonUA(5));

const age2 = 19;
const status = age2 >= 18 ? "повнолітній" : "неповнолітній";
console.log(status);


// =========================
// 3. Масиви
// =========================

const students = [
    { name: "Олена", grade: 87, courses: ["JS", "HTML"] },
    { name: "Іван", grade: 55, courses: ["HTML"] },
    { name: "Марія", grade: 95, courses: ["JS", "CSS"] },
    { name: "Петро", grade: 72, courses: ["CSS"] },
    { name: "Анна", grade: 60, courses: ["JS"] },
    { name: "Дмитро", grade: 40, courses: ["HTML"] }
];

students.push({ name: "Нова", grade: 100, courses: ["JS"] });

students.pop();

students.splice(2, 1);

students.splice(1, 0, { name: "Вставлений", grade: 77, courses: ["JS"] });

console.log(students.find(s => s.grade > 90));

console.log(students.filter(s => s.courses.includes("JS")));

console.log(
    students.reduce((acc, s) => acc + s.grade, 0) / students.length
);


// =========================
// 4. Функції
// =========================

// function declaration
function area(a, b) {
    return a * b;
}

// function expression
const area2 = function (a, b) {
    return a * b;
};

// arrow function
const area3 = (a, b) => a * b;

console.log(area3(5, 10));

// closure
function createCounter() {
    let count = 0;

    return {
        increment: () => ++count,
        decrement: () => --count,
        getValue: () => count
    };
}

const counter = createCounter();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.getValue());

// default params
function createUser(name, role = "student", isActive = true) {
    return { name, role, isActive };
}

console.log(createUser("Іра"));

// rest
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
console.log(sum(1, 2, 3));

// destructuring
function printStudentInfo({ name, grade, courses }) {
    console.log(`${name} має оцінку ${grade}`);
    console.log(courses.join(", "));
}

printStudentInfo(students[0]);


// =========================
// 5. Об'єкти
// =========================

const studentProfile = {
    firstName: "Олена",
    lastName: "Коваль",
    age: 20,
    university: "КПІ",
    grades: { math: 85, physics: 92 },
    isActive: true,

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    },

    getAverageGrade() {
        const values = Object.values(this.grades);
        return values.reduce((a, b) => a + b) / values.length;
    }
};

console.log(studentProfile.getFullName());
console.log(studentProfile.getAverageGrade());

const copy = { ...studentProfile };
copy.age = 30;

console.log(studentProfile.age, copy.age);

console.log(studentProfile.mentor?.name ?? "Не призначено");


// =========================
// 6. Ланцюжки
// =========================

const products = [
    { name: "Laptop", price: 25000, category: "electronics", inStock: true, quantity: 2 },
    { name: "Phone", price: 15000, category: "electronics", inStock: true, quantity: 3 },
    { name: "Book", price: 500, category: "books", inStock: true, quantity: 10 },
    { name: "Tablet", price: 12000, category: "electronics", inStock: false, quantity: 1 },
    { name: "Mouse", price: 800, category: "electronics", inStock: true, quantity: 5 },
    { name: "Pen", price: 20, category: "office", inStock: true, quantity: 50 },
    { name: "Chair", price: 3000, category: "office", inStock: true, quantity: 4 },
    { name: "Monitor", price: 7000, category: "electronics", inStock: true, quantity: 2 }
];

const total = products
    .filter(p => p.inStock)
    .map(p => p.price * p.quantity)
    .reduce((a, b) => a + b, 0);

console.log(total);

const electronics = products
    .filter(p => p.category === "electronics")
    .sort((a, b) => a.price - b.price)
    .map(p => p.name);

console.log(electronics);

const categoryCount = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
}, {});

console.log(categoryCount);


// students sort
const byGrade = [...students].sort((a, b) => b.grade - a.grade);
const byName = [...students].sort((a, b) => a.name.localeCompare(b.name));

console.log(byGrade);
console.log(byName);


// =========================
// 7. Рядки
// =========================

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function countWords(str) {
    return str.trim().split(/\s+/).length;
}

function truncate(str, max) {
    return str.length > max ? str.slice(0, max) + "..." : str;
}

function isValidEmail(email) {
    const at = email.indexOf("@");
    const lastDot = email.lastIndexOf(".");

    return (
        email.includes("@") &&
        email.split("@").length === 2 &&
        at > 0 &&
        lastDot > at + 1 &&
        lastDot < email.length - 2
    );
}

console.log(capitalize("javaScript"));
console.log(countWords("JavaScript це круто"));
console.log(truncate("Це довгий текст для прикладу", 15));
console.log(isValidEmail("user@example.com"));