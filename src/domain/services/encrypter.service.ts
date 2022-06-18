export interface IEncrypter {
  sign(value: string): Promise<string>;
}
