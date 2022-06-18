export interface IHash {
  compare(value: string, hash: string): Promise<boolean>;
}
