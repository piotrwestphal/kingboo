package com.kingboo.dataaggregator

import com.kingboo.dataaggregator.model.*
import mu.KLogging
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Component
import java.util.*
import java.util.function.Function

@Component
class MessageProcessor(
    private val messageHandler: MessageHandler,
) {
    private companion object : KLogging()

    @Bean
    fun processMessage(): Function<InboundMqPayload<Any>, OutboundMqPayload> {
        return Function<InboundMqPayload<Any>, OutboundMqPayload>(this::process)
    }

    private fun process(inboundPayload: InboundMqPayload<Any>): OutboundMqPayload {
        logger.debug { "Inbound message: $inboundPayload" }
        val (pattern, data) = inboundPayload
        return when (pattern) {
            InboundMqMessagePattern.HOTELS_PROCESSING_COMPLETED -> handleProcessedDataMessage(data)
            else -> nothing()
        }.also {
            logger.debug { "Outbound message: $it" }
        }
    }

    private fun handleProcessedDataMessage(payloadData: MqMessage<Any>): OutboundMqPayload {
        val (searchId, timestamp) = payloadData
        val collectingTimesDto =  payloadData.dataAsCollectingTimesDto()
        val result = messageHandler.handle(searchId, timestamp, collectingTimesDto)
        return nothing(searchId)
    }

    private fun nothing(searchId: String = "nothing"): OutboundMqPayload {
        return OutboundMqPayload(data = MqMessage("aaa", Date().time, UserNotification("xxx")))
    }
}
