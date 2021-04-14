package com.kingboo.dataaggregator

import com.kingboo.dataaggregator.model.CollectingTimesDto
import com.kingboo.dataaggregator.rest.SearchRequestFetcher
import com.kingboo.dataaggregator.rest.TopHotelsFetcher
import org.springframework.stereotype.Component

@Component
class MessageHandler(
    private val searchRequestFetcher: SearchRequestFetcher,
    private val topHotelsFetcher: TopHotelsFetcher
) {
   fun handle(searchId: String, timestamp: Long, collectingTimesDto: CollectingTimesDto) {

   }
}
