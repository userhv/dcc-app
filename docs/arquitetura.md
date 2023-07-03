# Arquitetura


Arquitetura de software se preocupa com o projeto no mais alto nível. Ela inclui as decisões de projeto mais importantes em um sistema e que dificilmente serão revertidas futuramente. Assim, mediante a nossa modelagem, o projeto utiliza a arquitetura do tipo **MVC**.

## MVC (Model-View-Controller)

Esse padrão arquitetural foi proposto no final da década de 70. Ele define que o sistema deve ser organizado em três classes:

- View a visão é responsável pela apresentação gráfica do sistema.

- Controller: o controlador é responsável tratar os eventos gerados no sistema, por exemplo por dispositivos de entrada, teclado, mouse e assim, solicitar ao modelo ou a visão que o estado seja alterado.

- Model:  o modelo é o responsável por armazenar os dados manipulados pela aplicação e que tem a ver com o domínio do sistema. Além disso, o modelo também não tem conhecimento ou dependência sobre a visão e o controlador.


A escolha desse modelo arquitetural se dá pela semelhança entre a estrutura do projeto com esse padrão. Note como o Mediador tem um papel similar ao do Controller.

Com a adoção desse padrão arquitetural, trazemos consigo alguns benefícios: podemos utilizar o mesmo modelo em diferentes visões, possibilitando criar especializações de trabalho no desenvolvimento, assim, para a manutenção do código podemos ter pessoas capazes de lidar somente com alguma parte do sistema, também, favorece a testabilidade do projeto.