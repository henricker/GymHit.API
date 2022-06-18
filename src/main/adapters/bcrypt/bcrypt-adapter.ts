import brcrypt from 'bcrypt';
import { IHash } from '../../../domain/services/hash-compare.service';

export class BcryptAdapter implements IHash {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    const hashedValue = await brcrypt.hash(value, this.salt);
    return hashedValue;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await brcrypt.compare(value, hash);
    return isValid;
  }
}
