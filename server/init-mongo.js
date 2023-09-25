db.createUser(
  {
      user: "admin",
      pwd: "admin",
      roles: [
          {
              role: "readWrite",
              db: "memes"
          }
      ]
  }
);

db.createCollection("hashtags");
db.createCollection("uploadedMemes");