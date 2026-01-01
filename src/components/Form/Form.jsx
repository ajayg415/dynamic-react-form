import React, { lazy } from "react";
import { formConfig } from "./formConfig";
// import Input from "./Input";
// import Select from "./Select";

const componentMap = {
  text: lazy(() => import("./Input")),
  select: lazy(() => import("./Select")),
};

const Form = () => {
  const [formValues, setFormValues] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const updateFormValues = (e) => {
    validateForm();
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const shouldShowField = (field) => {
    if (!field.dependsOn) return true;

    const dependsOnValues = Array.isArray(field.dependsOn)
      ? field.dependsOn.map((dep) => formValues[dep])
      : [formValues[field.dependsOn]];

    if (typeof field.showIf === "function") {
      return field.showIf(formValues);
    } else if (typeof field.showIf === "string") {
      return dependsOnValues.includes(field.showIf);
    }
    return false;
  };

  const getFormField = (field) => {
    if (shouldShowField(field)) {
      const Comp = componentMap[field.type];
      if (Comp) {
        return (
          <Comp
            onChange={updateFormValues}
            {...field}
            value={formValues[field.name] || ""}
            key={field.name}
          />
        );
      }
      // switch (field.type) {
      //   case "text":
      //     return (<Input onChange={updateFormValues} {...field} value={formValues[field.name] || ""} key={field.name} />);
      //   case "select":
      //     return (<Select onChange={updateFormValues} {...field} value={formValues[field.name] || ""} key={field.name} />);
      //   default:
      //     return null;
      // }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    formConfig.forEach((field) => {
      if (!shouldShowField(field)) return;
      const value = formValues[field.name];
      const rules = field.validation;
      if (rules?.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
      } else if (rules?.pattern && !rules.pattern.test(value)) {
        newErrors[field.name] = rules.message || `${field.label} is invalid`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Form submitted:", formValues);
    alert("Check console for submitted data!");
  };
  return (
    <form onSubmit={submitForm} className="dynamic-form">
      {formConfig.map((field) => getFormField(field))}
      {formConfig.map(field => {
        return errors[field.name] && (
          <p key={field.name} className="errors-list">{errors[field.name]}</p>
        );
      })}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
