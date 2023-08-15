import PropTypes from 'prop-types'
import { Option, Select } from '@tonic-ui/react'
import { useController } from 'react-hook-form'

const SingleSelectField = props => {
  const {
    // mode,
    name,
    control,
    options,
    required,
    ...fieldProps
  } = props

  // todo: implement static mode
  const {
    field,
    // formState: { errors },
  } = useController({
    name,
    control,
    rules: { required },
  })

  return (
    <Select
      variant="filled"
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      name={field.name}
      {...fieldProps}
    >
      {options.map((option, idx) => {
        const { key, value } = option

        return (
          <Option
            key={key || `option-${idx}`}
            value={value}
          >
            {key}
          </Option>
        )
      })}

      {/*<Option value="">Choose an option</Option>*/}
      {/*<Option value={1}>Option 1</Option>*/}
      {/*<Option value={2}>Option 2</Option>*/}
      {/*<Option value={3}>Option 3</Option>*/}
      {/*<Option value={4}>Option 4</Option>*/}
    </Select>
  )
}

SingleSelectField.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  mode: PropTypes.string,
  control: PropTypes.object,
  required: PropTypes.bool,
}
export default SingleSelectField
