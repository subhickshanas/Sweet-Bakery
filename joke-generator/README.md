# 😂 Random Joke Generator

A fun and interactive web application that generates random jokes using external APIs. Built with vanilla HTML, CSS, and JavaScript.

## Features

✨ **Random Joke Generation** - Get random jokes from external APIs
🔄 **Multiple API Support** - Primary and backup API fallbacks
📋 **Copy to Clipboard** - Easily copy jokes to share
📜 **Joke History** - Keep track of your last 5 jokes
💾 **LocalStorage** - Save your joke history
🎨 **Beautiful UI** - Modern gradient design with smooth animations
⌨️ **Keyboard Shortcuts** - Press Space to get a new joke, Ctrl+C to copy
📱 **Responsive Design** - Works on all devices
⚡ **Fast Loading** - Minimal dependencies, pure JavaScript

## APIs Used

### Primary API: JokeAPI
- **URL**: https://v2.jokeapi.dev/joke/Any
- **Features**: Multiple joke categories, two-part jokes (setup/delivery)
- **Documentation**: https://jokeapi.dev/

### Backup API: Official Joke API
- **URL**: https://official-joke-api.appspot.com/random_joke
- **Features**: Simple joke format with fallback support
- **Documentation**: https://github.com/jknm/official-joke-api

## How It Works

1. **Fetch Joke**: Click "Get a Joke" button to fetch a random joke
2. **Display**: Joke displays with animated text and joke type
3. **Copy**: Click "📋 Copy" to copy the joke to clipboard
4. **History**: Recent jokes are saved and displayed at the bottom
5. **Persist**: Joke history is saved to browser's localStorage

## Project Structure

```
joke-generator/
├── index.html      # HTML markup
├── style.css       # Styling and animations
├── script.js       # JavaScript functionality
└── README.md       # Documentation
```

## Installation & Usage

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/subhickshanas/Sweet-Bakery.git
cd Sweet-Bakery/joke-generator
```

2. Open with a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Or simply open index.html in your browser
```

3. Visit `http://localhost:8000` in your browser

### Online Demo

Open `index.html` directly in your browser or deploy to GitHub Pages.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Get a new joke |
| `Ctrl + C` | Copy current joke |

## Features Breakdown

### 🎯 Random Joke Generation
- Fetches from JokeAPI with automatic fallback to Official Joke API
- Handles both single-part and two-part jokes
- Error handling and user feedback

### 📋 Copy Functionality
- Copy joke to clipboard with one click
- Visual feedback on successful copy
- Works with keyboard shortcut

### 📜 Joke History
- Stores up to 5 recent jokes
- Click any joke to view it again
- Persists between sessions using localStorage

### 🎨 Responsive Design
- Optimized for mobile, tablet, and desktop
- Smooth animations and transitions
- Gradient backgrounds and modern UI

## Browser Compatibility

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, Animations, Gradients
- **JavaScript ES6** - Async/await, Fetch API, LocalStorage
- **External APIs** - JokeAPI, Official Joke API

## Error Handling

The application includes robust error handling:
- API timeout handling
- Fallback to secondary API if primary fails
- User-friendly error messages
- Network error management

## Performance

- No external dependencies (jQuery, Bootstrap, etc.)
- Minimal CSS file size
- Optimized JavaScript with caching
- Fast API response times

## Future Enhancements

- [ ] Add more API sources
- [ ] Filter jokes by category
- [ ] Dark mode toggle
- [ ] Share to social media
- [ ] Favorites/Saved jokes
- [ ] Joke ratings
- [ ] Multi-language support

## License

This project is part of the Sweet-Bakery repository and is open source.

## Contributing

Feel free to fork and submit pull requests for any improvements!

## Support

For issues or suggestions, please create an issue in the repository.

---

**Enjoy the jokes! 😂**
