package com.kingboo.dataaggregator.model

import com.google.cloud.firestore.annotation.DocumentId
import com.google.cloud.spring.data.firestore.Document


@Document(collectionName = "data-aggregate")
data class DataAggregate(
    @DocumentId
    val searchId: String,
    val searchRequest: Any?,
    val topHotels: Any?
) {
    constructor(): this("", "", "")
}
