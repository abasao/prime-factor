<template>
    <div class="overlay" v-show="show">
        <p class="message">{{contents}}</p>
        <button class="tryAgain" @click="resetGame" >Try again</button>
    </div>
</template>

<script>

    export default{
        data(){
            return{

            }
        },
        props:{
            board:{
                type:Object,
                required:true
            },
            restart:{
                type:Function,
                required:true
            }
        },
        computed:{
            show(){
                return this.board.hasWon() || this.board.hasLost()
            },
            contents(){
                if(this.board.hasWon()){
                    return 'You Won!'
                }else if(this.board.hasLost()){
                    return 'Game Over'
                }else {
                    return ''
                }
            }
        },

        methods:{
            resetGame(){
                this.restart && this.restart()
            }
        },
        components:{

        }
    }
</script>