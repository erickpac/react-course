import { Link } from "../components/Link";

export default function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>This is a example page to crate a React Router from scratch</p>
      <Link to="/about">About us</Link>
    </>
  );
}
