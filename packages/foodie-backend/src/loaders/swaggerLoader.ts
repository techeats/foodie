import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger/swagger.json'

export default (app) => {
let options = {
    explorer: true,
    swaggerOptions: {
      docExpansion: 'none'
    },
    customSiteTitle: 'Foodie api',
    customCss:
      '.swagger-ui .topbar { background: linear-gradient(135deg, #44b5af 0%,#5392c7 100%)} '
    // customCssUrl:'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css'
  }
  // swagger documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))
}