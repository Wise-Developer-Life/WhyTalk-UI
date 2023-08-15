import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'
import { Icon, InputAdornment, InputControl } from '@tonic-ui/react'
import useLocalColorStyle from '../../../hooks/tonicUI/useLocalColorStyle.jsx'
import { FIELD_MODE } from '../const.js'
import InputControlBase from './InputControlBase.jsx'
import ErrorMessage from '../errors/ErrorMessage.jsx'
import { DATA_STATE } from '../../../reducers/index.js'
import DotLoading from '../../../fallbacks/loaders/DotLoading/index.jsx'

// todo:bug
// import { useCustomFormContext } from '../../../modules/LandingPage/CommentModal/context/contextStore.jsx'

const TextField = props => {
  const {
    mode,
    name,
    placeholder,
    control,
    icon,
    required,
    externalContext,
    ...fieldProps
  } = props

  // todo: need to be decouple context
  // const { dataState } = useCustomFormContext()
  const { dataState } = externalContext()

  // hooks
  const { colorStyle } = useLocalColorStyle()
  const iconColor = colorStyle.color.tertiary

  const {
    field,
    fieldState,
    // formState,
    formState: { errors, isSubmitting },
  } = useController({
    name,
    control,
    rules: { required },
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
            icon && (
              <>
                <InputAdornment>
                  <Icon icon={icon} />
                </InputAdornment>
                {dataState !== DATA_STATE.ready && <DotLoading />}
              </>
            )
          }
        />
      )
    case FIELD_MODE.default:
    default:
      return (
        <div>
          {(() => {
            switch (dataState) {
              case DATA_STATE.init:
              case DATA_STATE.fetching:
              case DATA_STATE.reload:
                return <DotLoading />
              case DATA_STATE.ready:
              default:
                return (
                  <InputControlBase
                    error={errors?.[name]}
                    fieldState={fieldState}
                    placeholder={placeholder}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    startAdornment={
                      icon && (
                        <InputAdornment>
                          <Icon
                            icon={icon}
                            color={iconColor}
                          />
                        </InputAdornment>
                      )
                    }
                    {...fieldProps}
                  />
                )
            }
          })()}
          <ErrorMessage error={errors?.[name]} />
        </div>
      )
  }
}

TextField.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  mode: PropTypes.string,
  control: PropTypes.object,
  required: PropTypes.bool,
  externalContext: PropTypes.object,
}
export default TextField
