export class HTTPError extends Error {
    // statusCode: number;
    // context?: string;

    constructor(public statusCode: number, message: string, public context?: string) {
        super(message);
    }
}
