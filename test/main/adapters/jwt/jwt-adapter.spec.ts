import jwt, { JwtPayload } from 'jsonwebtoken';
import { JwtAdapter } from '../../../../src/main/adapters/jwt/jwt-adapter';

type SutTypes = {
  sut: JwtAdapter;
};

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return 'any_token';
  },

  async verify(): Promise<string | JwtPayload> {
    return {
      id: 'any_value',
    };
  },
}));

const makeSut = (): SutTypes => {
  const sut = new JwtAdapter('secret');
  return {
    sut,
  };
};

describe('Jwt Adapter', () => {
  describe('sign()', () => {
    it('should call sign method of jwt', async () => {
      const { sut } = makeSut();
      const signSpy = jest.spyOn(jwt, 'sign');
      await sut.sign('any_id');
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
    });

    it('should throw if sign method of jwt throws', async () => {
      const { sut } = makeSut();
      jest.spyOn(jwt as any, 'sign').mockImplementationOnce(() => {
        throw new Error();
      });
      const promise = sut.sign('any_id');
      await expect(promise).rejects.toThrow();
    });

    it('should return a token on success', async () => {
      const { sut } = makeSut();
      const token = await sut.sign('any_id');
      expect(token).toBe('any_token');
    });
  });

  describe('verify()', () => {
    it('should call verify method of jwt', async () => {
      const { sut } = makeSut();
      const signSpy = jest.spyOn(jwt, 'verify');
      await sut.verify('any_token');
      expect(signSpy).toHaveBeenCalledWith('any_token', 'secret');
    });

    it('should throw if verify method of jwt throws', async () => {
      const { sut } = makeSut();
      jest.spyOn(jwt as any, 'verify').mockImplementationOnce(() => {
        throw new Error();
      });
      const promise = sut.verify('any_token');
      await expect(promise).rejects.toThrow();
    });

    it('should return a value on success', async () => {
      const { sut } = makeSut();
      const value = await sut.verify('any_token');
      expect(value).toBe('any_value');
    });
  });
});
