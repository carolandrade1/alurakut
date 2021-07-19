import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

import IndexPage from '../src/components/IndexPage';
import ComunidadeGrid from '../src/components/ComunidadeGrid';
import Box from '../src/components/Box';

import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/alurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
    // console.log(propriedades);
    return (
        <Box as="aside">
            <img src={`https://github.com/${propriedades.githubUser}.png`} alt="Foto do usuário" style={{ borderRadius: '8px' }} />
            <hr />
            <p>
                <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`} title="Nome do usuário" target="_blank" rel="noopener noreferrer" >
                    @{propriedades.githubUser}
                </a>
            </p>
            <hr />
            <AlurakutProfileSidebarMenuDefault />
        </Box>
    )
}

export default function menuComunidades(props) {
    // USUÁRIO GITHUB
    const githubUser = props.githubUser;
    // COMUNIDADES
    const [comunidades, setComunidades] = React.useState([]);

    React.useEffect(function () {
        // API DATOCMS GraphQL Comunidades 
        fetch('https://graphql.datocms.com/', {
            method: 'POST',
            headers: {
                'Authorization': 'd9935724b7a2faf1e7d9809795a09a',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "query": `query {
            allCommunities {
            id
            title
            imageUrl
            paginaUrl
            }
        }` })
        })
            .then((resposta) => resposta.json())
            .then((respostaCompleta) => {
                const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
                // console.log(comunidadesVindasDoDato);
                setComunidades(comunidadesVindasDoDato);
            })
    }, [])

    return (
        <>
            <IndexPage />
            <AlurakutMenu githubUser={githubUser} />
            <ComunidadeGrid>

                <div className="profileArea" style={{ gridArea: 'profileArea' }}>
                    <ProfileSidebar githubUser={githubUser} />
                </div>

                <div style={{ gridArea: 'comunidadeArea'}}>
                    <ProfileRelationsBoxWrapper>
                        <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>

                        <ul>
                            {comunidades.map((itemAtual) => {
                                return (
                                    <li key={itemAtual.id}>
                                        <a href={itemAtual.paginaUrl} target="_blank" rel="noopener noreferrer" title="Site da comunidade" style={{ height: '200px', width: '100%' }} >
                                            <img src={itemAtual.imageUrl} alt="Capa da comunidade" />
                                            <span style={{ fontSize: '16px' }}>{itemAtual.title}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </ProfileRelationsBoxWrapper>
                </div>

            </ComunidadeGrid>

        </>
    )
}

export async function getServerSideProps(context) {
    const cookies = nookies.get(context);
    if (!cookies.USER_TOKEN) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    const token = cookies.USER_TOKEN;
    const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
        headers: {
            Authorization: token
        }
    })
        .then((resposta) => resposta.json())

    // if(!isAuthenticated) {
    //   return {
    //     redirect: {
    //       destination: '/login',
    //       permanent: false,
    //     }
    //   }
    // }

    const { githubUser } = jwt.decode(token);
    return {
        props: {
            githubUser
        }, // will be passed to the page component as props
    }
}