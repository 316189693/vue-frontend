<template>
    <div>
        <div class="grid-100 tablet-grid-100 container title">
            <h1 class="title">Schedule Pickup
                <ul class="schedule-pickup-nav">
                    <li>
                        <span :class="{circle: true , current: currentStage >= stageOptions.schedulePage}"></span>
                    </li>
                    <li>
                        <span class="line"></span>
                        <span :class="{circle: true , current: currentStage >= stageOptions.scheduleShipmentPage}"></span>
                    </li>
                    <li>
                        <span class="line"></span>
                        <span :class="{circle: true , current: currentStage >= stageOptions.scheduleReviewPage}"></span>
                    </li>
                </ul>

                <ul class="schedule-pickup-nav-text">
                    <li>
                        <span :class="{current: currentStage >= stageOptions.schedulePage}">Location</span>
                    </li>
                    <li>
                        <span :class="{current: currentStage >= stageOptions.scheduleShipmentPage}">Shipment</span>
                    </li>
                    <li>
                        <span :class="{current: currentStage >= stageOptions.scheduleReviewPage}">Review</span>
                    </li>
                </ul>
            </h1>
            <p class="sub-title sub-header">{{getSubMessage()}}</p>
        </div>
    </div>

</template>