import React from 'react';

// slider that adjusts the rate value and shows the value on the left
const Slider = (props) => {
  const [value, setValue] = React.useState(props.value || 50);

  const handleChange = (event) => {
    setValue(event.target.value);
    // props.onChange(event.target.value);
  };

  return (
    <div className="slider">
      <div className="slider-value">{value}</div>
      <input
        type="range"
        min={props.min}
        max={props.max}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Slider;
