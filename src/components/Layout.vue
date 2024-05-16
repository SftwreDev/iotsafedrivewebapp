<script>
const role = localStorage.getItem('role')
export default {
    // Properties returned from data() become reactive state
    // and will be exposed on `this`.

    data() {
        const role = localStorage.getItem('role')
        return {
            full_name: '',
            email: '',
            profile_picture: '',
            role
        }
    },

    // Methods are functions that mutate state and trigger updates.
    // They can be bound as event handlers in templates.
    methods: {
        signOut() {
            localStorage.clear()

            window.location.href = '/signin'
        },
        getLoggedInUser() {
            const full_name = localStorage.getItem('full_name')
            const email = localStorage.getItem('email_address')
            const profile_picture = localStorage.getItem('profile_picture')

            this.full_name = full_name
            this.email = email
            this.profile_picture = profile_picture
        }
    },

    mounted() {
        this.getLoggedInUser()
    }
}
</script>
<template>
    <div class="min-h-full">
        <TransitionRoot :show="sidebarOpen" as="template">
            <Dialog as="div" class="relative z-40 lg:hidden" @close="sidebarOpen = false">
                <TransitionChild
                    as="template"
                    enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </TransitionChild>

                <div class="fixed inset-0 z-40 flex">
                    <TransitionChild
                        as="template"
                        enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full"
                        enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leave-from="translate-x-0"
                        leave-to="-translate-x-full"
                    >
                        <DialogPanel
                            class="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 pt-5"
                        >
                            <TransitionChild
                                as="template"
                                enter="ease-in-out duration-300"
                                enter-from="opacity-0"
                                enter-to="opacity-100"
                                leave="ease-in-out duration-300"
                                leave-from="opacity-100"
                                leave-to="opacity-0"
                            >
                                <div class="absolute right-0 top-0 -mr-12 pt-2">
                                    <button
                                        class="relative ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        type="button"
                                        @click="sidebarOpen = false"
                                    >
                                        <span class="absolute -inset-0.5" />
                                        <span class="sr-only">Close sidebar</span>
                                        <XMarkIcon aria-hidden="true" class="h-6 w-6 text-white" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div class="flex flex-shrink-0 items-center px-4">
                                <Menu as="div" class="relative inline-block text-left">
                                    <div>
                                        <MenuButton
                                            class="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                        >
                            <span class="flex w-full items-center justify-between">
                                <span class="flex min-w-0 items-center justify-between space-x-3">
                                    <img
                                        v-if="role === 'user'"
                                        :src="profile_picture"
                                        alt=""
                                        class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                                    />
                                    <div v-if="role === 'super_admin' || role === 'rescuer'">
                                        <span class="inline-block h-16 w-16 overflow-hidden rounded-full bg-gray-100">
                                          <img alt=""
                                               class="mx-auto h-16 w-16 rounded-full ring-1 ring-custom-bg-500 p-0.5"
                                               src="/logo.png" />
                                        </span>
                                    </div>
                                    <span class="flex min-w-0 flex-1 flex-col">
                                        <span class="truncate text-sm font-medium text-gray-900">{{
                                                full_name
                                            }}</span>
                                        <span class="truncate text-sm text-gray-500">{{
                                                email
                                            }}</span>
                                    </span>
                                </span>
                                <ChevronUpDownIcon
                                    aria-hidden="true"
                                    class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                />
                            </span>
                                        </MenuButton>
                                    </div>
                                    <transition
                                        enter-active-class="transition ease-out duration-100"
                                        enter-from-class="transform opacity-0 scale-95"
                                        enter-to-class="transform opacity-100 scale-100"
                                        leave-active-class="transition ease-in duration-75"
                                        leave-from-class="transform opacity-100 scale-100"
                                        leave-to-class="transform opacity-0 scale-95"
                                    >
                                        <MenuItems
                                            class="absolute left-0 right-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        >
                                            <div class="py-1">
                                                <MenuItem v-slot="{ active }">
                                                    <a
                                                        :class="[
                                            active
                                                ? 'bg-gray-100 text-gray-900 cursor-pointer'
                                                : 'text-gray-700',
                                            'block px-4 py-2 text-sm cursor-pointer'
                                        ]"
                                                        @click="signOut()"
                                                    >Logout</a
                                                    >
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </transition>
                                </Menu>
                            </div>
                            <div class="mt-5 h-0 flex-1 overflow-y-auto">
                                <nav v-if="role === 'user'" class="mt-10 px-3">
                                    <div class="space-y-1">
                                        <a
                                            v-for="item in navigation"
                                            :key="item.name"
                                            :aria-current="item.current ? 'page' : undefined"
                                            :class="[
                                item.current
                                    ? 'bg-custom-bg-500 text-gray-100'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                                'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                            ]"
                                            :href="item.href"
                                        >
                                            <component
                                                :is="item.icon"
                                                :class="[
                                    item.current
                                        ? 'text-gray-100'
                                        : 'text-gray-400 group-hover:text-gray-500',
                                    'mr-3 h-6 w-6 flex-shrink-0'
                                ]"
                                                aria-hidden="true"
                                            />
                                            {{ item.name }}
                                        </a>
                                    </div>
                                </nav>

                                <nav v-if="role === 'super_admin' || role === 'rescuer'" class="mt-10 px-3">
                                    <div class="space-y-1">
                                        <a
                                            v-for="item in admin_navigation"
                                            v-show="!item.hide"
                                            :key="item.name"
                                            :aria-current="item.current ? 'page' : undefined"
                                            :class="[
                                                item.current
                                                    ? 'bg-custom-bg-500 text-gray-100'
                                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                                                'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                                            ]"
                                            :href="item.href"
                                        >
                                            <!--                            <component-->
                                            <!--                                :is="item.icon"-->
                                            <!--                                :class="[-->
                                            <!--                                    item.current-->
                                            <!--                                        ? 'text-gray-100'-->
                                            <!--                                        : 'text-gray-400 group-hover:text-gray-500',-->
                                            <!--                                    'mr-3 h-6 w-6 flex-shrink-0'-->
                                            <!--                                ]"-->
                                            <!--                                aria-hidden="true"-->
                                            <!--                            />-->
                                            {{ item.name }}
                                        </a>
                                    </div>
                                </nav>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                    <div aria-hidden="true" class="w-14 flex-shrink-0">
                        <!-- Dummy element to force sidebar to shrink to fit close icon -->
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Static sidebar for desktop -->
        <div
            class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 bg-gray-900 lg:pb-4 lg:pt-5"
        >
            <div class="flex flex-shrink-0 items-center px-6">

            </div>
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="mt-5 flex h-0 flex-1 flex-col overflow-y-auto pt-1">
                <!-- User account dropdown -->
                <Menu as="div" class="relative inline-block px-3 text-left">
                    <div>
                        <MenuButton
                            class="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        >
                            <span class="flex w-full items-center justify-between">
                                <span class="flex min-w-0 items-center justify-between space-x-3">
                                    <img
                                        v-if="role === 'user'"
                                        :src="profile_picture"
                                        alt=""
                                        class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                                    />
                                    <div v-if="role === 'super_admin' || role === 'rescuer'">
                                        <span class="inline-block h-16 w-16 overflow-hidden rounded-full bg-gray-100">
                                          <img alt=""
                                               class="mx-auto h-16 w-16 rounded-full ring-1 ring-custom-bg-500 p-0.5"
                                               src="/logo.png" />
                                        </span>
                                    </div>
                                    <span class="flex min-w-0 flex-1 flex-col">
                                        <span class="truncate text-sm font-medium text-gray-900">{{
                                                full_name
                                            }}</span>
                                        <span class="truncate text-sm text-gray-500">{{
                                                email
                                            }}</span>
                                    </span>
                                </span>
                                <ChevronUpDownIcon
                                    aria-hidden="true"
                                    class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                />
                            </span>
                        </MenuButton>
                    </div>
                    <transition
                        enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95"
                    >
                        <MenuItems
                            class="absolute left-0 right-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                            <div class="py-1">
                                <MenuItem v-slot="{ active }">
                                    <a
                                        :class="[
                                            active
                                                ? 'bg-gray-100 text-gray-900 cursor-pointer'
                                                : 'text-gray-700',
                                            'block px-4 py-2 text-sm cursor-pointer'
                                        ]"
                                        @click="signOut()"
                                    >Logout</a
                                    >
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </transition>
                </Menu>
                <!-- Navigation -->
                <nav v-if="role === 'user'" class="mt-10 px-3">
                    <div class="space-y-1">
                        <a
                            v-for="item in navigation"
                            :key="item.name"
                            :aria-current="item.current ? 'page' : undefined"
                            :class="[
                                item.current
                                    ? 'bg-custom-bg-500 text-gray-100'
                                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900',
                                'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                            ]"
                            :href="item.href"
                        >
                            <component
                                :is="item.icon"
                                :class="[
                                    item.current
                                        ? 'text-gray-100'
                                        : 'text-gray-400 group-hover:text-gray-500',
                                    'mr-3 h-6 w-6 flex-shrink-0'
                                ]"
                                aria-hidden="true"
                            />
                            {{ item.name }}
                        </a>
                    </div>
                </nav>

                <nav v-if="role === 'super_admin' || role === 'rescuer'" class="mt-10 px-3">
                    <div class="space-y-1">
                        <a
                            v-for="item in admin_navigation"
                            v-show="!item.hide"
                            :key="item.name"
                            :aria-current="item.current ? 'page' : undefined"
                            :class="[
                                item.current
                                    ? 'bg-custom-bg-500 text-gray-100'
                                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900',
                                'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                            ]"
                            :href="item.href"
                        >
                            <!--                            <component-->
                            <!--                                :is="item.icon"-->
                            <!--                                :class="[-->
                            <!--                                    item.current-->
                            <!--                                        ? 'text-gray-100'-->
                            <!--                                        : 'text-gray-400 group-hover:text-gray-500',-->
                            <!--                                    'mr-3 h-6 w-6 flex-shrink-0'-->
                            <!--                                ]"-->
                            <!--                                aria-hidden="true"-->
                            <!--                            />-->
                            {{ item.name }}
                        </a>
                    </div>
                </nav>
            </div>
        </div>
        <!-- Main column -->
        <div class="flex flex-col lg:pl-64">

            <main class="flex-1">
                <!-- Page title & actions -->
                <slot></slot>
            </main>
        </div>
    </div>
