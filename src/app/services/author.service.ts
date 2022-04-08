import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_AUTHORS = gql`
  query {
    authors {
      id
      name
    }
  }`;

const CREATE_AUTHOR = gql`
  mutation($id: ID!, $name: String)
  {
    createAuthor(id: $id, name: $name) {
      id
      name
    }
  }`;

const DELETE_AUTHORS = gql`
  mutation($id: ID!)
  {
    deleteAuthor(id: $id)
  }`;

const SUBCRIPTION_CREATE_AUTHOR = gql`subscription{
  onCreateAuthor {
    id
    name
  }
}`


@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private apollo: Apollo) {
  }

  loadAuthors() {
    return this.apollo.watchQuery<any>({
      query: GET_AUTHORS,
      fetchPolicy: 'network-only'
    })
  }

  addAuthor(id: any, name: string) {
    return this.apollo.mutate({
      mutation: CREATE_AUTHOR,
      variables: {
        id: id,
        name: name,
      }
    });
  }
  removeAuthor(id: any) {
    return this.apollo.mutate({
      mutation: DELETE_AUTHORS,
      variables: {
        id: id,
      }
    })
  }

  // subscriptionCreateAuthor() {
  //   return this.apollo.subscribe({
  //     query: SUBCRIPTION_CREATE_AUTHOR
  //   });
  // }
}
