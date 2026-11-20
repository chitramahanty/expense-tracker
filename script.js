
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const addBtn = document.getElementById("addBtn");
const transactionList = document.getElementById("transactionList");

function updateDisplay() {
    let income = 0;
    let expenses = 0;

    transactionList.innerHTML = "";
    if (transactions.length === 0) {
    transactionList.innerHTML = "<li>No transactions yet.</li>";
}

    transactions.forEach((transaction, index) => {
        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expenses += transaction.amount;
        }

        const li = document.createElement("li");
        li.className = transaction.type;
        li.textContent =
            transaction.description + " - ₹" + transaction.amount +
            " (" + transaction.type.toUpperCase() + ")";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.onclick = function() {
            deleteTransaction(index);
        };

        li.appendChild(deleteBtn);
        transactionList.appendChild(li);
    });

    document.getElementById("income").textContent = "₹" + income;
    document.getElementById("expenses").textContent = "₹" + expenses;
    document.getElementById("balance").textContent =
        "₹" + (income - expenses);

    localStorage.setItem("transactions", JSON.stringify(transactions));
}

addBtn.addEventListener("click", function() {
    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    if (description === "" || amount <= 0 || !Number.isFinite(amount)) {
        alert("Please enter a description and a valid amount.");
        return;
    }

    transactions.push({
        description: description,
        amount: amount,
        type: type
    });

    descriptionInput.value = "";
    amountInput.value = "";

    updateDisplay();
});

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateDisplay();
}

updateDisplay();
