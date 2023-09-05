import styles from './ChatList.module.scss'
import ListItem from './ListItem.jsx'

// todo: extract to api server
const fakeData = [
  {
    name: 'Jago',
    src: 'public/assets/jago.png',
    content: "I'm jago",
  },
  {
    name: 'HoleM',
    src: 'public/assets/cat.jpeg',
    content: "I'm hole m, you motherfucker holy guy",
  },
  {
    name: 'Lee small boy',
    src: 'public/assets/lee.jpeg',
    content: 'niganma',
  },
]

const ChatList = () => {
  return (
    <div id={styles['chat-list-container']}>
      {fakeData.map((user, idx) => {
        return (
          <ListItem
            key={`list-item-${idx}`}
            info={user}
          />
        )
      })}
    </div>
  )
}

export default ChatList
