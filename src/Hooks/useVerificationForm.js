import { useState } from "react";

const inputStrategies = {
  text(e) {
    return e.target.value;
  },

  number(e) {
    return +e.target.value;
  },

  email(e) {
    return e.target.value;
  },

  tel(e) {
    return e.target.value;
  },

  checkbox(e) {
    return e.target.checked;
  },

  'select-one'(e) {
    return e.target.value;
  },

  'my-select'(e) {
    return e.target.value;
  }
};

function inputProcessor(event) {
  const fieldName = event.target.name;
  const fieldValue = inputStrategies[event.target.type](event);

  return [fieldName, fieldValue];
}

export const useVerificationForm = (data, validateFn, handleSubmit) => {
  const [formValues, setFormValues] = useState(data);
  const [formTouched, setFormTouched] = useState({});
  const [isPristine, setIsPristine] = useState(true);
  const errors = validateFn(formValues);

  function onChangeForm(event) {
    const [fieldName, fieldValue] = inputProcessor(event);
    setFormValues(prev => ({ ...prev, [fieldName]: fieldValue }));
    setFormTouched(prev => ({ ...prev, [fieldName]: true }));
  }

  const submitForm = (event) => {
    event.preventDefault();

    if(isPristine) {
      setIsPristine(false);
    };

    if(Object.values(errors).length) {
      console.log(errors)
      return;
    }

    handleSubmit(formValues, formTouched);
  };

  return [
    formValues,
    onChangeForm,
    errors,
    isPristine,
    submitForm,
  ];
};
