import Head from 'next/head';

function IndexPage() {
    return (
        <>
            <Head htmlAttributes={{ lang: 'pt-BR' }}>
                <meta charset="UTF-8" />
                <meta name="description" content="Site Alurakut (baseado no Orkut)" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="https://i.postimg.cc/kMhscPdk/Orkut-Logo-2.png" type="image/png" />
                <title>Alurakut</title>
            </Head>
        </>
    )
}

export default IndexPage