import { Container } from "../components/container";
import TasksSummary from "../core-components/task-summary";
import TasksList from "../core-components/tasks-lits";

export default function PageHome() {
  return (
    <Container as="article" className="space-y-3">
      <header className="flex items-center justify-between">
        <TasksSummary />
      </header>

      <TasksList />
    </Container>
  );
}
