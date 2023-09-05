import PropTypes from 'prop-types'
import styles from './ChatList.module.scss'

const ListItem = props => {
  const { info } = props

  return (
    <div className={styles['list-item']}>
      <img
        src={info.src}
        alt={info.name}
      />
      <div className={styles['item-name']}>{info.name}</div>
      <div className={styles['item-content']}>
        <div className={styles['overflow-ellipsis']}>{info.content}</div>
      </div>
    </div>
  )
}

ListItem.propTypes = {
  info: PropTypes.object,
}

export default ListItem
