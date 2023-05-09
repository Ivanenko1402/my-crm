import { Container } from "react-bootstrap";

export function Footer() {
  return (
    <div className="mt-auto d-flex justify-content-center align-items-center gap-3 bg-light p-3">
      <Container variant="body2" align="center">
        Find me:
        {' '}
        <a
          href="https://github.com/Ivanenko1402?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        {' | '}
        <a
          href="https://www.linkedin.com/in/valentyn-ivanenko-1b32111a0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Linkedin
        </a>
        {' | '}
        <a
          href="https://www.facebook.com/valentin.ivanenko.5"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </Container>
    </div>
  )
}