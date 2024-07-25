import "./App.css";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export function TwitterFollowCard({ user, children, initIsFollowing }) {
  const [isFollowing, setIsFollowing] = useState(initIsFollowing);

  const buttonText = isFollowing ? "Siguiendo" : "Seguir";
  const buttonClassName = isFollowing
    ? "tw-follow-card-button is-following"
    : "tw-follow-card-button";

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <article className="tw-follow-card">
      <header className="tw-follow-card-header">
        <img
          className="tw-follow-card-avatar"
          src={`https://unavatar.io/${user}`}
          alt={`El avatar de ${user}`}
        />
        <div className="tw-follow-card-info">
          <strong>{children}</strong>
          <span className="tw-follow-card-info-user-name">@{user}</span>
        </div>
      </header>

      <aside>
        <button onClick={handleClick} className={buttonClassName}>
          <span className='tw-follow-card-text'>{buttonText}</span>
          <span className='tw-follow-card-stop-follow'>Dejar de seguir</span>
        </button>
      </aside>
    </article>
  );
}
