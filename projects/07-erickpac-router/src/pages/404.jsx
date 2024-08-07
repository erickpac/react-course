import { Link } from "../components/Link";

export function Page404() {
  return (
    <>
      <h1>This is not fine - 404</h1>
      <img
        src="https://media.tenor.com/p3hWK5YRo6IAAAAM/this-is-fine-dog.gif"
        alt="Burning dog"
      />
      <p>Page not found</p>
      <Link to="/">Go back to home</Link>
    </>
  );
}
