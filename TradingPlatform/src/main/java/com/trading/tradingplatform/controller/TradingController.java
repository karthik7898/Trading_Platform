package com.trading.tradingplatform.controller;

import com.trading.tradingplatform.dto.PortfolioItem;
import com.trading.tradingplatform.dto.TradeRequest;
import com.trading.tradingplatform.dto.TradeResponse;
import com.trading.tradingplatform.model.Trade;
import com.trading.tradingplatform.service.TradingService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trading")
@CrossOrigin(origins = "http://localhost:3000") // React frontend
public class TradingController {

    private final TradingService tradingService;

    public TradingController(TradingService tradingService) {
        this.tradingService = tradingService;
    }

    // ================= BUY =================
    @PostMapping("/buy")
    public TradeResponse buyStock(@RequestBody TradeRequest request) {
        return tradingService.buyStock(request);
    }

    // ================= SELL =================
    @PostMapping("/sell")
    public TradeResponse sellStock(@RequestBody TradeRequest request) {
        return tradingService.sellStock(request);
    }

    // ================= TRANSACTIONS =================
    @GetMapping("/transactions/{userId}")
    public List<Trade> getTransactions(@PathVariable Long userId) {
        return tradingService.getUserTransactions(userId);
    }

    // ================= PORTFOLIO =================
    @GetMapping("/portfolio/{userId}")
    public List<PortfolioItem> getPortfolio(@PathVariable Long userId) {
        return tradingService.getPortfolio(userId);
    }
}
