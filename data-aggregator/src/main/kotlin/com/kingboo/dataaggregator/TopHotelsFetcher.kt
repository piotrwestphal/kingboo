package com.kingboo.dataaggregator

import com.kingboo.dataaggregator.CacheConfiguration.Companion.TOP_HOTELS_CACHE_NAME
import mu.KLogging
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate
import org.springframework.web.util.UriComponentsBuilder
import java.net.URI

@Component
class TopHotelsFetcher(
    private val restTemplate: RestTemplate
) {
    private companion object : KLogging()

    @Cacheable(TOP_HOTELS_CACHE_NAME)
    fun getTopHotels(
        searchId: String,
        collectingStartedAt: String,
        collectingFinishedAt: String?
    ): LinkedHashMap<String, Any>? {
        logger.info { "Fetching top hotels with searchId [$searchId] " +
                "collectingStartedAt [$collectingStartedAt] collectingFinishedAt [$collectingFinishedAt]" }
        val uri = URI("http://localhost:38082/api/v1/top-hotels")
        val urlBuilder = UriComponentsBuilder.fromUri(uri)
            .queryParam("search_id", searchId)
            .queryParam("collecting_started_at", collectingStartedAt)
        collectingFinishedAt?.let {
            urlBuilder.queryParam("collecting_finished_at", it)
        }
        val url = urlBuilder.build().toUri()
        val responseType = object : LinkedHashMap<String, Any>() {}::class.java

        return try {
            restTemplate.getForObject(url, responseType)
        } catch (e: Exception) {
            logger.error("Error when fetching top hotels", e)
            null
        }
    }
}
