package com.trading.tradingplatform.service;

import com.trading.tradingplatform.dto.TradeRequest;
import com.trading.tradingplatform.dto.TradeResponse;
import com.trading.tradingplatform.dto.PortfolioItem;
import com.trading.tradingplatform.model.Trade;
import com.trading.tradingplatform.model.User;
import com.trading.tradingplatform.repository.TradeRepository;
import com.trading.tradingplatform.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class TradingService {

    private final UserRepository userRepository;
    private final TradeRepository tradeRepository;
    private final StockService stockService;

    public TradingService(
            UserRepository userRepository,
            TradeRepository tradeRepository,
            StockService stockService
    ) {
        this.userRepository = userRepository;
        this.tradeRepository = tradeRepository;
        this.stockService = stockService;
    }

    // ================= BUY STOCK =================
    public TradeResponse buyStock(TradeRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        double price = stockService.getLivePrice(request.getSymbol());
        double totalAmount = price * request.getQuantity();

        if (user.getBalance() < totalAmount) {
            throw new RuntimeException("Insufficient balance");
        }

        user.setBalance(user.getBalance() - totalAmount);
        userRepository.save(user);

        Trade trade = new Trade();
        trade.setUserId(user.getId());
        trade.setSymbol(request.getSymbol());
        trade.setQuantity(request.getQuantity());
        trade.setPrice(price);
        trade.setTotalAmount(totalAmount);
        trade.setType("BUY");
        trade.setCreatedAt(LocalDateTime.now());

        tradeRepository.save(trade);

        return buildResponse("BUY", "Stock purchased successfully", user, trade);
    }

    // ================= SELL STOCK =================
    public TradeResponse sellStock(TradeRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        double price = stockService.getLivePrice(request.getSymbol());
        double totalAmount = price * request.getQuantity();

        user.setBalance(user.getBalance() + totalAmount);
        userRepository.save(user);

        Trade trade = new Trade();
        trade.setUserId(user.getId());
        trade.setSymbol(request.getSymbol());
        trade.setQuantity(request.getQuantity());
        trade.setPrice(price);
        trade.setTotalAmount(totalAmount);
        trade.setType("SELL");
        trade.setCreatedAt(LocalDateTime.now());

        tradeRepository.save(trade);

        return buildResponse("SELL", "Stock sold successfully", user, trade);
    }

    // ================= TRANSACTIONS =================
    public List<Trade> getUserTransactions(Long userId) {
        return tradeRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    // ================= PORTFOLIO =================
    public List<PortfolioItem> getPortfolio(Long userId) {

        List<Trade> trades = tradeRepository.findByUserId(userId);

        Map<String, Integer> buyQtyMap = new HashMap<>();
        Map<String, Double> buyAmountMap = new HashMap<>();
        Map<String, Integer> sellQtyMap = new HashMap<>();

        for (Trade trade : trades) {
            String symbol = trade.getSymbol();

            if ("BUY".equals(trade.getType())) {
                buyQtyMap.merge(symbol, trade.getQuantity(), Integer::sum);
                buyAmountMap.merge(symbol, trade.getTotalAmount(), Double::sum);
            }

            if ("SELL".equals(trade.getType())) {
                sellQtyMap.merge(symbol, trade.getQuantity(), Integer::sum);
            }
        }

        List<PortfolioItem> portfolio = new ArrayList<>();

        for (String symbol : buyQtyMap.keySet()) {
            int totalBuyQty = buyQtyMap.get(symbol);
            int totalSellQty = sellQtyMap.getOrDefault(symbol, 0);
            int currentQty = totalBuyQty - totalSellQty;

            if (currentQty > 0) {
                double avgPrice = buyAmountMap.get(symbol) / totalBuyQty;
                portfolio.add(new PortfolioItem(symbol, currentQty, avgPrice));
            }
        }

        return portfolio;
    }


    // ================= HELPER =================
    private TradeResponse buildResponse(
            String type,
            String message,
            User user,
            Trade trade
    ) {
        TradeResponse response = new TradeResponse();
        response.setStatus("SUCCESS");
        response.setMessage(message);
        response.setUserId(user.getId());
        response.setSymbol(trade.getSymbol());
        response.setQuantity(trade.getQuantity());
        response.setPricePerStock(trade.getPrice());
        response.setTotalAmount(trade.getTotalAmount());
        response.setRemainingBalance(user.getBalance());
        response.setTimestamp(System.currentTimeMillis());
        return response;
    }
}
