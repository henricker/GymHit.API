import jwt from "jsonwebtoken";
import { IJwt } from "../../../domain/services/encrypter.service";

export class JwtAdapter implements IJwt {
  constructor(private readonly secretKey: string) {}

  async sign(value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secretKey);
    return accessToken;
  }

  async verify(token: string): Promise<string> {
    const value = await jwt.verify(token, this.secretKey);
    return value.id;
  }
}
