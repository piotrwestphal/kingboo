package com.kingboo.dataaggregator.model

data class InboundMqPayload<T>(
    override val pattern: InboundMqMessagePattern,
    override val data: MqMessage<T>
) : MqPayload<InboundMqMessagePattern, T>()
