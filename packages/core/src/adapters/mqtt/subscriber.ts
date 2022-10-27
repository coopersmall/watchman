import { MqttClient as _MqttClient, connect, IClientOptions } from 'mqtt';
import { IMqttClient } from './shared';
import { ILogger } from '../../infrastructure/logger/logger';

export default function createSubscriber(callerName: string, options: IClientOptions, logger: ILogger): Subscriber {
  return new Subscriber(callerName, options, logger);
}

class Subscriber implements IMqttClient {
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
      subscriber: this.callerName
    });
    this.client = connect(this.connectionOptions);
  }

  public stop(): void {
    this.logger.info('Closing MQTT Connection', {
      subscriber: this.callerName
    });
    this.client.end();
  }

  public subscribe(topic: string): void {
    this.client.subscribe(topic);

    this.client.on('message', (_, message) => {
      return message;
    });
  }
}
