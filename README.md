# Nome do projeto

## Descrição:
Boilerplate padrão para construção de apis em nodejs do time DevÁgil.

## Print:
Um print do sistema.

## Iniciando

### Pré-requisitos

- NodeJs > 10
- Mysql = 5.7
- Elasticsearch > 6.0 (Optional for register application logs).


### Instalando

### Windows, Linux e MacOS

Faça o fork desse repositório para o sub-grupo do projeto que está desenvolvendo.

```
git clone 'repository-link'
```

Crie as branchs manualmente ou utilize o git flow:

GIT FLOW
 - Para instalar e usar o git flow acesse o [link](https://danielkummer.github.io/git-flow-cheatsheet/index.pt_BR.html).


MANUALMENTE
- Crie as branch master e develop
```
> git checkout -b master
> git push origin master

> git checkout -b develop
> git push origin develop
```

### Configurando
Preencha os arquivos de configuração na pasta "config" com as informações do banco de dados e serviços usados pelo projeto.

Crie o arquivo development.env dentro da pasta .env e preecha-o com as configurações necessárias usando .env.example como exemplo.

Execute os seguintes comandos:
```
> npm install or yarn

> NODE_ENV=development node_modules/.bin/sequelize db:create --env development
> NODE_ENV=development node_modules/.bin/sequelize db:migrate --env development
> NODE_ENV=development node_modules/.bin/sequelize db:seed:all --env development
```

### Rodando
```
> npm start
```

### Acessando a api
```
localhost:'porta-configurada no development.env'
localhost:3000/health
```

### Estrutura de pastas

Abaixo segue a estrutura de pastas do projeto.

    .
    ├── .vscode                   # Folder with the configuration files to run debug mode in the VS Code IDE.
    ├── bin                       # Folder with www file responsible for start web server. 
    ├── config                    # Folder with the configuration files for run project.
    ├── connections               # Folder with the connection database files. (e.g mysql, postgree, elasticsearch)
    ├── env                       # Folder with the environment variables files. (e.g database, aws services, elasticsearch)
    ├── helpers                   # Folder with the helpers files.
    ├── interfaces                # Folder with the interface files to databases used in project.
        ├── mysql                 
            ├── classes           # Folder with the classes files contains validations and business rules. (e.g user.js)
            └── models            # Folder with the sequelize models files to represent a table in the database.
    ├── middlewares               # Folder with the middlewares files to use before executing the routes.
    ├── migrations                # Folder with the sequelize migrations files.
    ├── node_modules              # Folder with project modules.
    ├── public                    # Folder with public files (e.g assets, js, css).
    ├── routes                    # Folder with the routes files from project.
    ├── seeders                   # Folder with the sequelize seeders files.
    ├── services                  # Folder with services used by project (aws, google, azure, dalet).
        ├── aws
        ├── dalet
        └── google
    ├── tests                     # Folder with the tests files (integration, unit).
    ├── uploads                   # Folder with the uploaded files.
    ├── views                     # Folder with views (e.g ejs, html).
    ├── .gitignore
    ├── .npmrc
    ├── .sequelizerc
    ├── adfs_prod.pem
    ├── app                       # Entrypoint for project.
    ├── build.sh                  # Shellscript for build project.
    ├── package.json
    ├── pm2.json                  # PM2 configuration file to start project.
    └── readme.md


## Autor(res)

* **Calleu Fuzi - calleu.fuzi@tvglobo.com.br**
* **Filipe Macedo - filipe.macedo@tvglobo.com.br**
* **Vinicius Alcantara - vinicius.alcantara@tvglobo.com.br**

