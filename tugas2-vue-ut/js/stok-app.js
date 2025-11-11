var app = new Vue({
  el: '#app',
  data: {
    upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
    kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
    stok: [
      {
        kode: "EKMA4116",
        judul: "Pengantar Manajemen",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasiRak: "R1-A3",
        harga: 65000,
        qty: 28,
        safety: 20,
        catatanHTML: "<em>Edisi 2024, cetak ulang</em>"
      },
      {
        kode: "EKMA4115",
        judul: "Pengantar Akuntansi",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasiRak: "R1-A4",
        harga: 60000,
        qty: 7,
        safety: 15,
        catatanHTML: "<strong>Cover baru</strong>"
      },
      {
        kode: "BIOL4201",
        judul: "Biologi Umum (Praktikum)",
        kategori: "Praktikum",
        upbjj: "Surabaya",
        lokasiRak: "R3-B2",
        harga: 80000,
        qty: 12,
        safety: 10,
        catatanHTML: "Butuh <u>pendingin</u> untuk kit basah"
      },
      {
        kode: "FISIP4001",
        judul: "Dasar-Dasar Sosiologi",
        kategori: "MK Pilihan",
        upbjj: "Makassar",
        lokasiRak: "R2-C1",
        harga: 55000,
        qty: 2,
        safety: 8,
        catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder"
      },
      {
        kode: "MATE4101",
        judul: "Matematika Dasar",
        kategori: "MK Wajib",
        upbjj: "Padang",
        lokasiRak: "R1-B1",
        harga: 58000,
        qty: 0,
        safety: 12,
        catatanHTML: "<strong style='color: red;'>KOSONG! Segera reorder</strong>"
      },
      {
        kode: "BING4201",
        judul: "English for Business",
        kategori: "MK Pilihan",
        upbjj: "Denpasar",
        lokasiRak: "R2-A5",
        harga: 62000,
        qty: 25,
        safety: 15,
        catatanHTML: "Edisi baru dengan CD audio"
      }
    ],
    // State untuk filter
    filterUpbjj: '',
    filterKategori: '',
    filterMenipis: false,
    filterKosong: false,
    sortBy: '',
    
    // State untuk form tambah
    showAddForm: false,
    formBaru: {
      kode: '',
      judul: '',
      kategori: '',
      upbjj: '',
      lokasiRak: '',
      harga: 0,
      qty: 0,
      safety: 0,
      catatanHTML: ''
    },
    validationErrors: {},
    
    // State untuk edit
    editingIndex: null
  },
  
  computed: {
    // Computed untuk dependent options (kategori list berdasarkan upbjj yang dipilih)
    filteredKategoriList() {
      if (!this.filterUpbjj) {
        return [];
      }
      
      // Ambil kategori unik dari stok yang sesuai dengan upbjj yang dipilih
      const kategoriSet = new Set();
      this.stok.forEach(item => {
        if (item.upbjj === this.filterUpbjj) {
          kategoriSet.add(item.kategori);
        }
      });
      
      return Array.from(kategoriSet);
    },
    
    // Computed untuk filter dan sort data stok
    filteredAndSortedStok() {
      let result = this.stok;
      
      // Filter berdasarkan UT Daerah
      if (this.filterUpbjj) {
        result = result.filter(item => item.upbjj === this.filterUpbjj);
      }
      
      // Filter berdasarkan Kategori (hanya jika upbjj sudah dipilih)
      if (this.filterKategori && this.filterUpbjj) {
        result = result.filter(item => item.kategori === this.filterKategori);
      }
      
      // Filter stok menipis
      if (this.filterMenipis) {
        result = result.filter(item => item.qty < item.safety && item.qty > 0);
      }
      
      // Filter stok kosong
      if (this.filterKosong) {
        result = result.filter(item => item.qty === 0);
      }
      
      // Sort data
      if (this.sortBy === 'judul') {
        result = result.slice().sort((a, b) => a.judul.localeCompare(b.judul));
      } else if (this.sortBy === 'qty') {
        result = result.slice().sort((a, b) => a.qty - b.qty);
      } else if (this.sortBy === 'harga') {
        result = result.slice().sort((a, b) => a.harga - b.harga);
      }
      
      return result;
    }
  },
  
  watch: {
    // Watcher 1: Reset filter kategori ketika upbjj berubah
    filterUpbjj(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.filterKategori = '';
        console.log('Filter UT Daerah berubah dari', oldVal, 'ke', newVal);
        console.log('Filter kategori di-reset');
      }
    },
    
    // Watcher 2: Monitor perubahan filter untuk logging
    filterMenipis(newVal) {
      if (newVal) {
        console.log('Filter menipis diaktifkan - menampilkan stok < safety');
        console.log('Jumlah item menipis:', this.stok.filter(item => item.qty < item.safety && item.qty > 0).length);
      }
    },
    
    // Watcher 3: Monitor filter kosong
    filterKosong(newVal) {
      if (newVal) {
        console.log('Filter kosong diaktifkan - menampilkan stok = 0');
        console.log('Jumlah item kosong:', this.stok.filter(item => item.qty === 0).length);
      }
    }
  },
  
  methods: {
    // Method untuk format harga
    formatHarga(harga) {
      return harga.toLocaleString('id-ID');
    },
    
    // Method untuk mendapatkan status class
    getStatusClass(item) {
      if (item.qty === 0) {
        return 'status-badge status-kosong';
      } else if (item.qty < item.safety) {
        return 'status-badge status-menipis';
      } else {
        return 'status-badge status-aman';
      }
    },
    
    // Method untuk mendapatkan status text
    getStatusText(item) {
      if (item.qty === 0) {
        return 'Kosong';
      } else if (item.qty < item.safety) {
        return 'Menipis';
      } else {
        return 'Aman';
      }
    },
    
    // Method untuk reset filters
    resetFilters() {
      this.filterUpbjj = '';
      this.filterKategori = '';
      this.filterMenipis = false;
      this.filterKosong = false;
      this.sortBy = '';
      console.log('Semua filter telah di-reset');
    },
    
    // Method untuk validasi form
    validateForm() {
      this.validationErrors = {};
      let isValid = true;
      
      // Validasi kode (tidak boleh kosong dan harus unik)
      if (!this.formBaru.kode.trim()) {
        this.validationErrors.kode = 'Kode MK wajib diisi';
        isValid = false;
      } else if (this.stok.some(item => item.kode === this.formBaru.kode)) {
        this.validationErrors.kode = 'Kode MK sudah ada';
        isValid = false;
      }
      
      // Validasi judul
      if (!this.formBaru.judul.trim()) {
        this.validationErrors.judul = 'Judul MK wajib diisi';
        isValid = false;
      }
      
      // Validasi harga
      if (this.formBaru.harga <= 0) {
        this.validationErrors.harga = 'Harga harus lebih dari 0';
        isValid = false;
      }
      
      // Validasi qty
      if (this.formBaru.qty < 0) {
        this.validationErrors.qty = 'Jumlah stok tidak boleh negatif';
        isValid = false;
      }
      
      return isValid;
    },
    
    // Method untuk tambah bahan ajar
    tambahBahanAjar() {
      if (!this.validateForm()) {
        alert('Mohon perbaiki error pada form');
        return;
      }
      
      // Tambahkan ke array stok
      this.stok.push({
        kode: this.formBaru.kode,
        judul: this.formBaru.judul,
        kategori: this.formBaru.kategori,
        upbjj: this.formBaru.upbjj,
        lokasiRak: this.formBaru.lokasiRak,
        harga: this.formBaru.harga,
        qty: this.formBaru.qty,
        safety: this.formBaru.safety,
        catatanHTML: this.formBaru.catatanHTML
      });
      
      // Reset form
      this.formBaru = {
        kode: '',
        judul: '',
        kategori: '',
        upbjj: '',
        lokasiRak: '',
        harga: 0,
        qty: 0,
        safety: 0,
        catatanHTML: ''
      };
      
      this.validationErrors = {};
      this.showAddForm = false;
      
      alert('Bahan ajar berhasil ditambahkan!');
      console.log('Bahan ajar baru ditambahkan. Total stok:', this.stok.length);
    },
    
    // Method untuk edit stok
    editStok(index) {
      this.editingIndex = index;
      console.log('Editing stok:', this.stok[index].kode);
    },
    
    // Method untuk simpan edit stok
    simpanEditStok() {
      alert('Perubahan berhasil disimpan!');
      this.editingIndex = null;
      console.log('Stok berhasil diupdate');
    }
  }
});