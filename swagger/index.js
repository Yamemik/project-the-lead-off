import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import swaggerAutogen from 'swagger-autogen'

const _dirname = dirname(fileURLToPath(import.meta.url))


const doc = {
    info: {
      title: 'Проект lead-off',
      description: '',
    },
    securityDefinitions: {
      bearerAuth: {
          type: 'apiKey',
          scheme: 'bearer',
          bearerFormat: 'JWT'
      }
    },
    host: 'project-the-leads.onrender.com',
    schemes: ['https'],
    definitions: {
      User: {
        fio: "buyer1",
        email: "emmail@mail.ru",
        telephone: "+79998887766",
        organization: true,
        region: ["648da61bb1b77049cf3132ac","648da62db1b77049cf3132b1"],
        business_line: ["64905d35da79634eb9ca985a","64905d70da79634eb9ca986b","64905d01da79634eb9ca9850"],
        access_to_open: true,
        is_admin: false,
        balance: 0,
        passwordHash: 'passwordHash'      
      },
      User: {
        name: 'Jhon Doe',
        age: 29,
        parents: {
          $ref: '#/definitions/Parents'
        },
        diplomas: [
          {
            school: 'XYZ University',
            year: 2020,
            completed: true,
            internship: {
              hours: 290,
              location: 'XYZ Company'
            }
          }
        ]
      },
      AddUser: {
        $name: 'Jhon Doe',
        $age: 29,
        about: ''
      },
      // { ... }
    }
};

const outputFile = join(_dirname, 'output.json')
const endpointsFiles = [join(_dirname, '../index.js')]

swaggerAutogen(/* options */)(outputFile, endpointsFiles, doc).then(
  ({ success }) => {
    console.log(`Generated: ${success}`)
  }
)