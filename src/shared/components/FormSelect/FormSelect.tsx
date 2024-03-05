import { Form, Select } from "antd";
import { Rule } from "antd/es/form";
import { DefaultOptionType } from "antd/es/select";
import "../FormInput/FormInput.scss";

interface IOption {
  value: string;
  label: string;
}

interface IFormSelect {
  name: any;
  label?: string;
  placeholder?: string;
  style?: any;
  isRequired?: boolean;
  requiredLabel?: string;
  disabled?: boolean;
  rules?: Rule[] | undefined;
  options?: IOption[] | undefined;
  defaultValue?: string;
  isBorder?: boolean;
  classNameForm?: string;
  mode?: "multiple" | "tags";
  maxTagCount?: "responsive";
  value?: string;
  optionFilterProp?: string;
  onFocus?: undefined | any;
  onChange?:
    | ((value: string, option: DefaultOptionType | DefaultOptionType[]) => void)
    | undefined;
  onSearch?: any;
}

const FormSelect = (props: IFormSelect) => {
  const {
    name,
    label,
    isRequired,
    requiredLabel,
    disabled,
    placeholder,
    style,
    rules,
    isBorder,
    classNameForm,
    options,
    defaultValue,
    mode,
    maxTagCount,
    onChange,
    onSearch,
    optionFilterProp,
    value,
    onFocus,
  } = props;

  return (
    <Form.Item
      className={"custome-field"}
      name={name}
      label={label}
      style={style}
      rules={[
        {
          required: isRequired,
          message: `Please select ${requiredLabel ?? label ?? placeholder}`,
        },
        ...(rules ?? []),
      ]}
      initialValue={defaultValue}
    >
      <Select
        size="large"
        defaultValue={defaultValue}
        showSearch
        allowClear
        disabled={disabled}
        onChange={onChange}
        onSearch={onSearch}
        placeholder={placeholder}
        value={value}
        mode={mode}
        onFocus={onFocus}
        optionFilterProp={optionFilterProp}
        maxTagCount={maxTagCount}
        style={style}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        autoComplete="none"
      >
        {options?.map((option: any, i: number) => (
          <Select.Option key={i} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default FormSelect;
