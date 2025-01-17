export enum STATUS {
    PENDING = 'Pending',
    FAIL = 'Fail',
    COMPLETE = 'Complete',
}

export const toStatus = (status: string) => {
    return status === 'Pending'
        ? 'info'
        : status === 'Fail'
            ? 'error'
            : 'success'
}
