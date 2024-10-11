import { CalculationResult } from "@/types/types";
import { useState } from "react";

const useCalculator = () => {
  const [result, setResult] = useState<CalculationResult[]>([]);

  const calculateInvest = (
    initialAmount: number,
    rate: number,
    iterations: number
  ) => {
    const resultArray: CalculationResult[] = [];
    let amount = initialAmount;

    for (let i = 1; i < iterations; i++) {
      const previousAmount = amount;
      amount += amount * (rate / 100); // 현재 금액 계산
      const profit = amount - previousAmount; // 수익금
      const cumulativeRate = ((amount - initialAmount) / initialAmount) * 100; // 총 수익

      resultArray.push({
        iteration: i,
        previousAmount: Math.round(previousAmount),
        currentAmount: Math.round(amount),
        profit: Math.round(profit),
        rate,
        cumulativeRate: parseFloat(cumulativeRate.toFixed(2)),
      });
    }

    setResult(resultArray);
  };

  return { result, calculateInvest };
};

export default useCalculator;
