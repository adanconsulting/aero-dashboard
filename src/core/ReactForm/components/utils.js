import { in_array } from "core/utils/array_util";

export const find_dependency = (denpendencies, findName) => {
  let hasDependency = false;
  let dependency = {};
  Object.entries(denpendencies).forEach((entry) => {
    const name = entry[0];
    const dependent = entry[1];
    if (in_array(dependent.on, findName)) {
      hasDependency = true;
      dependency = {
        name: name,
        on: dependent.on,
        callback: dependent.callback,
      };
    }
  });

  if (hasDependency) {
    return dependency;
  }

  return hasDependency;
};

export const find_custom_validator = (callbacks, name) => {
  let hasValidator = false;
  let validator;
  Object.entries(callbacks).forEach((entry) => {
    const inputName = entry[0];
    const callback = entry[1];
    if (inputName === name) {
      hasValidator = true;
      validator = callback;
    }
  });

  if (hasValidator) {
    return validator;
  }

  return hasValidator;
};

export const mapFormValues = (formData, values) => {
  if (values === undefined) return formData;

  const newData = [];
  formData.forEach((item) => {
    if (values[item.name]) {
      newData.push({
        ...item,
        value: values[item.name],
      });
    } else {
      newData.push(item);
    }
  });

  return newData;
};
