package com.kingboo.dataaggregator.model

abstract class MqPayload<E : Enum<E>, T> {
    abstract val pattern: Enum<E>
    abstract val data: MqMessage<T>
}
