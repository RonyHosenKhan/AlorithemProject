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

// Update user balance
function updateBalance() {
  document.getElementById('user-balance').innerText = userBalance.toFixed(2);
}

// Show toast notification
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.remove('opacity-0');
  toast.classList.add('opacity-100');
  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0');
  }, 3000);
}

// Update donation history table
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
