import { useEffect, useState } from "react";

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

function deepEqual(obj1, obj2) {
  if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!obj2.hasOwnProperty(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

export const useForm = (data, validateFn, handleSubmit) => {
  const [formValues, setFormValues] = useState(data);
  const [formTouched, setFormTouched] = useState({});
  const [isPristine, setIsPristine] = useState(true);
  const errors = validateFn(formValues);

  useEffect(() => {
    if (!deepEqual(data, formValues)) {
      setFormValues(data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function onChangeForm(event) {
    const [fieldName, fieldValue] = inputProcessor(event);
    setFormValues(prev => ({ ...prev, [fieldName]: fieldValue }));
    setFormTouched(prev => ({ ...prev, [fieldName]: true }));
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
