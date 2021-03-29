package com.kingboo.dataaggregator

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.web.client.RestTemplate

@Configuration
class DataAggregatorConfiguration {
  @Bean
  fun restTemplate(): RestTemplate = RestTemplate()
}
