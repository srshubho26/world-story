import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import RoutesWithContext from './RoutesWithContext.jsx';
import PostProvider from './providers/PostProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostProvider>
      <RoutesWithContext />
    </PostProvider>
  </StrictMode>,
)
