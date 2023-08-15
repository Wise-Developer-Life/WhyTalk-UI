import { InputControl, Textarea } from '@tonic-ui/react'
import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const InputControlBase = props => {
  const { error, fieldState, isTextarea, ...inputProps } = props
  const { isDirty, isTouched } = fieldState

  const dirtyFlag = useRef(null)

  useEffect(() => {
    if (dirtyFlag.current === null && isDirty) {
      dirtyFlag.current = true
    }
  }, [isDirty])

  if (isTextarea)
    return (
      <Textarea
        borderColor={error ? 'red:50' : 'gray:60'}
        _hover={{
          borderColor: error ? 'red:50' : 'blue:50',
        }}
        {...inputProps}
      />
    )

  return (
    <InputControl
      // borderColor={error && (dirtyFlag.current || isTouched) ? 'red:50' : 'gray:60'}
      // _hover={{
      //   borderColor: error && (dirtyFlag.current || isTouched) ? 'red:50' : 'gray:60',
      // }}
      borderColor={error ? 'red:50' : 'gray:60'}
      _hover={{
        // borderColor: error ? 'red:50' : 'gray:60',
        borderColor: error ? 'red:50' : 'blue:50',
      }}
      {...inputProps}
    />
  )
}

InputControlBase.propTypes = {
  isTextarea: PropTypes.bool,
  error: PropTypes.object,
  fieldState: PropTypes.object,
}

InputControlBase.defaultProps = {
  isTextarea: false,
}
export default InputControlBase
