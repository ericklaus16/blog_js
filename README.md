# Blog em JS + PostgreSQL

## Como o back-end foi implementado

Tendo sido desenvolvido com as tecnologias Node.js e Express, a parte do servidor foi feita para funcionar na porta 8080 do host de uma máquina local, 
esta a qual deve possuir o software Sistema Gerenciador de Banco de Dados PostgreSQL instalado, com um servidor cujo usuário proprietário, senha, host, 
porta e nome do banco de dados acessado seja coerente com os nomes passados no arquivo *.env*. Também é recomendável o uso da ferramenta pgAdmin para 
facilitar o gerenciamento dos dados. O nome do banco de dados utilizado no projeto foi definido como "blogjs-db", este o qual contém as tabelas 
*dadosblogjs* e *comentarios*, sendo cada uma descrita a seguir.

### Tabela dadosblogjs

Esta tabela foi utilizada para armazenar todos os posts do blog, e contém as colunas descritas a seguir no formato nome_da_coluna (tipo_de_variavel): 
title (text), content (text), date (timestamp with time zone), tags (text[]) e id (serial, PRIMARY KEY) e author (text). Logo, cada post terá título, conteúdo, data
de publicação (incluindo hora do dia), tags que indiquem o assunto do post, um id que seja uma chave primária que torna o post único, e um nome atribuído ao autor.

### Tabela comentarios

Esta tabela foi utilizada para armazenar os comentários de cada post do blog, e contém as colunas id (serial, PRIMARY KEY), author (text), content (text), 
date (timestamp with time zone) e postId (timestamp with time zone). Ou seja, além de cada comentário conter um id único, junto com autor, título e data,
deve haver um segundo id postId que identifique o post a que o comentário pertence, permitindo assim que o front-end faça requisições que permitam mostrar
os comentários feitos em um determinado post. Quando um post é excluído, todos os seus comentários são excluídos juntos.

## Descrição das rotas e funcionamento

Dessa forma, uma vez iniciado o cliente na porta 3000 e o servidor na porta 8080, as requisições de dados poderão ser feitas através de rotas que estão 
no endereço localhost:8080. Cada uma dessas rotas bem como o seu funcionamento estão descritas abaixo.

### localhost:8080/posts

Quando o cliente fazer uma requisição neste endereço, deverá haver o retorno dos dados de todos os posts em formato JSON, em uma ordem decrescente por
data para que os posts mais recentes sejam os primeiros a serem mostrados na página inicial. Em caso de falha encontrada, o servidor retorna um código
de erro 404 para que o cliente receba uma mensagem de erro.

### localhost:8080/posts/:id

Nesta requisição, o cliente deve passar um id como parâmetro. Em resposta a isso, o servidor deverá retornar os dados do post cujo id corresponda ao
id que foi passado como parâmetro. Caso um erro seja encontrado, o código de status 404 será retornado, indicando que não foi possível encontrar um
post que corresponde ao id passado.

### localhost:8080/comments/:id

Nesta requisição, o cliente deve passar o id de algum post como parâmetro, e a resposta do servidor deverá retornar os dados de todos os comentários
cujo postId corresponde ao que foi passado como parâmetro. Caso o banco de dados não contenha comentários que correspondam ao parâmetro, um código de
status 404 é retornado, junto com uma mensagem indicando que nenhum comentário foi encontrado naquele post. Caso algum outro erro seja encontrado, o código
500 é retornado, indicando que houve um erro.

### localhost:8080/create

É através desta requisição que a criação de posts é feita: o front-end deverá passar os parâmetros title, content, tags, tagsOriginalSize e author, sendo que
a passagem é feita desconsiderando espaços em branco à esquerda e à direita, e desconsiderando quaisquer espaços nos casos dos parâmetros tags e author. O servidor
então faz uma validação dos campos, sendo que para qualquer erro encontrado o código de status 500 é retornado indicando o respectivo erro para os seguintes casos: 
se qualquer campo estiver vazio; se o título não conter ao menos 4 caracteres; se o conteúdo do post não conter ao menos 10 caracteres; se houver tags com espaços
ou com menos de 4 caracteres (é aqui que vale a utilidade do parâmetro tagsOriginalSize para comparação de um array filtrado de strings de tags com um array sem filtro);
se o nome do autor conter menos de 4 caracteres.

Se a entrada de dados passar pela validação, significa que a entrada é válida, então uma inserção é feita no banco de dados "blogjs-db" na tabela "dadosblogjs"
inserindo os campos title, content, date, tags e author nas respectivas colunas, sendo que a variável date inserida é gerada no lado do back-end para registrar 
o momento em que o post foi publicado. O id é inserido através da adição da cláusula `RETURNING id` logo após o INSERT dos dados ser realizado. Isso permite que
o id na criação dos posts seja auto-incremental, promovendo uma solução simples, eficiente e confiável, visto que tendo uma única máquina local executando
a aplicação, não haverá conflitos entre ids, e o custo de deixar gaps entre ids por causa das operações de remoções não demonstra ser algo que compromete 
significativamente a performance da aplicação.

### localhost:8080/:id/remove

Um id deve ser passado como parâmetro, e então o servidor irá remover da tabela dadosblogjs o post cujo id corresponda ao parâmetro. Em seguida, na tabela
comentarios haverá a remoção de todos os comentários cujo postId seja igual ao valor passado no parâmetro.

### localhost:8080/:id/createComment

A criação de comentários é feita nesta requisição, a qual recebe um valor de id como parâmetro bem como uma entrada de dados contendo as variáveis
author e comment. O procedimento de validação é similar ao feito no processo de criação, considerando os campos author e comment. Se as entradas forem válidas, 
ocorrerá a inserção dos valores author, comment, date e postId respectivamente nas colunas author, content, date e postId da tabela "comentarios" do banco de dados 
blogjs-db, sendo date a variável que representa o momento em que o comentário foi publicado, e postId uma variável que recebe o valor do parâmetro para armazenar o
id do post a qual o comentário pertencerá. O campo id será auto-incremental assim como no processo de criação.

### localhost:8080/:id/edit

A edição de posts é feita nesta requisição, a qual recebe um valor de id como parâmetro bem como uma entrada de dados contendo as variáveis
editedTitle, editedContent, editedTags, editedTagsOriginalSize. Haverá uma verificação de forma similar ao que é feito na operação de criação de post. Caso 
as entradas sejam válidas, então o post cujo valor do id seja igual ao parâmetro terá os seus dados existentes atualizados no banco de dados através da substituição 
pelos dados inseridos em uma operação UPDATE feita na tabela "dadosblogjs" do banco de dados blogjs-db.
