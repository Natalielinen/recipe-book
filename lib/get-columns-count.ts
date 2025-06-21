export const getColumnsCount = (length: number): number => {
        if (length >= 5 && length < 15) {
            return 2;
        } else if (length >= 15) {
            return 3;
        }
        return 1;
    };