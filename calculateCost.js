function calculateCost({
  requestsPerDay = 10,
  daysPerMonth = 30,
  tokensPerRequest = 8000,
  inputCostPerToken = 0.003 / 1000,
  outputCostPerToken = 0.004 / 1000,
  inputOutputRatio = 3,
} = {}) {
  let inputTokensPerRequest =
    (tokensPerRequest * inputOutputRatio) / (inputOutputRatio + 1);
  let outputTokensPerRequest = tokensPerRequest / (inputOutputRatio + 1);

  let costPerRequest =
    inputTokensPerRequest * inputCostPerToken +
    outputTokensPerRequest * outputCostPerToken;
  let dailyCostPerEmployee = requestsPerDay * costPerRequest;
  let monthlyCostPerEmployee = dailyCostPerEmployee * daysPerMonth;

  return monthlyCostPerEmployee;
}

let totalMonthlyCostPerEmployee = calculateCost();

console.log(totalMonthlyCostPerEmployee);
