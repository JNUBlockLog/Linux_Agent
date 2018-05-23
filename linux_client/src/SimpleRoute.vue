<template>
    <div id="app">
        <v-toolbar tabs>
            <v-btn icon href="/" router>
                <v-icon>motorcycle</v-icon>
            </v-btn>
            <v-btn icon href="/dog" router>
                <v-icon>pets</v-icon>
            </v-btn>
        </v-toolbar>
        <router-view/>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
