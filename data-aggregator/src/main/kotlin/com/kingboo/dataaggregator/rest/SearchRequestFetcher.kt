package com.kingboo.dataaggregator.rest

import com.kingboo.dataaggregator.cache.CacheConfiguration.Companion.SEARCH_REQUEST_CACHE_NAME
import mu.KLogging
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate
import java.net.URI

@Component
class SearchRequestFetcher(
    private val restTemplate: RestTemplate
) {
    private companion object : KLogging()

    @Cacheable(SEARCH_REQUEST_CACHE_NAME)
    fun getSearchRequest(searchId: String): LinkedHashMap<String, Any>? {
        logger.info { "Fetching search request with searchId [$searchId]" }
        val url = URI("http://localhost:38081/api/v1/search-requests/$searchId")
        val responseType = object : LinkedHashMap<String, Any>() {}::class.java
        return try {
            restTemplate.getForObject(url, responseType)
        } catch (e: Exception) {
            logger.error("Error when fetching search requests", e)
            null
        }
    }
}
