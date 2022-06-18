import { IEncrypter } from '../../../src/domain/services/encrypter.service';

export class EncrypterStub implements IEncrypter {
  async sign(value: any): Promise<string> {
    return 'access_token';
  }
}
