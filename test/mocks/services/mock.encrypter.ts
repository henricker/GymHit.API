import { IJwt } from "../../../src/domain/services/encrypter.service";

export class EncrypterStub implements IJwt {
  async sign(value: any): Promise<string> {
    return "access_token";
  }
}
