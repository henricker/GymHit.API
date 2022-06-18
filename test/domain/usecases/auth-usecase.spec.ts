import { IUserRepository } from "../../../src/domain/repositories/user-repository.interface";
import { IEncrypter } from "../../../src/domain/services/encrypter.service";
import { IHashComparer } from "../../../src/domain/services/hash-compare.service";
import { AuthUseCase } from "../../../src/domain/usecases/authentication/auth-usecase";
import {
  mockAuthenticationParams,
  mockFakeUserAccount,
} from "../../mocks/mock-account";
import { makeUserRepository } from "../../mocks/repositories/mock-user.repository";
import { HashStub } from "../../mocks/services/mock-hash";
import { EncrypterStub } from "../../mocks/services/mock.encrypter";

type SutType = {
  sut: AuthUseCase;
  repositoryStub: IUserRepository;
  hashStub: IHashComparer;
  encrypterStub: IEncrypter;
};

const makeSut = (): SutType => {
  const repositoryStub = makeUserRepository();
  const hashStub = new HashStub();
  const encrypterStub = new EncrypterStub();
  const sut = new AuthUseCase(repositoryStub, hashStub, encrypterStub);

  return {
    sut,
    repositoryStub,
    encrypterStub,
    hashStub,
  };
};

describe("#UseCase auth", () => {
  it("Should call repository with correct values", async () => {
    const { repositoryStub, sut } = makeSut();
    const repositorySpy = jest.spyOn(repositoryStub, "findOneByEmail");
    const authParams = mockAuthenticationParams();
    sut.handle(authParams);
    expect(repositorySpy).toBeCalledWith(authParams.email);
  });

  it("Should return null if email not exists", async () => {
    const { repositoryStub, sut } = makeSut();

    jest
      .spyOn(repositoryStub, "findOneByEmail")
      .mockImplementationOnce(() => null);

    const received = await sut.handle(mockAuthenticationParams());

    expect(received).toBeNull();
  });

  it("Should throw if repository throws", async () => {
    const { repositoryStub, sut } = makeSut();

    jest.spyOn(repositoryStub, "findOneByEmail").mockImplementationOnce(() => {
      throw new Error();
    });

    const received = sut.handle(mockAuthenticationParams());

    expect(received).rejects.toThrow();
  });

  it("Should call hash comparer with correct values", async () => {
    const { hashStub, sut, repositoryStub } = makeSut();

    const hashSpy = jest.spyOn(hashStub, "compare");
    jest.spyOn(repositoryStub, "findOneByEmail").mockResolvedValueOnce({
      ...mockFakeUserAccount(),
      password: "hash",
    });

    const authParams = mockAuthenticationParams();
    await sut.handle(authParams);

    expect(hashSpy).toHaveBeenCalledWith(authParams.password, "hash");
  });

  it("Should throw if hash comparer throws", async () => {
    const { hashStub, sut } = makeSut();
    jest
      .spyOn(hashStub, "compare")
      .mockRejectedValueOnce(new Error("generic error"));

    const received = sut.handle(mockAuthenticationParams());

    expect(received).rejects.toThrow();
  });

  it("Should call encrypter with correct values", async () => {
    const { encrypterStub, sut, repositoryStub } = makeSut();

    jest.spyOn(repositoryStub, "findOneByEmail").mockResolvedValueOnce({
      ...mockFakeUserAccount(),
      id: 1,
    });

    const encrypterSpy = jest.spyOn(encrypterStub, "sign");

    await sut.handle(mockAuthenticationParams());

    expect(encrypterSpy).toHaveBeenCalledWith(1);
  });

  it("Should throw if encrypter throws", async () => {
    const { encrypterStub, sut } = makeSut();

    jest
      .spyOn(encrypterStub, "sign")
      .mockRejectedValueOnce(new Error("generic_error"));

    const received = sut.handle(mockAuthenticationParams());

    expect(received).rejects.toThrow();
  });

  it("Should return access_token if all right", async () => {
    const { sut } = makeSut();

    const received = await sut.handle(mockAuthenticationParams());

    expect(received).toBe("access_token");
  });
});
