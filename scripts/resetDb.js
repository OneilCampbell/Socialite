const { db } = require("../models/models.js");
const main = async () => {
    // note: this will read from your models and won't work unless they're defined.
    await db.sync({ force: true });
    process.exit();
  };
  
  main();
  