/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTalk = /* GraphQL */ `
  query GetTalk($id: ID!) {
    getTalk(id: $id) {
      id
      clientId
      name
      description
      speakerName
      speakerBio
      speakerPhone
      comments {
        nextToken
      }
    }
  }
`;
export const listTalks = /* GraphQL */ `
  query ListTalks(
    $filter: ModelTalkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTalks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        clientId
        name
        description
        speakerName
        speakerBio
        speakerPhone
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      message
      createdBy
      talk {
        id
        clientId
        name
        description
        speakerName
        speakerBio
        speakerPhone
      }
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        message
        createdBy
      }
      nextToken
    }
  }
`;
