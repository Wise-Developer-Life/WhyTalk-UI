import PropTypes from 'prop-types'
import useFieldInput from './useFieldInput.jsx'

const FormField = props => {
  const { type, mode, ...fieldProps } = props

  const FieldInput = useFieldInput({ type, mode })

  return (
    <>
      <FieldInput {...fieldProps} />
    </>
  )
}

FormField.propTypes = {
  type: PropTypes.string,
  mode: PropTypes.string,
}

export default FormField
