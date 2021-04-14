package com.kingboo.dataaggregator.db

import com.google.cloud.spring.data.firestore.FirestoreReactiveRepository
import com.kingboo.dataaggregator.model.DataAggregate

interface DataAggregateRepository: FirestoreReactiveRepository<DataAggregate>
