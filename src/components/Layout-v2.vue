<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <div class=""></div>
            <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="dark">
                <a-menu-item key="dashboard">
                    <router-link to="/dashboard">
                        <dashboard-outlined />
                        <span>Dashboard</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="2">
                    <router-link to="/analytics">
                        <bar-chart-outlined />
                        <span>Analytics</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="3">
                    <router-link to="/registered-vehicle">
                        <car-outlined />
                        <span>Vehicles</span>
                    </router-link>
                </a-menu-item>
                <a-sub-menu key="sub1">
                    <template #title>
                        <span>
                            <phone-outlined />
                            <span>Contacts</span>
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
                    <router-link to="/activity-history">
                        <history-outlined />
                        <span>Activity History</span>
                    </router-link>
                </a-menu-item>
                <a-sub-menu key="sub2">
                    <template #title>
                        <span>
                            <team-outlined />
                            <span>Team</span>
                        </span>
                    </template>
                    <a-menu-item key="7">Team 1</a-menu-item>
                    <a-menu-item key="8">Team 2</a-menu-item>
                </a-sub-menu>
                <a-menu-item key="9">
                    <router-link to="/users">
                        <team-outlined />
                        <span>User Accounts</span>
                    </router-link>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0" />
            <a-layout-content style="margin: 0 16px">
                <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
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
    HistoryOutlined,
    PhoneOutlined,
    TeamOutlined
} from '@ant-design/icons-vue'
import { ref } from 'vue'

const collapsed = ref<boolean>(false)
const selectedKeys = ref<string[]>(['dashboard'])
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
