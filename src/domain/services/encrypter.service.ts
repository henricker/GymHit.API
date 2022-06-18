export interface IEncrypter {
  sign(value: any): Promise<string>;
}
