import { Sparkles } from "lucide-react";
import { Title } from "./title";
import { User } from "@/generated/prisma";
import React from "react";

interface ProfileHeaderProps {
    user: User;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
    return (
        <div className="flex gap-2">
            <Title
                text={`${"Личные данные"} | ${user.fullName ? user.fullName : `#${user.id}`
                    }`}
                size="md"
                className="font-bold"
            />
            {user.vip && (
                <span className="flex font-bold text-2xl text-orange-300">
                    vip <Sparkles size={16} />
                </span>
            )}
        </div>
    );
};
