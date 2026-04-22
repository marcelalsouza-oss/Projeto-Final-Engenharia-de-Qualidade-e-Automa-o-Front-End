<!-- /* 
Gherkin:
Funcionalidade: “Favoritos”
Cenário: Visualizar quantos cachorros estão favoritados
Dado que existem fotos carregadas na página inicial
Quando eu clico no botão de coração no canto direito
Então devo ser redirecionado para a página de “favoritos”

Funcionalidade: Inicialização do Sistema 
Cenário: Verificar se os elementos essenciais da interface carregam corretamente 
Dado que eu acesso a URL da aplicação "Pinthedog" 
Quando a página é carregada
 Então devo ver o título do site, o menu de navegação, campo de busca e a barra dos favoritos

Funcionalidade: Dinamismo
Cenário: Garantir que as imagens estão sendo carregadas via API
 Dado que a página inicial terminou de carregar 
Quando os dados da API são retornados 
Então cada card de cachorro deve possuir uma imagem com um link válido e as imagens devem estar visíveis na tela

Funcionalidade: Controle de Requisição
 Cenário: Validar estado do botão durante o carregamento de dados 
Dado que eu digito uma raça no campo de busca 
Quando eu clico no botão de pesquisar
 Então o botão deve ficar desabilitado (disabled) enquanto a API processa os dados E após o recebimento da resposta, o botão deve voltar ao estado habilitado

Funcionalidade: Renovação de Galeria 
Cenário: Garantir que novas fotos são buscadas ao interagir com a busca 
Dado que já existem imagens sendo exibidas na tela 
Quando eu realizo uma nova busca por uma raça diferente 
Então a galeria deve ser atualizada com novas imagens E o conteúdo anterior não deve mais estar presente

Funcionalidade: Engajamento do Usuário 
Cenário: Simular a ação de favoritar uma foto de cachorro 
Dado que eu localizei uma foto que gostei na galeria
 Quando eu clico no ícone ou botão de "Favoritar" (Like)
 Então a interface deve registrar a interação mudando a cor do ícone E o item deve ser adicionado à lista de favoritos do usuário
 */ -->