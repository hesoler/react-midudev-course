import PropTypes from 'prop-types'
import { useState } from 'react'

export default function TwitterFollowCard ({
  children,
  initialIsFollowing,
  userName
}) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

  const imageSrc = `https://unavatar.io/${userName}`
  const imageAlt = `${userName}'s avatar`
  const buttonClassName = isFollowing
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button'

  const buttonText = isFollowing ? 'Following' : 'Follow'

  const handleClick = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <article className='tw-followCard'>
      <header className='tw-followCard-header'>
        <img className='tw-followCard-avatar' alt={imageAlt} src={imageSrc} />
        <div className='tw-followCard-info'>
          <b>{children}</b>
          <span className='tw-followCard-infoUserName'>@{userName}</span>
        </div>
      </header>

      <aside>
        <button className={buttonClassName} onClick={handleClick}>
          <span className='tw-followCard-text'>{buttonText}</span>
          <span className='tw-followCard-stopFollow'>Stop Following</span>
        </button>
      </aside>
    </article>
  )
}

TwitterFollowCard.propTypes = {
  children: PropTypes.any.isRequired,
  initialIsFollowing: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired
}
