import 'dotenv/config';
import 'cross-fetch/polyfill';
import ApolloClient, { gql } from 'apollo-boost';

const userCredentials = { firstname: 'Robin' };
const userDetails = { nationality: 'German' };

const user = {
  ...userCredentials,
  ...userDetails,
};

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
    });
  },
});

// const GET_ORGANIZATION = gql`
//   query ($organization: String!) {
//     organization(login: $organization) {
//       name
//       url
//     }
//   }
// `;

// const GET_REPOSITORIES_OF_ORGANIZATION = gql`
//   query ($organization: String!, $after: String, $before: String) {
//     organization(login: $organization) {
//       id
//       name
//       url
//       repositories(
//         first: 5
//         after: $after
//         before: $before
//         orderBy: { field: STARGAZERS, direction: DESC }
//       ) {
//         ...repositoryArray
//       }
//     }
//   }

//   fragment repositoryArray on RepositoryConnection {
//     edges {
//       node {
//         id
//         name
//         url
//         stargazerCount
//       }
//     }
//     ...pageInfo
//   }

//   fragment pageInfo on RepositoryConnection {
//     pageInfo {
//       hasNextPage
//       hasPreviousPage
//       startCursor
//       endCursor
//     }
//   }
// `;

// client
//   .query({
//     query: GET_REPOSITORIES_OF_ORGANIZATION,
//     variables: {
//       organization: 'the-road-to-learn-react',
//       after: 'Y3Vyc29yOnYyOpI6zg2gIws=',
//     },
//   })
//   .then((result) => {
//     console.log(result.data.organization.repositories.edges),
//       console.log(result.data.organization.repositories);
//   });

const ADD_STAR = gql`
  mutation AddStar($repositoryId: ID!) {
    addStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const REMOVE_STAR = gql`
  mutation RemoveStar($repositoryId: ID!) {
    removeStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

client
  .mutate({
    mutation: REMOVE_STAR,
    variables: {
      repositoryId: 'MDEwOlJlcG9zaXRvcnk2MzM1MjkwNw==',
    },
  })
  .then(console.log);

console.log(user);

console.log(process.env.SOME_ENV_VARIABLE);
