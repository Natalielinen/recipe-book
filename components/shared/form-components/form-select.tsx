'use client';

import { Label } from "@radix-ui/react-label";
import { Asterisk } from "lucide-react";
import { ErrorText } from "../error-text";
import { Controller, useFormContext } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
    options?: { label: string; value: string }[];
    selected?: string;
    placeholder?: string;
    disabled?: boolean
}

export const FormSelect: React.FC<Props> = ({
    name, label, options, placeholder, required, className, disabled = false
}) => {

    const { control } = useFormContext();

    return <div className={className}>
        {
            label && <Label htmlFor={name} className="flex">
                {label} {required && <Asterisk className="text-red-500" size={16} />}
            </Label>
        }

        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => {
                return <>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled} >

                        <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                options && options.map((item) => <SelectItem key={item.value} value={String(item.value)}>{item.label}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                    {fieldState.error && <ErrorText text={fieldState.error.message as string} />}
                </>
            }}

        />

    </div>;
};
