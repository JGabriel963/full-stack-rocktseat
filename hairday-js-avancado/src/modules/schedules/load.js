import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day";
import { hoursLoad } from "../form/hours-load";
import { scheduleShow } from "./show";

const selectedDate = document.getElementById("date");

export async function schedulesDay() {
  const date = selectedDate.value;

  // Busca na API os agendamentos
  const dailySchedules = await scheduleFetchByDay({ date });
  scheduleShow({ dailySchedules });

  // Renderiza as horas disponíveis.
  hoursLoad({ date, dailySchedules });
}
