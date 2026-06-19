package com.trading.tradingplatform.repository;

import com.trading.tradingplatform.model.Trade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TradeRepository extends JpaRepository<Trade, Long> {

    List<Trade> findByUserId(Long userId);

    List<Trade> findByUserIdOrderByCreatedAtDesc(Long userId);
}
