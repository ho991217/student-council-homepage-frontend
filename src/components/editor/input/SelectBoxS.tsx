import styled from 'styled-components';

interface SelectBoxSProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: string[];
  defaultMsg: string;
}

SelectBoxS.defaultProps = {
  options: ['options'],
};

function SelectBoxS({
  label,
  value,
  onChange,
  options,
  defaultMsg,
}: SelectBoxSProps) {
  return (
    <Label>
      {label}
      <Select name="value" value={value} onChange={onChange}>
        <option value="" disabled>
          {defaultMsg}
        </option>
        {options?.map((option: string) => (
          <option key={options.indexOf(option)} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </Label>
  );
}

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.size.md};
  user-select: none;
`;

const Select = styled.select`
  font-size: ${({ theme }) => theme.fonts.size.base};
  color: black;
  width: 400px;
  height: 40px;
  margin-top: 15px;
  padding-left: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray400};
  ${({ theme }) => theme.media.tablet} {
    width: 300px;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 180px;
  }
`;

export default SelectBoxS;
