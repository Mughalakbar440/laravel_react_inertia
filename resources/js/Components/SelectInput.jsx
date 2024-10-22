import { forwardRef, useImperativeHandle, useRef } from 'react';

const SelectInput = forwardRef(function SelectInput(
    { className = '', children, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    return (
        <select
            {...props}
            className={
                'rounded-md w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 ' +
                className
            }
            ref={localRef}
        >
            {children}
        </select>
    );
});

export default SelectInput;
