'use client';

interface Props {
    className?: string;
    isEditForm: boolean;
}

export const AddRecipeForm: React.FC<Props> = ({ className, isEditForm }) => {


    return <div>
        {
            isEditForm ? <div>Edit</div> : <div>Add</div>
        }
    </div>;
};