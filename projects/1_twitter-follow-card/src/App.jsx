import "./App.css";
import TwitterFollowCard from "./TwitterFollowCard";
import { users } from "./users";

function App() {
  return (
    <section className="App">
      {users.map(({ isFollowing, name, userName }) => (
        <TwitterFollowCard
          initialIsFollowing={isFollowing}
          key={userName}
          userName={userName}
        >
          {name}
        </TwitterFollowCard>
      ))}
    </section>
  );
}

export default App;
