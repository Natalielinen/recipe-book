"use client"

import { Button } from "@/components/ui/button";
import { deleteStory } from "@/server/actions/delete-story";
import { ColumnDef, Row } from "@tanstack/react-table";
import { X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import toast from "react-hot-toast";

type StoryColumn = {
    title: string,
    id: number,
    previewImage: string,
    items: string[],
}

const ActionCell = ({ row }: { row: Row<StoryColumn> }) => {

    const story = row.original;

    const { execute } = useAction(deleteStory, {
        onSuccess: (data) => {
            if (data?.data?.error) {
                toast.error(data?.data?.error);
            }
            if (data?.data?.success) {
                toast.success(data?.data?.success);
            }
        },

    });

    return (
        <Button variant="destructive" title="Удалить" onClick={() => execute({ id: story.id })} >
            <X size={16} />
        </Button>

    )
}

export const columns: ColumnDef<StoryColumn>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'title',
        header: 'Название',
    },
    {
        accessorKey: 'previewImage',
        header: 'Превью',
        cell: ({ row }) => {
            const image = row.getValue('previewImage') as string;
            const title = row.getValue('title') as string;

            return (
                <div className="w-[50px] h-[50px]">
                    <Image
                        src={image}
                        alt={title}
                        className="object-cover w-full h-full rounded-md"
                        width={50}
                        height={50}
                    />
                </div>
            );
        }
    },
    {
        accessorKey: 'items',
        header: 'Элементы',
        cell: ({ row }) => {
            const items = row.getValue('items') as string[];
            const title = row.getValue('title') as string;

            return (
                <div className="flex gap-1">
                    {
                        items.map((item, index) => (
                            <div key={index} className="w-[50px] h-[50px]">
                                <Image
                                    src={item}
                                    alt={title}
                                    className="object-cover w-full h-full rounded-md"
                                    width={50}
                                    height={50}
                                />

                            </div>

                        ))
                    }

                </div>
            );
        }
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ActionCell,
    }
]