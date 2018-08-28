<template>
    <div v-if="pagination.hasPages">
        <div style="float: left; margin-top: 23px; font-style: italic; color: #15223d;">{{pagination.displayText()}}</div>
        <div style="float: right; margin-top: 23px;">

            <!-- <div style="width:85px; position: relative; left: 116px; height: 22px;"> -->
            <div style="min-width:100px; float:right;" v-if="pagination.getTotalPages() > 1">

                <button v-if="pagination.getCurrentPage() > 1" v-on:click="prePage()" style="width:auto; background-color:transparent; box-shadow: none; text-transform: capitalize; color: #15223d;"><img src="../../assets/images/right-arrow.svg" style="height:12px;">&nbsp;Back</button>

                <ul style="display:inline-block;">
                    <template v-for="item in pagination.getTotalPageList()"  v-bind:item="item">
                        <template v-if="item.pageNum == pagination.getCurrentPage()">
                            <li style = "display: inline; padding:3px;"  v-on:click="goToPage(item.pageNum)">
                                <button style="width:auto; border-radius:0px; border-bottom:3px solid #f7b020; background-color:transparent; box-shadow: none; color: #15223d;">{{ item.pageNum }}</button>
                            </li>
                        </template>
                        <template v-else>
                            <li style="display: inline; padding:3px;" v-on:click="goToPage(item.pageNum)">
                                <button style="width:auto; background-color:transparent; box-shadow: none; color: #15223d;">{{ item.pageNum }}</button>
                            </li>
                        </template>
                    </template>
                   </ul>
                <button v-if="pagination.getCurrentPage() != pagination.getTotalPages()" v-on:click="nextPage()" style="width:auto; background-color:transparent; box-shadow: none; text-transform: capitalize; color: #15223d;">Next&nbsp;<img src="../../assets/images/left-arrow.svg" style="height:12px;"></button>
            </div>

        </div>
    </div>
</template>
