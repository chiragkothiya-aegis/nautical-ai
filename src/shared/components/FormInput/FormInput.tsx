import { Form, Input, InputNumber } from "antd";
import { Rule } from "antd/es/form";
import "./FormInput.scss";

interface IFormInput {
  name: any;
  type?: string;
  label?: string;
  classNameForm?: string;
  inputMode?:
    | "url"
    | "email"
    | "text"
    | "search"
    | "none"
    | "tel"
    | "numeric"
    | "decimal";
  placeholder?: string;
  prefix?: any;
  value?: any;
  isRequired?: boolean;
  requiredLabel?: string;
  isDisabled?: boolean;
  isReadonly?: boolean;
  isBorder?: boolean;
  isUpperCase?: boolean;
  rules?: Rule[] | undefined;
  defaultValue?: any;
  initialValue?: any;
  min?: number;
  style?: any;
  size?: "middle" | "small" | "large";
  precision?: number;
  step?: number;
  allowClear?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
}

const FormInput = (props: IFormInput) => {
  const {
    name,
    type,
    inputMode,
    value,
    label,
    classNameForm,
    isRequired,
    requiredLabel,
    prefix,
    isBorder,
    isDisabled,
    isReadonly,
    isUpperCase,
    placeholder,
    rules,
    defaultValue,
    initialValue,
    style,
    onChange,
    onBlur,
    min,
    precision,
    step,
    allowClear,
  } = props;

  const toInputUppercase = (e: any) => {
    if (isUpperCase) {
      e.target.value = ("" + e.target.value).toUpperCase();
    }
  };

  return (
    <>
      <Form.Item
        // className={
        //   `field-bg ${isBorder ? "field-border" : ""} ` + classNameForm
        // }
        // style={style}
        className="custome-field"
        name={name}
        label={label}
        initialValue={initialValue}
        rules={[
          {
            required: isRequired,
            message: `Please enter your ${
              requiredLabel ?? label ?? placeholder
            }`,
          },
          ...(rules ?? []),
        ]}
      >
        {type === "password" ? (
          <Input.Password
            size="middle"
            placeholder={placeholder}
            disabled={isDisabled}
            min={min}
            onChange={onChange}
            onBlur={onBlur}
          />
        ) : (
          <Input
            size="middle"
            // name={name}
            value={value}
            type={type ?? "text"}
            placeholder={placeholder}
            onInput={toInputUppercase}
            inputMode={inputMode ?? "text"}
            disabled={isDisabled}
            prefix={prefix}
            min={min}
            defaultValue={defaultValue}
            onChange={onChange}
            readOnly={isReadonly}
            onBlur={onBlur}
            allowClear={allowClear}
          />
        )}
      </Form.Item>
    </>
  );
};

export default FormInput;
