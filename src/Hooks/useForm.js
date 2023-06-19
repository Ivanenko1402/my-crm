import { useEffect, useState } from "react";

const inputStrategies = {
  text(e) {
    return e.target.value;
  },

  password(e) {
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

export const useForm = ({
  data,
  initData,
  validateForm, 
  handleSubmit,
}) => {
  const [formValues, setFormValues] = useState(initData);
  const [formTouched, setFormTouched] = useState({});
  const [isPristine, setIsPristine] = useState(true);
  const errors = validateForm(formValues);

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      ...data,
    }));
  }, [data]);

  function onChangeForm(event) {
    const [fieldName, fieldValue] = inputProcessor(event);
    setFormValues(prev => ({ ...prev, [fieldName]: fieldValue }));
    setFormTouched(prev => ({ ...prev, [fieldName]: true }));
    return;
  }

  const resArr = Object.keys(formTouched).map((key) => [key, formValues[key]]);
  const formValuesTouched = Object.fromEntries(resArr);

  const submitForm = (event) => {
    event.preventDefault();

    if(isPristine) {
      setIsPristine(false);
    };

    if(Object.values(errors).length) {
      return;
    }

    handleSubmit();
  };

  return [
    formValues,
    onChangeForm,
    errors,
    isPristine,
    submitForm,
    formValuesTouched,
  ];
};
