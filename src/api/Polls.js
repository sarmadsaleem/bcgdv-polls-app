import axios from 'axios'

/** Retrieve entry point from API root */
const retrieveEntryPoint = async () => {
  const apiRoot = 'https://polls.apiblueprint.org'
  const response = await axios.get(apiRoot)
  return response.status === 200 ? `${apiRoot}${response.data.questions_url}` : false
}

/** Get all questions based on retrieved entry point */
// FIXME: link header unavailable perhaps because of CORS restrictions
const getQuestions = async () => {
  const endpoint = await retrieveEntryPoint()
  const response = endpoint ? await axios.get(endpoint) : false
  response.data.map(q => {
    const url = q.url
    const id = parseInt(url.slice(url.lastIndexOf('/') + 1), 10)
    return (q.id = id)
  })
  return response.status === 200 ? response.data.reverse() : false
}

/** Get question details for given questionId */
const getQuestionDetails = async questionId => {
  const endpoint = await retrieveEntryPoint()
  const response = endpoint ? await axios.get(`${endpoint}/${questionId}`) : false
  // transform response, add question id
  const url = response.data.url
  response.data.id = parseInt(url.slice(url.lastIndexOf('/') + 1), 10)

  // transform response, calculate total votes
  const totalVotes = response.data.choices.reduce((acc, val) => acc + val.votes, 0)
  response.data.totalVotes = parseInt(totalVotes, 10)

  // transform response, add choice id to choices object
  response.data.choices.map(c => {
    const url = c.url
    const id = parseInt(url.slice(url.lastIndexOf('/') + 1), 10)
    return (c.id = id)
  })

  return response.status === 200 ? response.data : false
}

/** Cast vote for given questionId against selected choiceId */
const castVote = async (questionId, choiceId) => {
  const endpoint = await retrieveEntryPoint()
  const response = endpoint
    ? await axios.post(`${endpoint}/${questionId}/choices/${choiceId}`)
    : false

  return response.status === 201 ? response.data : false
}

/** Create question */
const createQuestion = async details => {
  const endpoint = await retrieveEntryPoint()
  const response = endpoint ? await axios.post(`${endpoint}`, details) : false
  return response.status === 201 ? response.data : false
}

export { getQuestions, getQuestionDetails, castVote, createQuestion }
