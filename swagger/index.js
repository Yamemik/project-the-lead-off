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
        $fio: "buyer1",
        $email: "emmail@mail.ru",
        $telephone: "+79998887766",
        organization: 'неизвестно',
        $region: ["648da61bb1b77049cf3132ac","648da62db1b77049cf3132b1"],
        $business_line: ["64905d35da79634eb9ca985a","64905d70da79634eb9ca986b","64905d01da79634eb9ca9850"],
        access_to_open: false,
        is_admin: false,
        balance: 0
      },
      User1: {
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
      Rate: {
        score: [{"easy": 0.8},{"medium": 1.0},{"hard": 1.2},{"hard+": 1.4}],
        type_buyer: [{"state": 1.8},{"private": 2.8}],
        type_order: [{"tender": 3.8},{"order": 4.8}],
        is_urgent: [{"yes": 5.8},{"no": 6.8}],
        is_express: [{"yes": 7.8},{"no": 8.8}],
        count_region: [1.2,1.1,1],
        is_open: [{"yes": 0.5},{"no": 0.6}],
        is_sale: [{"yes": 0.9},{"no": 0.43}]      
      },
    }
};

const outputFile = join(_dirname, 'output.json')
const endpointsFiles = [join(_dirname, '../index.js')]

swaggerAutogen(/* options */)(outputFile, endpointsFiles, doc).then(
  ({ success }) => {
    console.log(`Generated: ${success}`)
  }
)