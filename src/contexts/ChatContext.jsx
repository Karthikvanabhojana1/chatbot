import React, { createContext, useContext, useReducer, useEffect } from 'react'

const ChatContext = createContext()

const initialState = {
  messages: [],
  recentQuestions: [],
  isLoading: false,
  error: null,
  apiKey: localStorage.getItem('openai_api_key') || '',
}

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        recentQuestions: action.payload.role === 'user' 
          ? [action.payload, ...state.recentQuestions.slice(0, 9)] // Keep last 10 questions
          : state.recentQuestions
      }
    
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload }
    
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] }
    
    case 'SET_API_KEY':
      localStorage.setItem('openai_api_key', action.payload)
      return { ...state, apiKey: action.payload }
    
    case 'SET_RECENT_QUESTIONS':
      return { ...state, recentQuestions: action.payload }
    
    default:
      return state
  }
}

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  // Load recent questions from localStorage on mount
  useEffect(() => {
    const savedQuestions = localStorage.getItem('recent_questions')
    if (savedQuestions) {
      try {
        const questions = JSON.parse(savedQuestions)
        dispatch({ type: 'SET_RECENT_QUESTIONS', payload: questions })
      } catch (error) {
        console.error('Error loading recent questions:', error)
      }
    }
  }, [])

  // Save recent questions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('recent_questions', JSON.stringify(state.recentQuestions))
  }, [state.recentQuestions])

  const sendMessage = async (message) => {
    if (!state.apiKey) {
      dispatch({ type: 'SET_ERROR', payload: 'Please set your OpenAI API key first' })
      return
    }

    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_ERROR', payload: null })

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    }
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage })

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            ...state.messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: message }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.choices && data.choices[0]) {
        const assistantMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.choices[0].message.content,
          timestamp: new Date().toISOString()
        }
        dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage })
      } else {
        throw new Error('Invalid response from OpenAI API')
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const clearMessages = () => {
    dispatch({ type: 'CLEAR_MESSAGES' })
  }

  const setApiKey = (apiKey) => {
    dispatch({ type: 'SET_API_KEY', payload: apiKey })
  }

  const value = {
    ...state,
    sendMessage,
    clearMessages,
    setApiKey
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
} 