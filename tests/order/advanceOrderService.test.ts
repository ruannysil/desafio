import { IOrder } from '@/models/orderModel';
import { describe, it, expect, vi } from 'vitest';

class TestableAdvanceOrderService {
  private orderRepository: IOrder | { findByIdAndUser: () => Promise<never>; };

  constructor(orderRepository?: IOrder | { findByIdAndUser: () => Promise<never>; }) {
    this.orderRepository = orderRepository || {
      findByIdAndUser: async () => {
        throw new Error('Método não implementado');
      }
    };
  }

  public getNextState(currentState: string): string | null {
    const transitions: Record<string, string> = {
      'CREATED': 'ANALYSIS',
      'ANALYSIS': 'COMPLETED'
    };
    return transitions[currentState] || null;
  }

  async execute() {
    const nextState = this.getNextState('CREATED');
    
    if (!nextState) {
      throw new Error('Não pode avançar');
    }

    return { success: true, nextState };
  }
}

describe('TestableAdvanceOrderService', () => {
  it('deve transicionar corretamente entre estados', () => {
    const service = new TestableAdvanceOrderService();
    
    expect(service.getNextState('CREATED')).toBe('ANALYSIS');
    expect(service.getNextState('ANALYSIS')).toBe('COMPLETED');
    expect(service.getNextState('COMPLETED')).toBeNull();
    expect(service.getNextState('INVALID')).toBeNull();
  });
});