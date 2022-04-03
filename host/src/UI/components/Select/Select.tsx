import { InputOption } from 'types';

import './Select.scss';

type SelectProps = {
  title: string,
  value: string,
  options: InputOption[],
  onChange: (value: string) => void,
}

const Select = (props: SelectProps) => {
  const {
    title,
    value,
    options,
    onChange,
  } = props;

  return (
    <div className="Select">
      <label
        className="Select_label"
        htmlFor="pair-select"
      >
        {title}
      </label>
      <select
        className="Select_input"
        id="pair-select"
        value={value}
        onChange={(event => onChange(event.target.value))}
      >
        {options.map((option) =>
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        )}
      </select>
    </div>
  )
};

export { Select };