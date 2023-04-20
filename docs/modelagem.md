# Modelagem

A princípio o sistema pode parecer difícil, complexo e cheio de nuances. A modelagem do sistema tenta atenuar isso. Nela, utilizamos técnicas visuais como o **Diagrama de Classes** para representar como possivelmente será a estrutura do nosso sistema.

## O App do DCC

Apesar de ainda não começarmos de fato com a sprint, já temos ciência de alguns pontos que foram acordados nos requisitos, usando como base nosso backlog, assim, utilizando desse conhecimento podemos definir uma estrutura base para o aplicativo.

### A estrutura do app

```mermaid
    sequenceDiagram
    activate APP
    APP->>MEDIADOR: requisição de um tipo de dado para o mediador
    activate MEDIADOR
    MEDIADOR->>API: o dado está na API?
    activate API
    API-->>MEDIADOR: resposta da requisição
    deactivate API
    MEDIADOR-->>APP: retorna o dado para o app
    deactivate MEDIADOR
    APP->>MEDIADOR: requisição de um tipo de dado para o mediador
    activate MEDIADOR  
    MEDIADOR->>SERVIDOR: o dado está no servidor?
    activate SERVIDOR
    SERVIDOR->>BD: requisição dos dados
    activate BD
    BD-->>SERVIDOR: resposta com os dados do banco
    deactivate BD
    SERVIDOR-->>MEDIADOR: resposta com os dados
    deactivate SERVIDOR
    MEDIADOR-->>APP: retorna o dado para o app
    deactivate MEDIADOR
	deactivate APP
```

### O Mediator

Como podemos ver, a estrutura do sistema acima utiliza uma técnica de padrão de projeto chamada [Mediator](https://refactoring.guru/pt-br/design-patterns/mediator). Ela centraliza as chamadas de forma que os outros componentes do sistema não precisam se interagir, assim, todos tem conhecimento desse **Mediador** que por sua vez redireciona as chamadas para os pontos específicos da aplicação.

Nesse projeto, esse tipo de padrão é interessante pois como teremos dois pontos de acesso para consumir os dados, API ou SERVIDOR, centralizar a distribuição das requisições em um único componente garante que as outras partes do sistema não precisam armazenar se os dados requisitados são da api ou do servidor, assim esses componentes se tornam independentes tendo vínculo apenas com o Mediador, além disso, tornamos a estrutura do código mais clara e objetiva.


