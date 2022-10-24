<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters(['isShowToast'])
    },
    methods: {
        ...mapMutations(['showToast'])
    }
}
</script>
<template>
    <div id="toast_message">
        <!-- <div class="toast toast--success">
            <div class="toast__icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">Success</h3>
                <p class="toast__msg">Ban Da Dang Nhap Thanh Cong</p>
            </div>
            <div class="toast__close">
                <i class="far fa-times-circle"></i>
            </div>
        </div> -->
    </div>
</template>
<style lang="scss" >
#toast_message {
    position: fixed;
    z-index: 99999;
    right: 20px;
    top: 20px;

    .toast {
        min-width: 300px;
        display: flex;
        align-items: center;
        background-color: #fff;
        border-radius: 2px;
        padding: 10px 0;
        border-left: 5px solid;
        box-shadow: 0 5px 8px rgba(0, 0, 0, 0.08);
        transition: all linear 1s;
    }

    .btn {
        font-size: 14px;
        width: 150px;
        height: 30px;
        border: none;
        border-radius: 20px;
        color: #fff;
    }

    @keyframes showtoast {
        from {
            transform: translateX(calc(100% + 32px));
            opacity: 0.4;
        }

        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes hidetoast {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }

    .toast+.toast {
        margin-top: 10px;
    }

    .toast__close,
    .toast__icon {
        padding: 0 10px;
        font-size: 24px;
    }

    .toast__body {
        flex: 1;
    }

    .toast__title {
        font-size: 18px;
        font-weight: 600;
    }

    .toast__msg {
        font-size: 14px;
        margin-top: 8px;
        color: #333;
    }

    .toast__close {
        color: rgba(0, 0, 0, 0.3);

    }

    .toast--success {
        border-color: #47d664;
    }

    .toast--success .toast__icon {
        color: #47d664;
    }

    .toast--info {
        border-color: #3086ed;
    }

    .toast--info .toast__icon {
        color: #3086ed;
    }

    .toast--warning {
        border-color: #ffc023;
    }

    .toast--warning .toast__icon {
        color: #ffc023;
    }

    .toast--error {
        border-color: #e13008;
    }

    .toast--error .toast__icon {
        color: #e13008;
    }
}
</style>