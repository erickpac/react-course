import { SortBy, type User } from "@/types.d";

type Props = {
  users: User[];
  showColors: boolean;
  onDeleteUser: (email: string) => void;
  onChangeSorting: (newSorting: SortBy) => void;
};

export const UsersList = ({
  users,
  showColors,
  onDeleteUser,
  onChangeSorting,
}: Props) => {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Picture</th>
          <th
            className="pointer"
            onClick={() => onChangeSorting(SortBy.FIRST_NAME)}
          >
            First name
          </th>
          <th
            className="pointer"
            onClick={() => onChangeSorting(SortBy.LAST_NAME)}
          >
            Last name
          </th>
          <th
            className="pointer"
            onClick={() => onChangeSorting(SortBy.COUNTRY)}
          >
            Country
          </th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody className={showColors ? "table-show-colors" : ""}>
        {users.map((user) => {
          return (
            <tr key={user.email}>
              <td>
                <img
                  src={user.picture.thumbnail}
                  alt={`${user.name.first} ${user.name.last}`}
                />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => onDeleteUser(user.email)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
