package com.trading.tradingplatform.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TradeRequest {
    private Long userId;
    private String symbol;
    private int quantity;
}
