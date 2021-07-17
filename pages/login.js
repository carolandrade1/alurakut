import React from 'react';
import IndexPage from '../src/components/IndexPage';
import { useRouter } from 'next/router';
import nookies from 'nookies';

export default function LoginScreen() {
    const router = useRouter();
    const [githubUser, setGithubUser] = React.useState('');
    
    return (
        <>
            <IndexPage />
            <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <div className="loginScreen">
                    <section className="logoArea">
                        <img src="https://alurakut.vercel.app/logo.svg" alt="Logo Alurakut" />
                        <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
                        <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
                        <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
                    </section>

                    <section className="formArea">
                        <form className="box" onSubmit={(infosDoEvento) => {
                            infosDoEvento.preventDefault();
                            
                            fetch('https://alurakut.vercel.app/api/login', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ githubUser: githubUser })
                            })
                            .then(async (respostaDoServer) => {
                                const dadosDaResposta = await respostaDoServer.json()
                                const token = dadosDaResposta.token;
                                nookies.set(null, 'USER_TOKEN', token, {
                                    path: '/',
                                    maxAge: 86400 * 7
                                })
                                router.push('/')
                            })
                        }}>
                            <p>
                                Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
                            </p>
                            <input 
                                required
                                placeholder="Usuário" 
                                value={githubUser}
                                onChange={(evento) => {
                                    setGithubUser(evento.target.value)
                                }}  
                            /> 
                            <button type="submit" aria-label="Login" style={{ background: '#2E7BB4' }}>
                                Login
                            </button>
                        </form>

                        <footer className="box">
                            <p>
                                Ainda não é membro? <br />
                                <a href="/login" style={{ color: '#226ca3' }}>
                                    <strong>
                                        ENTRAR JÁ
                                    </strong>
                                </a>
                            </p>
                        </footer>
                    </section>

                    <footer className="footerArea">
                        <p>
                            ©2021 alura.com.br - 
                            <a href="https://github.com/alura-challenges/alurakut/" title="Sobre o Alurakut" target="_blank" rel="noopener noreferrer"> Sobre o Alurakut.br</a> -
                            <a href="/"> Centro de segurança</a> - 
                            <a href="/"> Privacidade</a> - 
                            <a href="/"> Termos</a> - 
                            <a href="/"> Contato</a>
                        </p>
                    </footer>
                </div>
            </main>
        </>
    )
}