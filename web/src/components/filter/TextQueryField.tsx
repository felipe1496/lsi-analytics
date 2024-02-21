import React from 'react';

import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { TextQueryFieldOperator, TextQueryFieldValue } from './types';

interface TextQueryField {
  field: string;
  label?: string;
  onChange?: (value: TextQueryFieldValue) => void;
}

export const TextQueryField: React.FC<TextQueryField> = ({
  field,
  label,
  onChange = () => {},
}) => {
  const [value, setValue] = React.useState<TextQueryFieldValue>({
    operator: null,
    text: null,
  });

  React.useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  const handleChangeOperator = (operator: TextQueryFieldOperator) => {
    setValue((prevState) => ({
      ...prevState,
      operator,
    }));
  };
  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prevState) => ({
      ...prevState,
      text: event.target.value,
    }));
  };
  return (
    <div className="flex items-center gap-2">
      <span>{label ?? field}</span>
      <Select onValueChange={handleChangeOperator}>
        <SelectTrigger className="w-60">
          <SelectValue placeholder="Operador" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="contains">Contém</SelectItem>
          <SelectItem value="startsWith">Começa com</SelectItem>
          <SelectItem value="endsWith">Termina com</SelectItem>
        </SelectContent>
      </Select>
      <Input onChange={handleChangeText} />
    </div>
  );
};
