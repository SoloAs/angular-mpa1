export interface Config {
  general: {
    device_name: string;
    mode: string;
    nmos: string;
  };
  network: {
    dhcp: boolean;
    dns: string;
    port: string;
    stream_delivery: string;
    ip: string;
  }
  media: {
    video_resolution: string;
    framerate: string;
    audio_channels: string;
  }
}

