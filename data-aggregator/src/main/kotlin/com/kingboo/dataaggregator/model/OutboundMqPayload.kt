package com.kingboo.dataaggregator.model

data class OutboundMqPayload(
    override val pattern: OutboundMqMessagePattern = OutboundMqMessagePattern.GENERAL_USER_NOTIFICATION,
    override val data: MqMessage<UserNotification>
) : MqPayload<OutboundMqMessagePattern, UserNotification>()
