//////////////////////////////////////////////////////
// INCLUDES
//////////////////////////////////////////////////////
const app = require('./src/app');
//////////////////////////////////////////////////////
// SETUP ENVIRONMENT
//////////////////////////////////////////////////////
const PORT = 1234;
//////////////////////////////////////////////////////
// START SERVER
//////////////////////////////////////////////////////
app.listen(PORT,()=> {
    console.log(`App listening to port ${PORT}`);
});