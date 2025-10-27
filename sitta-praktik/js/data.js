// Data Pengguna untuk Login
const dataPengguna = [
    {
        id: 1,
        nama: "Rina Wulandari",
        email: "rina@ut.ac.id",
        password: "rina123",
        role: "UPBJJ-UT",
        lokasi: "UPBJJ Jakarta"
    },
    {
        id: 2,
        nama: "Agus Pranoto",
        email: "agus@ut.ac.id",
        password: "agus123",
        role: "UPBJJ-UT",
        lokasi: "UPBJJ Makassar"
    },
    {
        id: 3,
        nama: "Siti Marlina",
        email: "siti@ut.ac.id",
        password: "siti123",
        role: "Puslaba",
        lokasi: "Pusat"
    },
    {
        id: 4,
        nama: "Doni Setiawan",
        email: "doni@ut.ac.id",
        password: "doni123",
        role: "Fakultas",
        lokasi: "FISIP"
    },
    {
        id: 5,
        nama: "Admin SITTA",
        email: "admin@ut.ac.id",
        password: "admin123",
        role: "Administrator",
        lokasi: "Pusat"
    }
];

// Data Bahan Ajar
const dataBahanAjar = [
    {
        kodeLokasi: "0TMP01",
        kodeBarang: "ASIP4301",
        namaBarang: "Pengantar Ilmu Komunikasi",
        jenisBarang: "BMP",
        edisi: "2",
        stok: 548,
        harga: 85000,
        cover: "images/pengantar_komunikasi.jpg"
    },
    {
        kodeLokasi: "0JKT01",
        kodeBarang: "EKMA4216",
        namaBarang: "Manajemen Keuangan",
        jenisBarang: "BMP",
        edisi: "3",
        stok: 392,
        harga: 95000,
        cover: "images/manajemen_keuangan.jpg"
    },
    {
        kodeLokasi: "0SBY02",
        kodeBarang: "EKMA4310",
        namaBarang: "Kepemimpinan",
        jenisBarang: "BMP",
        edisi: "1",
        stok: 278,
        harga: 75000,
        cover: "images/kepemimpinan.jpg"
    },
    {
        kodeLokasi: "0MLG01",
        kodeBarang: "BIOL4211",
        namaBarang: "Mikrobiologi Dasar",
        jenisBarang: "BMP",
        edisi: "2",
        stok: 46,
        harga: 90000,
        cover: "images/mikrobiologi.jpg"
    },
    {
        kodeLokasi: "0UPBJJBDG",
        kodeBarang: "PAUD4401",
        namaBarang: "Perkembangan Anak Usia Dini",
        jenisBarang: "BMP",
        edisi: "4",
        stok: 204,
        harga: 88000,
        cover: "images/paud_perkembangan.jpg"
    }
];

