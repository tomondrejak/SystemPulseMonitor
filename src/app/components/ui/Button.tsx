import React from 'react';
import './Button.scss';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | React.ReactNode;
  class?: string;
  variant?: 'primary' | 'secondary';
  children?: React.ReactNode;
}

const Button: React.FC<IButton> = (props) => {
  const { label, type = 'button', variant = 'primary', ...restProps } = props;

  const className = `btn btn--${variant} ${props.class || ''}`.trim();
  return (
    <button type={type} {...restProps} className={className}>
      {label}
    </button>
  );
};

export default Button;
