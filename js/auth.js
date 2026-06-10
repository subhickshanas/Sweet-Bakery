// Authentication Module
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { auth, db } from "./firebase.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in
        localStorage.setItem('userEmail', user.email);
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            window.location.href = 'home.html';
        }
    } else {
        // User is logged out
        if (!window.location.pathname.includes('index.html') && window.location.pathname !== '/') {
            localStorage.removeItem('userEmail');
        }
    }
});

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login successful!');
            window.location.href = 'home.html';
        } catch (error) {
            document.getElementById('loginError').textContent = error.message;
        }
    });
}

// Register Form Handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (password !== confirmPassword) {
            document.getElementById('registerConfirmError').textContent = 'Passwords do not match';
            return;
        }

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;

            // Save user profile to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                name: name,
                email: email,
                createdAt: new Date()
            });

            alert('Registration successful! Please login.');
            window.location.href = 'index.html';
        } catch (error) {
            document.getElementById('registerError').textContent = error.message;
        }
    });
}

// Logout Button Handler
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('userEmail');
            alert('Logged out successfully');
            window.location.href = 'index.html';
        } catch (error) {
            alert('Error logging out: ' + error.message);
        }
    });
}

// Forgot Password Modal
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const closeModal = document.querySelector('.close');
const resetPasswordBtn = document.getElementById('resetPasswordBtn');

if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        forgotPasswordModal.style.display = 'block';
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        forgotPasswordModal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === forgotPasswordModal) {
        forgotPasswordModal.style.display = 'none';
    }
});

if (resetPasswordBtn) {
    resetPasswordBtn.addEventListener('click', async () => {
        const email = document.getElementById('resetEmail').value;
        try {
            await sendPasswordResetEmail(auth, email);
            document.getElementById('resetError').textContent = 'Password reset email sent!';
            document.getElementById('resetError').style.color = '#27ae60';
            setTimeout(() => {
                forgotPasswordModal.style.display = 'none';
            }, 2000);
        } catch (error) {
            document.getElementById('resetError').textContent = error.message;
        }
    });
}

// Tab switching
const tabButtons = document.querySelectorAll('.tab-btn');
const authForms = document.querySelectorAll('.auth-form');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        authForms.forEach(form => form.classList.remove('active-tab'));
        
        button.classList.add('active');
        document.getElementById(tabName + 'Form').classList.add('active-tab');
    });
});

// Google Sign-In
const googleSignInBtn = document.getElementById('googleSignInBtn');
if (googleSignInBtn) {
    googleSignInBtn.addEventListener('click', async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Save user profile to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                createdAt: new Date()
            });

            window.location.href = 'home.html';
        } catch (error) {
            alert('Google Sign-In failed: ' + error.message);
        }
    });
}

export { auth, db };
