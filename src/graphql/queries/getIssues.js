import gql from 'graphql-tag';

export default gql`
  query getIssues {
    issues {
      title
      description
      cover
      dateOfPublishing
      numAvailableAssets
      publisher {
        title
      }
    }
  }
`;
