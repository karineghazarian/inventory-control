import { useState } from "react";
import styles from "./Input.module.css";

const Input = (props)=> {
    const [value, setValue] = useState(props.value);

    const onChange = (e)=> {
        setValue(e.target.value);
        if(typeof props.onChange === 'function')
        {
            props.onChange(e.target.value)
        }
    };
    return (
        <div className={styles.container}>
            {
                props.label ? (
                    <label className={styles.label}>{props.label}</label>
                ) : null
            }
            <input value={value} onChange={onChange} type={props.type}/>
        </div>
    );
};

Input.displayName = 'Input';
export default Input;