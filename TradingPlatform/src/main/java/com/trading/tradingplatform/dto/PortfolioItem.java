package com.trading.tradingplatform.dto;

public class PortfolioItem {

    private String symbol;
    private int quantity;
    private double avgPrice;

    public PortfolioItem(String symbol, int quantity, double avgPrice) {
        this.symbol = symbol;
        this.quantity = quantity;
        this.avgPrice = avgPrice;
    }

    public String getSymbol() {
        return symbol;
    }

    public int getQuantity() {
        return quantity;
    }

    public double getAvgPrice() {
        return avgPrice;
    }
}
