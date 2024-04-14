<script>
export default {
    // Properties returned from data() become reactive state
    // and will be exposed on `this`.

    data() {
        const is_staff = localStorage.getItem('is_staff') === 'true'
        const is_superuser = localStorage.getItem('is_superuser') === 'true'
        return {
            full_name: '',
            email: '',
            profile_picture: '',
            is_staff,
            is_superuser
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
        console.log('is_superuser', this.is_superuser)
        console.log('is_staff', this.is_staff)
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
                                        v-if="is_staff"
                                        :src="profile_picture"
                                        alt=""
                                        class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                                    />
                                    <div v-if="is_superuser">
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
                                <nav v-if="is_staff" class="mt-10 px-3">
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

                                <nav v-if="is_superuser" class="mt-10 px-3">
                                    <div class="space-y-1">
                                        <a
                                            v-for="item in admin_navigation"
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
                                        v-if="is_staff"
                                        :src="profile_picture"
                                        alt=""
                                        class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                                    />
                                    <div v-if="is_superuser">
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
                <nav v-if="is_staff" class="mt-10 px-3">
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

                <nav v-if="is_superuser" class="mt-10 px-3">
                    <div class="space-y-1">
                        <a
                            v-for="item in admin_navigation"
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
            <!-- Search header -->
            <div
                class="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:hidden"
            >
                <button
                    class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
                    type="button"
                    @click="sidebarOpen = true"
                >
                    <span class="sr-only">Open sidebar</span>
                    <Bars3CenterLeftIcon aria-hidden="true" class="h-6 w-6" />
                </button>
                <div class="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
                    <div class="flex flex-1">
                        <form action="#" class="flex w-full md:ml-0" method="GET">
                            <label class="sr-only" for="search-field">Search</label>
                            <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                                <div
                                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center"
                                >
                                    <MagnifyingGlassIcon aria-hidden="true" class="h-5 w-5" />
                                </div>
                                <input
                                    id="search-field"
                                    class="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:text-sm"
                                    name="search-field"
                                    placeholder="Search"
                                    type="search"
                                />
                            </div>
                        </form>
                    </div>
                    <div class="flex items-center">
                        <!-- Profile dropdown -->
                        <Menu as="div" class="relative ml-3">
                            <div>
                                <MenuButton
                                    class="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                    <span class="absolute -inset-1.5" />
                                    <span class="sr-only">Open user menu</span>
                                    <img
                                        alt=""
                                        class="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    />
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
                                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                </div>
            </div>
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
    Bars3CenterLeftIcon,
    HomeIcon,
    XMarkIcon,
    Cog6ToothIcon,
    ExclamationTriangleIcon

} from '@heroicons/vue/24/outline'
import { ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

const navigation = [
    { name: 'Profile', href: '/', icon: HomeIcon, current: lastSegmentPath === 'localhost:5173' },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon, current: lastSegmentPath === 'settings' }
]
const admin_navigation = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: HomeIcon,
        current: lastSegmentPath === 'dashboard'
    },
    {
        name: 'Registered Vehicles',
        href: '/registered-vehicle',
        icon: faCar,
        current: lastSegmentPath === 'registered-vehicle'
    },
    {
        name: 'Emergency Contacts',
        href: '/emergency-contacts',
        icon: ExclamationTriangleIcon,
        current: lastSegmentPath === 'emergency-contacts'
    },
    {
        name: 'Rescue Team Contacts',
        href: '/rescuers-contacts',
        icon: ExclamationTriangleIcon,
        current: lastSegmentPath === 'rescuers-contacts'
    },
    {
        name: 'Accident History',
        href: '/activity-history',
        icon: ExclamationTriangleIcon,
        current: lastSegmentPath === 'activity-history'
    },
    {
        name: 'Registered User Accounts',
        href: '/users',
        icon: ExclamationTriangleIcon,
        current: lastSegmentPath === 'users'
    }
]

const sidebarOpen = ref(false)
</script>
