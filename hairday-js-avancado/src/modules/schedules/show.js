import dayjs from "dayjs";

const periodMorning = document.getElementById("period-morning");
const periodAfternoon = document.getElementById("period-afternoon");
const periodNight = document.getElementById("period-night");

export function scheduleShow({ dailySchedules }) {
  try {
    periodMorning.innerHTML = "";
    periodAfternoon.innerHTML = "";
    periodNight.innerHTML = "";

    dailySchedules.forEach((schedule) => {
      const item = document.createElement("li");
      const time = document.createElement("strong");
      const name = document.createElement("span");

      item.setAttribute("data-id", schedule.id);

      time.textContent = dayjs(schedule.when).format("HH:mm");
      name.textContent = schedule.name;

      const cancelIcon = document.createElement("img");
      cancelIcon.classList.add("cancel-icon");
      cancelIcon.setAttribute("src", "./src/assets/cancel.svg");
      cancelIcon.setAttribute("alt", "Cancelar");

      // Adicionar o tempo, nome e ícone no item
      item.append(time, name, cancelIcon);

      const hour = dayjs(schedule.when).hour();
      console.log(hour);

      // Renderiza o agendamento na sessão (manhã, tarde ou noite)
      if (hour <= 12) {
        periodMorning.append(item);
      } else if (hour > 12 && hour <= 18) {
        periodAfternoon.append(item);
      } else {
        periodNight.append(item);
      }
    });
  } catch (error) {
    alert("Não foi possível ");
    console.log(error);
  }
}
