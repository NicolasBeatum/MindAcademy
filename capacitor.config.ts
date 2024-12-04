import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lospapus.mindacademy',
  appName: 'MindAcademy',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    Camera: {
      // Configuración opcional
    }
  }
};

export default config;