// Check if user is logged in
const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

if (!loggedInUser) {
    alert('Anda harus login terlebih dahulu!');
    window.location.href = 'login.html';
}

// Calculate summary statistics
function calculateSummary() {
    const totalTransaksi = dataHistori.length;
    const totalPendapatan = dataHistori.reduce((sum, item) => sum + item.total, 0);
    const rataTransaksi = totalTransaksi > 0 ? totalPendapatan / totalTransaksi : 0;
    const totalBahan = dataHistori.reduce((sum, item) => sum + item.jumlahBahan, 0);
    
    document.getElementById('totalTransaksi').textContent = totalTransaksi;
    document.getElementById('totalPendapatan').textContent = 'Rp ' + formatNumber(totalPendapatan);
    document.getElementById('rataTransaksi').textContent = 'Rp ' + formatNumber(Math.round(rataTransaksi));
    document.getElementById('totalBahan').textContent = totalBahan + ' item';
}

// Calculate status statistics
function calculateStatusStats() {
    const statuses = {
        'Terkirim': { count: 0, nilai: 0 },
        'Dalam Perjalanan': { count: 0, nilai: 0 },
        'Diproses': { count: 0, nilai: 0 }
    };
    
    dataHistori.forEach(item => {
        if (statuses[item.status]) {
            statuses[item.status].count++;
            statuses[item.status].nilai += item.total;
        }
    });
    
    document.getElementById('statusTerkirim').textContent = statuses['Terkirim'].count;
    document.getElementById('nilaiTerkirim').textContent = 'Rp ' + formatNumber(statuses['Terkirim'].nilai);
    
    document.getElementById('statusDikirim').textContent = statuses['Dalam Perjalanan'].count;
    document.getElementById('nilaiDikirim').textContent = 'Rp ' + formatNumber(statuses['Dalam Perjalanan'].nilai);
    
    document.getElementById('statusDiproses').textContent = statuses['Diproses'].count;
    document.getElementById('nilaiDiproses').textContent = 'Rp ' + formatNumber(statuses['Diproses'].nilai);
}

// Populate laporan table
function populateLaporanTable(data = dataHistori) {
    const table = document.getElementById('laporanTable');
    
    let html = '';
    data.forEach((item, index) => {
        let statusClass = '';
        if (item.status === 'Terkirim') statusClass = 'success';
        else if (item.status === 'Sedang Dikirim') statusClass = 'warning';
        else statusClass = 'info';
        
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${formatDateShort(item.tanggal)}</td>
                <td><strong>${item.noDO}</strong></td>
                <td>${item.namaMahasiswa}</td>
                <td>${item.jumlahBahan} item</td>
                <td><strong>Rp ${formatNumber(item.total)}</strong></td>
                <td><span class="badge badge-${statusClass}">${item.status}</span></td>
            </tr>
        `;
    });
    
    if (html === '') {
        html = '<tr><td colspan="7" style="text-align: center; padding: 30px; color: #666;">Tidak ada data yang ditemukan</td></tr>';
    }
    
    table.innerHTML = html;
}

// Filter laporan
function filterLaporan() {
    const statusValue = document.getElementById('filterStatus').value;
    const searchValue = document.getElementById('searchLaporan').value.toLowerCase();
    
    let filteredData = dataHistori;
    
    // Filter by status
    if (statusValue) {
        filteredData = filteredData.filter(item => item.status === statusValue);
    }
    
    // Filter by search
    if (searchValue) {
        filteredData = filteredData.filter(item => 
            item.namaMahasiswa.toLowerCase().includes(searchValue) ||
            item.noDO.toLowerCase().includes(searchValue)
        );
    }
    
    populateLaporanTable(filteredData);
}

// Export to CSV
function exportToCSV() {
    let csv = 'No,Tanggal,No. DO,Nama Mahasiswa,Jumlah Bahan,Total,Status\n';
    
    dataHistori.forEach((item, index) => {
        csv += `${index + 1},"${formatDateShort(item.tanggal)}","${item.noDO}","${item.namaMahasiswa}",${item.jumlahBahan},${item.total},"${item.status}"\n`;
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'laporan_transaksi_' + new Date().toISOString().split('T')[0] + '.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Laporan berhasil diexport!');
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

// Initialize page
calculateSummary();
calculateStatusStats();
populateLaporanTable();