<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <!--<div class="card-header bg-transparent pb-5">
                    <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
                    <div class="btn-wrapper text-center">
                        <a href="#" class="btn btn-neutral btn-icon">
                            <span class="btn-inner&#45;&#45;icon"><img src="img/icons/common/github.svg"></span>
                            <span class="btn-inner&#45;&#45;text">Github</span>
                        </a>
                        <a href="#" class="btn btn-neutral btn-icon">
                            <span class="btn-inner&#45;&#45;icon"><img src="img/icons/common/google.svg"></span>
                            <span class="btn-inner&#45;&#45;text">Google</span>
                        </a>
                    </div>
                </div>-->
                <div class="card-body px-lg-5 py-lg-5">
                    <!--<div class="text-center text-muted mb-4">
                        <small>Or sign in with credentials</small>
                    </div>-->
                    <form role="form">
                        <base-input class="input-group-alternative mb-3"
                                    placeholder="ID"
                                    addon-left-icon="ni ni-circle-08"
                                    v-model="id"
                                    @keyup.enter.native="handleLogin"
                                    :valid="validResult.id === 'ERROR' ? false : null"
                        >
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="Password"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="password"
                                    @keyup.enter.native="handleLogin"
                                    :valid="validResult.password === 'ERROR' ? false : null"
                        >
                        </base-input>

                        <base-checkbox class="custom-control-alternative">
                            <span class="text-muted">Remember me</span>
                        </base-checkbox>
                        <div class="text-center">
                            <base-button type="primary" class="my-4" @click.native.prevent="handleLogin">Sign in
                            </base-button>
                        </div>
                    </form>
                </div>
            </div>
            <!--<div class="row mt-3">
                <div class="col-6">
                    <a href="#" class="text-light"><small>Forgot password?</small></a>
                </div>
                <div class="col-6 text-right">
                    <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
                </div>
            </div>-->
        </div>
    </div>
</template>
<script>
    import { required } from 'vuelidate/lib/validators'
    export default {
        name: 'login',
        data() {
            return {
                id: '',
                password: '',
                validResult: {
                    id: null,
                    password: null
                }
            }
        },
        validations: {
            id: {
                required
            },
            password: {
                required
            }
        },
        methods: {
            handleLogin() {
                console.log("start login")
                this.validResult.id = null
                this.validResult.password = null
                this.$v.$touch()
                if (this.$v.$invalid) {
                    console.log(this.$v);
                    if(!this.$v.id.required) {
                        this.validResult.id = 'ERROR'
                    }

                    if(!this.$v.password.required) {
                        this.validResult.password = 'ERROR'
                    }
                } else {

                    // do your submit logic here
                }
            }
        }
    }
</script>
<style>
</style>
