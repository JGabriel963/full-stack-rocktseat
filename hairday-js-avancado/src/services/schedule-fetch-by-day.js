import dayjs from "dayjs";
import { apiConfig } from "./api-config";

export async function scheduleFetchByDay({ date }) {
  try {
    // Fas a requisição
    const response = await fetch(`${apiConfig.baseUrl}/schedules`);

    // Converterr para JSON
    const data = await response.json();

    const dailySchedules = data.filter((schedule) =>
      dayjs(date).isSame(schedule.when, "day")
    );

    return dailySchedules;
  } catch (error) {
    alert("Não foi possível buscar os agendamentos do dia selecionados");
  }
}
