<template>
    <v-container fluid grid-list-md>
        <v-layout align-center justify-center row fill-height pa-3 mb-2>
            <v-flex lg6>
                <v-card>
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">Employee Information</div>
                        </div>
                    </v-card-title>
                    <v-container fluid grid-list-md>
                        <v-layout row wrap>
                            <v-flex>
                                <form>
                                    <v-text-field
                                            v-model="firstName"
                                            v-validate="'required|max:10'"
                                            :error-messages="errors.collect('firstName')"
                                            label="First Name"
                                            data-vv-name="firstName"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="lastName"
                                            v-validate="'required|max:10'"
                                            :error-messages="errors.collect('lastName')"
                                            label="Last Name"
                                            data-vv-name="lastName"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="address"
                                            v-validate="'required|max:30'"
                                            :error-messages="errors.collect('address')"
                                            label="Address"
                                            data-vv-name="address"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="company"
                                            v-validate="'required|max:10'"
                                            :error-messages="errors.collect('company')"
                                            label="Company"
                                            data-vv-name="company"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            v-model="salary"
                                            v-validate="'digits:10'"
                                            :error-messages="errors.collect('salary')"
                                            label="Salary"
                                            data-vv-name="salary"
                                            required
                                    ></v-text-field>
                                </form>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-card-actions>
                        <v-btn @click="submit">submit</v-btn>
                        <v-btn @click="clear">clear</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        <v-flex lg6>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <div class="headline">Employee List</div>
                    </div>
                </v-card-title>
                    <v-data-table
                            :headers="headers"
                            :items="employees"
                            class="elevation-1"
                    >
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.firstName }}</td>
                            <td class="text-xs-right">{{ props.item.lastName }}</td>
                            <td class="text-xs-right">{{ props.item.address }}</td>
                            <td class="text-xs-right">{{ props.item.company }}</td>
                            <td class="text-xs-right">{{ props.item.salary }}</td>
                        </template>
                    </v-data-table>
                <v-card-actions>
                    <v-btn @click="getList">Refresh</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import Vue from 'vue'
    import VeeValidate from 'vee-validate'
    import { addEmployee, list } from "../config/couchDB";

    Vue.use(VeeValidate)

    export default {
        $_veeValidate: {
            validator: 'new'
        },

        data: () => ({
            firstName: '',
            lastName: '',
            address: '',
            company: '',
            salary: 0,
            dictionary: {
                attributes: {
                    email: 'E-mail Address'
                    // custom attributes
                },
                custom: {
                    firstName: {
                        required: () => 'First Name can not be empty',
                        max: 'The firstName field may not be greater than 10 characters'
                        // custom messages
                    },
                    lastName: {
                        required: () => 'Last Name can not be empty',
                        max: 'The lastName field may not be greater than 10 characters'
                        // custom messages
                    },
                    address: {
                        required: () => 'Address can not be empty',
                        max: 'The address field may not be greater than 30 characters'
                        // custom messages
                    },
                    company: {
                        required: () => 'Company can not be empty',
                        max: 'The company field may not be greater than 10 characters'
                        // custom messages
                    },
                    salary:{
                        required: () => 'Salary can not be empty',
                        digits: 'Salary cannot exceed 10 digits'
                    }
                }
            },
            headers: [
                {
                    text: 'First Name',
                    align: 'left',
                    value: 'firstName'
                },
                { text: 'Last Name', value: 'lastName' },
                { text: 'Address', value: 'address' },
                { text: 'Company', value: 'company' },
                { text: 'Salary', value: 'salaray' },
            ],
            employees: [],
        }),

        mounted () {
            this.$validator.localize('en', this.dictionary)
        },

        methods: {
            submit () {
                this.$validator.validateAll()
                addEmployee({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    address: this.address,
                    company: this.company,
                    salary:this.salary
                });
            },
            clear () {
                this.firstName = ''
                this.lastName = ''
                this.address = ''
                this.company = ''
                this.salary = ''
                this.$validator.reset()
            },
            getList() {
                list().then(res => {
                    this.employees = res;
                }).catch(() => {})
            },
        },
    }
</script>