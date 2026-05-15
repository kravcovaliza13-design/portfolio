// ================================
// ЛАБОРАТОРНА РОБОТА 4 — JavaScript
// ================================


// ================================
// 1. Змінні та типи даних
// ================================

console.log("=== ЗАВДАННЯ 1 ===");

const str = "Hello";
const num = 42;
const bool = true;
const empty = null;
let undef;
const sym = Symbol("id");
const big = 123n;

console.log("str:", str, typeof str);
console.log("num:", num, typeof num);
console.log("bool:", bool, typeof bool);
console.log("null:", empty, typeof empty); // bug: object
console.log("undefined:", undef, typeof undef);
console.log("symbol:", sym, typeof sym);
console.log("bigint:", big, typeof big);

// Перетворення типів
console.log(String(123));
console.log(Number("123"));
console.log(Boolean(0), Boolean("hello"));

// template literal
const name = "Олена";
const age = 20;
const university = "КПІ";

console.log(`Студент: ${name}, вік: ${age}, університет: ${university}`);

// == vs ===
console.log(5 == "5");
console.log(5 === "5");
console.log(null == undefined);
console.log(null === undefined);


// ================================
// 2. Умови та логіка
// ================================

console.log("=== ЗАВДАННЯ 2 ===");

function getGrade(score) {
    if (typeof score !== "number" || score < 0 || score > 100) {
        return "невалідний бал";
    }

    if (score < 60) return "незадовільно";
    if (score < 75) return "задовільно";
    if (score < 90) return "добре";
    return "відмінно";
}

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
            return "невірний місяць";
    }
}

console.log(getGrade(95));
console.log(getGrade(40));
console.log(getSeasonUA(7));
console.log(getSeasonUA(13));

// ternary
const studentAge = 19;
const status = studentAge >= 18 ? "повнолітній" : "неповнолітній";
console.log(status);


// ================================
// 3. Масиви
// ================================

console.log("=== ЗАВДАННЯ 3 ===");

const students = [
    { name: "Олена", grade: 87, courses: ["JavaScript", "HTML"] },
    { name: "Іван", grade: 55, courses: ["CSS"] },
    { name: "Марія", grade: 92, courses: ["JavaScript", "CSS"] },
    { name: "Петро", grade: 70, courses: ["HTML"] },
    { name: "Анна", grade: 99, courses: ["JavaScript"] },
    { name: "Данило", grade: 60, courses: ["JS", "HTML"] }
];

students.push({ name: "Нова", grade: 80, courses: ["JS"] });

students.pop();

students.splice(2, 1);
students.splice(2, 0, { name: "Доданий", grade: 77, courses: ["JS"] });

console.log("All students:", students);

const topStudent = students.find(s => s.grade > 90);
console.log("Top student:", topStudent);

const jsStudents = students.filter(s =>
    s.courses.includes("JavaScript")
);

console.log("JS students:", jsStudents);

const avg =
    students.reduce((sum, s) => sum + s.grade, 0) /
    students.length;

console.log("Average grade:", avg);


// ================================
// 4. Функції
// ================================

console.log("=== ЗАВДАННЯ 4 ===");

// 3 способи функції
function area(a, b) {
    return a * b;
}

const areaExp = function (a, b) {
    return a * b;
};

const areaArrow = (a, b) => a * b;

console.log(area(2, 3), areaExp(2, 3), areaArrow(2, 3));

// closure counter
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

// rest params
const sum = (...numbers) => {
    return numbers.reduce((a, b) => a + b, 0);
};

console.log(sum(1, 2, 3));
console.log(sum(10, 20));

// destructuring
function printStudentInfo({ name, grade, courses }) {
    console.log(`${name} має оцінку ${grade}`);
    console.log(`Курси: ${courses.join(", ")}`);
}

printStudentInfo(students[0]);


// ================================
// 5. Об'єкти
// ================================

console.log("=== ЗАВДАННЯ 5 ===");

const studentProfile = {
    firstName: "Іра",
    lastName: "Коваль",
    age: 20,
    university: "КПІ",
    grades: {
        math: 85,
        physics: 92
    },
    isActive: true,

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    },

    getAverageGrade() {
        const vals = Object.values(this.grades);
        return vals.reduce((a, b) => a + b, 0) / vals.length;
    }
};

console.log(studentProfile.getFullName());
console.log(studentProfile.getAverageGrade());

console.log(studentProfile["university"]);

const copy = { ...studentProfile, age: 25 };
console.log(copy);
console.log(studentProfile);

const labScore = studentProfile.grades?.lab;
console.log(labScore ?? "Немає оцінки");


// ================================
// 6. Ланцюжки масивів
// ================================

console.log("=== ЗАВДАННЯ 6 ===");

const products = [
    { name: "Laptop", price: 25000, category: "electronics", inStock: true, quantity: 2 },
    { name: "Phone", price: 15000, category: "electronics", inStock: true, quantity: 3 },
    { name: "Book", price: 300, category: "books", inStock: false, quantity: 10 },
    { name: "Mouse", price: 500, category: "electronics", inStock: true, quantity: 5 },
    { name: "Keyboard", price: 1200, category: "electronics", inStock: true, quantity: 4 },
    { name: "Notebook", price: 200, category: "books", inStock: true, quantity: 20 },
    { name: "Monitor", price: 8000, category: "electronics", inStock: true, quantity: 1 },
    { name: "Pen", price: 50, category: "office", inStock: true, quantity: 100 }
];

const totalValue = products
    .filter(p => p.inStock)
    .map(p => p.price * p.quantity)
    .reduce((a, b) => a + b, 0);

console.log("Total value:", totalValue);

const electronics = products
    .filter(p => p.category === "electronics")
    .sort((a, b) => a.price - b.price)
    .map(p => p.name);

console.log("Electronics:", electronics);

const categoryCount = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
}, {});

console.log(categoryCount);

const sortedStudents = [...students].sort((a, b) => b.grade - a.grade);
console.log(sortedStudents);

const sortedByName = [...students].sort((a, b) =>
    a.name.localeCompare(b.name)
);

console.log(sortedByName);


// ================================
// 7. Рядки
// ================================

console.log("=== ЗАВДАННЯ 7 ===");

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function countWords(str) {
    return str.trim().split(/\s+/).length;
}

function truncate(str, len) {
    return str.length > len ? str.slice(0, len) + "..." : str;
}

function isValidEmail(email) {
    const atIndex = email.indexOf("@");
    const lastAt = email.lastIndexOf("@");

    if (atIndex <= 0 || atIndex !== lastAt) return false;

    const domain = email.split("@")[1];
    if (!domain || !domain.includes(".")) return false;

    const lastDot = domain.lastIndexOf(".");
    return domain.length - lastDot > 2;
}

console.log(capitalize("javaScript"));
console.log(countWords("JavaScript це круто"));
console.log(truncate("Це довгий текст для прикладу", 15));
console.log(isValidEmail("user@example.com"));
console.log(isValidEmail("invalid-email"));