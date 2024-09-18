import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Asterisk } from "lucide-react";
import { ErrorText } from "../error-text";
import { ClearButton } from "../clear-button";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
    errorText?: string;
}

export const FormInput: React.FC<Props> = ({
    name, label, required, className, errorText = '', ...props
}) => {
    return <div className={className}>
        {
            label && <Label htmlFor={name}>
                {label} {required && <Asterisk className="text-red-500" size={8} />}
            </Label>
        }

        <div className="relative">
            <Input
                className="h-12 text-md"
                {...props} />

            <ClearButton />
        </div>

        <ErrorText text={errorText} className="mt-2" />
    </div>;
};