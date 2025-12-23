# 📇 Contact Hub — Smart Contact Manager

Contact Hub is a modern **CRUD-based contact management web application** that allows users to add, edit, delete, search, and organize contacts with an intuitive and clean UI.

The project focuses on **vanilla JavaScript logic**, DOM manipulation, localStorage persistence, and real-world UI behavior (modals, validation, live search).

---

## 🚀 Features

- ✅ Add new contacts
- ✏️ Edit existing contacts
- 🗑️ Delete contacts with confirmation modal
- ⭐ Mark contacts as **Favorites**
- ❤️ Mark contacts as **Emergency**
- 📊 Live counters for Total / Favorites / Emergency
- 🔍 **Live search** by name, phone, or email
- 💾 Data persistence using **Local Storage**
- ⚠️ Form validation with Regex + error popup
- 🧠 Clean event delegation (single listener for dynamic cards)

---

## 🛠️ Technologies Used

- **HTML5**
- **CSS3**
- **Bootstrap**
- **Font Awesome**
- **JavaScript (ES6)**
- **Local Storage API**

---

## 🧪 Validation Rules

- **Name**:  
  - Letters and spaces only  
  - 2–50 characters  
- **Phone**:  
  - Egyptian numbers only  
  - Must start with `010`, `011`, `012`, or `015` + 8 digits  
- **Email**:  
  - Valid email format

Invalid inputs trigger a custom warning popup without losing form state.

---

## 📂 Project Structure

```text
Contact-Hub/
│
├── index.html
├── CSS/
│   ├── index-Style.css
│   ├── mediaQery.css
│   └── bootstrap.min.css
│
├── JS/
│   └── main.js
│
├── Images/
│
└── README.md
