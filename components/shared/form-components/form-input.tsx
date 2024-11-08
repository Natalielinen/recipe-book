'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Asterisk } from "lucide-react";
import { ErrorText } from "../error-text";
import { ClearButton } from "../clear-button";
import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInput: React.FC<Props> = ({
    name, label, required, className, ...props
}) => {

    const { register, formState: { errors }, watch, setValue } = useFormContext();

    const value = watch(name);
    const errorText = errors[name]?.message as string;

    const onClear = () => setValue(name, '');

    return <div className={className}>
        {
            label && <Label htmlFor={name} className="flex">
                {label} {required && <Asterisk className="text-red-500" size={16} />}
            </Label>
        }

        <div className="relative">
            <Input
                className="h-12 text-md"
                {...register(name)}
                {...props} />

            {value && <ClearButton onClick={onClear} />}
        </div>

        {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>;
};
