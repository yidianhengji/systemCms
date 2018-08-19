<template>
    <div>
        <div class="__doubleFile" v-if="upload.multiple=='multiple'">
            <ul class="__list">
                <li @click="delectUrl(index)" v-for="(item,index) in dataListdouble" :key="index"><img :src="item" alt="">
                    <span>删除</span>
                </li>
            </ul>
            <div class="__uoloadFile120">
                <input type="file" :id=upload.id :multiple=upload.multiple @change="thisFile(upload.id)">
                <img src="/static/upload/upload-120-120.png" alt="">
            </div>
        </div>

        <div class="__singleFile" v-else>
            <div class="__uoloadFile120">
                <input type="file" :id=upload.id @change="thisFile(upload.id)">
                <img :src="dataListsingle" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import { uploadFile } from "api/upload/index";
export default {
    props: {
        upload: {},
    },
    data() {
        return {
            dataListsingle: "static/upload/upload-120-120.png",
            dataListdouble: []
        }
    },
    methods: {
        thisFile(id) {
            var file = document.getElementById(id);
            if (file.multiple == false) {
                var from = file.files[0];
                uploadFile(from).then(data => {
                    if(data.data.code==200){
                        this.dataListsingle = data.data.data
                    }
                })
            } else {
                if(this.upload.leng==''){
                    if (file.files.length > 0) {
                        var from = [];
                        for (var i = 0; i < file.files.length; i++) {
                            from.push(file.files[i]);
                        }
                        uploadFile(from).then(data => {
                            if(data.data.code==200){
                                this.dataListdouble = data.data.data
                            }
                        })
                    }
                }else{
                    if (file.files.length > 0) {
                        var from = [];
                        for (var i = 0; i < file.files.length; i++) {
                            from.push(file.files[i]);
                            if(this.dataListdouble.length>=this.upload.leng){
                                alert("最多添加"+this.upload.leng+"个");
                            }else{
                                 uploadFile(from).then(data => {
                                     if(data.data.code==200){
                                         this.dataListdouble.push(data.data.data)
                                     }
                                 })
                            }
                        }
                    }
                }
            }
        },
        delectUrl(index){
            this.dataListdouble.splice(index,1);
        },
        getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) {
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) {
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        }
    },
}
</script>

<style lang="stylus">
$widthAndHeight = 120px
.__doubleFile {
    overflow hidden
    .__list {
        float left
        overflow hidden
        li {
            width $widthAndHeight
            height $widthAndHeight
            float left
            margin-right 10px
            position relative
            img {
                width $widthAndHeight
                height $widthAndHeight
                border-radius 50%
            }
            span {
                position absolute
                top 0px
                left 0px
                width 100%
                height 100%
                text-align center
                line-height $widthAndHeight
                background rgba(0,0,0,0.3)
                border-radius 50%
                display none
                cursor pointer
                color #fff
            }
        }
        li:hover span {
            display block
        }
    }
}
.__info {
    float left
    margin-top 100px
    color #333333
    font-size 14px
}
.__singleFile {
    overflow hidden
}
.__uoloadFile120 {
    float left
    overflow hidden
    position relative
    width $widthAndHeight
    height $widthAndHeight
    input {
        position absolute
        z-index 2
        top 0px
        left 0px
        width $widthAndHeight
        height $widthAndHeight
        opacity 0
    }
    img {
        width $widthAndHeight
        height $widthAndHeight
        border-radius 50%
    }
}
</style>
