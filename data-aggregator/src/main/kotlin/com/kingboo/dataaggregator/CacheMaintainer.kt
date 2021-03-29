package com.kingboo.dataaggregator

import com.kingboo.dataaggregator.CacheConfiguration.Companion.SEARCH_REQUEST_CACHE_NAME
import com.kingboo.dataaggregator.CacheConfiguration.Companion.TOP_HOTELS_CACHE_NAME
import mu.KLogging
import org.springframework.cache.CacheManager
import org.springframework.cache.annotation.CacheEvict
import org.springframework.stereotype.Component

@Component
class CacheMaintainer(
    private val cacheManager: CacheManager
) {

    companion object : KLogging()

    @CacheEvict(value = [SEARCH_REQUEST_CACHE_NAME], allEntries = true)
    fun removeSearchRequest(searchId: String) {
        logger.info { "[$SEARCH_REQUEST_CACHE_NAME] cache removed for searchId: $searchId" }
        val cache = cacheManager.getCache(SEARCH_REQUEST_CACHE_NAME)
        logger.info { "Cache ${cache?.get(searchId)?.get()}" }
    }

    @CacheEvict(value = [TOP_HOTELS_CACHE_NAME])
    fun removeTopHotels(searchId: String) {
        logger.info { "[$TOP_HOTELS_CACHE_NAME] cache removed for searchId: $searchId" }
        val cache = cacheManager.getCache(TOP_HOTELS_CACHE_NAME)
        logger.info { "Cache $cache" }
    }
}