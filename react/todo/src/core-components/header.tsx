import { Container } from "../components/container";
import Logo from "../assets/images/logo.svg?react";

export default function Header() {
  return (
    <Container className="mt-3 md:mt-20" as="header">
      <Logo className="h-12" />
    </Container>
  );
}
