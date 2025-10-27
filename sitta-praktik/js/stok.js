// Check if user is logged in
const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

if (!loggedInUser) {
    alert('Anda harus login terlebih dahulu!');
    window.location.href = 'login.html';
}

// Create a working copy of data
let bahanAjarData = [...dataBahanAjar];
let editIndex = -1;

// Populate jenis barang filter
function populateJenisFilter() {
    const filterJenis = document.getElementById('filterKategori');
    // Clear existing options except "Semua Kategori"
    filterJenis.innerHTML = '<option value="">Semua Jenis</option>';
    
    const jenisSet = [...new Set(bahanAjarData.map(item => item.jenisBarang))];
    
    jenisSet.forEach(jenis => {
        const option = document.createElement('option');
        option.value = jenis;
        option.textContent = jenis;
        filterJenis.appendChild(option);
    });
}

// Populate table with data
function populateTable(data = bahanAjarData) {
    const table = document.getElementById('stokTable');
    
    let html = '';
    data.forEach((bahan, index) => {
        // Determine stock status
        let statusClass = '';
        let statusText = '';
        
        if (bahan.stok >= 300) {
            statusClass = 'success';
            statusText = 'Stok Aman';
        } else if (bahan.stok >= 200) {
            statusClass = 'warning';
            statusText = 'Stok Menipis';
        } else {
            statusClass = 'danger';
            statusText = 'Stok Kritis';
        }
        
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>
                    <img src="${bahan.cover}" alt="${bahan.namaBarang}" 
                         style="width: 60px; height: 80px; object-fit: cover; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);"
                         onerror="this.src='images/no-cover.jpg'; this.onerror=null;">
                </td>
                <td><strong>${bahan.kodeBarang}</strong></td>
                <td>${bahan.namaBarang}</td>
                <td>${bahan.kodeLokasi}</td>
                <td><span class="badge badge-info">${bahan.jenisBarang}</span></td>
                <td>${bahan.edisi}</td>
                <td><strong>${bahan.stok}</strong></td>
                <td>Rp ${formatNumber(bahan.harga)}</td>
                <td><span class="badge badge-${statusClass}">${statusText}</span></td>
                <td>
                    <button 
                        class="btn-search" 
                        style="padding: 6px 12px; font-size: 12px; margin-right: 5px;"
                        onclick="editBahan(${index})"
                    >
                        ✏️ Edit
                    </button>
                    <button 
                        class="btn-logout" 
                        style="padding: 6px 12px; font-size: 12px; background: #dc3545;"
                        onclick="deleteBahan(${index})"
                    >
                        🗑️ Hapus
                    </button>
                </td>
            </tr>
        `;
    });
    
    if (html === '') {
        html = '<tr><td colspan="11" style="text-align: center; padding: 30px; color: #666;">Tidak ada data yang ditemukan</td></tr>';
    }
    
    table.innerHTML = html;
    updateStatistics();
}

// Update statistics
function updateStatistics() {
    const totalJenis = bahanAjarData.length;
    const totalStok = bahanAjarData.reduce((sum, item) => sum + parseInt(item.stok), 0);
    const stokKritis = bahanAjarData.filter(item => parseInt(item.stok) < 200).length;
    const nilaiTotal = bahanAjarData.reduce((sum, item) => sum + (parseInt(item.stok) * parseInt(item.harga)), 0);
    
    document.getElementById('totalJenis').textContent = totalJenis;
    document.getElementById('totalStok').textContent = totalStok;
    document.getElementById('stokKritis').textContent = stokKritis;
    document.getElementById('nilaiTotal').textContent = 'Rp ' + formatNumber(nilaiTotal);
}

// Show add form
function showAddForm() {
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('formTitle').textContent = 'Tambah Bahan Ajar Baru';
    document.getElementById('bahanAjarForm').reset();
    // Set default values
    document.getElementById('jenisBarang').value = 'BMP';
    editIndex = -1;
}

// Hide form
function hideForm() {
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('bahanAjarForm').reset();
    editIndex = -1;
}

// Form submit handler
document.getElementById('bahanAjarForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newBahan = {
        kodeLokasi: document.getElementById('kodeLokasi').value.toUpperCase(),
        kodeBarang: document.getElementById('kodeBarang').value.toUpperCase(),
        namaBarang: document.getElementById('namaBarang').value,
        jenisBarang: document.getElementById('jenisBarang').value,
        edisi: document.getElementById('edisi').value,
        stok: parseInt(document.getElementById('stok').value),
        harga: parseInt(document.getElementById('harga').value),
        cover: document.getElementById('cover').value || 'images/no-cover.jpg'
    };
    
    if (editIndex === -1) {
        // Check if code already exists
        const exists = bahanAjarData.find(b => b.kodeBarang === newBahan.kodeBarang);
        if (exists) {
            showAlert('Kode barang sudah ada!', 'error');
            return;
        }
        
        // Add new item
        bahanAjarData.push(newBahan);
        showAlert('Bahan ajar berhasil ditambahkan!', 'success');
    } else {
        // Update existing item
        bahanAjarData[editIndex] = newBahan;
        showAlert('Bahan ajar berhasil diperbarui!', 'success');
    }
    
    hideForm();
    populateTable();
    populateJenisFilter();
});

// Edit bahan
function editBahan(index) {
    const bahan = bahanAjarData[index];
    
    document.getElementById('kodeLokasi').value = bahan.kodeLokasi;
    document.getElementById('kodeBarang').value = bahan.kodeBarang;
    document.getElementById('namaBarang').value = bahan.namaBarang;
    document.getElementById('jenisBarang').value = bahan.jenisBarang;
    document.getElementById('edisi').value = bahan.edisi;
    document.getElementById('stok').value = bahan.stok;
    document.getElementById('harga').value = bahan.harga;
    document.getElementById('cover').value = bahan.cover;
    
    document.getElementById('formTitle').textContent = 'Edit Bahan Ajar';
    document.getElementById('formContainer').style.display = 'block';
    
    editIndex = index;
}

// Delete bahan
function deleteBahan(index) {
    const bahan = bahanAjarData[index];
    
    if (confirm(`Apakah Anda yakin ingin menghapus "${bahan.namaBarang}" (${bahan.kodeBarang})?`)) {
        bahanAjarData.splice(index, 1);
        showAlert('Bahan ajar berhasil dihapus!', 'success');
        populateTable();
        populateJenisFilter();
    }
}

// Filter table
function filterTable() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const jenisValue = document.getElementById('filterKategori').value;
    
    let filteredData = bahanAjarData;
    
    // Filter by search
    if (searchValue) {
        filteredData = filteredData.filter(bahan => 
            bahan.kodeBarang.toLowerCase().includes(searchValue) ||
            bahan.namaBarang.toLowerCase().includes(searchValue) ||
            bahan.kodeLokasi.toLowerCase().includes(searchValue) ||
            bahan.jenisBarang.toLowerCase().includes(searchValue)
        );
    }
    
    // Filter by jenis
    if (jenisValue) {
        filteredData = filteredData.filter(bahan => bahan.jenisBarang === jenisValue);
    }
    
    populateTable(filteredData);
}

// Show alert
function showAlert(message, type) {
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.className = 'alert alert-' + type + ' show';
    alertMessage.textContent = message;
    
    setTimeout(() => {
        alertMessage.classList.remove('show');
    }, 5000);
}

// Helper functions
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
populateJenisFilter();
populateTable();