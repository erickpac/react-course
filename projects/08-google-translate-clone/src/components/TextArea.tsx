/* eslint-disable react/react-in-jsx-scope */
import { Form } from "react-bootstrap";
import { SectionType } from "../types/types.d";

interface Props {
  type: SectionType;
  loading?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const commonStyles = { border: 0, height: "200px" };

const getPlaceHolder = (type: SectionType, loading: boolean) => {
  if (type === SectionType.From) return "Enter text";
  if (loading) return "Translating...";
  return "Translation";
};

export const TextArea = ({ type, loading, value, onChange }: Props) => {
  const styles =
    type === SectionType.From
      ? commonStyles
      : { ...commonStyles, background: "#f5f5f5" };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <Form.Control
      as="textarea"
      disabled={type === SectionType.To}
      placeholder={getPlaceHolder(type, loading || false)}
      autoFocus={type === SectionType.From}
      style={styles}
      value={value}
      onChange={handleChange}
    />
  );
};
