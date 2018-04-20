<template>
    <div class="grid-100 tablet-grid-100 container title">
        <h1 class="title">{{headerTitle}}
            <div class="grid-50 tablet-grid-50 progressbar-container">
                <ul class="progressbar">
                    <template v-for="(item,index) in stageOptions">
                        <li :key="index" :class="{current: currentStage >= item.stage}">
                            <span v-if="index > 0"></span>
                            <span></span>
                            <span :class="{current: currentStage >= item.stage}">{{item.stageText}}</span>
                        </li>
                    </template>
                </ul>
            </div>
        </h1>
        <p class="sub-title sub-header">{{subtitle}}</p>
    </div>
</template>
<style lang="scss" src="./stageHeader.scss" scoped></style>
