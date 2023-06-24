import styles from './Button.module.css';

const Button = ({children, ...rest}) => {
    return (
        <button {...rest} className={styles.button}>
            {children}
        </button>
    );
}

Button.displayName = 'Button';

export default Button;