import { hoursLoad } from "../form/hours-load";

const selectedDate = document.getElementById("date");

export function schedulesDay() {
  // Renderiza as horas disponíveis.
  hoursLoad({ date: selectedDate.value });
}
