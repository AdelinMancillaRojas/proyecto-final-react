import React, { useState, MutableRefObject } from 'react';
import { Input, Label, FormGroup, FormFeedback } from 'reactstrap';

interface IFromInputProps {
  refer?: MutableRefObject<any>;
  validator?: RegExp;
  label: string;
  placeholder?: string;
  errMessage?: string;
}

export const FromInput = (props: IFromInputProps) => {
  const [isValidValue, setIsValidValue] = useState(false);
  const [value, setValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (props.validator) setIsValidValue(props.validator.test(e.target.value));
    else setIsValidValue(true);
  };

  return (
    <FormGroup>
      <Label>{props.label}</Label>
      <Input
        placeholder={props.placeholder}
        ref={props.refer}
        value={value}
        onChange={onChange}
        invalid={!isValidValue}
        valid={isValidValue}
      />
      <FormFeedback>{props.errMessage}</FormFeedback>
    </FormGroup>
  );
};
