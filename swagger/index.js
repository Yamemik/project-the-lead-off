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
        $fio: "фио",
        $email: "emmail@mail.ru",
        $telephone: "+79998887766",
        organization: 'неизвестно',
        region: ["имя/id","имя/id"],
        business_line: ["имя/id","имя/id","имя/id"],
        access_to_open: false,
        is_admin: false,
        balance: 0
      },
      Order: {
        $nomeclature: ["nomen1.3.1","nomen1.2.1","group1.1"],
        $region: ["reg1"],
        text: "text",
        upload: ["url1","url2"],
        $email: "email.yandex.ru",
        $telephone: ["tel1","tel2"],
        $fio: "fio",
        $score: "мелкая",
        $typeBuyer: "частная организация",
        $type_order: "прямая закупка",
        $is_urgent: "да",
        $isOpen: "открытая",
        price: 0,
        isArchive: false,
        is_sale: false,
        is_express: true,
        user: {
          $ref: '#/definitions/User'
        },
        date_buy: new Date(),
        isBuy: false,
        isCanceled: false,
        isCanceledText: "хочу деньги назад",
        isCancel: false
     },
      Category: {        
        category: ["cat1","cat2","cat3"],
        index: 556,     
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
      Region: {
        $country: "Qazakstan",
        $city: "Astana",
        index: 1      
      }
    }
};

const outputFile = join(_dirname, 'output.json')
const endpointsFiles = [join(_dirname, '../index.js')]

swaggerAutogen(/* options */)(outputFile, endpointsFiles, doc).then(
  ({ success }) => {
    console.log(`Generated: ${success}`)
  }
)