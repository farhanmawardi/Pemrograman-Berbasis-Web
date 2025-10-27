// Check if user is logged in
const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

if (!loggedInUser) {
    alert('Anda harus login terlebih dahulu!');
    window.location.href = 'login.html';
}

// Search tracking function
function searchTracking() {
    const searchValue = document.getElementById('searchDO').value.trim().toUpperCase();
    const alertMessage = document.getElementById('alertMessage');
    const trackingResult = document.getElementById('trackingResult');
    
    // Reset alert
    alertMessage.className = 'alert';
    alertMessage.textContent = '';
    
    if (!searchValue) {
        showAlert('Mohon masukkan Nomor Delivery Order!', 'error');
        trackingResult.classList.remove('show');
        return;
    }
    
    // Find tracking data
    const tracking = dataTracking.find(t => t.nomorDO.toUpperCase() === searchValue);
    
    if (tracking) {
        displayTrackingResult(tracking);
        showAlert('Data pengiriman ditemukan!', 'success');
    } else {
        trackingResult.classList.remove('show');
        showAlert('Nomor Delivery Order tidak ditemukan! Pastikan nomor DO yang Anda masukkan benar.', 'error');
    }
}

// Display tracking result
function displayTrackingResult(tracking) {
    const trackingResult = document.getElementById('trackingResult');
    
    // Update header
    document.getElementById('resultNoDO').textContent = tracking.nomorDO;
    document.getElementById('resultMahasiswa').textContent = 'Penerima: ' + tracking.nama;
    
    // Update progress bar
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    // Reset first
    progressBar.style.width = '0%';
    progressText.textContent = '0%';
    
    setTimeout(() => {
        progressBar.style.width = tracking.progressPercentage + '%';
        progressText.textContent = tracking.progressPercentage + '%';
    }, 100);
    
    // Update details
    document.getElementById('detailStatus').textContent = tracking.status;
    document.getElementById('detailEkspedisi').textContent = tracking.ekspedisi;
    document.getElementById('detailTanggal').textContent = formatDateShort(tracking.tanggalKirim);
    document.getElementById('detailJenisPaket').textContent = tracking.jenispaket;
    document.getElementById('detailTotal').textContent = 'Rp ' + formatNumber(tracking.totalPembayaran);
    
    // Update timeline
    displayTimeline(tracking.riwayat);
    
    // Show result
    trackingResult.classList.add('show');
}

// Display timeline
function displayTimeline(riwayat) {
    const timelineContainer = document.getElementById('timelineContainer');
    
    let html = '';
    riwayat.forEach(item => {
        html += `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="date">${item.tanggal}</div>
                    <div class="description">${item.keterangan}</div>
                </div>
            </div>
        `;
    });
    
    timelineContainer.innerHTML = html;
}

// Show alert message
function showAlert(message, type) {
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.className = 'alert alert-' + type + ' show';
    alertMessage.textContent = message;
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        alertMessage.classList.remove('show');
    }, 5000);
}

// Populate all tracking table
function populateAllTrackingTable() {
    const table = document.getElementById('allTrackingTable');
    
    let html = '';
    dataTracking.forEach(tracking => {
        let statusClass = '';
        if (tracking.status === 'Terkirim') {
            statusClass = 'success';
        } else if (tracking.status === 'Dalam Perjalanan') {
            statusClass = 'warning';
        } else {
            statusClass = 'info';
        }
        
        html += `
            <tr>
                <td>${tracking.nomorDO}</td>
                <td>${tracking.nama}</td>
                <td><span class="badge badge-${statusClass}">${tracking.status}</span></td>
                <td>
                    <div class="progress-bar-container" style="height: 20px;">
                        <div class="progress-bar" style="width: ${tracking.progressPercentage}%; font-size: 12px; padding-right: 10px;">
                            ${tracking.progressPercentage}%
                        </div>
                    </div>
                </td>
                <td>${formatDateShort(tracking.tanggalKirim)}</td>
                <td>
                    <button 
                        class="btn-search" 
                        style="padding: 8px 15px; font-size: 12px;"
                        onclick="quickSearch('${tracking.nomorDO}')"
                    >
                        Lihat Detail
                    </button>
                </td>
            </tr>
        `;
    });
    
    table.innerHTML = html;
}

// Quick search function
function quickSearch(nomorDO) {
    document.getElementById('searchDO').value = nomorDO;
    searchTracking();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Helper functions
function formatDateShort(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function goBack() {
    window.location.href = 'dashboard.html';
}

function logout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    }
}

// Allow Enter key to search
document.getElementById('searchDO').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchTracking();
    }
});

// Initialize table on page load
populateAllTrackingTable();