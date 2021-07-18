import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import CustomizedInput from '../src/components/CustomizedInput';
import IndexPage from '../src/components/IndexPage';
import PostBox from '../src/components/PostBox';

import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/alurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

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

function ProfileRelationsBox(props) {

  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">{props.title} ({props.total})</h2>

      <ul>
        {props.items.slice(0, 6).map((itemAtual) => {
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
      <hr />
      <p>
        <a className="boxLink" href={`/amigos`} >
          Ver todos
        </a>
      </p>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  // USUÁRIO GITHUB
  const githubUser = props.githubUser;
  // NUMEROS SEGUIDORES-SEGUINDO
  const [numerosSegui, setNumerosSegui] = React.useState([]);
  // SEGUIDORES
  const [seguidores, setSeguidores] = React.useState([]);
  // SEGUINDO
  const [seguindo, setSeguindo] = React.useState([]);
  // COMUNIDADES
  const [comunidades, setComunidades] = React.useState([]);
  // NOME COMUNIDADES
  const [comunidadesTitle, setComunidadesTitle] = React.useState([]);
  // IMAGE COMUNIDADES
  const [comunidadesImage, setComunidadesImage] = React.useState([]);
  // URL COMUNIDADES
  const [comunidadesUrl, setComunidadesUrl] = React.useState([]);
  // POST
  const [posts, setPosts] = React.useState([]);
  // NOME POST
  const [nameValue, setNameValue] = React.useState('');
  // TEXTO POST
  const [textValue, setTextValue] = React.useState('');

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
    // API DATOCMS GraphQL Post 
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'd9935724b7a2faf1e7d9809795a09a',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query {
          allPosts {
            id
            name
            text
          }
        }` })
    })
      .then((resposta) => resposta.json())
      .then((respostaCompletaPost) => {
        const postVindosDoDato = respostaCompletaPost.data.allPosts;
        // console.log(postVindosDoDato);
        setPosts(postVindosDoDato);
      })
  }, [])

  return (
    <>
      <IndexPage />
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>

        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a), {githubUser}!</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">Crie sua comunidade</h2>
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
                  setcomunidadesTitle('');
                  setComunidadesImage('');
                  setComunidadesUrl('');
                })
            }}>
              <div>
                <CustomizedInput
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  value={comunidadesTitle}
                  onValueChange={setComunidadesTitle}
                />
              </div>
              <div style={{ display: 'flex' }}>
                <CustomizedInput
                  placeholder="Coloque a URL da imagem da capa"
                  name="image"
                  aria-label="Coloque a URL da imagem da capa"
                  value={comunidadesImage}
                  onValueChange={setComunidadesImage}
                />
                <CustomizedInput
                  placeholder="Coloque a URL do site"
                  name="url"
                  aria-label="Coloque a URL do site"
                  value={comunidadesUrl}
                  onValueChange={setComunidadesUrl}
                />
              </div>
              <button type="submit" aria-label="Criar comunidade" style={{ background: '#2E7BB4' }} >
                Criar comunidade
              </button>
            </form>
          </Box>

          <Box>
            <h2 className="subTitle">Deixe seu comentario</h2>
            <form onSubmit={function handleCriaPost(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const post = {
                name: dadosDoForm.get('name'),
                text: dadosDoForm.get('text'),
              }
              fetch('/api/post', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(post),
              })
                .then(async (response) => {
                  const dadosPost = await response.json();
                  // console.log(dados.registroCriado);
                  const post = dadosPost.registroCriado;
                  const postAtualizados = [post, ...posts]
                  setPosts(postAtualizados);
                  setNameValue('');
                  setTextValue('');
                })
            }}>
              <div>
                <CustomizedInput
                  placeholder="Usuário Github"
                  name="name"
                  aria-label="Usuário Github"
                  value={nameValue}
                  onValueChange={setNameValue}
                />
              </div>
              <div>
                <CustomizedInput
                  placeholder="Deixei seu comentario"
                  name="text"
                  aria-label="Deixei seu comentario"
                  value={textValue}
                  onValueChange={setTextValue}
                />
              </div>
              {/* <input
                  placeholder="Usuário Github"
                  name="name"
                  aria-label="Usuário Github"
                  value={nameValue}
                  type="text"
                  onChange={e => setNameValue(e.target.value)}
                  required
                /> */}
              <button type="submit" aria-label="Criar comentario" style={{ background: '#2E7BB4' }} >
                Criar comentario
              </button>
            </form>
          </Box>

          <PostBox>
            <h2 className="smallTitle">Comentarios ({posts.length})</h2>

            <ul>
              {posts.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`https://github.com/${itemAtual.name}`} target="_blank" rel="noopener noreferrer" title="Site do usuário">
                      <img src={`https://github.com/${itemAtual.name}.png`} alt="Foto usuário" />
                    </a>
                    <div style={{ flexGrow: '2' }}>
                      <span>@{itemAtual.name}</span>
                      <p>{itemAtual.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </PostBox>

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
            <hr />
            <p>
              <a className="boxLink" href={`/comunidades`} >
                Ver todos
              </a>
            </p>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBox title="Seguidores" items={seguidores} total={numerosSegui.followers} />

          <ProfileRelationsBox title="Seguindo" items={seguindo} total={numerosSegui.following} />

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