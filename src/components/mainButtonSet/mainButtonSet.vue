<template>
    <div class="grid-100 tablet-grid-100 container footer">
        <div class="grid-100 tablet-grid-100 container">
            <div class="footer-button">
                <div class="grid-50 tablet-grid-20">
                    <button type="button" class="button-standard-large" @click="cancelAction">{{cancelText}}</button>
                </div>

                <div class="grid-50 tablet-grid-20">
                    <button type="button" class="button-yellow-large" @click="confirmAction">{{confirmText}}</button>
                </div>
            </div>
        </div>
    </div>
</template>