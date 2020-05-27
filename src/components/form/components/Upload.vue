<template>
  <div>
    <el-upload
      v-loading="loading"
      action="OSS上传路径，必填"
      class="avatar-uploader"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :http-request="upLoad"
      :on-preview="handlePictureCardPreview"
    >
      <img v-if="dialogImageUrl" :src="dialogImagePath + dialogImageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <i
      v-if="dialogImageUrl"
      class="el-icon-plus el-icon-zoom-in"
      style="float:left;position:relative;left:-20px;top:5px;cursor:pointer"
      @click="onClick_preview"
    ></i>

    <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="[dialogImageUrl]" />
  </div>
</template>
<style lang="scss" scoped>
.avatar-uploader2 {
  width: 178px;
  height: 89px;
}

.avatar-uploader {
  width: 178px;
  min-height: 178px;
  float: left;
  .avatar {
    width: 100%;
    margin: 0 auto; /* 水平居中 */

    /* position: relative; */

    /* top: 50%; !*偏移*! */
    //transform: translateY(-50%);
  }
}

.el-upload img {
  max-width: 178px;
}

.el-upload i {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed #ccc;
  border-radius: 6px;
}

.avatar-uploader .el-upload i:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  width: 178px;
  height: 178px;
  font-size: 28px;
  line-height: 178px;
  color: #8c939d;
  text-align: center;
}

.upload {
  /* width: 178px; */

  /* height: 89px; */
  .avatar-uploader-icon {
    width: 178px;
    height: 89px;
    font-size: 28px;
    line-height: 89px;
    color: #8c939d;
    text-align: center;
  }

  .el-icon-plus::before {
    position: absolute;
    bottom: 2px;
    left: 20px;
  }

  .textspan {
    position: absolute;
    top: 24px;
    left: 60px;
    color: #909399;
  }

  .avatar {
    display: block;
    height: 100%;
    margin: 0 auto;
  }
}
</style>
<script>
// import api from "@/api/api_common";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
export default {
  components: { ElImageViewer },
  props: {
    ruleForm: Object,
    formItem: Object,
    remoteMethod: Function
  },
  data() {
    return {
      loading: false,
      showViewer: false,
      dialogImageUrl: "",
      dialogImagePath: "",
      ossData: {} // 存签名信息
    };
  },

  created() {
    if (this.formItem.initVal) {
      this.dialogImageUrl = this.formItem.initVal;
    }
  },

  mounted() {},
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    beforeUpload() {
      return new Promise(resolve => {
        if (this.type === "entry") {
          // api
          //   .EntryUploadPic({ count: 1 })
          //   .then(result => {
          //     this.ossData = result.object;
          //     resolve(true);
          //   })
          //   .catch();
        } else {
          // api
          //   .uploadPic({ count: 1 })
          //   .then(result => {
          //     this.ossData = result.object;
          //     resolve(true);
          //   })
          //   .catch();
        }
      });
    },

    upLoad(file) {
      const formData = new FormData();
      formData.append(
        "key",
        this.ossData.objectKeyPrefix + "/" + this.ossData.objectKeys[0]
      ); // 存储在oss的文件路径
      formData.append("OSSAccessKeyId", this.ossData.accessKeyId); // accessKeyId
      formData.append("policy", this.ossData.policy); // policy
      formData.append("signature", this.ossData.signature); // 签名
      formData.append("file", file.file);
      formData.append("success_action_status", 200); // 成功后返回的操作码
      this.loading = true;
      // eslint-disable-next-line no-undef
      $.ajax({
        url: this.ossData.ossHost,
        type: "POST",
        data: formData,
        // async: false,
        cache: false,
        processData: false,
        contentType: false,
        success: () => {
          this.dialogImagePath = this.ossData.ossHost + "/";
          this.dialogImageUrl =
            this.ossData.objectKeyPrefix + "/" + this.ossData.objectKeys[0];

          this.ruleForm[this.formItem.key] = {
            dialogImagePath: 111,
            dialogImageUrl: 222
          };
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    },
    onClick_preview() {
      this.showViewer = true;
    },
    closeViewer() {
      this.showViewer = false;
    }
  }
};
</script>
