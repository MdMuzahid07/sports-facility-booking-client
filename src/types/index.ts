import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface CustomError {
    message?: string;
    messages?: string[];
}

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError & { data: CustomError } => {
    return typeof error === 'object' && error !== null && 'data' in error;
};
export const isSerializedError = (error: unknown): error is SerializedError => {
    return typeof error === 'object' && error !== null && 'message' in error;
};
