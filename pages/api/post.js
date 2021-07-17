import { SiteClient } from 'datocms-client';

export default async function recebedorDaRequestsPost(request, response) {

    if (request.method === 'POST') {
        const TOKEN = '3e1e9def3db0eb062ac917f8dfa432';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "975940", // model ID criado pelo Dato
            ...request.body
        })

        console.log(registroCriado);

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}