export const employeeFormStyles = {
    container: 'w-full max-w-full mx-auto bg-[var(--bg-card-obscure)] h-full min-h-full row-start-2 row-end-4 md:col-start-2',
    title: 'text-xl font-bold text-[var(--father-font)]',
    subtitle: 'text-small text-[var(--children-font)]',
    sectionTitle: 'text-lg font-medium text-[var(--father-font)]',
    form: {
        section: 'space-y-2',
        grid: 'grid grid-cols-1 md:grid-cols-2 gap-4',
    },
    input: {
        label: '!text-white/50',
        input: 'label:!text-[var(--father-font)] bg-transparent !text-[var(--father-font)] focus:!bg-white/30 active:!bg-white/30',
        inputWrapper: [
            '!bg-transparent',
            'hover:!bg-white/30',
            '!data-[focused=true]:bg-transparent',
            'data-[hover=true]:!bg-white/30',
            'focus-within:!bg-transparent',
            'focus:!bg-transparent',
            'active:!bg-transparent',
            'focus:border-white/50',
        ],
    },
    select: {
        label: '!text-white/50',
        value: '!text-[var(--father-font)]',
        trigger: [
            'bg-transparent',
            '!text-[var(--father-font)]',
            'focus:!bg-white/30',
            'active:!bg-white/30',
            'hover:!bg-white/30',
            'data-[hover=true]:!bg-white/30',
            'error:!bg-green-500',
        ],
        listbox: 'bg-[#222] !text-[var(--father-font)]',
        popoverContent: 'bg-[#222] border-[#333]',
    },
    imageSection: {
        container: 'mt-4',
        preview: 'relative w-32 !h-32 rounded-full overflow-hidden',
    },
    footer: {
        container: 'flex justify-start flex-row-reverse gap-2',
        saveButton: 'bg-[var(--green-dark-500)] text-white text-sm px-3 py-2 hover:bg-[var(--green-dark-600)] transition-colors',
        cancelButton: 'bg-gray-600 text-white text-sm py-1.5 px-3 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors',
    }
} 