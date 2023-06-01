# Sprint 2

O backlog dessa sprint:

* [O backlog da sprint 2](https://github.com/users/userhv/projects/7)

Nessa segunda sprint tivemos alguns problemas acerca do comportamento de algumas features que o aplicativo terá, sendo assim, durante a definição das histórias da sprint, optamos por alterar o fluxo de trabalho do app, com isso, a tela de **oportunidades** estará presente em uma sprint futura.

A arquitetura segue a mesma definida no projeto e exposa na sprint anterior, entretanto optamos por alterar a tela de **notícias**, história realizada na sprint anterior, para adicionar outras duas informações que condizem e se complementam com a de notícias, sendo assim, nessa sprint adicionamos também **eventos** e **palestras**.

## A tela MAIS

Uma nova tela foi adicionada ao aplicativo que contemplará outras informações importantes acerca do departamento que é de utilidade dos alunos, como lista de professores, contatos, perguntas frequentes e etc. 

Note que a tela em si com as funcionalidades não está completa, nesse primeiro momento é importante testar a implementação, verificar melhorias, com isso, durante as próximas sprints a tela será melhor trabalhada.

## Snapshot testing e testes de integração

Durante a sprint passada, verificou-se a dificuldade de realizar testes de unidade, assim, após consultar a literatura, no livro [Unit Testing Principles, Practices, and Patterns](https://www.manning.com/books/unit-testing), o autor diz que softwares que possuem aspecto de "CRUD", isto é, que não possuem muita lógica e sim mais interação com banco de dados, consultas, remoções e inserções, as invés de possuirem a cadeia de testes em um formato de pirâmide, possuem a forma losangular, isto é, a grande parte dos testes do sistema é de integração e não de unidade.

Diante disso, a partir da sprint 3, o sistema contará com fatias consideráveis de testes de integração, e onde couber testes de unidade, assim iremos garantir que o sistema tenha uma SUT vigorosa. 

Além disso, propomos também o suporte a [Snapshot testing](https://circleci.com/blog/snapshot-testing-with-jest/). Essa prática já é bastante amigável com o ambiente react ao qual o aplicativo está sendo desenvolvido e também nos ajudará a manter a robustez da SUT.

## Próximos passos

Para as próximas sprints, e seguindo nosso [backlog do produto](https://github.com/users/userhv/projects/3), iniciaremos a implementação de mais testes seguindo os moldes do proposto acima, além disso, esperamos melhorar as seções presentes na tela **MAIS**, além de analisar a viabilidade de iniciar a implementação da tela de oportunidades.