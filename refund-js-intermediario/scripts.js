// Seleciona os elementos do formulário.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const expenseList = document.querySelector("ul");

// Captura o evento de input para formatar o valor.
amount.oninput = () => {
  // Obtém o valor atual do input e remove os caracteres não numéricos.
  let value = amount.value.replace(/\D/g, "");

  // Transformar valor em centavos (ex.: 150/100 = 1.5 que é equivalente a R$ 1,50).
  value = Number(value) / 100;

  // Atualiza o valor do input
  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return value;
}

// Captura o evento de submit do formulário para obter os valores
form.onsubmit = (event) => {
  // Previne o comportamento padrão
  event.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    amount: amount.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    created_at: new Date(),
  };

  expenseAdd(newExpense);
};

function expenseAdd(newExpense) {
  try {
    // Criar o elemento para adicionar na lista.
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    const expenseIcon = document.createElement("img");

    expenseIcon.setAttribute("src", `./img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // Criar a info da despesa
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    expenseInfo.append(expenseName, expenseCategory);

    // Adicionar items
    expenseItem.append(expenseIcon, expenseInfo);

    expenseList.append(expenseItem);
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas");
    console.log(error);
  }
}
