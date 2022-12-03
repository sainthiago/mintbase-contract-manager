import { Dispatch, SetStateAction } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const InputSelect = ({
  options,
  placeholder,
  isMultiple,
  setValue,
}: {
  options: { value: string; label: string }[];
  placeholder: string;
  isMultiple?: boolean;
  setValue: Dispatch<SetStateAction<string | string[]>>;
}) => {
  return (
    <Select
      closeMenuOnSelect
      components={animatedComponents}
      placeholder={placeholder}
      onChange={(event: any) => {
        console.log(event);
        setValue(event.value);
      }}
      isMulti={isMultiple}
      options={options}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: "#7D9D9C",
          primary: "#576F72",
        },
      })}
      styles={{
        control: (base) => ({
          ...base,
          // padding: "6px 12px",
          borderColor: "#7D9D9C",
          borderWidth: "2px",
          boxShadow: "none",
          ":hover": {
            borderColor: "#7D9D9C",
          },
        }),
      }}
    />
  );
};

export default InputSelect;
