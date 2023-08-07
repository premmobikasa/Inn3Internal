import { gql } from "@apollo/client";
 
// login
export const   LOGIN_USER = gql`
mutation SignIn($identifier: String!, $password: String!) {
  signIn(input: {identifier: $identifier, password: $password}) {
    accessToken
    email
    phone
    firstName
    lastName
    createdAt
    updatedAt
    roles {
      global
      resource {
        roles
        resourceId
      }
    }
  }
}`
;

export const REFRESH_TOKEN = gql`
 mutation RefreshToken($accessToken: String!) {
  refreshToken(accessToken: $accessToken) {
    accessToken
  }
}`;
//  HotelGroup ---Guery-->>
export const CREATE_HOTEL_GROUPS = gql`
  mutation CreateHotelGroups($name: String!, $isActive: Boolean!) {
    createHotelGroup(input: { name: $name, isActive: $isActive }) {
      createdAt
      id
      isActive
      name
      updatedAt
    }
  }
`; 
export const UPDATE_HOTEL_GROUPS = gql`
  mutation UpdateHotelGroup( $id: String!, $name: String!){
    updateHotelGroup(input: {id: $id, name: $name}) {
    isActive
    name
    updatedAt
    id
    createdAt
  }
  }
`; 
// delete
export const DELETE_HOTEL_GROUPS = gql`
  mutation DeleteHotelGroup($id: String!) {
    deleteHotelGroup(id: $id) {
      message
    }
  }
`; 
 
export const GetHotelGroups = gql`
 query FindHotelGroups($limit: Float, $skip: Float) {
  findAllHotelGroups(input: {limit: $limit, skip: $skip}) {
    createdAt
    id
    isActive
    name
    updatedAt
  }
}
`;



// export const GetCountry = gql`
//   query Countries {
//     countries {
//       code
//       name
//       emoji
//     }
//   }
// `;

