<template>
   <div id="sitecontent">
            <div class="grid-100 tablet-grid-100">
                <div class="grid-100 tablet-grid-100 container title">
                    <h1 class="title">PRO #: 111934922</h1>
                    <p class="sub-title sub-header">Reference #: 2922010101</p>
                </div>

                <div class="grid-100 tablet-grid-100 container">
                    <div class="grid-50 tablet-grid-50">
                        <div class="grid-100 tablet-grid-100">
                            <h1 class="step-header">
                                <span class="label-number-summary">1</span>Where are we picking up?</h1>
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <table class="table-details">
                                <tbody>
                                    <tr>
                                        <td>Type</td>
                                        <td>Business</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>Freshzim <br> 1218 Brannon Street<br> Los Angeles, CA 90014
                                        </td>
                                        <td>
                                            <input type="checkbox" id="test1" checked="" disabled="">
                                            <label class="checkbox" for="test1">
                                                <span>Lift Gate Required</span>
                                            </label>
                                            <br>
                                            <input type="checkbox" id="test2" checked="" disabled="">
                                            <label class="checkbox" for="test2">
                                                <span>Pallet Jack Required</span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ready for Pickup</td>
                                        <td>02/06/2018<br> 12:00 (12:00 PM) to 17:00 (5:00 PM)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="grid-50 tablet-grid-50">
                        <div class="grid-100 tablet-grid-100">
                            <h1 class="step-header">
                                <span class="label-number-summary">2</span>Where are we delivering?</h1>
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <table class="table-details">
                                <tbody>
                                    <tr>
                                        <td>Type</td>
                                        <td>Business</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>Freshzim <br> 1218 Brannon Street<br> Los Angeles, CA 90014
                                        </td>
                                        <td>
                                            <input type="checkbox" id="test3" checked="" disabled="">
                                            <label class="checkbox" for="test3">
                                                <span>Lift Gate Required</span>
                                            </label>
                                            <br>
                                            <input type="checkbox" id="test4" checked="" disabled="">
                                            <label class="checkbox" for="test4">
                                                <span>Pallet Jack Required</span>
                                            </label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="grid-100 tablet-grid-100 container">
                    <div class="grid-50 tablet-grid-50">
                        <div class="grid-100 tablet-grid-100">
                            <h1 class="step-header">
                                <span class="label-number-summary">3</span>What are we carrying?</h1>
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <table class="table-details">
                                <tbody>
                                    <tr>
                                        <td>Description</td>
                                        <td>Cellphones</td>
                                        <td>
                                            <div class="manifest-line-count">1</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Pallets</td>
                                        <td>12 Pallets (Standard: 40 x 48)</td>
                                        <td>
                                            <input type="checkbox" id="test5" checked="" disabled="">
                                            <label class="checkbox" for="test5">
                                                <span>Stackable?</span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Description</td>
                                        <td>Women's Clothing</td>
                                        <td>
                                            <div class="manifest-line-count">2</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Pallets</td>
                                        <td>1 Pallet (40 x 40)</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3">
                                            <span class="line"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Total Pallets</td>
                                        <td>13</td>
                                    </tr>
                                    <tr>
                                        <td>Class</td>
                                        <td>55</td>
                                    </tr>
                                    <tr>
                                        <td>Total Weight</td>
                                        <td>1,300 lbs</td>
                                    </tr>
                                    <tr>
                                        <td>Pallet Spaces</td>
                                        <td>5</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="grid-50 tablet-grid-50">
                        <div class="grid-100 tablet-grid-100">
                            <h1 class="step-header">
                                <span class="label-number-summary">4</span>Documents</h1>
                        </div>

                        <div class="grid-100 tablet-grid-100 container" v-if="hasDocument">
                            <ul class="file-list">
                             <template v-for="document in formData.documents">
                                 <li>
                                    <div class="file">
                                        <p class="file-category">{{document.file_category_name}}</p>
                                        
                                        <a :href="document.file_original_url" target="_BLANK" v-if="document.file_thumbnail_url">
                                            <img :src="document.file_thumbnail_url">
                                        </a>
                                        <div class="missing-file" v-if="!document.file_thumbnail_url"></div>
                                    </div>
                                </li>
                             </template>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
</template>
<style lang="scss" src="./orderReview.scss" scoped></style>