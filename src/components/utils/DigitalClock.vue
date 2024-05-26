<template>
    <div class="digital-clock">
        <div class="time text-gray-700">{{ currentTime }}</div>
        <div class="date text-gray-600">{{ currentDate }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentTime: '',
            currentDate: ''
        }
    },
    created() {
        this.updateTime()
        setInterval(this.updateTime, 1000)
    },
    methods: {
        updateTime() {
            const now = new Date()
            this.currentTime = now.toLocaleTimeString()
            this.currentDate = now.toLocaleDateString()
        }
    }
}
</script>

<style scoped>
.digital-clock {
    margin-right: 35px;
}

.time {
    font-size: 1.8em;
}

.date {
    font-size: 1.2em;
}
</style>
