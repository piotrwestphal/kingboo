package com.kingboo.dataaggregator.model

data class MqMessage<T> (
    val searchId: String,
    val timestamp: Long,
    val data: T
)
