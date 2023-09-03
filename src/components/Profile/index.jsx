import {
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TextLabel,
} from '@tonic-ui/react'
import classNames from 'classnames'
import { useGlobalDataContext } from '../../contexts/contextStores.js'
import DotLoading from '../../fallbacks/loaders/DotLoading/index.jsx'
import useFetchUserProfile from '../../api/hooks/useFetchUserProfile.jsx'
import useLogout from '../../hooks/useLogout.jsx'
import { DATA_STATE } from '../../reducers/index.js'
import { LOGIN_STATE } from '../../contexts/const.js'
import LoadingOverlay from '../LoadingOverlay/index.jsx'
import styles from './styles.module.scss'

const Profile = () => {
  const { loginState } = useGlobalDataContext()
  const { userProfile } = useFetchUserProfile()

  // hooks
  const { onLogout } = useLogout()

  return (
    <section className={styles['header-icon-layout']}>
      {(() => {
        if (loginState === LOGIN_STATE.processing) {
          return (
            <div
              className={classNames(styles['circle'], {
                [styles['header-icon-layout-disabled']]:
                  loginState === LOGIN_STATE.processing,
              })}
            >
              <Icon
                icon="user-o"
                className={styles['icon']}
              />
            </div>
          )
        }
        return (
          <Popover
            trigger="hover"
            disabled={loginState === LOGIN_STATE.processing}
            offset={[-27, 15]}
          >
            <PopoverTrigger>
              <div className={styles['circle']}>
                <Icon
                  icon="user-o"
                  className={styles['icon']}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div
                style={{
                  width: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <TextLabel>
                    <Icon icon="user" />
                    &nbsp;
                    <span>username</span>
                  </TextLabel>
                  {(() => {
                    switch (userProfile.state) {
                      case DATA_STATE.fetching:
                      case DATA_STATE.reload:
                        return <DotLoading />
                      case DATA_STATE.ready:
                        return (
                          <span style={{ fontSize: 18, lineHeight: '2rem' }}>
                            {userProfile.value.name}
                          </span>
                        )
                      default:
                        return 'unknown state'
                    }
                  })()}
                </div>

                <div
                  style={{
                    width: '100%',
                    marginTop: 15,
                    paddingTop: 10,
                    display: 'flex',
                    borderTop: '1px solid grey',
                  }}
                >
                  <button
                    className={styles['icon-btn']}
                    onClick={onLogout}
                  >
                    <Icon
                      mr="1x"
                      icon="box-out"
                    />
                    logout
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )
      })()}
      <LoadingOverlay isOpen={loginState === LOGIN_STATE.processing} />
    </section>
  )
}

export default Profile
