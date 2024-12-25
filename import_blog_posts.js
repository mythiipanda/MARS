const admin = require('firebase-admin');
const serviceAccount = {
  "type": "service_account",
  "project_id": "mars-website-731e1",
  "private_key_id": "1aec99a5a3e81f9ff49dc3824e53466157db15ad",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDEScXdfwUUPa0o\n9XVJleCLKWblf7t+mPJcQsam/eaKW5kDhKlPL9F5CVw3z8mAwzF3+MuuA0Ull4dr\nNV0ILQLI/8olU1A19FMzKAY+Af8pYtX9Ahnx3V5Rgqz3hLYB7cuUq7Opl1o3oPM9\nGQ673W601fE2NBGgbQK+MICyF9swYH1qvvDgnnTCp8rXouY4jQkG9ZAhdSX2u9Y/\no16VT4onWolwNG+KB480AkH7eGvBzqqEIsPbskD/UJczNAxhmn7FTimoHG0hqhaa\nugPnii9WxSZKsX8d5Lp/3Fxd5yixpR3/As/M9utLtj28R3DRuxV+uN762oCQSRd2\nND3Lu1uZAgMBAAECggEABjilCKdWegpBu0BwYQ6FiT5HhchIdojoIZbM5Le7v1s2\nMdTaEumb6jSq6L/xYzSMlFYH3/I4QP/uVFkNePgIPxD7D2IhHYdVaGkr2CTzDpTp\n3bTb1/0hWKmwzBWM4+nCtT8YmNb0Y+VPivpeK658gZxy9+Sq7FqYJtQIYtymX1WZ\nSUru++R80cINrQbX4kJfC2xAQdU86cmhfnY3avoHEi2D0oAfsVHBBUTLh5Wyow62\nzolDxKzPneVgMYYwavrCtxa4rJEfS/3ZzCfodRWwRuwVJNug27OlPOD0nJc3YY/+\ns1Pmym1hBWv2HNKDMgbaz0OwBWKfB6YDHrJYsmF/AwKBgQD5l9gdTgBN8NKzyweU\ngLKy1fCparSXeFd3gEJtqDj5LGmiQv0aKgPsDEqRe8mg+fxk6jZzPkqy1A5D6byg\nS3gB/ulVTdFk0aDf7tQFDQs3jgMmf4I/6Gx0KagPJ61pJUD6Kq5zXWi0iN7jXDwH\nbkHJL90vSnTbBaXtRje5gzm81wKBgQDJU6UVFAdA2wzjEjZE/aO+LIE7qQgR49uy\nr7ifxCLyUX1HY0lDKZEu5DO9WgDjDIH0Gwik6/abSiIA7kJfWdXy7Ha6rqiiFmvg\nYPX2WbpuFefjiXDjo2ydcoGZCvJfV44SiQ4zG7UlJB/mHs/nHS1ROSBW7FvRbK8G\nW+1kK6StDwKBgQDHvaO+9/A4b5Q/PCipyEC564o4GmPBoBXnVWZT2T8W8Vrr9s4U\nhTE0UzXNrZHTWJuKqwC+Q0iGSjvMT56bbSnx9u0GTktXcodbDgbwr9qdL/IHeh1j\nRX6di8SptCgLsDuKuGN5gXRMngg5TVPg4nSVK8/Hi79uk9uQwhPQS1sGawKBgQCR\nzqp4oZC/P+YNblsvjCLS0JioBLt7eXLb7rffvcUxiiMZWKbupWQoec2fDVgnGB/m\nEs4n410vCnmmAui+9ekljmxOt8AZ4/MtBgwc5s9Ge0b+W8QOmYVIYm3J0UvIETkr\n42cNTLvcslUH7LjVwSPY926chYHaIsR/7oP3UERrsQKBgBEzvEgvTVRd3q65/Z0G\nKScrLuLgSMmNZD4p/IwKrYzlJLvgwG5PPzQ53E1zzZOR61A4CKlaLz16/2iaOR4k\nZhiXdEazYSnxPTgGole635+P90dX5/waDuO+0Skxv7VMl5MCgnuwiZRvtO1ysAuQ\nzpwTDLZRf5TcsPep4tBr8FXc\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-pefon@mars-website-731e1.iam.gserviceaccount.com",
  "client_id": "100311467202774258048",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pefon%40mars-website-731e1.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mars-website-731e1.firebaseio.com"
});

const db = admin.firestore();

const blogPosts = require('./blog_data.json').posts;

async function importData() {
  for (const post of blogPosts) {
    try {
      await db.collection('blogPosts').doc(post.id).set(post);
      console.log(`Imported blog post: ${post.id}`);
    } catch (error) {
      console.error(`Error importing blog post ${post.id}:`, error);
    }
  }
  console.log('All blog posts imported successfully!');
}

importData();
