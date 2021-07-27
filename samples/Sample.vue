<template>
    <main>
        <TwicImg src="https://assets.twicpics.com/examples/football.jpg" />
        <TwicImg
            src="football.jpg"
            ratio="16/9"
            step="100"
            placeholder="meancolor"
        />
        <TwicImg
            src="/football.jpg"
            alt="custom alt attribute"
            step="100"
            focus="auto"
            width="500"
            height="800"
            placeholder="none"
        />
        <TwicImg
            src="football.jpg"
            ratio="16/9"
            step="100"
            mode="contain"
            position="left"
        />
    </main>
</template>

<style src="./Sample.css" />
