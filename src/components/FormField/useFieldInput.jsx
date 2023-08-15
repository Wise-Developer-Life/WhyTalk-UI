import { useMemo } from 'react'
import PasswordField from './fields/PasswordField.jsx'
import AccountField from './fields/AccountField.jsx'
import TextField from './fields/TextField.jsx'
import SingleSelectField from './fields/SingleSelectField.jsx'
import TextareaField from './fields/TextareaField.jsx'
import { AddPropsWrapper } from '../HOC/index.jsx'

const useFieldInput = props => {
  const { type, mode } = props

  return useMemo(() => {
    switch (type) {
      case 'password':
        return AddPropsWrapper(PasswordField, { mode: mode || 'default' })
      case 'account':
        return AddPropsWrapper(AccountField, { mode: mode || 'default' })
      case 'single-select':
        return AddPropsWrapper(SingleSelectField, { mode: mode || 'default' })
      case 'textarea':
        return AddPropsWrapper(TextareaField, { mode: mode || 'default' })
      default:
        return AddPropsWrapper(TextField, { mode: mode || 'default' })
    }
  }, [type, mode])
}

export default useFieldInput
