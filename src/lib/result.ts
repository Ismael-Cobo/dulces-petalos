export type Success<T> = {
    ok: true;
    data: T;
    error: null;
};

export type Failure<E = ApiFailure> = {
    ok: false;
    data: null;
    error: E;
};

export type Result<T, E = ApiFailure> = Success<T> | Failure<E>;

export type ApiFailure = {
    message: string;
    statusCode: number;
};

// Constructores
export const ok = <T>(data: T): Success<T> => ({ ok: true, data, error: null });
export const fail = (error: ApiFailure): Failure<ApiFailure> => ({ ok: false, data: null, error });