</template>

<script setup>

import { faCar } from '@fortawesome/free-solid-svg-icons'

var url = location.href
const lastSegmentPath = url.match(/([^\/]*)\/*$/)[1]


import { ref } from 'vue'
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot
} from '@headlessui/vue'
import {
    HomeIcon,
    XMarkIcon,
    Cog6ToothIcon,
    ExclamationTriangleIcon

} from '@heroicons/vue/24/outline'
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const navigation = [
    { name: 'Profile', href: '/', icon: HomeIcon, current: lastSegmentPath === 'localhost:5173' },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon, current: lastSegmentPath === 'settings' }
]
const admin_navigation = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: HomeIcon,
        current: lastSegmentPath === 'dashboard',
        hide: false
    },
    {
        name: 'Analytics',
        href: '/analytics',
        icon: HomeIcon,
        current: lastSegmentPath === 'analytics',
        hide: false
    },
    {
        name: 'Registered Vehicles',
        href: '/registered-vehicle',
        icon: faCar,
        current: lastSegmentPath === 'registered-vehicle',
        hide: false
    },
    {
        name: 'Emergency Contacts',
        href: '/emergency-contacts',
        icon: ExclamationTriangleIcon,
        current: lastSegmentPath === 'emergency-contacts',
        hide: false
    },
    {
        name: 'Rescue Team Contacts',
        href: '/rescuers-contacts',
        icon: ExclamationTriangleIcon,
        current: lastSegmentPath === 'rescuers-contacts',
        hide: false
    },
    {
        name: 'Activity History',
        href: '/activity-history',
        icon: ExclamationTriangleIcon,
        current: lastSegmentPath === 'activity-history',
        hide: false
    },
    {
        name: 'Received Accidents',
        href: '/received-accidents',
        icon: ExclamationTriangleIcon,
        current: lastSegmentPath === 'received-accidents',
        hide: role === 'super_admin '
    },
    {
        name: 'Forwarded Accidents',
        href: '/forwarded-accidents',
        icon: ExclamationTriangleIcon,
        current: lastSegmentPath === 'forwarded-accidents',
        hide: role === 'rescuer'
    },
    {
        name: 'User Accounts',
        href: '/users',
        icon: ExclamationTriangleIcon,
        current: lastSegmentPath === 'users',
        hide: role === 'rescuer'
    }
]

const sidebarOpen = ref(false)
</script>
