# Commands

- Ensure below npm/yarn packages are installed

```shell
npm install -g ng
npm install -g nx
npm install -g yarn
yarn config set strict-ssl false --global
```

- To install packages

```shell
yarn install
```

- Create new project

```shell
nx generate app app-name
```

- Add Module Federation to project

```shell
nx add @angular-architects/module-federation --project=app-name
```

- Rename existing app

```shell
nx g @nrwl/angular:mv --project my-project --destination my-renamed-project
```

- Generate component in application

```shell
nx generate @nrwl/angular:component navbar --project=app-name
```

- Generate library

```shell
nx generate @nrwl/angular:lib auth-lib --scss --routing
```

# If token is not getting passed

- main module imports

```shell
import { SharedServicesLibModule } from '@tops-ui/shared/services-lib';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  AuthInterceptor,
  ErrorInterceptor,
} from '@tops-ui/shared/auth-lib';
```

- Imports must be in below sequence:

```shell
HttpClientModule,
    SharedServicesLibModule,
    RouterModule.forChild(routes),

add providers:
 providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]

```

- remove all HTTP imports from inner modules

````shell
refer manage user modules


``` shell
CYpress installation error:
set CYPRESS_INSTALL_BINARY=0
````


- Run multiple projects
```shell
nx run-many --target=serve --projects=hcmp-host,hcmp-operations,hcmp-resource-list
```
