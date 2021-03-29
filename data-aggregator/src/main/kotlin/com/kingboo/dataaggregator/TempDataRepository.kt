package com.kingboo.dataaggregator

import com.google.cloud.spring.data.firestore.FirestoreReactiveRepository

interface TempDataRepository: FirestoreReactiveRepository<DataAggregate>