import React from 'react';

import IndexPage from '../src/components/IndexPage';
import AmigosGrid from '../src/components/AmigosGrid';
import Box from '../src/components/Box';

import { AlurakutMenu, AlurakutProfileSidebarMenuDefault } from '../src/lib/alurakutCommons';
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

function ProfileRelationsBox(propriedades) {

    return (
        <ProfileRelationsBoxWrapper >
            <h2 className="smallTitle">{propriedades.title} ({propriedades.total})</h2>

            <u>
                {propriedades.items.map((itemAtual) => {
                    return (
                        <li key={itemAtual.id}>
                            <a href={itemAtual.html_url} target="_blank" rel="noopener noreferrer" title="Site do usuário">
                                <img src={itemAtual.avatar_url} alt="Avatar do usuário" />
                                <span>{itemAtual.login}</span>
                            </a>
                        </li>
                    );
                })}
            </u>
        </ProfileRelationsBoxWrapper>
    )
}

export default function menuAmigos() {
    // USUÁRIO GITHUB
    const githubUser = 'carolandrade1';
    // NUMEROS SEGUIDORES-SEGUINDO
    const [numerosSegui, setNumerosSegui] = React.useState([]);
    // SEGUIDORES
    const [seguidores, setSeguidores] = React.useState([]);
    // SEGUINDO
    const [seguindo, setSeguindo] = React.useState([]);

    React.useEffect(function () { 
        const urlNumeros = `https://api.github.com/users/${githubUser}`;
        fetch(urlNumeros)
            .then(resposta => resposta.json())
            .then(respostaJson => setNumerosSegui(respostaJson));

        const urlFollowers = `https://api.github.com/users/${githubUser}/followers`
        fetch(urlFollowers)
            .then(function (respostaDoServidor) {
                return respostaDoServidor.json();
            })
            .then(function (respostaCompleta) {
                setSeguidores(respostaCompleta);
            })

        const urlFollowing = `https://api.github.com/users/${githubUser}/following`
        fetch(urlFollowing)
            .then(function (respostaDoServidor) {
                return respostaDoServidor.json();
            })
            .then(function (respostaCompleta) {
                setSeguindo(respostaCompleta);
            })
    }, [])

    return (
        <>
            <IndexPage />
            <AlurakutMenu githubUser={githubUser} />
            <AmigosGrid >

                <div className="profileArea" style={{ gridArea: 'profileArea' }}>
                    <ProfileSidebar githubUser={githubUser} />
                </div>

                <div style={{ gridArea: 'seguidoresArea' }}>
                    <ProfileRelationsBox title="Seguidores" items={seguidores} total={numerosSegui.followers} />
                </div>
                
                <div style={{ gridArea: 'seguindoArea' }}>
                    <ProfileRelationsBox title="Seguindo" items={seguindo} total={numerosSegui.following} />
                </div>
                
            </AmigosGrid>
        </>
    )
}