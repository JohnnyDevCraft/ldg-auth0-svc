# LdgAuth0Security

This project provides basic components and services for interacting with the auth0-js library.

•••This project includes a test application, and to use it you will need to run `npm run pack_install`.  
Doing so will build, pack, and install the library.  After doing this simply running the `nmm start` command will 
launch the test application in on port 4200.

•••You will need to install the dependency prior to building using the `npm install` command.

•••The following code should be added to your Module in the imports section for projects consuming this library.

```typescript
LdgAuth0SvcModule.forRoot(
      {
      Settings: {
        callbackRouteName: 'auth-hook',
        unauthorizedRouteName: 'home',
        postCallbackRouteName: 'dashboard',
        postLogoutRouteName: 'home',
        isDebugMode: true
      },
      Config: {
        clientID: 'oWw9pkKjPZ5X42to7AZa6uVl4Q3XOTs0',
        domain: 'blazor-budget2.auth0.com',
        responseType: 'token id_token',
        redirectUri: 'http://localhost:4200/auth-hook',
        audience: 'agile-family',
        scope: 'openid profile full-access'
      }
      })
```

#SettingsModel: Settings

•••This controls how the module operates.  It's properties modify routing based on authentication events handled by the library.

###unauthorizedRouteName: string

•••This property tells the library what path you are routing failed authentication attempt to.  You should probably set this to a login page, or an error page for handling 
authentication failures.  It is routed to when the AuthGuard is used, and the user is not logged in.

###postCallbackRouteName: string

•••This defines the path that users are redirected to after their login is processed.

###postLogoutRouteName: string

•••This defines the path that users are redirected to after a logout is processed.

###isDebugMode: boolean

•••When set to true, the library will log debug information to the console.


#ConfigModule: config

•••This object should contain the configuration settings for your auth0 tenant.

see the test project for more details on using this library.

