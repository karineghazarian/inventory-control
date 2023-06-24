const Button = ({children, ...rest}) => {
    return (
        <button {...rest}>
            {children}
        </button>
    );
}

Button.displayName = 'Button';

export default Button;