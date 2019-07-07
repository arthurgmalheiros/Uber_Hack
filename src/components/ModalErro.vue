<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header row margin-none">
                        <slot name="header">
                        <i class="material-icons">{{icon}}</i>
                        </slot>
                        <div class="modal-body row margin-none">
                            <slot name="body">
                            <p v-if="content">{{content}}</p>
                            </slot>
                        </div>
                        <div class="modal-footer row margin-none">
                            <slot name="footer">
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
    props: {
        icon: String, content: String
    }
})
export default class ModalErro extends Vue {

}
</script>