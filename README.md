https://youtu.be/HZUlQ7Z2xHQ

in /c/react:

- npx create-react-app amplify-app1
- yarn add aws-amplify aws-amplify-react uuid

for configuration use win cmd, not git bash!!!

amplify configure (create user)

- user: amplify-app1-user
- profile name (local): amplify-app1-user

amplify init (creates amplify project)

- name: amplify-app1
- environment: dev

/amplify/backend -- local
/amplify/#current-cloud-backend -- what is pushed

/src/aws-exports.js

amplify add api ( possible aPI-s: graphQL, lambda )

name: amplifyapp1api
ali key desc: amplifyApp1ApiKey

@model :: aws Amplify create all models for you (part of Amplify cli transform library)
7 directives

https://youtu.be/HZUlQ7Z2xHQ?t=3858
subscription not working as expected
https://github.com/aws-amplify/amplify-cli/issues/2935

Add auth:

amplify add auth (default configuration with user name)
https://aws-amplify.github.io/docs/js/react
amplifyapp1c429bc19
https://youtu.be/HZUlQ7Z2xHQ?t=4001
https://youtu.be/HZUlQ7Z2xHQ?t=4254
https://medium.com/@coryschimmoeller/customizing-the-authentication-experience-of-amplifys-withauthenticator-e6f2089ff469

you need amplify mock running

amplify configure api
...update auth settings - to Amazon Cognito user pool

at adding connection in schema, i need to delete old data (in git bash):
rm -r amplify/mock-data

groups: ["Admin"] can be read from database, like owner

Lambda resolver: (get Crypto data from Rest API)
https://youtu.be/HZUlQ7Z2xHQ?t=5918

https://aws-amplify.github.io/

Publish:
amplify push
amplify add hosting
amplify publish
