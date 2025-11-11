var app = new Vue({
  el: '#app',
  data: {
    pengirimanList: [
      { kode: "REG", nama: "JNE Reguler (3-5 hari)" },
      { kode: "EXP", nama: "JNE Express (1-2 hari)" }
    ],
    paket: [
      { 
        kode: "PAKET-UT-001", 
        nama: "PAKET IPS Dasar", 
        isi: ["EKMA4116", "EKMA4115"], 
        harga: 120000 
      },
      { 
        kode: "PAKET-UT-002", 
        nama: "PAKET IPA Dasar", 
        isi: ["BIOL4201", "FISIP4001"], 
        harga: 140000 
      },
      { 
        kode: "PAKET-UT-003", 
        nama: "PAKET Matematika & Bahasa", 
        isi: ["MATE4101", "BING4201"], 
        harga: 110000 
      }
    ],
    tracking: {
      "DO2025-0001": {
        nim: "123456789",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE Express",
        tanggalKirim: "2025-01-25",
        paket: "PAKET-UT-001",
        total: 120000,
        perjalanan: [
          { waktu: "2025-01-25 10:12:20", keterangan: "Penerimaan di Loket: TANGSEL" },
          { waktu: "2025-01-25 14:07:56", keterangan: "Tiba di Hub: JAKSEL" },
          { waktu: "2025-01-26 08:44:01", keterangan: "Diteruskan ke Kantor Tujuan" }
        ]
      },
      "DO2025-0002": {
        nim: "987654321",
        nama: "Budi Santoso",
        status: "Terkirim",
        ekspedisi: "JNE Reguler",
        tanggalKirim: "2025-01-20",
        paket: "PAKET-UT-002",
        total: 140000,
        perjalanan: [
          { waktu: "2025-01-20 09:15:00", keterangan: "Penerimaan di Loket: SURABAYA" },
          { waktu: "2025-01-20 16:30:45", keterangan: "Tiba di Hub: SURABAYA PUSAT" },
          { waktu: "2025-01-21 07:22:10", keterangan: "Dalam perjalanan ke alamat tujuan" },
          { waktu: "2025-01-21 15:45:30", keterangan: "Paket telah diterima oleh penerima" }
        ]
      }
    },
    
    // Form data
    formDO: {
      nim: '',
      nama: '',
      ekspedisi: '',
      paketKode: '',
      tanggalKirim: ''
    },
    validationErrors: {},
    
    // Counter untuk sequence number
    doCounter: 3
  },
  
  computed: {
    // Computed untuk generate nomor DO otomatis
    nomorDO() {
      const year = new Date().getFullYear();
      const sequence = String(this.doCounter).padStart(4, '0');
      return `DO${year}-${sequence}`;
    },
    
    // Computed untuk mendapatkan paket yang dipilih
    selectedPaket() {
      if (!this.formDO.paketKode) {
        return null;
      }
      return this.paket.find(p => p.kode === this.formDO.paketKode);
    }
  },
  
  watch: {
    // Watcher 1: Monitor perubahan paket untuk auto-fill tanggal
    'formDO.paketKode'(newVal) {
      if (newVal && !this.formDO.tanggalKirim) {
        // Auto-fill tanggal hari ini
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        this.formDO.tanggalKirim = `${year}-${month}-${day}`;
        
        console.log('Paket dipilih:', newVal);
        console.log('Tanggal kirim auto-fill:', this.formDO.tanggalKirim);
      }
    },
    
    // Watcher 2: Monitor perubahan tracking untuk logging
    tracking: {
      handler(newVal) {
        console.log('Data tracking berubah. Total DO:', Object.keys(newVal).length);
      },
      deep: true
    }
  },
  
  methods: {
    // Method untuk format harga
    formatHarga(harga) {
      return harga.toLocaleString('id-ID');
    },
    
    // Method untuk format tanggal
    formatTanggal(tanggal) {
      const date = new Date(tanggal);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('id-ID', options);
    },
    
    // Method untuk format waktu
    formatWaktu() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    
    // Method untuk validasi form
    validateFormDO() {
      this.validationErrors = {};
      let isValid = true;
      
      // Validasi NIM (harus 9 digit angka)
      if (!this.formDO.nim || !/^\d{9}$/.test(this.formDO.nim)) {
        this.validationErrors.nim = 'NIM harus 9 digit angka';
        isValid = false;
      }
      
      // Validasi nama
      if (!this.formDO.nama.trim()) {
        this.validationErrors.nama = 'Nama wajib diisi';
        isValid = false;
      } else if (this.formDO.nama.trim().length < 3) {
        this.validationErrors.nama = 'Nama minimal 3 karakter';
        isValid = false;
      }
      
      return isValid;
    },
    
    // Method untuk tambah delivery order
    tambahDeliveryOrder() {
      if (!this.validateFormDO()) {
        alert('Mohon perbaiki error pada form');
        return;
      }
      
      // Ambil data paket
      const paket = this.paket.find(p => p.kode === this.formDO.paketKode);
      if (!paket) {
        alert('Paket tidak ditemukan');
        return;
      }
      
      // Ambil ekspedisi
      const ekspedisi = this.pengirimanList.find(e => e.kode === this.formDO.ekspedisi);
      
      // Generate nomor DO
      const noDO = this.nomorDO;
      
      // Buat data tracking baru
      const newTracking = {
        nim: this.formDO.nim,
        nama: this.formDO.nama,
        status: "Diproses",
        ekspedisi: ekspedisi.nama,
        tanggalKirim: this.formDO.tanggalKirim,
        paket: this.formDO.paketKode,
        total: paket.harga,
        perjalanan: [
          { 
            waktu: this.formatWaktu(), 
            keterangan: "DO telah dibuat dan menunggu proses pengiriman" 
          }
        ]
      };
      
      // Tambahkan ke tracking (menggunakan Vue.set untuk reaktivitas)
      this.$set(this.tracking, noDO, newTracking);
      
      // Increment counter
      this.doCounter++;
      
      // Reset form
      this.formDO = {
        nim: '',
        nama: '',
        ekspedisi: '',
        paketKode: '',
        tanggalKirim: ''
      };
      
      this.validationErrors = {};
      
      alert(`Delivery Order ${noDO} berhasil dibuat!`);
      console.log('DO baru dibuat:', noDO);
      console.log('Data tracking:', newTracking);
      
      // Scroll ke bawah untuk melihat DO yang baru dibuat
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  },
  
  mounted() {
    console.log('Tracking App Vue.js berhasil dimuat');
    console.log('Total paket tersedia:', this.paket.length);
    console.log('Total tracking DO:', Object.keys(this.tracking).length);
  }
});