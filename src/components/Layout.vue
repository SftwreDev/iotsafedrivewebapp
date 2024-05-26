<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider>
            <div class="flex">
                <a-avatar :size="64" class="mx-1 my-5">
                    <template #icon>
                        <img
                            alt=""
                            class="mx-auto h-16 w-16 rounded-full ring-1 ring-custom-bg-500 p-0.5"
                            src="/logo.png"
                        />
                    </template>
                </a-avatar>

                <p class="mt-10 text-gray-300 font-semibold text-lg tracking-wider">IoTSafeDrive</p>
            </div>
            <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="dark">
                <a-menu-item key="dashboard">
                    <router-link class="flex gap-x-2" to="/dashboard">
                        <dashboard-outlined class="mt-3" />
                        <p>Dashboard</p>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="2">
                    <router-link class="flex gap-x-2" to="/analytics">
                        <bar-chart-outlined class="mt-3" />
                        <p>Analytics</p>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="3">
                    <router-link class="flex gap-x-2" to="/registered-vehicle">
                        <car-outlined class="mt-3" />
                        <p>Vehicles</p>
                    </router-link>
                </a-menu-item>
                <a-sub-menu key="sub1">
                    <template #title>
                        <span class="flex gap-x-2">
                            <phone-outlined class="mt-3" />
                            <p>Contacts</p>
                        </span>
                    </template>
                    <a-menu-item key="4">
                        <router-link to="/rescuers-contacts">
                            <span>Rescuers</span>
                        </router-link>
                    </a-menu-item>
                    <a-menu-item key="5">
                        <router-link to="/emergency-contacts">
                            <span>Emergency</span>
                        </router-link>
                    </a-menu-item>
                </a-sub-menu>
                <a-menu-item key="6">
                    <router-link class="flex gap-x-2" to="/activity-history">
                        <history-outlined class="mt-3" />
                        <p>Activity History</p>
                    </router-link>
                </a-menu-item>
                <a-sub-menu key="sub2">
                    <template #title>
                        <span class="flex gap-x-2">
                            <file-text-outlined class="mt-3" />
                            <p>Reports</p>
                        </span>
                    </template>
                    <a-menu-item key="7">By Device</a-menu-item>
                    <a-menu-item key="8">By Accident</a-menu-item>
                </a-sub-menu>
                <a-menu-item key="9">
                    <router-link class="flex gap-x-2" to="/users">
                        <team-outlined class="mt-3" />
                        <p>User Accounts</p>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="10">
                    <div class="flex gap-x-2">
                        <logout-outlined class="mt-3" />
                        <p>
                            <a-popconfirm
                                cancel-text="No"
                                ok-text="Yes"
                                title="Are you sure you want to logout?"
                                @cancel="cancel"
                                @confirm="confirm"
                            >
                                <a href="#">Logout</a>
                            </a-popconfirm>
                        </p>
                    </div>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0" />
            <a-layout-content style="margin: 0 16px">
                <div :style="{ padding: '8px', background: '#fff', minHeight: '360px' }">
                    <div
                        class="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between"
                    >
                        <a-typography-title :level="2" class="mx-8">
                            Welcome to IoTSafeDrive!
                        </a-typography-title>
                        <div class="mt-3 sm:ml-4 sm:mt-0">
                            <DigitalClock />
                        </div>
                    </div>

                    <slot>
                        <a-skeleton />
                    </slot>
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center"> IoTSafeDrive ©2024</a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
import {
    BarChartOutlined,
    CarOutlined,
    DashboardOutlined,
    FileTextOutlined,
    HistoryOutlined,
    LogoutOutlined,
    PhoneOutlined,
    TeamOutlined
} from '@ant-design/icons-vue'
import { ref } from 'vue'

const collapsed = ref<boolean>(false)
const selectedKeys = ref<string[]>(['dashboard'])

const confirm = (e: MouseEvent) => {
    localStorage.clear()

    window.location.href = '/signin'
}

const cancel = (e: MouseEvent) => {
    window.location.href = '/'
}
</script>

<script lang="ts">
import DigitalClock from '@/components/utils/DigitalClock.vue'

export default {
    name: 'App',
    components: {
        DigitalClock
    }
}
</script>

<style scoped>
#components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}
</style>
