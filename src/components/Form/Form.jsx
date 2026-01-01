import React from "react";
import { formConfig } from "./formConfig";
import Input from "./Input";
import Select from "./Select";

const Form = () => {
  const [formValues, setFormValues] = React.useState({});

  const updateFormValues = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

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
      switch (field.type) {
        case "text":
          return (<Input onChange={updateFormValues} {...field} value={formValues[field.name] || ""} key={field.name} />);
        case "select":
          return (<Select onChange={updateFormValues} {...field} value={formValues[field.name] || ""} key={field.name} />);
        default:
          return null;
      }
    }
  };

  const submitForm = (e) => {
    console.log("submitting form")
  }
  return <form onSubmit={submitForm} className="dynamic-form">
    {formConfig.map((field) => getFormField(field))}
    <button type="submit">Submit</button>
  </form>;
};

export default Form;
