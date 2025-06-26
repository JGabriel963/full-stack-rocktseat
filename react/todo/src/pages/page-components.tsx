import { Badge } from "../components/badge";
import { Button } from "../components/button";
import { ButtonIcon } from "../components/button-icon";
import { Card } from "../components/card";
import { Container } from "../components/container";
import { Icon } from "../components/icon";
import { InputCheckbox } from "../components/input-checkbox";
import { InputText } from "../components/input-text";
import { Skeleton } from "../components/skeleton";
import { Text } from "../components/text";
import PencilIcon from "../assets/icons/pencil.svg?react";
import CheckIcon from "../assets/icons/check.svg?react";
import PlusIcon from "../assets/icons/plus.svg?react";
import SpinnerIcon from "../assets/icons/spinner.svg?react";
import XIcon from "../assets/icons/x.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";

export default function PageComponents() {
  return (
    <Container>
      <div className=" space-y-5">
        <Text as="p" variant="body-md">
          Olá, Mundo
        </Text>
        <Text as="p" variant="body-md-bold">
          Olá, Mundo
        </Text>
        <Text as="p" variant="body-sm-bold">
          Olá, Mundo
        </Text>
        <div className="flex items-center gap-2">
          <Icon svg={PencilIcon} />
          <Icon svg={CheckIcon} />
          <Icon svg={PlusIcon} />
          <Icon svg={SpinnerIcon} animate />
          <Icon svg={XIcon} />
          <Icon svg={TrashIcon} />
        </div>
        <div className="flex items-center gap-2">
          <Badge loading>3 de 21</Badge>
          <Badge size="sm">3 de 21</Badge>
        </div>

        <div>
          <Button>Nova Tarefa</Button>
        </div>

        <div className="flex items-center gap-2">
          <ButtonIcon icon={TrashIcon} loading />
          <ButtonIcon icon={TrashIcon} />
        </div>

        <div>
          <InputText placeholder="Digite aqui" />
        </div>

        <div>
          <InputCheckbox />
        </div>

        <div>
          <Card size="md">Opa</Card>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </Container>
  );
}
