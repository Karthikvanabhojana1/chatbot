import React from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Clock, TrendingUp, BarChart3 } from 'lucide-react'
import { useChat } from '../contexts/ChatContext'

const Dashboard = () => {
  const { recentQuestions, messages, apiKey } = useChat()

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStats = () => {
    const totalMessages = messages.length
    const userMessages = messages.filter(msg => msg.role === 'user').length
    const assistantMessages = messages.filter(msg => msg.role === 'assistant').length
    const totalQuestions = recentQuestions.length

    return {
      totalMessages,
      userMessages,
      assistantMessages,
      totalQuestions
    }
  }

  const stats = getStats()

  if (!apiKey) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
          <p className="text-gray-600 mb-6">
            Please set your OpenAI API key to view the dashboard.
          </p>
          <Link to="/" className="btn-primary">
            Go to Chat
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link to="/" className="btn-primary">
          <MessageSquare size={16} />
          New Chat
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <MessageSquare className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Messages</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMessages}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Your Questions</p>
              <p className="text-2xl font-bold text-gray-900">{stats.userMessages}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">AI Responses</p>
              <p className="text-2xl font-bold text-gray-900">{stats.assistantMessages}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Recent Questions</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalQuestions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Questions */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Questions</h2>
          {recentQuestions.length > 0 && (
            <span className="text-sm text-gray-500">
              Last {recentQuestions.length} questions
            </span>
          )}
        </div>

        {recentQuestions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No questions yet. Start a conversation to see your recent questions here.</p>
            <Link to="/" className="btn-primary mt-4 inline-block">
              Start Chatting
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recentQuestions.map((question, index) => (
              <div
                key={question.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium mb-2">
                      {question.content.length > 100
                        ? `${question.content.substring(0, 100)}...`
                        : question.content}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      {formatDate(question.timestamp)}
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      #{recentQuestions.length - index}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MessageSquare size={20} className="text-primary-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Start New Chat</p>
              <p className="text-sm text-gray-500">Begin a new conversation</p>
            </div>
          </Link>
          
          <button
            onClick={() => window.location.reload()}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <BarChart3 size={20} className="text-blue-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Refresh Dashboard</p>
              <p className="text-sm text-gray-500">Update statistics</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 