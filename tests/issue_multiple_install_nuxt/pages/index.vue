<template>
    <main>
        <h2>TwicPics x Nuxt</h2>
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
</template>

<script>
export default {};
</script>

<style>
main {
    margin: auto;
    max-width: 1000px;
}
</style>
