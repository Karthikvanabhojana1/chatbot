# ChatGPT Wrapper

A modern React application that provides a beautiful interface for interacting with OpenAI's ChatGPT API. Features include real-time chat, conversation history, and a dashboard showing recent questions and statistics.

## Features

- 🤖 **Real-time Chat**: Interact with ChatGPT using OpenAI's API
- 📊 **Dashboard**: View statistics and recent questions
- 💾 **Persistent Storage**: Recent questions are saved locally
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 🔐 **API Key Management**: Secure API key storage
- 📱 **Mobile Responsive**: Works perfectly on all devices
- ⚡ **Fast & Lightweight**: Built with Vite for optimal performance

## Screenshots

### Chat Interface
- Clean, modern chat interface
- Real-time message exchange
- Loading states and error handling
- Message timestamps

### Dashboard
- Statistics cards showing message counts
- Recent questions list with timestamps
- Quick action buttons
- Responsive grid layout

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chatbot
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Setting up OpenAI API Key

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Click on the "API Settings" button in the top-right corner
3. Enter your API key and click "Save"

## Usage

### Chat Interface
- Type your message in the input field
- Press Enter or click "Send" to submit
- View the AI response in real-time
- Clear chat history using the "Clear Chat" button

### Dashboard
- View statistics about your conversations
- See your recent questions with timestamps
- Access quick actions for navigation

## Project Structure

```
src/
├── components/
│   └── Layout.jsx          # Main layout with navigation
├── contexts/
│   └── ChatContext.jsx     # Chat state management
├── pages/
│   ├── Chat.jsx           # Chat interface
│   └── Dashboard.jsx      # Dashboard with statistics
├── utils/
│   └── cn.js             # Utility functions
├── App.jsx               # Main app component
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Lucide React**: Beautiful icons
- **OpenAI API**: ChatGPT integration

## API Configuration

The application uses OpenAI's Chat Completions API with the following configuration:
- Model: `gpt-3.5-turbo`
- Max tokens: 1000
- Temperature: 0.7

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

### Environment Variables

No environment variables are required. The API key is stored securely in the browser's localStorage.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

## Roadmap

- [ ] Message search functionality
- [ ] Export chat history
- [ ] Multiple chat sessions
- [ ] Custom AI models selection
- [ ] Voice input/output
- [ ] Dark mode support