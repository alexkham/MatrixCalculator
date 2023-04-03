"use client";

import React, { useState } from 'react'

interface InputProps {
    value?: string | number;
    onChange: (val: string) => void;
    className: string;
    defaultValue?: string | number;
    disabled?: boolean;
    error?: string;
    type?: React.HTMLInputTypeAttribute;
    isNumeric?: boolean;
}
const InputFieldComponent = (props: InputProps) => {
    const [value, setValue] = useState(props.defaultValue);

    const onChangeValue = (value: string) => {
        if (props.isNumeric) {
            value = value.length > 1 ? value.replace(/^0+/, '') : value // replace all leading 0s
            value = value.replace(/\D+/g, '') // replace all characters
        }
        setValue(value || "")
        props.onChange(value);
    }
    const errorBlock = props.error && (
        <span style={{
            position: "absolute",
            left: 0,
            top: 25,
            color: "red",
            fontSize: 12,
            width: 100
        }}>
            {props.error}
        </span>
    )
    return (
        <div style={{ position: "relative" }}>
            <input
                type={props.type}
                disabled={props.disabled}
                className={props.className}
                onChange={e => onChangeValue(e.target.value)}
                // defaultValue={props.defaultValue}
                onFocus={e => e.target.select()}
                value={value}
            />
            {errorBlock}
        </div >
    )
}

export default InputFieldComponent;