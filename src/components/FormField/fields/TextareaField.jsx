import { useController } from 'react-hook-form'
import { FIELD_MODE } from '../const.js'
import { InputControl } from '@tonic-ui/react'
import InputControlBase from './InputControlBase.jsx'
import ErrorMessage from '../errors/ErrorMessage.jsx'
import PropTypes from 'prop-types'

const TextareaField = props => {
  const { mode, name, placeholder, control, required, ...fieldProps } = props

  const {
    field,
    fieldState,
    formState: { errors },
  } = useController({
    name,
    control,
    rules: { required },
  })

  // todo: implement static mode
  switch (mode) {
    case FIELD_MODE.static:
      return (
        <InputControl
          sx={{
            borderColor: 'transparent',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            _hover: {
              // or '&:hover'
              borderColor: 'transparent',
              cursor: 'default',
            },
          }}
          inputProps={{
            sx: {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              _hover: { cursor: 'default' },
            },
          }}
          readOnly
          value={field.value}
        />
      )
    case FIELD_MODE.default:
    default:
      return (
        <div>
          <InputControlBase
            isTextarea
            resize="none"
            error={errors?.[name]}
            fieldState={fieldState}
            placeholder={placeholder}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            {...fieldProps}
          />
          <ErrorMessage error={errors?.[name]} />
        </div>
      )
  }
}

TextareaField.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  mode: PropTypes.string,
  control: PropTypes.object,
  required: PropTypes.bool,
}

export default TextareaField
