export type TContext = { params: Promise<{ id: string }> }
export type TReactFormHookComponent <T>= {
    defaultValues: T,
    onSubmitAction: (value: T) => void
};