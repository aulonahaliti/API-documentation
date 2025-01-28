const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Dokumentacioni',
      version: '1.0.0',
      description: 'Dokumentacioni për API-të',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./app.js'], // Path to the API docs in your code
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Routes
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Merr të gjithë përdoruesit
 *     responses:
 *       200:
 *         description: Lista e përdoruesve
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 * 
 */

app.get('/users', (req, res) => {
  res.send([{ id: 1, name: 'John Doe' }]);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Shto një përdorues të ri
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Përdoruesi u shtua
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 */

app.post('/users', (req, res) => {
  const { name } = req.body;
  res.status(201).send({ id: 2, name });
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Përditëso një përdorues
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e përdoruesit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Përdoruesi u përditësua
 */

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  res.send({ id, name });
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Fshij një përdorues
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID e përdoruesit
 *     responses:
 *       200:
 *         description: Përdoruesi u fshi
 */

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  res.send({ message: `Përdoruesi me id ${id} u fshi.` });
});

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Merr të gjitha produktet
 *     responses:
 *       200:
 *         description: Lista e produkteve
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */

app.get('/products', (req, res) => {
  res.send([{ id: 1, name: 'Laptop' }, { id: 2, name: 'Smartphone' }]);
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Shto një produkt të ri
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Produkti u shtua
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 */

app.post('/products', (req, res) => {
  const { name } = req.body;
  res.status(201).send({ id: 3, name });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveri po dëgjon në portën ${PORT}`);
  console.log(`API dokumentacioni është i disponueshëm në http://localhost:${PORT}/api-docs`);
});