package com.trading.tradingplatform.service;

import com.trading.tradingplatform.dto.StockQuote;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class StockService {

    private final Random random = new Random();

    public StockQuote getStockQuote(String symbol) {

        double basePrice = 300 + random.nextDouble() * 100;

        StockQuote quote = new StockQuote();
        quote.setSymbol(symbol.toUpperCase());
        quote.setOpenPrice(round(basePrice));
        quote.setCurrentPrice(round(basePrice + random.nextDouble() * 5));
        quote.setHighPrice(round(basePrice + random.nextDouble() * 10));
        quote.setLowPrice(round(basePrice - random.nextDouble() * 10));
        quote.setPreviousClose(round(basePrice - random.nextDouble() * 5));
        quote.setBuyerPrice(round(basePrice + random.nextDouble()));
        quote.setSellerPrice(round(basePrice + random.nextDouble()));
        quote.setTimestamp(System.currentTimeMillis());

        return quote;
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }

    public double getLivePrice(String symbol) {
        StockQuote quote = getStockQuote(symbol);
        return quote.getCurrentPrice();
    }

}
