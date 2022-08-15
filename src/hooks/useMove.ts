import { useCoordination } from './useCorrdination';
import { KEYS } from '@/const/keys';
import { useCallback } from 'react';
import type { Coordination2D } from '@/types';
import type P5 from 'p5';

type Options = {
  image?: P5.Image;
  width?: number;
  height?: number;
  defaultPosition?: Coordination2D;
  controlling: boolean;
};

export const useControllableObject = ({
  image,
  width = 100,
  height = 100,
  defaultPosition = {
    x: 100,
    y: 100,
  },
  controlling,
}: Options) => {
  const [position, setPosition] = useCoordination(defaultPosition);

  const draw = useCallback(
    (p5: P5) => {
      if (!image) return;

      p5.image(image, position.x, position.y, width, height);

      if (!controlling) return;

      if (p5.keyIsDown(KEYS.left)) {
        if (position.x === 0) return;

        setPosition((prev) => ({ ...prev, x: (position.x -= 5) }));
      } else if (p5.keyIsDown(KEYS.right)) {
        if (p5.width - width <= position.x) return;

        setPosition((prev) => ({ ...prev, x: (position.x += 5) }));
      }

      if (p5.keyIsDown(KEYS.top)) {
        if (position.y === 0) return;

        setPosition((prev) => ({ ...prev, y: (position.y -= 5) }));
      } else if (p5.keyIsDown(KEYS.bottom)) {
        if (p5.height - height <= position.y) return;

        setPosition((prev) => ({ ...prev, y: (position.y += 5) }));
      }
    },
    [controlling, height, image, position, setPosition, width]
  );

  return {
    draw,
  };
};
