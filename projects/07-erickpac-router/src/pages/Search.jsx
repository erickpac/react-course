import { Link } from "../components/Link";

export default function SearchPage({ routeParams }) {
  return (
    <>
      <h1>Search page: {routeParams.query}</h1>
      <Link to="/">Home</Link>
    </>
  );
}
