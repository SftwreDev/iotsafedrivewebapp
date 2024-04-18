<script>
export default {
    props: ['userProfile', 'rescuers', 'trusted_contacts'],
    data() {
        return {
            tabContent: 'profile',
            formData: {}
        }
    },
    methods: {
        changeTab(tab) {
            this.tabContent = tab
        },
        getDeviceLocation() {
            const success = (position) => {
                const latitude = position.coords.latitude
                const longitude = position.coords.longitude

                localStorage.setItem('latitude', latitude)
                localStorage.setItem('longitude', longitude)

                console.log(latitude, longitude)
                // Do something with the position
            }

            const error = () => {
                console.log(error)
            }

            // This will open permission popup
            navigator.geolocation.getCurrentPosition(success, error)
        }
    },
    mounted() {
        this.getDeviceLocation()
    },
    created() {


    }
}
</script>
<template>
    <AccidentDetectedModal />
    <div class="flex h-full">
        <div class="relative z-0 flex flex-1 overflow-hidden">
            <main class="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
                <article>
                    <!-- Profile header -->
                    <div>
                        <div>
                            <img
                                :src="profile.coverImageUrl"
                                alt=""
                                class="h-32 w-full object-cover lg:h-48"
                            />
                        </div>
                        <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                            <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                                <div class="flex">
                                    <img
                                        :src="userProfile[0]?.profile_picture"
                                        alt=""
                                        class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                                    />
                                </div>
                                <div
                                    class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
                                >
                                    <div class="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                                        <h1 class="truncate text-2xl font-bold text-gray-900">
                                            {{ userProfile[0]?.first_name }}
                                            {{ userProfile[0]?.last_name }}
                                        </h1>
                                    </div>
                                    <div
                                        class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0"
                                    >

                                    </div>
                                </div>
                            </div>
                            <div class="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                                <h1 class="truncate text-2xl font-bold text-gray-900">
                                    {{ userProfile[0]?.first_name }} {{ userProfile[0]?.last_name }}
                                </h1>
                            </div>
                        </div>
                    </div>

                    <!-- Tabs -->
                    <div class="mt-6 sm:mt-2 2xl:mt-5">
                        <div class="border-b border-gray-200">
                            <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                                <nav aria-label="Tabs" class="-mb-px flex space-x-8">
                                    <a
                                        v-for="tab in tabs"
                                        :key="tab.name"
                                        :aria-current="tab.current ? 'page' : undefined"
                                        :class="[
                                            tabContent == tab.tab
                                                ? 'border-custom-bg-500 text-custom-bg-600'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                            'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                                        ]"
                                        :href="tab.href"
                                        @click="changeTab(tab.tab)"
                                    >{{ tab.name }}</a
                                    >
                                </nav>
                            </div>
                        </div>
                    </div>

                    <!-- Profile -->
                    <div
                        v-if="tabContent === 'profile'"
                        class="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8"
                    >
                        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Phone</dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{ userProfile[0]?.contact }}
                                </dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Email</dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{ userProfile[0]?.email }}
                                </dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Address</dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{ userProfile[0]?.address }}
                                </dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Device ID</dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{ userProfile[0]?.device_id }}
                                </dd>
                            </div>
                        </dl>
                        <div class="border-b border-gray-200 pb-5 my-10">
                            <h3 class="text-base font-semibold leading-6 text-gray-700">Vehicle</h3>
                        </div>
                        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Brand</dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{ userProfile[0]?.brand }}
                                </dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Model</dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{ userProfile[0]?.model }}
                                </dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Year Model</dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{ userProfile[0]?.year_model }}
                                </dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Plate #</dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{ userProfile[0]?.plate_no }}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <!-- Trusted Contacts -->
                    <div v-if="tabContent === 'trustedContacts'">
                        <div
                            v-for="field in trusted_contacts"
                            :key="field"
                            class="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8"
                        >
                            <dl class="grid grid-cols-3 gap-x-2 gap-y-8 sm:grid-cols-2">
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">Name</dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ field.name }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-medium text-gray-500">Contact</dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ field.contact }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1 mb-10">
                                    <dt class="text-sm font-medium text-gray-500">Address</dt>
                                    <dd class="mt-1 text-sm text-gray-900">
                                        {{ field.address }}
                                    </dd>
                                </div>
                            </dl>

                            <hr />
                        </div>
                    </div>

                    <!-- Trusted Contacts -->
                    <div v-if="tabContent === 'rescuersContacts'" class="mx-auto mt-6 max-w-5xl">
                        <div class="px-4 sm:px-6 lg:px-8">
                            <div class="sm:flex sm:items-center">
                                <div class="sm:flex-auto">
                                    <h1 class="text-base font-semibold leading-6 text-gray-900">
                                        Rescuers Contacts Information
                                    </h1>
                                    <p class="mt-2 text-sm text-gray-700">
                                        A list of all the rescuer contacts
                                    </p>
                                </div>
                                <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
                            </div>
                            <div class="mt-8 flow-root">
                                <div class="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                                    <div class="inline-block min-w-full py-2 align-middle">
                                        <table class="min-w-full border-separate border-spacing-0">
                                            <thead>
                                            <tr>
                                                <th
                                                    class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                                                    scope="col"
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                                    scope="col"
                                                >
                                                    Address
                                                </th>
                                                <th
                                                    class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur font-semibold text-gray-900 backdrop-filter sm:pr-6 lg:pr-8"
                                                    scope="col"
                                                >
                                                    Contact
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr
                                                v-for="(item, itemIdx) in rescuers"
                                                :key="item.name"
                                            >
                                                <td
                                                    :class="[
                                                            itemIdx !== item.length - 1
                                                                ? 'border-b border-gray-200'
                                                                : '',
                                                            'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                        ]"
                                                >
                                                    {{ item.name }}
                                                </td>
                                                <td
                                                    :class="[
                                                            itemIdx !== item.length - 1
                                                                ? 'border-b border-gray-200'
                                                                : '',
                                                            'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                                                        ]"
                                                >
                                                    {{ item.address }}
                                                </td>
                                                <td
                                                    :class="[
                                                            itemIdx !== item.length - 1
                                                                ? 'border-b border-gray-200'
                                                                : '',
                                                            'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                                                        ]"
                                                >
                                                    {{ item.contact }}
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
        </div>
    </div>
</template>

<script setup>

import AccidentDetectedModal from '@/components/homepage/AccidentDetectedModal.vue'

const tabs = [
    { name: 'Profile', href: '#', current: false, tab: 'profile' },
    { name: 'Trusted Contacts', href: '#', current: false, tab: 'trustedContacts' },
    { name: 'Rescuers Contacts', href: '#', current: false, tab: 'rescuersContacts' }
]
const profile = {
    name: 'Ricardo Cooper',
    imageUrl:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    coverImageUrl:
        'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    about: `
      <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
      <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
    `,
    fields: {
        Phone: '(555) 123-4567',
        Email: 'ricardocooper@example.com',
        Title: 'Senior Front-End Developer',
        Team: 'Product Development',
        Location: 'San Francisco',
        Sits: 'Oasis, 4th floor',
        Salary: '$145,000',
        Birthday: 'June 8, 1990'
    }
}
const trustedContacts = {
    fields: {
        Phone: '(555) 123-4567',
        Email: 'ricardocooper@example.com',
        Title: 'Senior Front-End Developer',
        Team: 'Product Development',
        Location: 'San Francisco',
        Sits: 'Oasis, 4th floor',
        Salary: '$145,000',
        Birthday: 'June 8, 1990'
    }
}
</script>
