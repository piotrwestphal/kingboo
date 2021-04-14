package com.kingboo.dataaggregator.db

import com.google.api.gax.core.CredentialsProvider
import com.google.cloud.spring.core.DefaultCredentialsProvider
import com.google.cloud.spring.data.firestore.repository.config.EnableReactiveFirestoreRepositories
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
@EnableReactiveFirestoreRepositories
class FirestoreConfiguration