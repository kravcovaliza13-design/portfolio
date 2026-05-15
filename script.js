// ================================
// ЛАБОРАТОРНА РОБОТА 4 - JAVASCRIPT
// ================================

console.log("=== ЛР4 START ===");

// ================================
// 1. ЗМІННІ ТА ТИПИ ДАНИХ
// ================================

const str = "Hello";
const num = 42;
const bool = true;
const nul = null;
let und;

const sym = Symbol("id");
const big = 123n;

console.log("string:", str, typeof str);
console.log("number:", num, typeof num);
console.log("boolean:", bool, typeof bool);
console.log("null:", nul, typeof nul);
console.log("undefined:", und, typeof und);
console.log("symbol:", sym, typeof sym);
console.log("bigint:", big, typeof big);

// Перетворення типів
console.log(String(123));
console.log(Number("123"));
console.log(Number(""));
console.log(Number(true));
console.log(Boolean(0), Boolean(""), Boolean("hello"));

// template literals
const name = "Олена";
const age = 20;
const university = "КПІ";

console.log(`Студент: ${name}, вік: ${age}, університет: ${university}`);

// == vs ===
console.log("5 == '5':", 5 == "5");
console.log("5 === '5':", 5 === "5");
console.log("0 == false:", 0 == false);

// ================================
// 2. УМОВИ ТА ЛОГІКА
// ================================

function getGrade(score) {
    if (typeof score !== "number" || score < 0 || score > 100) {
        return "невалідний бал";
    }

    if (score <= 59) return "незадовільно";
    if (score <= 74) return "задовільно";
    if (score <= 89) return "добре";
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

const ageUser = 19;
const status = ageUser >= 18 ? "повнолітній" : "неповнолітній";

console.log(getGrade(95));
console.log(getGrade(40));
console.log(getGrade(120));

console.log(getSeasonUA(1));
console.log(getSeasonUA(6));
console.log(getSeasonUA(11));

console.log(status);

// ================================
// 3. МАСИВИ
// ================================

const students = [
    { name: "Олена", grade: 87, courses: ["JS", "HTML", "CSS"] },
    { name: "Іван", grade: 55, courses: ["HTML"] },
    { name: "Марія", grade: 95, courses: ["JS", "CSS"] },
    { name: "Петро", grade: 72, courses: ["JS"] },
    { name: "Анна", grade: 64, courses: ["HTML", "CSS"] },
    { name: "Дмитро", grade: 91, courses: ["JS", "React"] }
];

students.push({ name: "Нова", grade: 80, courses: ["JS"] });

students.pop();

students.splice(1, 1);

students.splice(2, 0, { name: "Вставлений", grade: 88, courses: ["JS"] });

console.log("find >90:", students.find(s => s.grade > 90));
console.log("JS students:", students.filter(s => s.courses.includes("JS")));

const avg =
    students.reduce((acc, s) => acc + s.grade, 0) / students.length;

console.log("Average grade:", avg);

// ================================
// 4. ФУНКЦІЇ
// ================================

// 3 способи
function area(a, b) {
    return a * b;
}

const areaExp = function (a, b) {
    return a * b;
};

const areaArrow = (a, b) => a * b;

console.log(area(2, 3), areaExp(2, 3), areaArrow(2, 3));

// closure
function createCounter() {
    let value = 0;

    return {
        increment() {
            value++;
            console.log(value);
        },
        decrement() {
            value--;
            console.log(value);
        },
        getValue() {
            return value;
        }
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

console.log(createUser("Олена"));
console.log(createUser("Іван", "admin", false));

// rest
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
// 5. ОБ'ЄКТИ
// ================================

const studentProfile = {
    firstName: "Олена",
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

console.log(studentProfile.firstName);
console.log(studentProfile["lastName"]);

const key = "university";
console.log(studentProfile[key]);

console.log(Object.keys(studentProfile.grades));
console.log(Object.values(studentProfile.grades));

const copy = { ...studentProfile };
copy.age = 30;

console.log(studentProfile.age, copy.age);

console.log(studentProfile.mentor?.name ?? "Не призначено");

// ================================
// 6. ЛАНЦЮЖКИ
// ================================

const products = [
    { name: "Ноутбук", price: 25000, category: "electronics", inStock: true, quantity: 2 },
    { name: "Телефон", price: 15000, category: "electronics", inStock: true, quantity: 3 },
    { name: "Книга", price: 300, category: "books", inStock: true, quantity: 10 },
    { name: "Монітор", price: 7000, category: "electronics", inStock: false, quantity: 1 },
    { name: "Клавіатура", price: 1200, category: "electronics", inStock: true, quantity: 5 },
    { name: "Миша", price: 800, category: "electronics", inStock: true, quantity: 4 },
    { name: "Стул", price: 2000, category: "furniture", inStock: true, quantity: 2 },
    { name: "Лампа", price: 600, category: "furniture", inStock: false, quantity: 3 }
];

const totalValue = products
    .filter(p => p.inStock)
    .map(p => p.price * p.quantity)
    .reduce((a, b) => a + b, 0);

console.log("Total stock value:", totalValue);

const electronicsNames = products
    .filter(p => p.category === "electronics")
    .sort((a, b) => a.price - b.price)
    .map(p => p.name);

console.log("Electronics:", electronicsNames);

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
// 7. РЯДКИ
// ================================

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function countWords(str) {
    return str.trim().split(/\s+/).length;
}

function truncate(str, maxLength) {
    return str.length > maxLength
        ? str.slice(0, maxLength) + "..."
        : str;
}

function isValidEmail(email) {
    const at = email.indexOf("@");
    const dot = email.lastIndexOf(".");

    return (
        at > 0 &&
        at === email.lastIndexOf("@") &&
        dot > at + 1 &&
        dot < email.length - 2
    );
}

console.log(capitalize("javaScript"));
console.log(countWords("JavaScript це круто"));
console.log(truncate("Це довгий текст для прикладу", 15));

console.log(isValidEmail("user@example.com"));
console.log(isValidEmail("invalid-email"));

console.log("=== ЛР4 END ===");