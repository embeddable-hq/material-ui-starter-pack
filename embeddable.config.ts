import { defineConfig } from '@embeddable.com/sdk-core';
import react from '@embeddable.com/sdk-react';

export default defineConfig({
  plugins: [react],
  modelsSrc: './src/embeddable.com/models',
  componentsSrc: './src/embeddable.com/components',
  errorFallbackComponent:
    './src/embeddable.com/components/util/ErrorHandler.jsx',

  // previewBaseUrl: 'https://app.dev.embeddable.com',
  // pushBaseUrl: 'https://api.dev.embeddable.com',
  // audienceUrl: 'https://api.dev.embeddable.com/',
  // authDomain: 'embeddable-dev.eu.auth0.com',
  // authClientId: 'xOKco5ztFCpWn54bJbFkAcT8mV4LLcpG',
});
