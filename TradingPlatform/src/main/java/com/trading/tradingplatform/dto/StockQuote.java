package com.trading.tradingplatform.dto;

public class StockQuote {

    private String symbol;
    private double currentPrice;
    private double highPrice;
    private double lowPrice;
    private double openPrice;
    private double previousClose;
    private long timestamp;
    private double buyerPrice;
    private double sellerPrice;

    // Getters & Setters

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public double getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(double currentPrice) {
        this.currentPrice = currentPrice;
    }

    public double getHighPrice() {
        return highPrice;
    }

    public void setHighPrice(double highPrice) {
        this.highPrice = highPrice;
    }

    public double getLowPrice() {
        return lowPrice;
    }

    public void setLowPrice(double lowPrice) {
        this.lowPrice = lowPrice;
    }

    public double getOpenPrice() {
        return openPrice;
    }

    public void setOpenPrice(double openPrice) {
        this.openPrice = openPrice;
    }

    public double getPreviousClose() {
        return previousClose;
    }

    public void setPreviousClose(double previousClose) {
        this.previousClose = previousClose;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public double getBuyerPrice() {
        return buyerPrice;
    }

    public void setBuyerPrice(double buyerPrice) {
        this.buyerPrice = buyerPrice;
    }

    public double getSellerPrice() {
        return sellerPrice;
    }

    public void setSellerPrice(double sellerPrice) {
        this.sellerPrice = sellerPrice;
    }
}
