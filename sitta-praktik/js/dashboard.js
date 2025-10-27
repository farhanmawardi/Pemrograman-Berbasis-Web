// Check if user is logged in
const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

if (!loggedInUser) {
    alert('Anda harus login terlebih dahulu!');
    window.location.href = 'login.html';
}

// Display user name
document.getElementById('userName').textContent = loggedInUser.nama + ' (' + loggedInUser.lokasi + ')';

// Function to get greeting based on time
function getGreeting() {
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour >= 5 && hour < 11) {
        greeting = 'Selamat Pagi';
    } else if (hour >= 11 && hour < 15) {
        greeting = 'Selamat Siang';
    } else if (hour >= 15 && hour < 18) {
        greeting = 'Selamat Sore';
    } else {
        greeting = 'Selamat Malam';
    }
    
    return greeting + ', ' + loggedInUser.nama + '! 👋';
}

// Display greeting
document.getElementById('greeting').textContent = getGreeting();

// Display current date
function formatDate() {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date().toLocaleDateString('id-ID', options);
}

document.getElementById('currentDate').textContent = formatDate();

// Populate Rekap Bahan Ajar Table
function populateRekapTable() {
    const rekapTable = document.getElementById('rekapTable');
    
    // Group by jenis barang
    const jenisGroup = {};
    
    dataBahanAjar.forEach(bahan => {
        if (!jenisGroup[bahan.jenisBarang]) {
            jenisGroup[bahan.jenisBarang] = {
                count: 0,
                totalStok: 0
            };
        }
        jenisGroup[bahan.jenisBarang].count++;
        jenisGroup[bahan.jenisBarang].totalStok += parseInt(bahan.stok);
    });
    
    // Create table rows
    let html = '';
    for (const [jenis, data] of Object.entries(jenisGroup)) {
        const status = data.totalStok > 500 ? 'success' : data.totalStok > 300 ? 'warning' : 'danger';
        const statusText = data.totalStok > 500 ? 'Stok Aman' : data.totalStok > 300 ? 'Stok Menipis' : 'Stok Kritis';
        
        html += `
            <tr>
                <td>${jenis}</td>
                <td>${data.count}</td>
                <td>${data.totalStok}</td>
                <td><span class="badge badge-${status}">${statusText}</span></td>
            </tr>
        `;
    }
    
    rekapTable.innerHTML = html;
}

// Populate Histori Transaksi Table
function populateHistoriTable() {
    const historiTable = document.getElementById('historiTable');
    
    let html = '';
    dataHistori.forEach(item => {
        let statusClass = '';
        if (item.status === 'Terkirim') statusClass = 'success';
        else if (item.status === 'Sedang Dikirim') statusClass = 'warning';
        else statusClass = 'info';
        
        html += `
            <tr>
                <td>${formatDateShort(item.tanggal)}</td>
                <td>${item.noDO}</td>
                <td>${item.namaMahasiswa}</td>
                <td>${item.jumlahBahan} item</td>
                <td>Rp ${formatNumber(item.total)}</td>
                <td><span class="badge badge-${statusClass}">${item.status}</span></td>
            </tr>
        `;
    });
    
    historiTable.innerHTML = html;
}

// Helper function to format date
function formatDateShort(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Helper function to format number
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Navigation function
function navigateTo(page) {
    window.location.href = page;
}

// Logout function
function logout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    }
}

// Initialize tables on page load
populateRekapTable();
populateHistoriTable();