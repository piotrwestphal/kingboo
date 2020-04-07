/*userServiceMqClient: {
  address: env.MQ_ADDRESS,
    queueDefinition: {
    queue: env.MQ_USER_NOTIFICATIONS_QUEUE_NAME,
      prefetchCount: 1,
      noAck: false,
      queueOptions: {
      arguments: {
        'x-message-ttl': parseInt(env.RMQ_CLIENT_TTL_MS, 10),
      },
    },
  },
},*/
