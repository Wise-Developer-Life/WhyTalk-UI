import PropTypes from 'prop-types'
import { useState } from 'react'
import { Flex, Space } from '@tonic-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import FormField from '../../FormField/index.jsx'
import { BackAccountLink, ContinueBtn } from './Common.jsx'
import { loginSchema } from '../validation.js'
import { useGlobalDataContext } from '../../../contexts/contextStores.js'
import { fetchValidateAccount, postLogin } from '../../../api/user.js'
import { asyncLocalStorage } from '../../../utils/index.js'
import { TOKEN_NAME } from '../../../const.js'
// import classNames from "classnames";

const FormContainer = props => {
  const { callbacks, stage } = props
  const [onBackToAccount, setStage] = callbacks

  // context
  const { setLoginState } = useGlobalDataContext()

  // hooks
  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
    getFieldState,
    setError,
    reset,
  } = useForm({
    defaultValues: {
      password: '',
      username: '',
    },
    // both onChange and onBlur at the same time
    mode: 'all',
    resolver: yupResolver(loginSchema),
  })
  const accountFieldState = getFieldState('username')
  const [isLoading, setIsLoading] = useState(false)

  // hooks
  const navigate = useNavigate()

  const onPasswordStage = () => {
    const el = document.getElementById('login-card')
    el.style.setProperty('--login-card-height', '400px')
    setStage(2)
  }

  // callbacks
  const onSubmit = async formData => {
    try {
      setIsLoading(true)
      console.log('-onSubmit formData--', formData)
      const res = await postLogin(formData)

      switch (res.status) {
        case 200:
        case 201: {
          const finalRes = await res.json()

          await asyncLocalStorage.setItem(
            TOKEN_NAME,
            JSON.stringify(finalRes.token)
          )
          setLoginState('login')

          navigate({
            pathname: '/',
            search: window.location.search,
          })
          break
        }
        case 401:
        default: {
          setError('password', {
            type: 'external',
            message: 'Invalid password. Try again later.',
          })
          break
        }
      }
    } catch (error) {
      // network failed
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onContinue = async () => {
    switch (stage) {
      case 1: {
        try {
          // errors.account will be undefined when form init
          // console.log('-errors-', errors)
          if (!errors.username && accountFieldState.isTouched) {
            setIsLoading(true)
            const res = await fetchValidateAccount()
            if (res.value) onPasswordStage()
          }
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false)
        }
        break
      }
      case 2: {
        // console.log('---onsubmit in continue')
        break
      }
      default: {
        // console.log('-unknown stage--')
      }
    }
  }

  return (
    <form
      style={{
        marginBottom: '2em',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Flex
        direction="column"
        rowGap={stage === 2 && '2x'}
      >
        {(() => {
          switch (stage) {
            case 2:
              return (
                <>
                  <FormField
                    mode="static"
                    type="account"
                    control={control}
                    required
                  />
                  <FormField
                    type="password"
                    control={control}
                    required
                  />
                </>
              )
            case 1:
            default:
              return (
                <>
                  <FormField
                    type="account"
                    control={control}
                    required
                  />
                  <Space height="2x" />
                </>
              )
          }
        })()}
        <ContinueBtn
          onClick={onContinue}
          disabled={!isValid && stage === 2}
          isLoading={isLoading}
        />
        <section>
          {stage === 2 && <BackAccountLink onClick={onBackToAccount} />}
        </section>
      </Flex>
    </form>
  )
}

FormContainer.propTypes = {
  callbacks: PropTypes.array,
  onSubmit: PropTypes.func,
  stage: PropTypes.number,
}

export default FormContainer
