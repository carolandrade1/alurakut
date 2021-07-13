import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/alurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  // console.log(propriedades);
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} alt="Foto de Perfil" style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

// function meusSeguidores(item) {
//   const [seguidor, setSeguidor] = useState([]);
  
//   useEffect (async () => {
//     const url = `https://api.github.com/users/${item.githubUser}/followers`;
//     const resposta = await fetch(url);
//     setSeguidor(await resposta.json());
//   }, []);
  
//   const seguidores = seguidor.slice(0,6);

//   return (
//     <ProfileRelationsBoxWrapper>
//       <h2 className="smallTitle">Meus Seguidores ({seguidor.length})</h2>

//       <ul>
//         {seguidores.map((seguidor) => {
//           return (
//             <li key={seguidor.id}>
//               <a href={seguidor.html_url}>
//                 <img src={`https://github.com/${seguidor.login}.png`} />
//                 <span>{seguidor.login}</span>
//               </a>
//             </li>
//           );
//         })}
//       </ul>
//     </ProfileRelationsBoxWrapper>
//   );
// }

export default function Home() {
  const githubUser = 'carolandrade1';
  const [comunidades, setComunidades] = React.useState([{
    id: '01',
    url: 'https://www.alura.com.br/',
    title: 'Alura',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvHnrABvcShcCoG_01ZN3q8oGA4CiEhdr1vw&usqp=CAU'
  }]);
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'john-smilga',
    'thecodercoder'
  ];

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>
        
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer ?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const comunidade = {
                id: new Date().toISOString(),
                url: dadosDoForm.get('url'),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              }
              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas);
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
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={itemAtual.url} target="_blank" rel="noopener noreferrer">
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
              
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da Comunidade ({pessoasFavoritas.length})</h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => { 
                return (
                  <li key={itemAtual}>
                    <a href={`https://github.com/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          {/* <meusSeguidores githubUser={githubUser} /> */}
        </div>

      </MainGrid>
    </>
  )
};