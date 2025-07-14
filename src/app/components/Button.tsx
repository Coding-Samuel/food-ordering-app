"use client";
import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
}

const Button = ({handleClick, children, ...props}:Props) => {
  return (
    <button onClick={handleClick} {...props}>{children}</button>
  )
}

export default Button;