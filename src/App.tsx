import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/canvas/Experience';
import { AsciiRenderer } from './components/canvas/AsciiRenderer';

function App() {
  const [asciiEnabled, setAsciiEnabled] = useState(false);
  const [invertAscii, setInvertAscii] = useState(true);

  return (
    <>
      <header style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '3rem',
          margin: 0,
          color: 'var(--highlight-color)',
          textShadow: '2px 2px 0px #fff'
        }}>
          도로롱
        </h1>
        <p style={{ margin: 0, fontSize: '1.2rem', opacity: 0.8 }}>
          귀여운 3D 아스키 친구
        </p>
      </header>

      {/* 3D Box Container */}
      <div style={{
        width: '1200px',
        height: '800px',
        border: '5px solid var(--box-border)',
        borderRadius: '30px',
        background: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
      }}>
        <Canvas>
          <Experience />
          {asciiEnabled && <AsciiRenderer invert={invertAscii} resolution={0.25} />}
        </Canvas>
      </div>

      <footer style={{ marginTop: '20px', display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setAsciiEnabled(!asciiEnabled)}
            style={{
              padding: '12px 30px',
              fontSize: '1.5rem',
              border: 'none',
              borderRadius: '50px',
              background: 'var(--highlight-color)',
              color: 'white',
              boxShadow: '0 4px 0px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              fontFamily: 'var(--font-header)'
            }}
          >
            {asciiEnabled ? '🎨 일반 모드' : '🔢 아스키 모드'}
          </button>

          {asciiEnabled && (
            <button
              onClick={() => setInvertAscii(!invertAscii)}
              style={{
                padding: '12px 30px',
                fontSize: '1.5rem',
                border: '2px solid var(--highlight-color)',
                borderRadius: '50px',
                background: 'white',
                color: 'var(--highlight-color)',
                boxShadow: '0 4px 0px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                fontFamily: 'var(--font-header)'
              }}
            >
              {invertAscii ? '🌗 반전 끄기' : '🌓 반전 켜기'}
            </button>
          )}
        </div>

        <p style={{ marginTop: '15px', color: 'var(--text-color)', opacity: 0.7, fontSize: '1rem', fontFamily: 'var(--font-header)' }}>
          💡 사용법: <strong>🖱️ 드래그</strong> 회전 | <strong>⌨️ 스페이스바+드래그</strong> 이동 | <strong>🖱️ 휠</strong> 확대/축소
        </p>
      </footer>

      {/* Visitor Counter */}
      <div style={{ position: 'fixed', bottom: '10px', right: '10px', opacity: 0.8 }}>
        <a href="https://hits.seeyoufarm.com">
          <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fnerdeyprite-ctrl%2Fdoro&count_bg=%23FF69B4&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=VISITORS&edge_flat=false" alt="Visitor Count" />
        </a>
      </div>
    </>
  );
}

export default App;
