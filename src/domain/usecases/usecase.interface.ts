export interface IUseCase {
  handle(...params: any): Promise<any>;
}
