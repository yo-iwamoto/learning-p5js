import dynamic from 'next/dynamic';

export const Sketch = dynamic(import('react-p5'), {
  loading: () => <></>,
  ssr: false,
});
