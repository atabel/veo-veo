# VeoVeo 🎬

VeoVeo is a smart movie and TV series recommendation app that helps you discover what to watch based on your preferences and available time. Built with Expo and React Native, it provides personalized suggestions from popular streaming platforms.

## Features

- 🎯 **Personalized Recommendations**: Get suggestions based on your available time, preferred genres, and audience type
- 🎬 **Detailed Information**: View comprehensive details about movies and series including cast, director, runtime, and synopsis
- 📱 **Cross-Platform**: Works on iOS, Android, and web
- 🎥 **Streaming Integration**: Direct links to watch content on Netflix, Amazon Prime Video, and Movistar+
- ✨ **Beautiful UI**: Immersive video background with smooth animations and modern design

## Tech Stack

- **Framework**: Expo (~54.0.10) with React Native
- **Navigation**: Expo Router for file-based routing
- **Animations**: React Native Reanimated
- **UI Components**: React Native Reanimated Carousel, Expo Blur, Linear Gradients
- **Language**: TypeScript
- **Linting**: ESLint with Expo config

## Get Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm start
   # or
   npx expo start
   ```

3. **Run on different platforms**

   ```bash
   # Android
   npm run android
   
   # iOS
   npm run ios
   
   # Web
   npm run web
   ```

In the output, you'll find options to open the app in:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go) for quick testing

## Project Structure

```
app/
├── _layout.tsx          # Root layout component
├── index.tsx            # Home screen with video background
├── suggestion.tsx       # Recommendations screen
├── ficha.tsx           # Movie/series details modal
└── settings.tsx        # User preferences settings

assets/
├── images/             # App icons and images
└── videos/             # Background video assets

api.tsx                 # API integration for recommendations
```

## Development

The app uses [Expo Router](https://docs.expo.dev/router/introduction/) for navigation with file-based routing. The main screens are:

- **Home** (`index.tsx`): Interactive carousel with video background
- **Suggestions** (`suggestion.tsx`): Personalized recommendations based on user preferences  
- **Details** (`ficha.tsx`): Detailed view of selected movies/series
- **Settings** (`settings.tsx`): User preference configuration

## API Integration

The app connects to a recommendation API that provides:
- Movie and TV series suggestions based on filters
- Streaming service availability for Spain region
- Detailed metadata including cast, genres, and ratings

## Scripts

- `npm start`: Start the Expo development server
- `npm run android`: Run on Android device/emulator
- `npm run ios`: Run on iOS device/simulator  
- `npm run web`: Run in web browser
- `npm run lint`: Run ESLint for code quality
- `npm run reset-project`: Reset to blank project template

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
