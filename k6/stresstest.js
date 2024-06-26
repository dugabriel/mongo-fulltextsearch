import http from 'k6/http';
import { sleep } from 'k6';
import { randomIntBetween, randomItem } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';



// execute command: k6 run --vus 1 --duration 1s stresstest.js 

function randomString(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += charset.charAt(randomIntBetween(0, charset.length - 1));
    }
    return result;
}

// Função para gerar um payload aleatório
function generateRandomPayload() {
    return {
        messageId: randomString(36),
        sentBody: {
            _id: randomString(24),
            index: randomIntBetween(0, 100),
            guid: randomString(36),
            isActive: Math.random() < 0.5,
            balance: `$${randomIntBetween(1000, 5000)}.${randomIntBetween(0, 99)}`,
            picture: `http://placehold.it/32x32?text=${randomString(10)}`,
            age: randomIntBetween(20, 70),
            eyeColor: randomItem(['brown', 'blue', 'dudu é foda']),
            name: randomString(10),
            gender: randomItem(['male', 'female']),
            company: randomString(8),
            email: `${randomString(10)}@${randomString(5)}.com`,
            phone: `+1 (${randomIntBetween(100, 999)}) ${randomIntBetween(100, 999)}-${randomIntBetween(1000, 9999)}`,
            address: `${randomIntBetween(1, 999)} ${randomString(10)}, ${randomString(8)}, ${randomString(10)}, ${randomIntBetween(1000, 9999)}`,
            about: randomString(100),
            registered: new Date().toISOString(),
            latitude: randomIntBetween(-90, 90),
            longitude: randomIntBetween(-180, 180),
            tags: [randomString(8), randomString(8), randomString(8)],
            friends: [
                { id: 0, name: randomString(10) },
                { id: 1, name: randomString(10) },
                { id: 2, name: randomString(10) }
            ],
            greeting: `Hello, ${randomString(10)} ${randomString(10)}! You have ${randomIntBetween(0, 20)} unread messages.`,
            favoriteFruit: randomItem(['banana', 'strawberry', 'apple'])
        },
        reponseBody: {
            _id: randomString(24),
            index: randomIntBetween(0, 100),
            guid: randomString(36),
            isActive: Math.random() < 0.5,
            balance: `$${randomIntBetween(1000, 5000)}.${randomIntBetween(0, 99)}`,
            picture: `http://placehold.it/32x32?text=${randomString(10)}`,
            age: randomIntBetween(20, 70),
            eyeColor: randomItem(['brown', 'blue', 'green']),
            name: randomString(10),
            gender: randomItem(['male', 'female']),
            company: randomString(8),
            email: `${randomString(10)}@${randomString(5)}.com`,
            phone: `+1 (${randomIntBetween(100, 999)}) ${randomIntBetween(100, 999)}-${randomIntBetween(1000, 9999)}`,
            address: `${randomIntBetween(1, 999)} ${randomString(10)}, ${randomString(8)}, ${randomString(10)}, ${randomIntBetween(1000, 9999)}`,
            about: randomString(100),
            registered: new Date().toISOString(),
            latitude: randomIntBetween(-90, 90),
            longitude: randomIntBetween(-180, 180),
            tags: [randomString(8), randomString(8), randomString(8)],
            friends: [
                { id: 0, name: randomString(10) },
                { id: 1, name: randomString(10) },
                { id: 2, name: randomString(10) }
            ],
            greeting: `Hello, ${randomString(10)} ${randomString(10)}! You have ${randomIntBetween(0, 20)} unread messages.`,
            favoriteFruit: randomItem(['banana', 'strawberry', 'apple'])
        },
        sentHeader: {
            _id: randomString(24),
            index: randomIntBetween(0, 100),
            guid: randomString(36),
            isActive: Math.random() < 0.5,
            balance: `$${randomIntBetween(1000, 5000)}.${randomIntBetween(0, 99)}`,
            picture: `http://placehold.it/32x32?text=${randomString(10)}`,
            age: randomIntBetween(20, 70),
            eyeColor: randomItem(['brown', 'blue', 'green']),
            name: randomString(10),
            gender: randomItem(['male', 'female']),
            company: randomString(8),
        },
        responseHeader: {
            eyeColor: randomItem(['brown', 'blue', 'green', 'yellow', 'gray', 'rosa', 'pink']),
            name: randomString(10),
            gender: randomItem(['male', 'female']),
            company: randomString(8),
            email: `${randomString(10)}@${randomString(5)}.com`,
            phone: `+1 (${randomIntBetween(100, 999)}) ${randomIntBetween(100, 999)}-${randomIntBetween(1000, 9999)}`
        }
    };
}

function generateRandomJson() {
    const jsonObject = {};
    const numberOfAttributes = Math.floor(Math.random() * 10) + 1; // Gera entre 1 e 10 atributos aleatórios

    for (let i = 0; i < numberOfAttributes; i++) {
        const key = randomString(5); // Chave aleatória de 5 caracteres
        let value;

        // Escolhe aleatoriamente o tipo de valor
        switch (Math.floor(Math.random() * 5)) {
            case 0:
                value = randomString(10); // Nome aleatório
                break;
            case 1:
                value = `${randomString(5)}@example.com`; // Email aleatório
                break;
            case 2:
                value = `${randomString(10)} Street`; // Endereço aleatório
                break;
            case 3:
                value = Math.floor(Math.random() * 1000000000).toString(); // Número de telefone aleatório
                break;
            case 4:
                value = `${randomString(7)} Inc.`; // Nome de empresa aleatório
                break;
        }

        jsonObject[key] = value;
    }

    return jsonObject;
}

function getJsonRanom() {
    return {
        messageId: randomString(36),
        sentBody: generateRandomJson(),
        reponseBody: generateRandomJson(),
        sentHeader: generateRandomJson(),
        responseHeader: {
            edu : "testebusca"
        },
    };
}
export default function () {
    const payload = generateRandomPayload();
    //const payload = getJsonRanom();
    const url = 'http://localhost:8080/save';
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = http.post(url, JSON.stringify(payload), params);

    if (response.status === 200) {
        console.log(`Payload enviado com sucesso: ${response.body}`);
    } else {
        console.log(`Falha ao enviar o payload. Status: ${response.status}, Body: ${response.body}`);
    }

    //sleep(1);
}