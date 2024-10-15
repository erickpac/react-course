import { useMemo, useState } from "react";
import "./App.css";
import { UsersList } from "@/components/users-list";
import { type User, SortBy } from "@/types.d";
import { useUsers } from "@/hooks/useUsers";
import { Results } from "@/components/results";

function App() {
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } =
    useUsers();
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleReset = () => {
    void refetch();
  };

  const handleDelete = (email: string) => {
    // const filteredUsers = users.filter((user) => user.email !== email)
    // setUsers(filteredUsers)
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  const filteredUsers = useMemo(() => {
    return filterCountry != null && filterCountry.length > 0
      ? users.filter((user: User) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.FIRST_NAME]: (user) => user.name.first,
      [SortBy.LAST_NAME]: (user) => user.name.last,
    };

    return filteredUsers.toSorted((a: User, b: User) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [filteredUsers, sorting]);

  return (
    <>
      <h1>Technical assessment</h1>
      <Results />
      <header>
        <button onClick={toggleColors}>Coloring rows</button>

        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY
            ? "Not sort by country"
            : "Sort by country"}
        </button>

        <button onClick={handleReset}>Reset state</button>

        <input
          placeholder="Sort by country"
          onChange={(e) => {
            setFilterCountry(e.target.value);
          }}
        />
      </header>
      <main>
        {users.length > 0 && (
          <UsersList
            onChangeSorting={handleChangeSort}
            onDeleteUser={handleDelete}
            showColors={showColors}
            users={sortedUsers}
          />
        )}

        {isLoading && <strong>Loading...</strong>}

        {isError && <p>Something went wrong</p>}

        {!isLoading && !isError && users.length === 0 && (
          <p>There is no users</p>
        )}

        {!isLoading && !isError && hasNextPage === true && (
          <button
            onClick={() => {
              void fetchNextPage();
            }}
          >
            Load more users
          </button>
        )}

        {!isLoading && !isError && hasNextPage === false && (
          <p>There is no more results</p>
        )}
      </main>
    </>
  );
}

export default App;
