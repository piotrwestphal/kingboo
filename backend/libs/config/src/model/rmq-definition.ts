export interface RMQQueueDefinition {
  queue: string;
  prefetchCount?: number;
  noAck?: boolean; // default: false TODO: check it!!
  queueOptions?: RMQQueueOptions;
}

export interface RMQQueueOptions {
  autoDelete?: boolean; // default: false
  durable?: boolean; // default: true
  arguments?: RMQQueueArguments;
}

export interface RMQQueueArguments {
  'x-message-ttl'?: number;
}
