import { Sparkles } from "lucide-react";
import { Title } from "./title";
import { User } from "@/generated/prisma";
import React from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { Lang, translation } from "@/translation/translation";

interface ProfileHeaderProps {
    user: User;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
    const { lang } = useLanguage();
    return (
        <div className="flex gap-2">
            <Title
                text={`${translation[lang as Lang].personalData} | ${user.fullName ? user.fullName : `#${user.id}`
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
