<template>
    <div class="row margin-none centralize-child">
        <div class="metade input-field margin-bottom-0">
        <slot name="input">
        </slot>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

export default class DivInput extends Vue {

}
</script>