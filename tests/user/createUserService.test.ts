import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock('bcryptjs', () => (
  {
    hash: vi.fn().mockResolvedValue('hashedPassword')
  }
));

vi.mock('../../src/models/userModel', () => {
  const mockSave = vi.fn().mockResolvedValue({
    _id: 'someUserId',
    email: 'teste1@test.com',
  });

  return {
    User: {
      findOne: vi.fn(),
      prototype: {
        save: mockSave
      }
    }
  }
});


import { CreateUserService } from '../../src/services/user/createUserService';
import { IUser } from "../../src/models/userModel";

describe('CreateUserService', () => {
  let createUserService: CreateUserService;
  
  beforeEach(() => {
    createUserService = new CreateUserService();
    vi.clearAllMocks();
  });
  
  it('deve criar um teste básico que passa', () => {
    expect(1 + 1).toBe(2);
  });
  
  it('deve validar email vazio', async () => {
    return await expect(
      createUserService.execute({ email: '', password: '' } as IUser)
    ).rejects.toThrow('Email é obrigatorio!');
  });
});