import ReactDatePicker from 'react-datepicker';
import styled from 'styled-components';

interface DatePickerMProps {
  label: string;
  date: Date;
  onChange: (date: Date) => void;
}

function DatePickerM({ label, date, onChange }: DatePickerMProps) {
  return (
    <Label>
      {label}
      <MyDatePicker
        selected={date}
        dateFormat="yyyy-MM-dd"
        onChange={onChange}
      />
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

const MyDatePicker = styled(ReactDatePicker)`
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.gray040};
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray200};
  font-size: ${({ theme }) => theme.fonts.size.base};
  padding: 10px;
  margin-top: 10px;
`;

export default DatePickerM;
