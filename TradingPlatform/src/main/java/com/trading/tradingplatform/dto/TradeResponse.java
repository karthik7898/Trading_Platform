package com.trading.tradingplatform.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TradeResponse {

    private String status;
    private String message;

    private Long userId;
    private String symbol;
    private int quantity;

    private double pricePerStock;
    private double totalAmount;
    private double remainingBalance;

    private long timestamp;
}
