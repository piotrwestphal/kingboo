package com.kingboo.dataaggregator

import mu.KLogging
import org.springframework.cache.CacheManager
import org.springframework.cache.annotation.CacheEvict
import org.springframework.cache.annotation.EnableCaching
import org.springframework.cache.concurrent.ConcurrentMapCacheManager
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.scheduling.annotation.Scheduled


@Configuration
@EnableCaching
@EnableScheduling
class CacheConfiguration() {

    companion object : KLogging() {
        const val TOP_HOTELS_CACHE_NAME = "top-hotels"
        const val SEARCH_REQUEST_CACHE_NAME = "search-request"
        const val CACHE_EXPIRATION_TIME = 1 * 60 * 1000L // TODO: change to 60 minutes - read from configuration
    }

    @Bean
    fun cacheManager(): CacheManager {
        return ConcurrentMapCacheManager(TOP_HOTELS_CACHE_NAME, SEARCH_REQUEST_CACHE_NAME)
    }

    @CacheEvict(allEntries = true, value = [TOP_HOTELS_CACHE_NAME, SEARCH_REQUEST_CACHE_NAME])
    @Scheduled(fixedDelay = CACHE_EXPIRATION_TIME)
    fun reportCacheEvict() {
        logger.info("Flush cache [$TOP_HOTELS_CACHE_NAME, $SEARCH_REQUEST_CACHE_NAME]")
    }
}
