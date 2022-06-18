import { IHashComparer } from "../../../src/domain/services/hash-compare.service";

export class HashStub implements IHashComparer {
  async compare(value: string, hash: string): Promise<boolean> {
    return true;
  }
}
