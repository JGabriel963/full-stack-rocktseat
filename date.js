// Lesson 1
// const days = [
//   "Domingo",
//   "Segunda",
//   "Terça",
//   "Quarta",
//   "Quinta",
//   "Sexta"
// ]

// const months = [
//   "Janeiro",
//   "Fevereiro",
//   "Março",
//   "Abril",
//   "Maio",
//   "Junho",
//   "Julho",
//   "Agosto",
//   "Setembro",
//   "Outubro",
//   "Novembro",
//   "Dezembro"
// ];

// const birth = new Date("2002-03-13T08:05:00");
// console.log(days[birth.getDay()]);
// console.log(birth.getDate());
// console.log(months[birth.getMonth()]);
// console.log(birth.getFullYear());
// console.log(birth.getHours());
// console.log(birth.getMinutes())
// console.log(birth.getSeconds())

// Lesson 2
// let date = new Date('Mar 13, 2002 8:05:00')

// date.setFullYear(2025)
// date.setMonth(7)
// date.setDate(10)
// date.setHours(14)
// date.setMinutes(0)
// date.setSeconds(30)
// console.log(date)

let date = new Date('2025-08-08T14:00:00')
// formatar o dia para sempre ter 2 dígitos
console.log(date.getDate().toString().padStart(2, 0))
console.log((date.getMonth() + 1).toString().padStart(2, 0))

console.log(date.toLocaleDateString())

let date = new Date('2025-08-18T14:00:00')
// formatar o dia para sempre ter 2 dígitos
console.log(date.getDate().toString().padStart(2, 0))
console.log((date.getMonth() + 1).toString().padStart(2, 0))

console.log(date.toLocaleDateString())
console.log(date.toLocaleString("pt-Br", {
  dateStyle: "long"
}))

console.log(date.toLocaleString("pt-BR", {
  day: "2-digit",
  month: '2-digit',
  hour: "2-digit",
  weekday: "long"
}))


const amount = 12.6

console.log(amount.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL"
}))


// Informações da localidade
const currentLocale = Intl.DateTimeFormat().resolvedOptions()

console.log(currentLocale)

console.log(new Intl.DateTimeFormat('pt-BR').format(new Date()))

const date = new Date();

// Obtém a diferença em minutos do timezone
console.log(date.getTimezoneOffset())

// Obtém a diferença em horas do timezone
console.log(date.getTimezoneOffset() / 60)
