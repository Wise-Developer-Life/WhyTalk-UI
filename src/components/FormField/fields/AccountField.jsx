import { Icon, InputAdornment, InputControl } from '@tonic-ui/react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'
import useLocalColorStyle from '../../../hooks/tonicUI/useLocalColorStyle.jsx'
import ErrorMessage from '../errors/ErrorMessage.jsx'
import InputControlBase from './InputControlBase.jsx'
import { FIELD_MODE } from '../const.js'

const AccountField = props => {
  const { mode, control, required, ...otherProps } = props
  const { colorStyle } = useLocalColorStyle()
  const iconColor = colorStyle.color.tertiary

  const {
    field,
    fieldState,
    formState: { errors },
  } = useController({
    name: 'username',
    control,
    rules: { required },
    ...otherProps,
  })

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
          startAdornment={
            <InputAdornment>
              <Icon icon="user" />
            </InputAdornment>
          }
        />
      )
    case FIELD_MODE.default:
    default:
      return (
        <div>
          <InputControlBase
            error={errors.username}
            fieldState={fieldState}
            placeholder="Mail address/ Account"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            startAdornment={
              <InputAdornment>
                <Icon
                  icon="user"
                  color={iconColor}
                />
              </InputAdornment>
            }
          />
          <ErrorMessage error={errors.username} />
        </div>
      )
  }
}

AccountField.propTypes = {
  mode: PropTypes.string,
  control: PropTypes.object,
  required: PropTypes.bool,
}
export default AccountField
