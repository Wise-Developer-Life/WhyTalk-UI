import { ButtonBase, Icon, InputAdornment } from '@tonic-ui/react'
import PropTypes from 'prop-types'
import useLocalColorStyle from '../../../hooks/tonicUI/useLocalColorStyle.jsx'
import { useState } from 'react'
import { useController } from 'react-hook-form'
import ErrorMessage from '../errors/ErrorMessage.jsx'
import InputControlBase from './InputControlBase.jsx'
import { FIELD_MODE } from '../const.js'

const PasswordField = props => {
  const { mode, control, required, ...otherProps } = props
  const { colorStyle } = useLocalColorStyle()
  const iconColor = colorStyle.color.tertiary
  const [view, setView] = useState(false)

  const {
    field,
    fieldState,
    formState: { errors },
  } = useController({
    name: 'password',
    control,
    rules: { required },
    ...otherProps,
  })

  const toggleView = () => setView(view => !view)

  switch (mode) {
    case FIELD_MODE.default:
    default:
      return (
        <div>
          <InputControlBase
            error={errors.password}
            fieldState={fieldState}
            type={view ? 'text' : 'password'}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            placeholder="Password"
            startAdornment={
              <InputAdornment>
                <Icon
                  icon="lock"
                  color={iconColor}
                />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment>
                <ButtonBase onClick={toggleView}>
                  <Icon
                    icon={view ? 'view' : 'view-off'}
                    color={iconColor}
                  />
                </ButtonBase>
              </InputAdornment>
            }
          />
          <ErrorMessage error={errors.password} />
        </div>
      )
  }
}

PasswordField.propTypes = {
  mode: PropTypes.string,
  control: PropTypes.object,
  required: PropTypes.bool,
}
export default PasswordField
