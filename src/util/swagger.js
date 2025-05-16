import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AstraCart API',
      version: '1.0.0'
    }
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
};

export default setupSwagger;
