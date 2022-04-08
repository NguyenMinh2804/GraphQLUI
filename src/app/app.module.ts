import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorComponent } from './components/author/author.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:3000/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }








// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import {HttpClientModule} from '@angular/common/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {ApolloClientOptions, InMemoryCache, split} from '@apollo/client/core';
// import {HttpLink} from 'apollo-angular/http';
// import {WebSocketLink} from '@apollo/client/link/ws';
// import {getMainDefinition} from '@apollo/client/utilities';
// import { AuthorComponent } from './components/author/author.component';

// export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
 
//   const http = httpLink.create({
//     uri:"http://localhost:3000/graphql"
//   });
 
//   const ws = new WebSocketLink({
//     uri:`ws://localhost:3000/graphql`,
//     options:{
//       reconnect:true
//     }
//   });
 
//   const link = split(
//     ({query}) => {
//       const data = getMainDefinition(query);
//       return (
//         data.kind === 'OperationDefinition' && data.operation === 'subscription'
//       );
//     },
//     ws,
//     http
//   )
 
//   return {
//     link: link,
//     cache: new InMemoryCache(),
//   };
// }

// @NgModule({
//   declarations: [
//     AppComponent,
//     AuthorComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     ApolloModule, 
//     HttpClientModule,
//     FormsModule,
//     ReactiveFormsModule
//   ],
//   providers: [
//     {
//       provide: APOLLO_OPTIONS,
//       useFactory: createApollo,
//       deps: [HttpLink],
//     },
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
