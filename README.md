# AI-Integrated Pokedex

A modern Pokedex application that uses AI to detect and identify Pokemon in real-time using your device's camera. Built with React and powered by Roboflow's object detection API.

## 🎬 Demo

<div align="center">
  <img src="demo1.gif" alt="Demo GIF" width="320"/>
</div>

## 🚀 Features

- Real-time Pokemon detection using device camera
- Voice synthesis for Pokemon information
- Detailed Pokemon stats and information
- Responsive design for all devices
- Progressive Web App (PWA) support
- Offline functionality
- Cross-platform support (iOS & Android)

## 📱 PWA Support

This application is available as a Progressive Web App (PWA) and can be installed on both iOS and Android devices:

<div align="center">
  <img src="icon.png" alt="PWA Icon" width="120" height="120"/>
</div>

### iOS Installation
1. Open Safari browser
2. Visit [https://egecan12.github.io/Ai-Integrated-Pokedex/](https://egecan12.github.io/Ai-Integrated-Pokedex/)
3. Tap the Share button
4. Select "Add to Home Screen"
5. The app will be installed as a native-like application

### Android Installation
1. Open Chrome browser
2. Visit [https://egecan12.github.io/Ai-Integrated-Pokedex/](https://egecan12.github.io/Ai-Integrated-Pokedex/)
3. Tap the three-dot menu
4. Select "Install app" or "Add to Home screen"
5. The app will be installed as a native-like application

## 🛠️ Technologies Used

### Frontend
<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="react" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="tailwind" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="html5" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="css3" width="40" height="40"/>
</div>

### Backend & AI
<div align="center">
  <img src="https://raw.githubusercontent.com/roboflow-ai/roboflow-js-browser/main/docs/roboflow-logo.svg" alt="roboflow" width="40" height="40"/>
  <img src="https://raw.githubusercontent.com/ultralytics/yolov5/master/docs/images/logo.png" alt="yolov8" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="nodejs" width="40" height="40"/>
</div>

## 📦 Dataset Information

The project uses a custom-trained model based on the Pokemon Gen 1 Dataset:

- **Dataset Owner**: AnthonyK
- **Last Updated**: March 2022
- **Total Images**: 917
- **Labeled Classes**: 149 (e.g., Pikachu, Charizard, Bulbasaur, Mewtwo, etc.)
- **Dataset Split**:
  - Training: 69% (637 images)
  - Validation: 20% (185 images)
  - Test: 10% (95 images)
- **Preprocessing**:
  - Images resized to 416x416
  - Automatic orientation applied
  - No data augmentation applied
- **License**: CC BY 4.0

### Model Information
- **Model Type**: Object Detection
- **Supported Formats**: YOLOv5, YOLOv7, YOLOv8, YOLOv9, YOLOv11
- **Inference Methods**:
  - Browser-based testing
  - Roboflow's hosted inference API

## 🔧 Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/egecan12/Ai-Integrated-Pokedex.git
cd Ai-Integrated-Pokedex
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Roboflow API key:
```env
REACT_APP_ROBOFLOW_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
```

5. For production build:
```bash
npm run build
```

## 📱 Device Support

- Desktop browsers (Chrome, Firefox, Safari)
- Mobile devices (iOS, Android)
- Tablet devices
- Apple Watch (limited functionality)

## 🔗 Resources

- [Pokemon Gen 1 Dataset](https://universe.roboflow.com/anthonyk/pokemon-gen-1)
- [PokeAPI](https://pokeapi.co/)
- [Roboflow](https://roboflow.com/)

## 📝 Citation

If you use this dataset in a research project, please cite:

```bibtex
@misc{pokemon-gen-1_dataset,
  title = {Pokemon Gen 1 Dataset},
  type = {Open Source Dataset},
  author = {AnthonyK},
  howpublished = {\url{https://universe.roboflow.com/anthonyk/pokemon-gen-1}},
  url = {https://universe.roboflow.com/anthonyk/pokemon-gen-1},
  journal = {Roboflow Universe},
  publisher = {Roboflow},
  year = {2022},
  month = {mar},
  note = {visited on 2025-03-24},
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Egecan Kahyaoglu - [GitHub](https://github.com/egecan12)
