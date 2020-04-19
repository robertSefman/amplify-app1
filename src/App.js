// src/App.js
import React, { useEffect, useReducer } from "react"
import { Auth, API, graphqlOperation } from "aws-amplify"
import { createTalk as CreateTalk } from "./graphql/mutations"
import { listTalks as ListTalks } from "./graphql/queries"
import { withAuthenticator } from "aws-amplify-react"

import { v4 as uuid } from "uuid"

import { onCreateTalk as OnCreateTalk } from "./graphql/subscriptions"

const CLIENT_ID = uuid()

const initialState = {
  name: "",
  description: "",
  speakerName: "",
  speakerBio: "",
  talks: [],
}

//create reducer to update state
function reducer(state, action) {
  switch (action.type) {
    case "SET_TALKS":
      return { ...state, talks: action.talks }
    case "SET_INPUT":
      return { ...state, [action.key]: action.value }
    case "CLEAR_INPUT":
      return { ...initialState, talks: state.talks }
    case "ADD_TALK":
      return { ...state, talks: [...state.talks, action.talk] }
    // spread talks into a new array and add new talk
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  // subscribe in useEffect
  useEffect(() => {
    getUser()
    getData()
    const subscription = API.graphql(graphqlOperation(OnCreateTalk)).subscribe({
      next: (eventData) => {
        // when subscription is triggered, next is executed
        const talk = eventData.value.date.onCreateTalk
        if (talk.clientId === CLIENT_ID) {
          return
        }
        dispatch({ type: "ADD_TALK", talk })
      },
    })
    return () => subscription.unsubscribe()
  }, [])

  const getUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log("User info: ", user)
    } catch (err) {
      console.log("Login Error:", err)
    }
  }

  const getData = async () => {
    try {
      const talkData = await API.graphql(graphqlOperation(ListTalks))
      console.log("talkData from API:", talkData)
      dispatch({ type: "SET_TALKS", talks: talkData.data.listTalks.items })
    } catch (err) {
      console.log("error fetching talks...", err)
    }
  }

  const createTalk = async () => {
    const { name, description, speakerName, speakerBio } = state
    if (
      name === "" ||
      description === "" ||
      speakerName === "" ||
      speakerBio === ""
    ) {
      return
    }
    const talk = {
      name,
      description,
      speakerName,
      speakerBio,
      clientId: CLIENT_ID,
    }
    const talks = [...state.talks, talk]
    dispatch({ type: "SET_TALKS", talks })
    dispatch({ type: "CLEAR_INPUT" })
    try {
      await API.graphql(graphqlOperation(CreateTalk, { input: talk }))
      console.log("talk created!")
    } catch (err) {
      console.log("Error creating talk...", err)
    }
  }

  //change state when user types into input
  function onChange(e) {
    dispatch({ type: "SET_INPUT", key: e.target.name, value: e.target.value })
  }

  return (
    <>
      <input
        name="name"
        onChange={onChange}
        value={state.name}
        placeholder="Talk Name"
      />{" "}
      <input
        name="description"
        onChange={onChange}
        value={state.description}
        placeholder="Talk Description"
      />{" "}
      <input
        name="speakerName"
        onChange={onChange}
        value={state.speakerName}
        placeholder="Speaker name"
      />{" "}
      <input
        name="speakerBio"
        onChange={onChange}
        value={state.speakerBio}
        placeholder="Speaker bio"
      />
      <button onClick={createTalk}>Create Talk</button>
      {state.talks.map((talk, index) => (
        <div key={index}>
          <h3>{talk.speakerName}</h3>
          <h5>{talk.name}</h5>
          <p>{talk.description}</p>
        </div>
      ))}
    </>
  )
}

// export default App

const signUpConfig = {
  header: 'My Customized Sign Up',
  includeGreetings: true,
  hideAllDefaults: true,
  defaultCountryCode: '1',
  signUpFields: [
    {
      label: 'My custom email label',
      key: 'email',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
     // and other custom attributes
  ]
};

export default withAuthenticator(App, true)
// export default App
