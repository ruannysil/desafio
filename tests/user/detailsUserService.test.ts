import {describe, it, expect, vi, beforeEach} from "vitest";

vi.mock("../../src/models/userModel", () => {
  const mockFindOne = vi.fn();

  return {
    User: {
      findOne: mockFindOne
    }
  }
})

import { DetailUserService } from "../../src/services/user/detailUserService";
import { User } from "../../src/models/userModel";

describe('DetailUserService', () => {
  let detailUserService: DetailUserService;
  let mockFindOne: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    detailUserService = new DetailUserService();
    mockFindOne = (User.findOne as unknown) as ReturnType<typeof vi.fn>;
    vi.clearAllMocks();
  });


  describe('execute()', () => {
    it('deve retornar os detalhes do user', async () => {
      const mockUser = {
        _id: 'userId123',
        email: 'texte@test.com',
        password: 'hashedPassword'
      };

      mockFindOne.mockResolvedValueOnce(mockUser);

      const result = await detailUserService.execute('userId123');

      expect(mockFindOne).toHaveBeenCalledWith({ _id: 'userId123' });
      expect(result).toEqual(mockUser);
    });

    it('deve retorna null quando o user nao exitir', async () => {
      mockFindOne.mockResolvedValueOnce(null);

      const result = await detailUserService.execute('nonExistentUserId');

      expect(result).toBeNull();
      expect(mockFindOne).toHaveBeenCalledWith({ _id: 'nonExistentUserId' });
    })

    it('deve lancar um ero se falhar conecao com db', async () => {
      const dbError = new Error('DB error na conexao');
      mockFindOne.mockRejectedValueOnce(dbError);

      await expect(
        detailUserService.execute('anyUserId')
      ).rejects.toThrow('Erro ao buscar usuário!');
    })
  })
});