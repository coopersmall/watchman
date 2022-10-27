export interface IMqttClient {
  readonly callerName: string;

  start(): void;
  stop(): void;
}
