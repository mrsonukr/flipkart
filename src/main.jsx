import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- ✅ import this
import './index.css';
import App from './App.jsx';
import 'typeface-roboto';
import { preloadCriticalResources, performanceMonitor } from './utils/performanceUtils';

// Start performance monitoring
performanceMonitor.start('app-initialization');

// Preload critical resources for faster loading
preloadCriticalResources();

// Optimize for first paint
const optimizeFirstPaint = () => {
  // Remove unused CSS for first paint
  const unusedCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
  unusedCSS.forEach(link => {
    link.media = 'print';
    link.onload = function() {
      this.media = 'all';
    };
  });
  
  // Prefetch DNS for external resources
  const dnsPrefetch = ['//fonts.googleapis.com', '//fonts.gstatic.com'];
  dnsPrefetch.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
};

optimizeFirstPaint();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </StrictMode>
);

// End performance monitoring
setTimeout(() => {
  performanceMonitor.end('app-initialization');
}, 100);
