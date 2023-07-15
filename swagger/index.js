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
      region: ["имя/id", "имя/id"],
      business_line: ["имя/id", "имя/id", "имя/id"],
      access_to_open: false,
      is_admin: false,
      balance: 0
    },
    Order: {
      $nomeclature: ["nomen1.3.1", "nomen1.2.1", "group1.1"],
      $region: ["reg1"],
      text: "text",
      upload: [
        {
          "fieldname": "file",
          "originalname": "README.md",
          "encoding": "7bit",
          "mimetype": "text/markdown",
          "destination": "uploads",
          "filename": "file-1688806832294-14506629",
          "path": "uploads/file-1688806832294-14506629",
          "size": 3340
        },
        {
          "fieldname": "file",
          "originalname": "package.json",
          "encoding": "7bit",
          "mimetype": "application/json",
          "destination": "uploads",
          "filename": "file-1688806832296-191559703",
          "path": "uploads/file-1688806832296-191559703",
          "size": 1981
        }
      ],
      $email: "email@yandex.ru",
      $telephone: ["tel1", "tel2"],
      $fio: "fio",
      $score: "мелкая",
      $type_buyer: "частная организация",
      $type_order: "прямая закупка",
      $is_urgent: "да",
      $is_open: "открытая",
      price: 0,
      is_archive: false,
      is_sale: false,
      is_express: true,
      user: {
        $ref: '#/definitions/User'
      },
      date_buy: new Date(),
      is_buy: false,
      is_canceled: false,
      is_canceled_text: "хочу деньги назад",
      is_cancel: false
    },
    Category: {
      category: ["cat1", "cat2", "cat3"],
      base_price: 556,
    },
    Payment: {
      payment: {
        "id": "22d6d597-000f-5000-9000-145f6df21d6f",
        "status": "succeeded",
        "paid": true,
        "amount": {
          "value": "2.00",
          "currency": "RUB"
        },
        "authorization_details": {
          "rrn": "10000000000",
          "auth_code": "000000",
          "three_d_secure": {
            "applied": true
          }
        },
        "captured_at": "2018-07-10T14:32:08.545Z",
        "created_at": "2018-07-10T14:25:27.535Z",
        "description": "Заказ №72",
        "income_amount": {
          "value": "1.92",
          "currency": "RUB"
        },
        "metadata": {},
        "payment_method": {
          "type": "bank_card",
          "id": "22d6d597-000f-5000-9000-145f6df21d6f",
          "saved": false,
          "card": {
            "first6": "555555",
            "last4": "4477",
            "expiry_month": "01",
            "expiry_year": "2030",
            "card_type": "MasterCard",
            "issuer_country": "US"
          },
          "title": "Bank card *4477"
        },
        "recipient": {
          "account_id": "100500",
          "gateway_id": "100700"
        },
        "refundable": true,
        "refunded_amount": {
          "value": "0.00",
          "currency": "RUB"
        },
        "test": true
      },
      user_id: "64a01e95f7c1601edf3e60a7",
    },
    Settings: {
      settings: ["object","object"]
    },
    Rate: {
      score: [{ "easy": 0.8 }, { "medium": 1.0 }, { "hard": 1.2 }, { "hard+": 1.4 }],
      type_buyer: [{ "state": 1.8 }, { "private": 2.8 }],
      type_order: [{ "tender": 3.8 }, { "order": 4.8 }],
      is_urgent: [{ "yes": 5.8 }, { "no": 6.8 }],
      is_express: [{ "yes": 7.8 }, { "no": 8.8 }],
      count_region: [1.2, 1.1, 1],
      is_open: [{ "yes": 0.5 }, { "no": 0.6 }],
      is_sale: [{ "yes": 0.9 }, { "no": 0.43 }]
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