import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import IndexPage from '../src/components/IndexPage';
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

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">{propriedades.title} ({propriedades.items.length})</h2>

      <ul>
        {propriedades.items.slice(0, 6).map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={itemAtual.html_url} target="_blank" rel="noopener noreferrer" title="Site do usuário">
                <img src={itemAtual.avatar_url} alt="Avatar do usuário" />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const githubUser = props.githubUser;
  // COMUNIDADES
  const [comunidades, setComunidades] = React.useState([]);
  // SEGUIDORES
  const [seguidores, setSeguidores] = React.useState([]);
  // SEGUINDO
  const [seguindo, setSeguindo] = React.useState([]);

  React.useEffect(function () {
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
    // API DATOCMS GraphQL  
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
      <AlurakutMenu />
      <MainGrid>
        
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a), {githubUser}!</h1>
            <OrkutNostalgicIconSet />
          </Box>
          {/* <Box>
            <h2 className="subTitle">O que você deseja fazer ?</h2>
            <button aria-label="Criar comunidade" style={{ background: '#2E7BB4' }}>Criar Comunidade</button>
            <button aria-label="Criar post" style={{ background: '#2E7BB4' }}>Criar Post</button>
          </Box> */}
          <Box>
            <h2 className="subTitle">O que você deseja fazer ?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                paginaUrl: dadosDoForm.get('url')
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(comunidade),
              })
                .then(async (response) => {
                  const dados = await response.json();
                  // console.log(dados.registroCriado);
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade]
                  setComunidades(comunidadesAtualizadas);
                })
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque a URL da imagem para usarmos de capa"
                  name="image"
                  aria-label="Coloque a URL para usarmos de capa"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque a URL do site"
                  name="url"
                  aria-label="Coloque a URL do site"
                  type="text"
                />
              </div>
              <button type="submit" aria-label="Criar comunidade" style={{ background: '#2E7BB4' }} >
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>

            <ul>
              {comunidades.slice(0, 6).map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={itemAtual.paginaUrl} target="_blank" rel="noopener noreferrer" title="Site da comunidade">
                      <img src={itemAtual.imageUrl} alt="Capa da comunidade" />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBox title="Seguidores" items={seguidores} />

          <ProfileRelationsBox title="Seguindo" items={seguindo} />

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