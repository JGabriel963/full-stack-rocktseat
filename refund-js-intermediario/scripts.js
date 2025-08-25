// Seleciona os elementos do formulário.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const expenseList = document.querySelector("ul");
const expensesQuantity = document.querySelector("aside header p span");
const expensesTotal = document.querySelector("aside header h2");

console.log(expensesTotal);

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

  form.reset();
  expense.focus();
};

// Adicona um novo item
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

    // Criar o valor da despesa
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "./img/remove.svg");
    removeIcon.setAttribute("alt", "Deletar despesa");

    // Adicionar items
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    expenseList.append(expenseItem);

    updateTotal();
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas");
    console.log(error);
  }
}

// Atualizar os totais.
function updateTotal() {
  try {
    // Recuperar todos oos itens da list
    const items = expenseList.children;
    expensesQuantity.textContent = `${items.length} ${
      items.length === 1 ? "despesa" : "despesas"
    }`;

    let total = 0;
    for (let i = 0; i < items.length; i++) {
      const itemAmount = items[i].querySelector(".expense-amount").textContent;

      let value = itemAmount.replace(/[^\d,]/g, "").replace(",", ".");

      value = parseFloat(value);

      if (isNaN(value)) {
        return alert("Não foi possível atualizar os totais");
      }
      total += Number(value);
    }

    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";

    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

    expensesTotal.innerHTML = "";
    expensesTotal.append(symbolBRL, total);
  } catch (error) {
    console.log(error);
    alert("Não foi possível atualizar os totais");
  }
}

// Evento que captura o clique nos itens da lista
// Evento que captura o clique nos itens da lista
expenseList.addEventListener("click", function (event) {
  // Verificar se o elemento clicado é o ícone de remover
  if (event.target.classList.contains("remove-icon")) {
    // Obtém a li pai do elemento clicado
    const item = event.target.closest(".expense");

    // Remove o item da lista
    item.remove();
  }

  // Atualiza os totais
  updateTotal();
});
