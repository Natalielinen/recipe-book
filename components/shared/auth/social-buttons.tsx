import { Button } from "@/components/ui/button"
import Image from "next/image";
import { signIn } from "next-auth/react";

export const SocialButtons = () => {

    const handleSocialButtonClick = (provider: string) => {
        signIn(provider, {
            callbackUrl: '/',
            redirect: true,
        })
    };

    return (
        <div className="flex gap-4 justify-center">
            <Button
                variant="default"
                onClick={() => handleSocialButtonClick('yandex')}
                type="button"
                className="h-12"
            >
                <Image src="/assets/images/yandex.png" alt="yandex" width={20} height={20} />
            </Button>
            <Button
                variant="default"
                onClick={() => handleSocialButtonClick('google')}
                type="button"
                className="h-12"
            >
                <Image src="/assets/images/google.png" alt="google" width={20} height={20} />
            </Button>

        </div>
    )
}