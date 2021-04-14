package com.kingboo.dataaggregator.model

data class CollectingTimesDto(
    val collectingStartedAt: String,
    val collectingFinishedAt: String
)

// TODO: use it somewhere else when casting
inline fun <reified T> MqMessage<T>.dataAsCollectingTimesDto(): CollectingTimesDto {
    return data as CollectingTimesDto
}
