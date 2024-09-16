import express from 'express'
//./app/api/users/route.js
import userRoutes from './routes/user.routes.js';
import servicesRoutes from './routes/services.routes.js';
import clientsRoutes from './routes/clients.routes.js';
//nodemon src/index.js en package json

const app = express();

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", servicesRoutes);
app.use("/api", clientsRoutes);

app.listen(3000)
console.log('Server on port', 3000)