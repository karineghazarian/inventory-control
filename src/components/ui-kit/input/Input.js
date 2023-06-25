import { useEffect, useState } from "react";
import styles from "./Input.module.css";

const Input = (props)=> {
    const [value, setValue] = useState(props.value);

    const onChange = (e)=> {
        if(e.target)
        {
            setValue(e.target.value);
            if(typeof props.onChange === 'function')
            {
                props.onChange(e.target.value)
            }
        }
    };

    useEffect(() => {
        setValue((prevState)=> {
            if(props.value !== prevState)
            {
                return props.value;
            } else {
                return prevState;
            }
        });
    }, [props.value])

    return (
        <div className={`${styles.container} ${props.className || ''}`}>
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