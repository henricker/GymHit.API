import bcrypt from 'bcrypt';
import { BcryptAdapter } from '../../../../src/main/adapters/bcrypt/bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return 'hashed_value';
  },
  async compare(): Promise<boolean> {
    return true;
  },
}));

type SutTypes = {
  sut: BcryptAdapter;
};

const makeSut = (salt: number): SutTypes => {
  const sut = new BcryptAdapter(12);
  return {
    sut,
  };
};
describe('Bcrypt Adapter', () => {
  describe('Hash()', () => {
    it('Should call hash with correct values', async () => {
      const salt = 12;
      const { sut } = makeSut(salt);
      const hashSpy = jest.spyOn(bcrypt, 'hash');
      await sut.hash('any_value');
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
    });

    it('Should return a hash on success', async () => {
      const salt = 12;
      const { sut } = makeSut(salt);
      const hashedValue = await sut.hash('any_value');
      expect(hashedValue).toBe('hashed_value');
    });

    it('Should throw if hash throws', async () => {
      const salt = 12;
      const { sut } = makeSut(salt);
      jest.spyOn(bcrypt as any, 'hash').mockRejectedValueOnce(new Error());
      const promise = sut.hash('any_value');
      await expect(promise).rejects.toThrow();
    });
  });

  describe('compare()', () => {
    it('should call compare with correct values', async () => {
      const { sut } = makeSut(12);

      const compareSpy = jest.spyOn(bcrypt, 'compare');
      await sut.compare('any_value', 'any_hash');
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
    });

    it('should return true when compare succeeds', async () => {
      const { sut } = makeSut(12);
      const isValid = await sut.compare('any_value', 'any_hash');
      expect(isValid).toBeTruthy();
    });

    it('should return false when compare fails', async () => {
      const { sut } = makeSut(12);

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementationOnce((data, encrypter) => false);
      const isValid = await sut.compare('any_value', 'any_hash');
      expect(isValid).toBeFalsy();
    });

    it('should throw if compare throws', async () => {
      const salt = 12;
      const { sut } = makeSut(salt);
      jest.spyOn(bcrypt as any, 'compare').mockRejectedValueOnce(new Error());
      const promise = sut.compare('any_value', 'hashed_value');
      await expect(promise).rejects.toThrow();
    });
  });
});
