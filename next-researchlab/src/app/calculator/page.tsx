"use client";

import useCalculator from "@/hooks/calculator/useCalculator";
import React, { useState } from "react";
import styles from "./page.module.css";

const Calculator = () => {
  const [initialAmount, setInitialAmount] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [iterations, setIterations] = useState<number>(0);

  const { result, calculateInvest } = useCalculator();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculateInvest(initialAmount, rate, iterations); // 커스텀 훅을 통해 계산 실행
  };

  return (
    <div className={styles.center}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>복리 계산기</h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.userInput}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>초기 금액 (원):</label>
          <input
            type="number"
            value={initialAmount}
            onChange={(e) => setInitialAmount(Number(e.target.value))}
            className={styles.inputField}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>수익률 (%):</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className={styles.inputField}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>반복 회수:</label>
          <input
            type="number"
            value={iterations}
            onChange={(e) => setIterations(Number(e.target.value))}
            className={styles.inputField}
            required
          />
        </div>
        <button type="submit" className={styles.submitBtn}>
          계산하기
        </button>
      </form>

      {result.length > 0 && (
        <table className={styles.result}>
          <thead className={styles.resultThead}>
            <tr>
              <th>회차</th>
              <th>이전 금액 (원)</th>
              <th>현재 금액 (원)</th>
              <th>수익금 (원)</th>
              <th>수익률 (%)</th>
              <th>누적 수익률 (%)</th>
            </tr>
          </thead>
          <tbody className={styles.resultTbody}>
            {result.map((item) => (
              <tr key={item.iteration}>
                <td>{item.iteration}</td>
                <td>{item.previousAmount.toLocaleString("ko-KR")}</td>
                <td>{item.currentAmount.toLocaleString("ko-KR")}</td>
                <td>{item.profit.toLocaleString("ko-KR")}</td>
                <td>{item.rate} %</td>
                <td>{item.cumulativeRate} %</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Calculator;
