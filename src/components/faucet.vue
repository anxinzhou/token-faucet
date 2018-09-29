<template>
    <section>
        <div class="faucetHead">
            <h2 class="section-heading header">Kovan Demo Faucet </h2>
        </div>
        <div>
            <div class="faucetBody">
                         <span class="faucetLabel">Enter your account address:</span>
                         <input type="Text" class="faucetInput" id="#account" v-model="account">
                    <button type="button" class="alpha-button-primary alpha-button faucetButton" v-on:click="requireEther">Send me test ether</button>
            </div>
        </div>

    </section>
</template>
<script>
export default  {
    data() {
        return {
            account: '',
            got: false
        }
    },
    methods: {
        requireEther: function() {
            if(this.got){
                this.$snotify.error('Please click once',{
                    position: "rightTop",
                    timeout: 2000
                })
                return
            }
            if(this.account.length!=42){
                this.$snotify.error('Wrong address',{
                        position: "rightTop",
                        timeout: 2000
                    })
                return
            }
            this.got = true
            this.$snotify.info('Request has been received',{
                    position: "rightTop",
                    timeout: 2000
                });
            this.$ajax.post('https://consortium.secdevgame.site/api/v1'+'/faucet',{account: this.account})
                .then(res => {
                        this.$snotify.success('Receive 0.01 ether',{
                            position: "rightTop",
                            timeout: 2000
                            });
                        })
                .catch(err=> {
                    this.got = false
                    console.log(err.message);
                    this.$snotify.error('Please try again',{
                        position: "rightTop",
                        timeout: 2000
                    })
                });
        }
    }
}
</script>