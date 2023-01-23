<template>
    <div class="backdrop">
        <div class="modal">
            <p class="close" @click="storeRules.toggleDisplayRules" style="cursor: pointer">
                <font-awesome-icon icon="xmark" />
            </p>
           
            <h2>LEASING RULES</h2>
            <p>Lorem ipsum dolor sit amet consectetur</p>
            <h4>BOOKS</h4>
            <p>Lorem ipsum dolor sit amet consectetur</p>
            <h4>MOVIES</h4>
            <p>Lorem ipsum dolor sit amet consectetur</p>

            <div class="rules-close">
                <div class="rules-logo">
                    <img src="@/assets/img/NATLIB_LOGO.png" alt="The NAT-LIB logo">
                </div>
                <div>For further questions, contact The National Library +370(8)5-692808</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRulesStore } from '../stores/rules'

const storeRules = useRulesStore()

console.log('Rules component accessed')
</script>

<style>
.modal {
    color: rgb(0, 30, 0);
    background: #999;

}
</style>
