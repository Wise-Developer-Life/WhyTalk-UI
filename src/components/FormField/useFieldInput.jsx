import { useMemo } from 'react'
import PasswordField from './fields/PasswordField.jsx'
import AccountField from './fields/AccountField.jsx'
import TextField from './fields/TextField.jsx'
import SingleSelectField from './fields/SingleSelectField.jsx'
import TextareaField from './fields/TextareaField.jsx'
import { AddPropsHOC } from '../HOC/index.jsx'

const useFieldInput = props => {
  const { type, mode } = props

  return useMemo(() => {
    switch (type) {
      case 'password':
        return AddPropsHOC(PasswordField, { mode: mode || 'default' })
      case 'account':
        return AddPropsHOC(AccountField, { mode: mode || 'default' })
      case 'single-select':
        return AddPropsHOC(SingleSelectField, { mode: mode || 'default' })
      case 'textarea':
        return AddPropsHOC(TextareaField, { mode: mode || 'default' })
      default:
        return AddPropsHOC(TextField, { mode: mode || 'default' })
    }
  }, [type, mode])
}

export default useFieldInput
