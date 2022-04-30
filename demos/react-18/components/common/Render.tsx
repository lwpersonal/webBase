import { useEffect } from 'react';
export default function RenderEl() {
  useEffect(() => {
    console.log('useEffect render');
  }, []);
  console.log('render');
  return null;
}
