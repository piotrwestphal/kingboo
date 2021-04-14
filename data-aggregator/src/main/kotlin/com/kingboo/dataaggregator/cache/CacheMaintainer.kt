package com.kingboo.dataaggregator.cache

import com.kingboo.dataaggregator.cache.CacheConfiguration.Companion.SEARCH_REQUEST_CACHE_NAME
import com.kingboo.dataaggregator.cache.CacheConfiguration.Companion.TOP_HOTELS_CACHE_NAME
import mu.KLogging
import org.springframework.cache.annotation.CacheEvict
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
class CacheMaintainer {

    companion object : KLogging()

    @CacheEvict(value = [SEARCH_REQUEST_CACHE_NAME])
    fun removeSearchRequest(searchId: String) {
        logger.debug { "[$SEARCH_REQUEST_CACHE_NAME] cache removed for searchId: $searchId" }
    }

    @CacheEvict(value = [TOP_HOTELS_CACHE_NAME])
    fun removeTopHotels(searchId: String) {
        logger.debug { "[$TOP_HOTELS_CACHE_NAME] cache removed for searchId: $searchId" }
    }

    @CacheEvict(allEntries = true, value = [TOP_HOTELS_CACHE_NAME, SEARCH_REQUEST_CACHE_NAME])
    @Scheduled(cron = "0 0 * * *") // remove cache at midnight
    fun reportCacheEvict() {
        logger.info("Flush cache [$TOP_HOTELS_CACHE_NAME, $SEARCH_REQUEST_CACHE_NAME]")
    }
}
