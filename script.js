const firebaseConfig = {
    apiKey: "AIzaSyA-anj-4HaCDXyS3nkIu5_hNCE7FvTyhN4",
    authDomain: "mars-website-731e1.firebaseapp.com",
    projectId: "mars-website-731e1",
    storageBucket: "mars-website-731e1.firebasestorage.app",
    messagingSenderId: "307236284511",
    appId: "1:307236284511:web:351debbd49b60cfd4613ea"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const blogForm = document.getElementById('blog-form');
const blogList = document.getElementById('blog-list');
const createBlogBtn = document.getElementById('create-blog-btn');
const blogTitleInput = document.getElementById('blog-title');
const blogContentInput = document.getElementById('blog-content');

auth.onAuthStateChanged(user => {
    if (user) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        blogForm.style.display = 'block';
        migrateBlogs();
        fetchBlogs();
    } else {
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        blogForm.style.display = 'none';
        blogList.innerHTML = '';
    }
});

loginBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
});

logoutBtn.addEventListener('click', () => {
    auth.signOut();
});

createBlogBtn.addEventListener('click', () => {
    const title = blogTitleInput.value;
    const content = blogContentInput.value;
    if (title && content) {
        db.collection('blogs').add({
            title: title,
            content: content,
            author: auth.currentUser.uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            blogTitleInput.value = '';
            blogContentInput.value = '';
            fetchBlogs();
        });
    }
});

async function migrateBlogs() {
    const blogPageURL = "blog.html";
    try {
        const response = await fetch(blogPageURL);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const thumbnails = doc.querySelectorAll("a .thumbnail");
        thumbnails.forEach(async (thumbnail) => {
            const title = thumbnail.querySelector(".title").textContent;
            const author = thumbnail.querySelector(".author").textContent;
            const date = thumbnail.querySelector(".date").textContent;
            const content = thumbnail.querySelector(".description").textContent;
            
            await db.collection('blogs').add({
                title: title,
                author: author,
                date: date,
                content: content,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        });
    } catch (error) {
        console.error("Error migrating blogs:", error);
    }
}


function fetchBlogs() {
    db.collection('blogs').orderBy('timestamp', 'desc').get().then(snapshot => {
        blogList.innerHTML = '';
        snapshot.forEach(doc => {
            const blog = doc.data();
            const blogPost = document.createElement('div');
            blogPost.classList.add('blog-post');
            blogPost.innerHTML = `
                <h3>${blog.title}</h3>
                <p>${blog.content}</p>
            `;
            blogList.appendChild(blogPost);
        });
    });
}
