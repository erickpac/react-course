import { TwitterFollowCard } from "./TwitterFollowCard";

export default function App() {
  const users = [
    {
      userName: "midudev",
      name: "Miguel Ángel Durán",
      isFollowing: true,
    },
    {
      userName: "pheralb",
      name: "Pablo H. Alberti",
      isFollowing: false,
    },
    {
      userName: "PacoHdezs",
      name: "Paco Hernández",
      isFollowing: true,
    },
    {
      userName: "TMChein",
      name: "Tomás Marqués Checa",
      isFollowing: false,
    },
    {
      userName: "erickpac",
      name: "Erick Pac",
      isFollowing: false,
    },
  ];
  return (
    <section className="App">
      {users.map(({ userName, name, isFollowing }) => (
        <TwitterFollowCard
          key={userName}
          user={userName}
          initIsFollowing={isFollowing}
        >
          {name}
        </TwitterFollowCard>
      ))}
    </section>
  );
}
