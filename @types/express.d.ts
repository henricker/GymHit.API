declare namespace Express{
    export interface Request{
        admin: {
            admin_id: string,
            email: string
        }
    }
}