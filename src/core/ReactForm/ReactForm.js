import React, { useState, useEffect, useMemo, useRef } from "react";
import validate from "validate.js";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import CurrencyField from "./components/CurrencyField";
import SubmitButton from "./components/SubmitButton";
import SelectField from "./components/SelectField";
import TextArea from "./components/TextArea";
import DatePicker from "./components/DatePicker";
import SimpleTextField from "./components/SimpleTextField";
import PhoneNumberField from "./components/PhoneNumberField";

import { find_dependency, find_custom_validator } from "./components/utils";
import { in_array, not_in_array } from "core/utils/array_util";
import {
  reduce_nested_object,
  object_reduce,
  isEqualObject,
} from "core/utils/object_util";
import PasswordField from "./components/PasswordField";

const checkUserType = createSelector(
  (state) => state.user,
  (user) => user.type
);

const ReactForm = (props) => {
  const [loading, setLoading] = useState(false);
  const userType = useSelector(checkUserType);
  const [dateError, setDateError] = useState(false);
  const [serverLoad, setServerLoad] = useState(props.serverLoad);
  let delayDebounceFn = useRef(1);
  const workingField = useRef(null);

  useEffect(() => {
    setServerLoad(props.serverLoad);
  }, [props.serverLoad]);

  const schema = useMemo(() => reduce_nested_object(props.data, "schema"), [
    props.data,
  ]);

  const dependencies = useMemo(
    () => object_reduce(props.data, "name", "dependency"),
    [props.data]
  );

  const customValidators = useMemo(
    () => object_reduce(props.data, "name", "validator"),
    [props.data]
  );

  const defaultValues = useMemo(
    () => object_reduce(props.data, "name", "value"),
    [props.data]
  );

  const [formState, setFormState] = useState({
    isValid: false,
    values: defaultValues || {},
    touched: {},
    errors: {},
  });

  const [customValidator, setCustomValidator] = useState({});

  useEffect(() => {
    const newValues = { ...defaultValues };

    if (formState.values !== defaultValues) {
      newValues.enableSubmitButton = true;
    }

    setFormState((formState) => ({
      ...formState,
      values: newValues || {},
    }));
  }, [props.data]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (props.onSubmit) {
      const values = formState.values;
      if (values.enableSubmitButton) delete values.enableSubmitButton;

      await props.onSubmit(values);
    }
    setLoading(false);
  };

  const onDateError = (error) => {
    if (error) {
      setDateError(true);
    } else {
      setDateError(false);
    }
  };

  const hasError = (name) => {
    if (customValidator[name]) {
      return customValidator[name].error;
    }

    return formState.touched[name] && formState.errors[name] ? true : false;
  };

  const getHelperText = (name) => {
    if (customValidator[name]) {
      return customValidator[name].helperText;
    }

    return hasError(name) ? formState.errors[name][0] : null;
  };

  const handleDateChange = (inputName, date) => {
    setServerLoad(false);
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [inputName]: date,
      },
    }));
  };

  const onNumberFieldChange = (name, value) => {
    clearTimeout(delayDebounceFn);
    delayDebounceFn = setTimeout(() => {
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          [name]: value,
        },
        touched: {
          ...formState.touched,
          [name]: true,
        },
      }));

      setServerLoad(false);
      callDependencies(name, value);
    }, 500);
  };

  const handleChange = (event) => {
    event.persist();

    if (event.target.name === workingField.current) {
      clearTimeout(delayDebounceFn);
    } else {
      workingField.current = event.target.name;
    }
    delayDebounceFn = setTimeout(() => {
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          [event.target.name]:
            event.target.type === "checkbox"
              ? event.target.checked
              : event.target.value,
        },
        touched: {
          ...formState.touched,
          [event.target.name]: true,
        },
      }));

      setServerLoad(false);
      callDependencies(event.target.name, event.target.value);
      callCustomValidator(event.target.name, event.target.value);
    }, 500);
  };

  const callCustomValidator = async (name, value) => {
    const callback = find_custom_validator(customValidators, name);
    if (callback) {
      const result = await callback(value);
      setCustomValidator((oldState) => ({
        ...oldState,
        [name]: {
          error: result.error,
          helperText: result.helperText,
        },
      }));
    }
  };

  const callDependencies = (name, value) => {
    const dependency = find_dependency(dependencies, name);
    if (dependency) {
      let dependentValues = [];
      dependency.on.forEach((item) => {
        let v;
        if (item === name) {
          v = value;
        } else {
          v = formState.values[item];
        }
        dependentValues.push({
          name: item,
          value: v,
        });
      });

      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          [dependency.name]: dependency.callback(dependentValues),
        },
        touched: {
          ...formState.touched,
          [dependency.name]: true,
        },
      }));
    }
  };

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  return (
    <form style={{ ...props.style }} onSubmit={handleOnSubmit}>
      {props.data.map((input) => {
        if (input.permissions) {
          if (input.permissions.allow) {
            if (not_in_array(input.permissions.allow, userType)) {
              return null;
            }
          } else if (input.permissions.deny) {
            if (in_array(input.permissions.deny, userType)) {
              return null;
            }
          }
        }

        if (input.type === "submit") {
          const enableSubmitButton =
            !formState.isValid ||
            isEqualObject(formState.values, defaultValues) ||
            dateError ||
            serverLoad;
          return (
            <SubmitButton
              key="submit-button"
              input={input}
              enableSubmitButton={enableSubmitButton}
              loading={loading}
            />
          );
        }

        if (input.type === "currency") {
          return (
            <CurrencyField
              key={input.name}
              error={hasError(input.name)}
              helperText={getHelperText(input.name)}
              callback={onNumberFieldChange}
              inputvalue={formState.values[input.name]}
              input={input}
            />
          );
        }

        if (input.type === "datepicker") {
          return (
            <DatePicker
              key={input.name}
              value={formState.values[input.name]}
              onChange={handleDateChange}
              onError={onDateError}
              input={input}
            />
          );
        }

        if (input.type === "phonenumber") {
          return (
            <PhoneNumberField
              key={input.name}
              error={hasError(input.name)}
              helperText={getHelperText(input.name)}
              callback={onNumberFieldChange}
              inputvalue={formState.values[input.name]}
              input={input}
            />
          );
        }

        if (input.type === "select") {
          return (
            <SelectField
              key={input.name}
              error={hasError(input.name)}
              helperText={getHelperText(input.name)}
              callback={handleChange}
              inputvalue={formState.values[input.name]}
              input={input}
            />
          );
        }

        if (input.type === "textarea") {
          return (
            <TextArea
              key={input.name}
              error={hasError(input.name)}
              helperText={getHelperText(input.name)}
              callback={handleChange}
              inputvalue={formState.values[input.name]}
              input={input}
            />
          );
        }

        if (input.type === "password") {
          return (
            <PasswordField
              key={input.name}
              error={hasError(input.name)}
              helperText={getHelperText(input.name)}
              callback={handleChange}
              inputvalue={formState.values[input.name]}
              input={input}
            />
          );
        }

        if (input.type === "hidden") {
          return (
            <input
              key={input.name}
              type="hidden"
              name={input.name}
              value={formState.values[input.name] || ""}
            />
          );
        }

        return (
          <SimpleTextField
            key={input.name}
            error={hasError(input.name)}
            helperText={getHelperText(input.name)}
            callback={handleChange}
            inputvalue={formState.values[input.name]}
            input={input}
          />
        );
      })}
    </form>
  );
};

ReactForm.propTypes = {
  data: PropTypes.array.isRequired,
  serverLoad: PropTypes.bool,
  onSubmit: PropTypes.func,
};

ReactForm.defaultProps = {
  serverLoad: false,
};

export default ReactForm;
