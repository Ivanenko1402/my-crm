import { Container } from "react-bootstrap";

export function MainContent({ children }) {
  return (
    <Container className='flex-grow-1'>
      { children }
    </Container>
  )
}