import { Sketch } from '@/components/Sketch';
import { images } from '@/lib/images';
import { useControllableObject } from '@/hooks/useMove';
import { useCallback, useState } from 'react';
import type P5 from 'p5';

export default function Page() {
  const [image, setImage] = useState<P5.Image>();
  const [dogImage, setDogImage] = useState<P5.Image>();

  const [target, setTarget] = useState<'cat' | 'dog'>('cat');

  const preload = useCallback((p: P5) => {
    setImage(p.loadImage(images.cat_png));
    setDogImage(p.loadImage(images.dog_png));
  }, []);

  const cat = useControllableObject({ image, controlling: target === 'cat' });
  const dog = useControllableObject({
    image: dogImage,
    defaultPosition: {
      x: 300,
      y: 100,
    },
    controlling: target === 'dog',
  });

  const setup = useCallback((p5: P5, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight - 100).parent(canvasParentRef);
  }, []);

  const windowResized = useCallback((p5: P5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight - 100);
  }, []);

  const draw = useCallback(
    (p5: P5) => {
      p5.background(255);

      cat.draw(p5);
      dog.draw(p5);
    },
    [cat, dog]
  );

  return (
    <>
      <button onClick={() => (target === 'cat' ? setTarget('dog') : setTarget('cat'))}>toggle!</button>
      <p>イラスト：Loose Drawing</p>
      <Sketch preload={preload} draw={draw} setup={setup} windowResized={windowResized} />
    </>
  );
}
