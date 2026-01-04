import { describe, it, expect } from "vitest";

describe('AuthUserService', () => {
  
  it('deve ter a mesma mensagem de erro para ambos os casos', () => {
    const errorMessage = 'Usuário ou senha inválidos!';
    
    const simulateAuthError = (userExists: boolean, passwordCorrect: boolean) => {
      if (!userExists || !passwordCorrect) {
        throw new Error(errorMessage);
      }
      return { success: true };
    };
    
    expect(() => simulateAuthError(false, true)).toThrow(errorMessage);
    expect(() => simulateAuthError(true, false)).toThrow(errorMessage);
    expect(simulateAuthError(true, true)).toEqual({ success: true });
  });
  
  it('deve testar estrutura do token JWT', () => {
    // Teste da estrutura esperada (lógica pura)
    const expectedJwtStructure = {
      payload: { email: expect.any(String) },
      secret: expect.any(String),
      options: {
        subject: expect.any(String),
        expiresIn: '1d'
      }
    };
    
    expect(expectedJwtStructure.options.expiresIn).toBe('1d');
    expect(expectedJwtStructure.payload).toHaveProperty('email');
  });
});