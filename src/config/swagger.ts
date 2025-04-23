import swaggerJSDoc, { SwaggerDefinition } from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / Typescript',
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://upload.wikimedia.org/wikipedia/commons/8/83/Escudo_del_Club_Atl%C3%A9tico_Boca_Juniors.svg');
            height: 80px;
            width: auto;
        }
    `,
    customSiteTitle: 'Documentacion REST API Express / TypeScript',
    customfavIcon: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Escudo_del_Club_Atl%C3%A9tico_Boca_Juniors.svg'
}

export default swaggerSpec

export {
    swaggerUiOptions
}