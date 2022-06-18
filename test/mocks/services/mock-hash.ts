import { IHash } from "../../../src/domain/services/hash-compare.service";

export class HashStub implements IHash {
  async compare(value: string, hash: string): Promise<boolean> {
    return true;
  }
}
