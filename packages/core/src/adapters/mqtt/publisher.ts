import { MqttClient as _MqttClient, connect, IClientOptions } from 'mqtt';
import { IMqttClient } from './shared';
import { ILogger } from '../../infrastructure/logger/logger';

export default function createPublisher(callerName: string, options: IClientOptions, logger: ILogger) {
  return new Publisher(callerName, options, logger);
}

class Publisher implements IMqttClient {
  readonly callerName: string;

  private client: _MqttClient;
  private logger: ILogger;
  private connectionOptions: IClientOptions;

  constructor(callerName: string, options: IClientOptions, logger: ILogger) {
    this.callerName = callerName;
    this.connectionOptions = options;
    this.logger = logger;
  }

  public start(): void {
    this.logger.info('Creating MQTT Connection', {
      publisher: this.callerName
    });
    this.client = connect(this.connectionOptions);
  }

  public stop(): void {
    this.logger.info('Closing MQTT Connection', {
      publisher: this.callerName
    });
    this.client.end();
  }

  public publish(topic: string, message: any): void {
    this.client.publish(topic, Buffer.from(message));
  }
}
