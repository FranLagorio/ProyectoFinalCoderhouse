import { Input, FormFeedback, Label } from 'reactstrap'

export const InputYupForm = ({ inputName, validation, typeInput }) => {
  return (
    <div className="mb-3">
      <Label className="form-label" style={{ textTransform: 'capitalize' }}>
        {inputName}
      </Label>
      <Input
        name={inputName}
        value={validation.values[inputName] || ''}
        type={typeInput}
        placeholder={`Enter ${inputName}`}
        onChange={validation.handleChange}
        onBlur={validation.handleBlur}
        invalid={validation.touched[inputName] && validation.errors[inputName]}
      />
      {validation.touched[inputName] && validation.errors[inputName] ? (
        <FormFeedback type="invalid">
          {validation.errors[inputName]}
        </FormFeedback>
      ) : null}
    </div>
  )
}
