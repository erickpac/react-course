import { useEffect, useRef, useState, useMemo } from "react";
import { SortBy, type User } from "@/types.d";
import { UsersList } from "@/components/users-list";
import "./App.css";

const url = "https://randomuser.me/api?results=100";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  const originalUsers = useRef<User[]>([]);

  const handleColorRows = () => {
    setShowColors(!showColors);
  };

  const handleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleDeleteUser = (uuid: string) => {
    const newUsers = users.filter((user) => user.login.uuid !== uuid);
    setUsers(newUsers);
  };

  const handleResetUsers = () => {
    setUsers(originalUsers.current);
  };

  const handleChangeSorting = (newSorting: SortBy) => {
    setSorting(newSorting);
  };

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === "string" && filterCountry.length > 0
      ? users.filter((user) =>
          user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase())
        )
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    const compareFunctions = {
      [SortBy.FIRST_NAME]: (a: User, b: User) =>
        a.name.first.localeCompare(b.name.first),
      [SortBy.LAST_NAME]: (a: User, b: User) =>
        a.name.last.localeCompare(b.name.last),
      [SortBy.COUNTRY]: (a: User, b: User) =>
        a.location.country.localeCompare(b.location.country),
    };

    return filteredUsers.slice().sort(compareFunctions[sorting]);
  }, [filteredUsers, sorting]);

  useEffect(() => {
    fetch(url)
      .then(async (response) => await response.json())
      .then((data) => {
        setUsers(data.results);
        originalUsers.current = data.results;
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <h1>Tech assessment</h1>
      <header>
        <button onClick={handleColorRows}>Coloring rows</button>
        <button onClick={handleSortByCountry}>
          {sorting === SortBy.COUNTRY
            ? "Not sort by country"
            : "Sort by country"}
        </button>
        <button onClick={handleResetUsers}>Reset users</button>
        <input
          type="text"
          placeholder="Filter by country"
          onChange={(e) => setFilterCountry(e.target.value)}
        />
      </header>
      <main>
        <UsersList
          users={sortedUsers}
          showColors={showColors}
          onDeleteUser={handleDeleteUser}
          onChangeSorting={handleChangeSorting}
        />
      </main>
    </>
  );
}

export default App;
