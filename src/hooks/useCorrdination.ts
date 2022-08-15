import { useState } from 'react';
import type { Coordination2D } from '@/types';

export const useCoordination = (defaultValue: Coordination2D = { x: 0, y: 0 }) => {
  return useState<Coordination2D>(defaultValue);
};

export const useNullableCoordination = (defaultValue?: Coordination2D) => {
  return useState<Coordination2D | null>(defaultValue ?? null);
};
