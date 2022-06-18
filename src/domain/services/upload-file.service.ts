
export interface IUploadFileService {
    handle(file: any): { url: string, key: string }
}