import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/alurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  // console.log(propriedades);
  return (
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} alt="Foto de Perfil" style={{ borderRadius: '8px' }} />
    </Box>
  )
}

function meusSeguidores({githubUser}) {
  const [seguidor, setSeguidor] = useState([]);
  
  useEffect (async () => {
    const url = `https://api.github.com/users/${githubUser}/followers`;
    const resposta = await fetch(url);
    setSeguidor(await resposta.json());
  }, []);
  
  const seguidores = seguidor.slice(0,6);

  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">Meus Seguidores ({seguidor.length})</h2>

      <ul>
        {seguidores.map((seguidor) => {
          return (
            <li key={seguidor.id}>
              <a href={seguidor.html_url}>
                <img src={`https://github.com/${seguidor.login}.png`} />
                <span>{seguidor.login}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const githubUser = 'carolandrade1';
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
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>
        
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da Comunidade ({pessoasFavoritas.length})</h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => { 
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <meusSeguidores githubUser={githubUser} />
        </div>

      </MainGrid>
    </>
  )
};