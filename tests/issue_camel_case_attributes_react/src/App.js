
import './App.css';
import { TwicImg } from "@twicpics/components/react";

function App() {
    return (
        <main>
            <h2>TwicPics x React</h2>
            <div>
                <TwicImg
                    src="https://assets.twicpics.com/examples/football.jpg"
                    ratio="21/9"
                    mode="cover"
                    focus="200x200">
                </TwicImg>
            </div>
            <div>
                <TwicImg
                    src="https://assets.twicpics.com/examples/football.jpg"
                    ratio="4/3"
                    mode="contain"
                    focus="auto">
                </TwicImg>
            </div>
        </main>
    );
}

export default App;
