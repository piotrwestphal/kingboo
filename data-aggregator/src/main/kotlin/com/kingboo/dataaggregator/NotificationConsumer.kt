package com.kingboo.dataaggregator

import com.kingboo.dataaggregator.cache.CacheMaintainer
import com.kingboo.dataaggregator.db.DataAggregateRepository
import com.kingboo.dataaggregator.rest.SearchRequestFetcher
import com.kingboo.dataaggregator.rest.TopHotelsFetcher
import mu.KLogging
import org.springframework.cache.CacheManager
import org.springframework.stereotype.Component

@Component
class NotificationConsumer(
    private val cacheManager: CacheManager,
    private val repository: DataAggregateRepository,
    private val searchRequestFetcher: SearchRequestFetcher,
    private val topHotelsFetcher: TopHotelsFetcher,
    private val cacheMaintainer: CacheMaintainer,
) {

    private companion object : KLogging() {
        const val SEARCH_ID_KEY = "searchId"
        const val COLLECTING_STARTED_AT_KEY = "collectingStartedAt"
        const val COLLECTING_FINISHED_AT_KEY = "collectingFinishedAt"
    }

//    @Scheduled(fixedDelay = 10000, initialDelay = 10000)
    fun run() {
        val searchId = "USER_WARSAW_2021-06-11_2021-06-20_1_2_0_1_300"
        val searchRequest = searchRequestFetcher.getSearchRequest(searchId)
        val collectingStartedAt = searchRequest?.get(COLLECTING_STARTED_AT_KEY) as String?
        val collectingFinishedAt = searchRequest?.get(COLLECTING_FINISHED_AT_KEY) as String?
        logger.debug {
            "Fetched search request [${searchRequest?.get(SEARCH_ID_KEY)}] " +
                    "collectingStartedAt [$collectingStartedAt] collectingFinishedAt [$collectingFinishedAt]"
        }
        val topHotels = topHotelsFetcher.getTopHotels(searchId, collectingStartedAt as String, collectingFinishedAt)
//        val data = repository.save(DataAggregate(searchId, searchRequest, topHotels)).block()
        repository.findAll().also {
//            CacheMaintainer.logger.info { "HALO!!! count ${it.count().block()}" }
//            CacheMaintainer.logger.info {
//                "Value from cache ${cacheManager.getCache("search-request")?.get(searchId)?.get()} " +
//                        "${cacheManager.getCache("topHotels")?.get(searchId)?.get()}"
//            }
        }
    }
}
