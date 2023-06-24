import { useEffect, useState } from "react";
import styles from "./RangeSlider.module.css";


const RangeSlider = ({ min, max, value, step, onChange }) => {

  const [minValue, setMinValue] = useState(value ? value.min : min);
  const [maxValue, setMaxValue] = useState(value ? value.max : max);

  useEffect(() => {
    if (value) {
      setMinValue(value.min);
      setMaxValue(value.max);
    }
  }, [value]);

  const handleMinChange = e => {
    e.preventDefault();
    const newMinVal = Math.min(Number(e.target.value), maxValue - step);
    if (!value) setMinValue(newMinVal);
    onChange({ min: newMinVal, max: maxValue });
  };

  const handleMaxChange = e => {
    e.preventDefault();
    const newMaxVal = Math.max(Number(e.target.value), minValue + step);
    if (!value) setMaxValue(newMaxVal);
    onChange({ min: minValue, max: newMaxVal });
  };

  const minPos = ((minValue - min) / (max - min)) * 100;
  const maxPos = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="range"
          value={minValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMinChange}
        />
        <input
          className={styles.input}
          type="range"
          value={maxValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMaxChange}
        />
      </div>

      <div  className={styles.controlWrapper}>
        <div className={styles.control} style={{ left: `${minPos}%` }} />
        <div className={styles.rail}>
          <div
            className={styles.innerRail} 
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
          />
        </div>
        <div className={styles.control} style={{ left: `${maxPos}%` }} />
      </div>
    </div>
  );
};

export default RangeSlider;