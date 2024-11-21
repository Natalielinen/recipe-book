'use client';

import { Label } from "@radix-ui/react-label";
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    className?: string;
}

export const FormCheckbox: React.FC<Props> = ({
    name, label, className, ...props
}) => {

    const { control } = useFormContext();


    return <div className={cn(className, 'flex items-center gap-2')}>
        {
            label && <Label htmlFor={name}>
                {label}
            </Label>
        }

        <Controller
            control={control}
            name={name}
            render={({ field }) => {
                return <Checkbox
                    id={name}
                    checked={field.value}
                    onCheckedChange={field.onChange}

                />
            }}

        />

    </div>;
};
