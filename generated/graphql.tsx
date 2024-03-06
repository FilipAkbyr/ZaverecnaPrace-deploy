import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type House = {
  __typename?: 'House';
  city: Scalars['String'];
  description: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  price: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addHouse?: Maybe<House>;
  deleteHouse?: Maybe<House>;
};


export type MutationAddHouseArgs = {
  city: Scalars['String'];
  description: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  price: Scalars['Int'];
};


export type MutationDeleteHouseArgs = {
  propertyId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  properties: Array<House>;
  property: House;
  user: User;
};


export type QueryPropertyArgs = {
  propertyId: Scalars['ID'];
};


export type QueryUserArgs = {
  userEmail: Scalars['String'];
};

export enum Roles {
  Admin = 'Admin',
  User = 'User'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  role: Roles;
  username: Scalars['String'];
};

export type HousesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type HousesQueryQuery = { __typename?: 'Query', properties: Array<{ __typename?: 'House', id?: string | null, description: string, price: number, city: string }> };

export type HouseQueryQueryVariables = Exact<{
  propertyId: Scalars['ID'];
}>;


export type HouseQueryQuery = { __typename?: 'Query', property: { __typename?: 'House', id?: string | null, description: string, price: number, city: string } };

export type UserDataQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type UserDataQuery = { __typename?: 'Query', user: { __typename?: 'User', id?: string | null, email: string, role: Roles, username: string } };

export type AddHouseMutationMutationVariables = Exact<{
  description: Scalars['String'];
  price: Scalars['Int'];
  city: Scalars['String'];
}>;


export type AddHouseMutationMutation = { __typename?: 'Mutation', addHouse?: { __typename?: 'House', description: string, price: number, city: string } | null };

export type DeleteHouseMutationMutationVariables = Exact<{
  propertyId: Scalars['ID'];
}>;


export type DeleteHouseMutationMutation = { __typename?: 'Mutation', deleteHouse?: { __typename?: 'House', id?: string | null } | null };


export const HousesQueryDocument = gql`
    query HousesQuery {
  properties {
    id
    description
    price
    city
  }
}
    `;

/**
 * __useHousesQueryQuery__
 *
 * To run a query within a React component, call `useHousesQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useHousesQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHousesQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useHousesQueryQuery(baseOptions?: Apollo.QueryHookOptions<HousesQueryQuery, HousesQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HousesQueryQuery, HousesQueryQueryVariables>(HousesQueryDocument, options);
      }
export function useHousesQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HousesQueryQuery, HousesQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HousesQueryQuery, HousesQueryQueryVariables>(HousesQueryDocument, options);
        }
export type HousesQueryQueryHookResult = ReturnType<typeof useHousesQueryQuery>;
export type HousesQueryLazyQueryHookResult = ReturnType<typeof useHousesQueryLazyQuery>;
export type HousesQueryQueryResult = Apollo.QueryResult<HousesQueryQuery, HousesQueryQueryVariables>;
export const HouseQueryDocument = gql`
    query HouseQuery($propertyId: ID!) {
  property(propertyId: $propertyId) {
    id
    description
    price
    city
  }
}
    `;

/**
 * __useHouseQueryQuery__
 *
 * To run a query within a React component, call `useHouseQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useHouseQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHouseQueryQuery({
 *   variables: {
 *      propertyId: // value for 'propertyId'
 *   },
 * });
 */
export function useHouseQueryQuery(baseOptions: Apollo.QueryHookOptions<HouseQueryQuery, HouseQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HouseQueryQuery, HouseQueryQueryVariables>(HouseQueryDocument, options);
      }
export function useHouseQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HouseQueryQuery, HouseQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HouseQueryQuery, HouseQueryQueryVariables>(HouseQueryDocument, options);
        }
export type HouseQueryQueryHookResult = ReturnType<typeof useHouseQueryQuery>;
export type HouseQueryLazyQueryHookResult = ReturnType<typeof useHouseQueryLazyQuery>;
export type HouseQueryQueryResult = Apollo.QueryResult<HouseQueryQuery, HouseQueryQueryVariables>;
export const UserDataDocument = gql`
    query UserData($email: String!) {
  user(userEmail: $email) {
    id
    email
    role
    username
  }
}
    `;

/**
 * __useUserDataQuery__
 *
 * To run a query within a React component, call `useUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDataQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUserDataQuery(baseOptions: Apollo.QueryHookOptions<UserDataQuery, UserDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserDataQuery, UserDataQueryVariables>(UserDataDocument, options);
      }
export function useUserDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserDataQuery, UserDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserDataQuery, UserDataQueryVariables>(UserDataDocument, options);
        }
export type UserDataQueryHookResult = ReturnType<typeof useUserDataQuery>;
export type UserDataLazyQueryHookResult = ReturnType<typeof useUserDataLazyQuery>;
export type UserDataQueryResult = Apollo.QueryResult<UserDataQuery, UserDataQueryVariables>;
export const AddHouseMutationDocument = gql`
    mutation AddHouseMutation($description: String!, $price: Int!, $city: String!) {
  addHouse(description: $description, price: $price, city: $city) {
    description
    price
    city
  }
}
    `;
export type AddHouseMutationMutationFn = Apollo.MutationFunction<AddHouseMutationMutation, AddHouseMutationMutationVariables>;

/**
 * __useAddHouseMutationMutation__
 *
 * To run a mutation, you first call `useAddHouseMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddHouseMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addHouseMutationMutation, { data, loading, error }] = useAddHouseMutationMutation({
 *   variables: {
 *      description: // value for 'description'
 *      price: // value for 'price'
 *      city: // value for 'city'
 *   },
 * });
 */
export function useAddHouseMutationMutation(baseOptions?: Apollo.MutationHookOptions<AddHouseMutationMutation, AddHouseMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddHouseMutationMutation, AddHouseMutationMutationVariables>(AddHouseMutationDocument, options);
      }
export type AddHouseMutationMutationHookResult = ReturnType<typeof useAddHouseMutationMutation>;
export type AddHouseMutationMutationResult = Apollo.MutationResult<AddHouseMutationMutation>;
export type AddHouseMutationMutationOptions = Apollo.BaseMutationOptions<AddHouseMutationMutation, AddHouseMutationMutationVariables>;
export const DeleteHouseMutationDocument = gql`
    mutation DeleteHouseMutation($propertyId: ID!) {
  deleteHouse(propertyId: $propertyId) {
    id
  }
}
    `;
export type DeleteHouseMutationMutationFn = Apollo.MutationFunction<DeleteHouseMutationMutation, DeleteHouseMutationMutationVariables>;

/**
 * __useDeleteHouseMutationMutation__
 *
 * To run a mutation, you first call `useDeleteHouseMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHouseMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHouseMutationMutation, { data, loading, error }] = useDeleteHouseMutationMutation({
 *   variables: {
 *      propertyId: // value for 'propertyId'
 *   },
 * });
 */
export function useDeleteHouseMutationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHouseMutationMutation, DeleteHouseMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteHouseMutationMutation, DeleteHouseMutationMutationVariables>(DeleteHouseMutationDocument, options);
      }
export type DeleteHouseMutationMutationHookResult = ReturnType<typeof useDeleteHouseMutationMutation>;
export type DeleteHouseMutationMutationResult = Apollo.MutationResult<DeleteHouseMutationMutation>;
export type DeleteHouseMutationMutationOptions = Apollo.BaseMutationOptions<DeleteHouseMutationMutation, DeleteHouseMutationMutationVariables>;