import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

import IndexPage from '../src/components/IndexPage';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault } from '../src/lib/alurakutCommons';

function ProfileSidebar(props) {
    // console.log(propriedades);
    return (
        <Box as="aside">
            <img src={`https://github.com/${props.githubUser}.png`} alt="Foto do usuário" style={{ borderRadius: '8px' }} />
            <hr />
            <p>
                <a className="boxLink" href={`https://github.com/${props.githubUser}`} title="Nome do usuário" target="_blank" rel="noopener noreferrer" >
                    @{props.githubUser}
                </a>
            </p>
            <hr />
            <AlurakutProfileSidebarMenuDefault />
        </Box>
    )
}

export default function menuAmigos(props) {
    // USUÁRIO GITHUB
    const githubUser = props.githubUser;

    return (
        <>
            <IndexPage />
            <AlurakutMenu githubUser={githubUser} />
            <MainGrid>

                <div className="profileArea" style={{ gridArea: 'profileArea' }}>
                    <ProfileSidebar githubUser={githubUser} />
                </div>
            </MainGrid>
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