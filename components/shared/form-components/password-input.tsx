import React from "react";
import { FormInput } from "./form-input";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
    name?: string;
    label?: string;
}

export const PasswordInput = ({
    name = "password",
    label = "Пароль",
}: PasswordInputProps) => {
    const [inputType, setInputType] = React.useState("password");

    const togglePassword = () =>
        setInputType((prev) => (prev === "password" ? "text" : "password"));

    const renderIcon = () => {
        return (
            <button
                onClick={togglePassword}
                type="button"
                className="absolute right-9 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer"
            >
                {inputType === "password" ? <Eye /> : <EyeOff />}
            </button>
        );
    };

    return (
        <FormInput
            name={name}
            label={label}
            type={inputType}
            passwordIcon={renderIcon()}
            required
        />
    );
};
