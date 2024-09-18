'use client';

import { RecipeDto } from '@/app/services/dto/recipe.dto';
import { useForm } from 'react-hook-form';

interface Props {
    className?: string;
    isEditForm: boolean;
    recipe: RecipeDto;
}

export const AddRecipeForm: React.FC<Props> = ({ className, recipe, isEditForm }) => {

    const editFormValues = {

    };

    const addFormValues = {
        categoryId: 1,
        recipeName: '',
        fullDescription: '',
        ingredients: [],
        servings: 1,

    };

    // const form = useForm({
    //     resolver: zodResolver(),
    //     defaultValues: isEditForm ? editFormValues : addFormValues
    // })


    return <div>
        {
            isEditForm ? <div>Edit</div> : <div>Add</div>
        }
    </div>;
};