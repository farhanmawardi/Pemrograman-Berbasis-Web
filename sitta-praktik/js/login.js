// Get modal elements
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const registerModal = document.getElementById('registerModal');

// Get button elements
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const registerLink = document.getElementById('registerLink');

// Get close elements
const closeForgotPassword = document.getElementById('closeForgotPassword');
const closeRegister = document.getElementById('closeRegister');

// Modal functions
forgotPasswordLink.addEventListener('click', () => {
    forgotPasswordModal.style.display = 'block';
});

registerLink.addEventListener('click', () => {
    registerModal.style.display = 'block';
});

closeForgotPassword.addEventListener('click', () => {
    forgotPasswordModal.style.display = 'none';
});

closeRegister.addEventListener('click', () => {
    registerModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === forgotPasswordModal) {
        forgotPasswordModal.style.display = 'none';
    }
    if (e.target === registerModal) {
        registerModal.style.display = 'none';
    }
});

// Login form handler
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validate credentials
    const user = dataPengguna.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Save user data to sessionStorage
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        
        // Show success message
        alert('Login berhasil! Selamat datang, ' + user.nama);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Show error message
        alert('Email atau password yang Anda masukkan salah!');
    }
});

// Forgot password form handler
document.getElementById('forgotPasswordForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('forgotEmail').value;
    
    // Check if email exists
    const user = dataPengguna.find(u => u.email === email);
    
    if (user) {
        alert('Link reset password telah dikirim ke email Anda: ' + email);
        forgotPasswordModal.style.display = 'none';
        document.getElementById('forgotPasswordForm').reset();
    } else {
        alert('Email tidak ditemukan dalam sistem!');
    }
});

// Register form handler
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
    
    // Validate passwords match
    if (password !== passwordConfirm) {
        alert('Password dan konfirmasi password tidak cocok!');
        return;
    }
    
    // Check if email already exists
    const existingUser = dataPengguna.find(u => u.email === email);
    if (existingUser) {
        alert('Email sudah terdaftar! Silakan gunakan email lain.');
        return;
    }
    
    // In real app, this would save to database
    alert('Pendaftaran berhasil! Silakan login dengan akun Anda.');
    registerModal.style.display = 'none';
    document.getElementById('registerForm').reset();
    
    // Auto-fill login form
    document.getElementById('email').value = email;
});