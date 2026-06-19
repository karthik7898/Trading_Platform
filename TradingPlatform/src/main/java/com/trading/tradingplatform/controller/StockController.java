package com.trading.tradingplatform.controller;

import com.trading.tradingplatform.dto.StockQuote;
import com.trading.tradingplatform.service.StockService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "http://localhost:3000")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    // 🔹 FULL STOCK QUOTE (Market page)
    @GetMapping("/quote/{symbol}")
    public StockQuote getStockQuote(@PathVariable String symbol) {
        return stockService.getStockQuote(symbol);
    }

    // 🔹 LIVE PRICE ONLY (Sell / Portfolio page)
    @GetMapping("/price/{symbol}")
    public double getLivePrice(@PathVariable String symbol) {
        return stockService.getLivePrice(symbol);
    }
}
