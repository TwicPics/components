import { TwicImg } from "@twicpics/components/react";
export default function Home() {
    return (
        <main>
            <h2>TwicPics x Next</h2>
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
