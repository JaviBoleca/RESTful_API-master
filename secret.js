const crypto = require("crypto");

const secret = "Full stack 12";
const newSecret = "Full stack 12 to guapo";

const hash = crypto
  .createHmac("sha256", secret)
  .update("me gustan los perritos")
  .digest("hex");

const newHash = crypto
  .createHmac("sha256", newSecret)
  .update("me gustan los gatitos")
  .digest("hex");

console.log(newHash);

//llevarlo a jason web token y pegarlo en la firma el newHash cuado pongas en la terminal
//node secret.js
//tambien lo pegamos en .env y en el gitignore
