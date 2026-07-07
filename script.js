/*
Lógica de Programação

Algoritmo - Receita de BOLO

[x] - Saber quando o botão foi clicado
[x] - Pegar o texto do TextArea
[x] - Enviar para a IA (Servidor)
[x] - Pegar a resposta da IA
[x] - Colocar na tela
    [x] - Código
    [x] - Resultado do Código
[ ] - Refinar nosso Resultado

    querySelector - pega um elemento que eu escolher
    HTML - document
    JavaScript - script
*/

let endereco = 'https://api.groq.com/openai/v1/chat/completions'
let prompt = `Você é um designer web premiado e Programador. 
Crie uma landing page COMPLETA e VISUALMENTE IMPRESSIONANTE para o negócio descrito.

                    Regras de resposta:
                    - Forneça APENAS o código bruto, começando diretamente na tag <!DOCTYPE html> e terminando em </html>. Não use blocos de código markdown (crases), comentários ou introduções.
                    - Não use tags <img> e - NUNCA use links no formato markdown como [texto](link). Se for criar um link de e-mail, use obrigatoriamente a tag HTML pura: <a href="mailto:exemplo@email.com">exemplo@email.com</a>
                    - Use apenas um <h1> por página (no título do Hero). O nome do negócio no header deve ser um <h2> ou tag de texto comum.
                    -Estilize a tag <a> diretamente como se fosse um botão(ex: .btn-orçamento{display: inline-block; padding: 10px 20px; ....}) em vez de aninhar as duas tags.
                    -No celular, os paddings diminuem para o texto não ficar espremido e os cards se alinham na vertical automaticamente. No computador (@media (min-width: 768px)), o layout volta a ficar lado a lado.
                    -.card h2 {
                        font-size: 24px;
                        margin-bottom: 10px;
                        /* Adicione estas duas linhas abaixo: */
                        overflow-wrap: break-word;  /* Força a quebra de palavras longas */
                        word-break: break-word;      /* Garante compatibilidade */
                    }

                    Identidade visual (capriche e surpreenda):
                    - Invente uma paleta de cores única que combine com a essência do negócio usando variáveis CSS (:root)
                    - Escolha uma Google Font marcante via @import. Sempre coloque os @import no topo absoluto da tag  <style>
                    - Use emojis grandes no lugar de imagens
                    - Use CSS moderno: gradientes, sombras, animações sutis, layout generoso, tipografia forte e espaçamento agradável

                    Estrutura da página:
                    - Header com nome do negócio e menu de navegação funcional apontando para as seções via ID (ex: href="#diferenciais")
                    - Hero impactante com título chamativo, subtítulo e botão CTA
                    - Seção de diferenciais com IDs correspondentes, emojis e textos 100% únicos e criativos para cada card
                    - Depoimento de cliente realista e impactante
                    - Footer com contato e um script JavaScript simples para atualizar o ano do copyright automaticamente
Todo o conteúdo em português, altamente persuasivo e específico para o negócio.
                    -No menu de navegação, centralize os links e use gap para dar um espaçamento elegante entre eles, em vez de jogá-los para as extremidades.`


// Clicou no Botão GERAR - Chama essa função
async function gerarCodigo(){
    let textarea = document.querySelector('.texto-pagina').value
    
    // 1. Pega a chave que o usuário digitou no input
    let chaveUsuario = document.getElementById('api-key-input').value

    // 2. Valida se ele digitou algo antes de fazer o fetch
    if(!chaveUsuario) {
        alert("Por favor, insira sua chave de API para gerar a página!");
        return;
    }

    let resposta = await fetch(endereco, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${chaveUsuario}`
        },
        body: JSON.stringify({
            "model": "llama-3.3-70b-versatile",
            "messages": [
                // user = usuário - a pessoa que está mexendo
                {
                  "role": "user",
                  "content": textarea
                },
                {
                  "role": "system",
                  "content": prompt
                },
            ],
        })
    })
    
    let dados = await resposta.json()
    let resultado = dados.choices[0].message.content

    let espacoCodigo = document.querySelector(".bloco-codigo")
    let espacoSite = document.querySelector(".bloco-site")

    espacoCodigo.textContent = resultado
    espacoSite.srcdoc = resultado
    
}

/*
IA para gerar o que queremos
1) Qual o modelo de IA vamos usar
2) system - Quem a IA deve ser - Programador/Designer
3) user - mensagem do usuário
*/