function calculateBalance() {
    const transactionsInput = document.getElementById('transactions').value.trim();
    const transactions = transactionsInput.split('\n').map(transaction => transaction.trim());

    const amounts = [];
    const dates = [];

    for (let transaction of transactions) {
        const parts = transaction.split(',');
        amounts.push(parseInt(parts[0]));
        dates.push(parts[1]);
    }

    const balance = solution(amounts, dates, amounts.length);
    document.getElementById('result').innerText = `Final Balance: $${balance}`;
}

function solution(A, D, N) {
    let totalIncome = 0;
    let totalCardPayments = {};
    let balance = 0;

    // Iterate over the transactions
    for (let i = 0; i < N; i++) {
        const amount = A[i];
        const date = D[i];

        // Update total income
        if (amount >= 0) {
            totalIncome += amount;
        }

        // Update total card payments
        if (amount < 0) {
            const month = date.substring(0, 7);
            if (!totalCardPayments[month]) {
                totalCardPayments[month] = 0;
            }
            totalCardPayments[month] += Math.abs(amount);
        }
    }

    // Calculate the balance at the end of the year
    for (let month = 1; month <= 12; month++) {
        const monthStr = `2020-${String(month).padStart(2, '0')}`;
        const cardPaymentTotal = totalCardPayments[monthStr] || 0;

        // Deduct fee if there were less than three card payments or total card payments are less than 100
        if (cardPaymentTotal < 100 || Object.keys(totalCardPayments).length < 3) {
            balance -= 5;
        }
    }

    balance += totalIncome - A.reduce((acc, curr) => acc + curr, 0);
    return balance;
}
