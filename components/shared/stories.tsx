'use client';

import React from "react";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";
import ReactStories from 'react-insta-stories';
import { IStory } from "@/app/services/stories";
import { Api } from "@/app/services/api-client";

interface Props {
    className?: string;
    lng: string;
}

export const Stories: React.FC<Props> = ({ className, lng }) => {

    const [stories, setStories] = React.useState<IStory[]>([]);
    const [open, setOpen] = React.useState(false);
    const [selectedStory, setSelectedStory] = React.useState<IStory>();

    React.useEffect(() => {
        async function fetchStories() {
            const data = await Api.stories.getAll(lng);
            setStories(data);
        }

        fetchStories();
    }, []);

    const onClickStory = (story: IStory) => {
        setSelectedStory(story);

        if (story.items.length > 0) {
            setOpen(true);
        }
    };


    return <div className={cn('flex items-center justify-between gap-2 my-10', className)}>
        {stories.length === 0 &&
            [...Array(6)].map((_, index) => (
                <div key={index} className="w-[20%] h-[25vh] bg-gray-200 rounded-md animate-pulse" />
            ))}

        {stories.map((story) => (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img
                key={story.id}
                onClick={() => onClickStory(story)}
                className="rounded-md cursor-pointer"
                height="25%"
                width="20%"
                src={story.previewImageUrl}
            />
        ))}

        {open && (
            <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
                <div className="relative w-[80%] h-[80%]">
                    <button className="absolute -right-10 -top-5 z-30" onClick={() => setOpen(false)}>
                        <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
                    </button>

                    <ReactStories
                        onAllStoriesEnd={() => setOpen(false)}
                        stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
                        defaultInterval={3000}
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>
        )}
    </div>;
};