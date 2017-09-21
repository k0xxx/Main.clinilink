import Calls from './calls.vue'

const CallsModule = {
    install (Vue, options = {}) {
        // Makes sure that plugin can be insstalled only once
        if (this.installed) {
            return
        }
        this.installed = true
        this.event = new Vue()

        Vue.prototype.$calls = {
            call(callTo) {
                CallsModule.event.$emit('call', callTo, true)
            },
        }
        Vue.component('calls', Calls)
    }
}

export default CallsModule;