let userBalance = 1000;
let donationHistory = [];

// Open donation modal
function openDonationModal(cause) {
  document.getElementById('modal-title').innerText = `Donate to ${cause}`;
  document.getElementById('donation-modal').classList.remove('hidden');
}

// Close donation modal
function closeModal() {
  document.getElementById('donation-modal').classList.add('hidden');
}

// Handle donation submission
function submitDonation() {
  const donationAmount = parseFloat(document.getElementById('donation-amount').value);
  if (isNaN(donationAmount) || donationAmount <= 0) {
    alert('Please enter a valid amount.');
    return;
  }

  // Show spinner while processing donation
  document.getElementById('spinner').classList.remove('hidden');

  setTimeout(() => {
    // Update user balance and foundation fund
    userBalance -= donationAmount;
    updateBalance();
    document.getElementById('sunna-fund').innerText = (parseFloat(document.getElementById('sunna-fund').innerText) + donationAmount).toFixed(2);
    
    // Hide spinner and close modal
    document.getElementById('spinner').classList.add('hidden');
    closeModal();
    
    // Show toast
    showToast();
    
    // Log donation history
    const donationEntry = {
      amount: donationAmount,
      time: new Date().toLocaleString(),
      cause: document.getElementById('modal-title').innerText.replace('Donate to ', '')
    };
    donationHistory.push(donationEntry);
    updateDonationHistory();
  }, 2000);
}


function updateBalance() {
  document.getElementById('user-balance').innerText = userBalance.toFixed(2);
}


function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.remove('opacity-0');
  toast.classList.add('opacity-100');
  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0');
  }, 3000);
}


function updateDonationHistory() {
  const historyTable = document.getElementById('donation-history');
  historyTable.innerHTML = '';
  donationHistory.forEach((entry) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="px-4 py-2">${entry.cause}</td>
      <td class="px-4 py-2">$${entry.amount.toFixed(2)}</td>
      <td class="px-4 py-2">${entry.time}</td>
    `;
    historyTable.appendChild(row);
  });
}

const causes = [
  { name: 'Sunna Foundation', reliability: 90, raised: 400, goal: 1000 },
  { name: 'Helping Hands', reliability: 80, raised: 600, goal: 1000 },
  { name: 'Green Earth Initiative', reliability: 70, raised: 200, goal: 1000 },
];


function getBestCauseToDonate(amount) {
  let n = causes.length;
  let dp = Array.from({ length: n + 1 }, () => Array(amount + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    let { reliability } = causes[i - 1];
    for (let j = 0; j <= amount; j++) {
      if (j >= reliability) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - reliability] + reliability);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  
  let j = amount;
  for (let i = n; i > 0 && j > 0; i--) {
    if (dp[i][j] !== dp[i - 1][j]) {
      return causes[i - 1].name;
    }
  }
  return causes[0].name; 
}

nt
function recommendBestCause() {
  let amount = parseInt(document.getElementById('donation-amount').value, 10);
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid donation amount.');
    return;
  }

  let bestCause = getBestCauseToDonate(amount);
  alert(`The best cause to donate to is: ${bestCause}`);
}
