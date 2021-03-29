package com.kingboo.dataaggregator

import mu.KLogging
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Component
import java.util.function.Function

@Component
class MessageProcessor(
    private val notificationConsumer: NotificationConsumer
) {

    private companion object : KLogging()

    @Bean
    fun processMessage(): Function<String, String?> {
        return Function<String, String?>(this::process)
    }

    private fun process(value: String): String {
        // {pattern: HOTELS_COLLECTION_COMPLETED, data: {}}
        // HOTELS_PROCESSING_COMPLETED
        logger.debug { "Value: $value" }
        notificationConsumer.run()
        return "{'user':'halo'}"
    }
}