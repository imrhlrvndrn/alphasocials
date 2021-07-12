import { useEffect, useState } from 'react';

export const useDebounce = (value, timeout) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedValue((prevState) => value);
        }, timeout);

        return () => clearTimeout(timerId);
    }, [value, timeout]);

    return debouncedValue;
};
