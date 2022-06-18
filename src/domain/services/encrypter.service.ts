export interface IJwt {
  sign(value: any): Promise<string>;
}
