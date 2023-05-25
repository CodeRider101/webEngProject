const express = require('express');
   const app = express();
   const port = 8000;

   // Serve static files from the 'public' directory
   app.use(express.static('public'));

   // Define routes
   app.get('/', (req, res) => {
     res.sendFile(__dirname + '/views/index.html');
   });

   // Start the server
   app.listen(port, () => {
     console.log(`Server running on port ${port}`);
   });