// Data Tracking Pengiriman
const dataTracking = [
    {
        nomorDO: "2023001234",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        progressPercentage: 60,
        ekspedisi: "JNE",
        tanggalKirim: "2025-10-20",
        jenispaket: "Paket Reguler",
        paket: "0JKT01",
        totalPembayaran: 180000,
        riwayat: [
            {
                tanggal: "2025-10-20 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                tanggal: "2025-10-20 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },
            {
                tanggal: "2025-10-21 16:45:30",
                keterangan: "Diteruskan ke Kantor Jakarta Selatan"
            }
        ]
    },
    {
        nomorDO: "2023005678",
        nama: "Agus Pranoto",
        status: "Terkirim",
        progressPercentage: 100,
        ekspedisi: "Pos Indonesia",
        tanggalKirim: "2025-10-18",
        jenispaket: "Paket Reguler",
        paket: "0UPBJJBDG",
        totalPembayaran: 220000,
        riwayat: [
            {
                tanggal: "2025-10-18 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                tanggal: "2025-10-18 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },
            {
                tanggal: "2025-10-18 16:30:10",
                keterangan: "Diteruskan ke Kantor Kota Bandung"
            },
            {
                tanggal: "2025-10-19 12:15:33",
                keterangan: "Tiba di Hub: Kota BANDUNG"
            },
            {
                tanggal: "2025-10-19 15:06:12",
                keterangan: "Proses antar ke Cimahi"
            },
            {
                tanggal: "2025-10-19 20:00:00",
                keterangan: "Selesai Antar. Penerima: Agus Pranoto"
            }
        ]
    },
    {
        nomorDO: "2023009012",
        nama: "Siti Marlina",
        status: "Diproses",
        progressPercentage: 25,
        ekspedisi: "JNE",
        tanggalKirim: "2025-10-25",
        jenispaket: "Paket Express",
        paket: "0TMP01",
        totalPembayaran: 195000,
        riwayat: [
            {
                tanggal: "2025-10-25 08:30:15",
                keterangan: "Pesanan sedang diproses di gudang"
            },
            {
                tanggal: "2025-10-25 10:45:20",
                keterangan: "Paket sedang dikemas"
            }
        ]
    },
    {
        nomorDO: "2023012345",
        nama: "Doni Setiawan",
        status: "Dalam Perjalanan",
        progressPercentage: 75,
        ekspedisi: "SiCepat",
        tanggalKirim: "2025-10-22",
        jenispaket: "Paket Reguler",
        paket: "0SBY02",
        totalPembayaran: 165000,
        riwayat: [
            {
                tanggal: "2025-10-22 09:00:00",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                tanggal: "2025-10-22 13:30:45",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },
            {
                tanggal: "2025-10-23 08:15:30",
                keterangan: "Diteruskan ke Kantor Jakarta Pusat"
            },
            {
                tanggal: "2025-10-24 10:00:00",
                keterangan: "Paket tiba di kota tujuan"
            },
            {
                tanggal: "2025-10-25 14:30:00",
                keterangan: "Paket sedang dalam pengantaran"
            }
        ]
    },
    {
        nomorDO: "2023015678",
        nama: "Rudi Hermawan",
        status: "Terkirim",
        progressPercentage: 100,
        ekspedisi: "J&T Express",
        tanggalKirim: "2025-10-15",
        jenispaket: "Paket Same Day",
        paket: "0MLG01",
        totalPembayaran: 250000,
        riwayat: [
            {
                tanggal: "2025-10-15 07:00:00",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                tanggal: "2025-10-15 09:30:00",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },
            {
                tanggal: "2025-10-15 11:00:00",
                keterangan: "Paket dalam perjalanan ke tujuan"
            },
            {
                tanggal: "2025-10-15 14:00:00",
                keterangan: "Paket tiba di lokasi tujuan"
            },
            {
                tanggal: "2025-10-15 16:30:00",
                keterangan: "Selesai Antar. Penerima: Rudi Hermawan"
            }
        ]
    }
];

// Data Histori Transaksi (generated dari tracking)
const dataHistori = [
    {
        tanggal: "2025-10-20",
        noDO: "2023001234",
        namaMahasiswa: "Rina Wulandari",
        jumlahBahan: 3,
        total: 180000,
        status: "Dalam Perjalanan"
    },
    {
        tanggal: "2025-10-18",
        noDO: "2023005678",
        namaMahasiswa: "Agus Pranoto",
        jumlahBahan: 4,
        total: 220000,
        status: "Terkirim"
    },
    {
        tanggal: "2025-10-25",
        noDO: "2023009012",
        namaMahasiswa: "Siti Marlina",
        jumlahBahan: 2,
        total: 195000,
        status: "Diproses"
    },
    {
        tanggal: "2025-10-22",
        noDO: "2023012345",
        namaMahasiswa: "Doni Setiawan",
        jumlahBahan: 3,
        total: 165000,
        status: "Dalam Perjalanan"
    },
    {
        tanggal: "2025-10-15",
        noDO: "2023015678",
        namaMahasiswa: "Rudi Hermawan",
        jumlahBahan: 5,
        total: 250000,
        status: "Terkirim"
    }
];