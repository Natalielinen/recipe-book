import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Asterisk } from "lucide-react";

interface Props {
    name: string;
    label?: string;
    required?: boolean;
    className?: string
}

export const FormInput: React.FC<Props> = ({
    name, label, required, className, ...props
}) => {
    return <div className={className}>
        {
            label && <Label htmlFor={name}>
                {label} {required && <Asterisk className="text-red-500" size={8} />}
            </Label>
        }

        <div className="relative">
            <Input className="h-12 text-md" {...props} />
        </div>
    </div>;
};